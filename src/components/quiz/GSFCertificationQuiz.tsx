"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  text: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

const ALL_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What does 'E' represent in the GSF Software Carbon Intensity (SCI) formula S = (E × I) + M?",
    choices: ["Embodied Carbon", "Energy consumed by the software system", "Environmental margin", "Efficiency coefficient"],
    correctIndex: 1,
    explanation: "'E' stands for Energy. The SCI formula measures carbon per functional unit, where energy usage is a primary component."
  },
  {
    id: 2,
    text: "What is the primary unit of measurement for Grid Carbon Intensity ('I')?",
    choices: ["gCO2e/kWh", "kWh/hr", "MWh/USD", "kgCO2/BTU"],
    correctIndex: 0,
    explanation: "Carbon intensity of the grid is measured in grams of CO2 equivalent per kilowatt-hour of energy produced."
  },
  {
    id: 3,
    text: "What does 'Embodied Carbon' (M) refer to in software sustainability metrics?",
    choices: ["Carbon released by flying servers", "The carbon footprint emitted during the manufacturing and disposal of hardware", "Carbon offset credits purchased by hyper-scalers", "Carbon trapped inside data center concrete"],
    correctIndex: 1,
    explanation: "Embodied carbon is the total carbon emitted throughout the lifecycle of the hardware (extraction, manufacturing, transport, disposal)."
  },
  {
    id: 4,
    text: "Which strategy represents 'Demand Shifting' in Green Software engineering?",
    choices: ["Deleting idle databases to save money", "Buying newer, more efficient physical servers", "Running heavy batch computing workloads during times or in regions where the grid relies on cleaner, renewable energy sources", "Increasing your monthly subscription tier"],
    correctIndex: 2,
    explanation: "Demand shifting involves moving workloads in time or space to match periods of high renewable energy availability."
  },
  {
    id: 5,
    text: "What is PUE in data center infrastructure management?",
    choices: ["Power Usage Effectiveness", "Public Utility Emissions", "Peak Utilization Engine", "Predictive Utilization Estimate"],
    correctIndex: 0,
    explanation: "PUE is a ratio that describes how efficiently a computer data center uses energy; specifically, how much energy is used by the computing equipment."
  },
  {
    id: 6,
    text: "If an infrastructure asset is tagged as a 'Zombie Resource', its CPU utilization is typically near what threshold?",
    choices: ["80% to 90%", "40% to 50%", "Less than 5%", "Exactly 0% only"],
    correctIndex: 2,
    explanation: "Zombie resources are idle or nearly idle assets, typically exhibiting less than 5% utilization while still consuming significant power."
  }
];

export default function GSFCertificationQuiz({ onAuditClick }: { onAuditClick: () => void }) {
  const { companyName } = useSession();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  
  // Randomly select 5 questions once per session component mount
  const quizQuestions = useMemo(() => {
    return [...ALL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
  }, []);

  const currentQuestion = quizQuestions[currentIdx];
  const progress = ((currentIdx) / quizQuestions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;
  const passThreshold = 80; // 4 out of 5
  const finalScorePercent = (score / quizQuestions.length) * 100;
  const passed = finalScorePercent >= passThreshold;

  const handleSelect = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < quizQuestions.length - 1) {
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
                  {companyName} Certified GreenOps Associate
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                🏆 Certificate Unlocked! You scored {finalScorePercent}%. Now let&apos;s apply your knowledge to your actual architecture.
              </p>
              <Button 
                onClick={onAuditClick}
                className="w-full h-14 bg-primary text-primary-foreground font-black uppercase tracking-widest glow-primary text-lg"
              >
                Claim Free 48-Hour Audit
              </Button>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/20 border-4 border-destructive mb-4">
                <BookOpen className="h-12 w-12 text-destructive" />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Nice Try!</h2>
              <p className="text-xl font-bold text-destructive">Score: {finalScorePercent}%</p>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                GreenOps scaling can be tough. Don&apos;t worry—let our automation do the heavy lifting for you. 
              </p>
              <div className="space-y-4 pt-4">
                <Button 
                  onClick={onAuditClick}
                  className="w-full h-14 bg-white text-black font-black uppercase tracking-widest hover:bg-white/90 text-lg"
                >
                  Get Automated Audit Blueprint
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetQuiz}
                  className="w-full h-12 border-white/10 hover:bg-white/5"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Retry Challenge
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black uppercase tracking-tight">GSF Practitioner <span className="text-primary">Challenge</span></h1>
        <p className="text-muted-foreground">Prove your expertise in GreenOps engineering to unlock your certification.</p>
      </div>

      <Card className="glass-card border-none overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Question {currentIdx + 1} of 5</span>
            <Progress value={progress} className="h-2 flex-1 bg-white/5" />
          </div>
          <div className="ml-6 px-3 py-1 bg-primary/20 rounded-full border border-primary/30 flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-primary" />
            <span className="text-xs font-bold font-mono text-primary">{score}/5</span>
          </div>
        </div>

        <CardContent className="p-8 space-y-8">
          <h3 className="text-xl font-bold leading-tight">{currentQuestion.text}</h3>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.choices.map((choice, i) => {
              const isSelected = selectedAnswer === i;
              const isCorrectChoice = i === currentQuestion.correctIndex;
              
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
                    "w-full p-4 rounded-xl text-left font-medium transition-all duration-300 flex items-center justify-between group",
                    variantClasses
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-xs font-bold text-muted-foreground border border-white/10">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {choice}
                  </div>
                  {selectedAnswer !== null && isCorrectChoice && <CheckCircle2 className="h-5 w-5" />}
                  {selectedAnswer !== null && isSelected && !isCorrectChoice && <XCircle className="h-5 w-5" />}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <span className="text-primary flex items-center gap-1">
                    <CheckCircle2 size={16} /> Correct!
                  </span>
                ) : (
                  <span className="text-destructive flex items-center gap-1">
                    <XCircle size={16} /> Incorrect
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                {currentQuestion.explanation}
              </p>
              <Button onClick={nextQuestion} className="w-full bg-primary text-primary-foreground font-bold">
                {currentIdx < quizQuestions.length - 1 ? "Next Question" : "View Results"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
