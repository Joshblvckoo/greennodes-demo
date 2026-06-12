
"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSession } from "@/context/SessionContext";
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Trophy, 
  BookOpen, 
  RefreshCcw,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateGnrExam, QuizQuestion } from "@/utils/gnrQuizData";

export default function GSFCertificationQuiz({ onAuditClick }: { onAuditClick: () => void }) {
  const { companyName } = useSession();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  
  // Initialize exam pool on mount
  const quizQuestions = useMemo(() => generateGnrExam(), []);

  const currentQuestion = quizQuestions[currentIdx];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentIdx) / totalQuestions) * 100;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswerIndex;
  const passThreshold = 80; // 80% to pass
  const finalScorePercent = Math.round((score / totalQuestions) * 100);
  const passed = finalScorePercent >= passThreshold;

  const handleSelect = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <Card className="glass-card border-none animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto overflow-hidden">
        <div className="bg-primary/10 p-12 text-center space-y-6">
          {passed ? (
            <>
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 border-4 border-primary glow-primary mb-4">
                <Trophy className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Certification Achieved!</h2>
              <div className="p-6 rounded-2xl bg-black/40 border border-primary/30 inline-block">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Official Digital Badge</p>
                <div className="flex items-center gap-2 text-xl font-bold text-white">
                  <ShieldCheck className="text-primary" />
                  {companyName} Certified GreenOps Professional
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                🏆 Outstanding performance! You scored {finalScorePercent}%. Your expertise in FinOps and GreenOps architectures is now verified.
              </p>
              <Button 
                onClick={onAuditClick}
                className="w-full h-14 bg-primary text-primary-foreground font-black uppercase tracking-widest glow-primary text-lg"
              >
                Claim Free 48-Hour Environment Audit
              </Button>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/20 border-4 border-destructive mb-4">
                <BookOpen className="h-12 w-12 text-destructive" />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Evaluation Incomplete</h2>
              <p className="text-xl font-bold text-destructive">Final Score: {finalScorePercent}%</p>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                GreenOps proficiency requires an 80% threshold. Review the core SCI equations and try the challenge again.
              </p>
              <div className="space-y-4 pt-4">
                <Button 
                  onClick={onAuditClick}
                  className="w-full h-14 bg-white text-black font-black uppercase tracking-widest hover:bg-white/90 text-lg shadow-xl"
                >
                  Get Automated Audit Assistance
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetQuiz}
                  className="w-full h-12 border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Restart Exam Handshake
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
          <Award size={12} /> Official Practitioner Challenge
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight">GreenNodes Core <span className="text-primary">Certification</span></h1>
        <p className="text-muted-foreground">Prove your expertise in sustainable architecture to unlock enterprise-tier audits.</p>
      </div>

      <Card className="glass-card border-none overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
              Question {currentIdx + 1} / {totalQuestions}
            </span>
            <Progress value={progress} className="h-2 flex-1 bg-white/5" />
          </div>
          <div className="ml-6 px-3 py-1 bg-black/40 rounded-full border border-white/10 flex items-center gap-2">
            <span className="text-[10px] font-bold text-muted-foreground">SCORE</span>
            <span className="text-xs font-bold font-mono text-primary">{score}</span>
          </div>
        </div>

        <CardContent className="p-8 space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{currentQuestion?.category} MODULE</span>
            <h3 className="text-xl font-bold leading-tight">{currentQuestion?.question}</h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion?.options.map((choice, i) => {
              const isSelected = selectedAnswer === i;
              const isCorrectChoice = i === currentQuestion.correctAnswerIndex;
              
              let variantClasses = "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20";
              if (selectedAnswer !== null) {
                if (isCorrectChoice) variantClasses = "border-primary bg-primary/20 text-primary glow-primary ring-1 ring-primary/50";
                else if (isSelected) variantClasses = "border-destructive bg-destructive/20 text-destructive ring-1 ring-destructive/50";
                else variantClasses = "opacity-40 grayscale pointer-events-none";
              }

              return (
                <button
                  key={i}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    "w-full p-5 rounded-xl text-left font-medium transition-all duration-300 flex items-center justify-between group",
                    variantClasses
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-xs font-bold text-muted-foreground border border-white/10 group-hover:border-primary/50 transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm">{choice}</span>
                  </div>
                  {selectedAnswer !== null && isCorrectChoice && <CheckCircle2 className="h-5 w-5 animate-in zoom-in" />}
                  {selectedAnswer !== null && isSelected && !isCorrectChoice && <XCircle className="h-5 w-5 animate-in zoom-in" />}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 pt-4">
              <Button onClick={nextQuestion} className="w-full h-12 bg-primary text-primary-foreground font-black uppercase tracking-widest glow-primary">
                {currentIdx < totalQuestions - 1 ? "Proceed to Next Module" : "Submit Final Evaluation"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-4">
        <div className="p-2 bg-primary/20 rounded-lg shrink-0">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Security Note:</strong> This evaluation measures your understanding of the GreenNodes Core engine and industry standards (GSF SCI, FinOps Foundation). Passing unlocks a priority 48-hour deep environment audit.
        </p>
      </div>
    </div>
  );
}
