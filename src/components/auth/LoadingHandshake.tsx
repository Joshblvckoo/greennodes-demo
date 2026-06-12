"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/context/SessionContext";
import { Loader2, Terminal, CheckCircle2 } from "lucide-react";

const MESSAGES = [
  "Establishing secure OAuth2 handshake with hyper-scalers...",
  "Syncing configuration items with ServiceNow Core Ledger...",
  "Parsing real-time regional grid variables via Visual Studio GSF Engine...",
  "Decrypting token vault balances... Complete."
];

export default function LoadingHandshake() {
  const { finishLoading } = useSession();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < MESSAGES.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        finishLoading();
      }, 500);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, finishLoading]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6 font-code animate-in fade-in duration-500">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase flex items-center justify-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              Secure System Handshake
            </h2>
            <p className="text-sm text-muted-foreground animate-pulse">
              Initializing GreenNodes Core Environment...
            </p>
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4 shadow-2xl">
          {MESSAGES.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 text-sm transition-all duration-300 ${
                idx < currentStep ? "text-primary opacity-100" : 
                idx === currentStep ? "text-white opacity-100" : "text-white/20 opacity-50"
              }`}
            >
              <div className="mt-0.5">
                {idx < currentStep ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : idx === currentStep ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-current opacity-20" />
                )}
              </div>
              <p className={idx === currentStep ? "font-bold" : ""}>
                {msg}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xs h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out" 
              style={{ width: `${(currentStep / MESSAGES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
