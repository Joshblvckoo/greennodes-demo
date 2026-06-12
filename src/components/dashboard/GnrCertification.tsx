"use client";

/**
 * @fileOverview Interactive assessment view component for GNR Certification.
 * Includes a lockout engine for failed attempts.
 */

import { useState, useEffect } from 'react';
import { generateGnrExam, QuizQuestion } from '@/utils/gnrQuizData';
import { Button } from '@/components/ui/button';
import { Award, Trophy, BookOpen, RefreshCcw, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GnrCertification({ onAuditClick }: { onAuditClick: () => void }) {
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [lockoutTimeRemaining, setLockoutTimeRemaining] = useState<string | null>(null);
  const [examResult, setExamResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    checkLockoutStatus();
  }, []);

  const checkLockoutStatus = () => {
    const savedLockout = localStorage.getItem('gnr_exam_lockout_until');
    if (savedLockout) {
      const lockoutDate = new Date(parseInt(savedLockout, 10));
      const now = new Date();

      if (now < lockoutDate) {
        const diffTime = Math.abs(lockoutDate.getTime() - now.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setLockoutTimeRemaining(`${diffDays} days`);
        return true;
      } else {
        localStorage.removeItem('gnr_exam_lockout_until'); // Lockout expired safely
      }
    }
    setExamQuestions(generateGnrExam());
    return false;
  };

  const handleSelectOption = (optionIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optionIdx });
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    examQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const scorePercent = (correctCount / examQuestions.length) * 100;
    const isPassed = scorePercent >= 75; // 75% Pass Mark Target

    if (!isPassed) {
      // Impose a strict 30-day cooling-off period on failure
      const targetUnlockDate = new Date();
      targetUnlockDate.setDate(targetUnlockDate.getDate() + 30);
      localStorage.setItem('gnr_exam_lockout_until', targetUnlockDate.getTime().toString());
    }

    setExamResult({ score: scorePercent, passed: isPassed });
  };

  if (!isHydrated) {
    return (
      <div className="p-6 bg-[#020617] text-emerald-400 font-mono text-center">
        Initialising Certification Node...
      </div>
    );
  }

  // Lockout Render Screen
  if (lockoutTimeRemaining) {
    return (
      <div className="p-12 bg-card border border-destructive/20 rounded-2xl text-center max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
          <BookOpen className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter text-destructive">Assessment Link Suspended</h2>
        <p className="text-lg text-muted-foreground">
          You did not achieve the required <span className="text-primary font-bold">75% passing grade</span> on your recent attempt. Engineers are permitted one evaluation runtime loop per month.
        </p>
        <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-xs text-muted-foreground font-mono uppercase tracking-widest">
          Cooling Lockout Retake Active. Remaining time: <span className="text-destructive font-bold">{lockoutTimeRemaining}</span>
        </div>
        <Button 
          variant="outline" 
          onClick={onAuditClick}
          className="w-full h-12 border-white/10 text-slate-300 hover:bg-white/5 font-bold uppercase tracking-widest"
        >
          View Audit Status
        </Button>
      </div>
    );
  }

  // Result Render Screen
  if (examResult) {
    return (
      <div className="p-12 bg-card border border-white/5 rounded-2xl max-w-2xl mx-auto text-center space-y-8 animate-in fade-in zoom-in duration-500">
        {examResult.passed ? (
          <>
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 border-4 border-primary glow-primary mb-4">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Qualification Verified</h2>
            <div className="p-6 rounded-2xl bg-black/40 border border-primary/30 inline-block">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Score Achieved</p>
              <div className="flex items-center justify-center gap-2 text-3xl font-black text-white">
                <ShieldCheck className="text-primary h-8 w-8" />
                {examResult.score}%
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              Outstanding performance. Your expertise in GreenOps architectures is now verified in the platform administration profiles.
            </p>
            <Button 
              onClick={onAuditClick}
              className="w-full h-14 bg-primary text-primary-foreground font-black uppercase tracking-widest glow-primary text-lg"
            >
              Claim Priority 48-Hour Audit
            </Button>
          </>
        ) : (
          <>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
              <BookOpen className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-destructive">Evaluation Target Missed</h2>
            <div className="p-6 rounded-2xl bg-black/40 border border-destructive/30 inline-block">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Final Score</p>
              <div className="flex items-center justify-center gap-2 text-3xl font-black text-destructive">
                {examResult.score}%
              </div>
              <p className="text-[10px] text-muted-foreground uppercase mt-2">Required: 75%</p>
            </div>
            <p className="text-lg text-muted-foreground">
              GreenOps proficiency requires a 75% threshold. Retake parameters lock initialized for 30 days.
            </p>
            <Button 
              variant="outline" 
              onClick={onAuditClick}
              className="w-full h-12 border-white/10 text-slate-300 hover:bg-white/5 font-bold uppercase tracking-widest"
            >
              Request Manual Assistance
            </Button>
          </>
        )}
      </div>
    );
  }

  // Active Quiz View Render Screen
  const currentQuestion = examQuestions[currentIdx];
  if (!currentQuestion) return <div className="text-center font-mono text-xs text-emerald-400 p-12">Initialising Exam Matric Matrix...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
          <Award size={12} /> Official Practitioner Challenge
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight">GreenNodes Core <span className="text-primary">Certification</span></h1>
        <p className="text-muted-foreground">Prove your expertise in sustainable architecture to unlock enterprise-tier audits.</p>
      </div>

      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{currentQuestion.category} MODULE</span>
            <span className="text-xs font-bold text-muted-foreground">Question {currentIdx + 1} of {examQuestions.length}</span>
          </div>
          <div className="h-2 w-32 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${((currentIdx + 1) / examQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-8 space-y-8">
          <h3 className="text-xl font-bold leading-relaxed">{currentQuestion.question}</h3>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, oIdx) => (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(oIdx)}
                className={cn(
                  "w-full p-5 rounded-xl text-left font-medium transition-all duration-300 flex items-center justify-between group border",
                  selectedAnswers[currentIdx] === oIdx
                    ? "bg-primary/20 border-primary text-primary glow-primary ring-1 ring-primary/50"
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors",
                    selectedAnswers[currentIdx] === oIdx
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-black/40 text-muted-foreground border-white/10 group-hover:border-primary/50"
                  )}>
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-white/5">
            <Button
              variant="outline"
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
              className="border-white/10 text-slate-300 hover:bg-white/5 h-11 px-6 font-bold uppercase tracking-widest text-xs"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentIdx === examQuestions.length - 1 ? (
              <Button
                onClick={handleSubmitExam}
                disabled={selectedAnswers[currentIdx] === undefined}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 font-black uppercase tracking-widest text-xs glow-primary"
              >
                Submit Verification
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentIdx(currentIdx + 1)}
                disabled={selectedAnswers[currentIdx] === undefined}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 font-bold uppercase tracking-widest text-xs"
              >
                Next Module
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-4">
        <div className="p-2 bg-primary/20 rounded-lg shrink-0">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Security Note:</strong> Engineers are permitted one evaluation runtime loop per month. Achieving a 75% score unlocks priority environment audits.
        </p>
      </div>
    </div>
  );
}
