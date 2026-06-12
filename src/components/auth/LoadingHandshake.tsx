
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "@/context/SessionContext";
import { Terminal, Cpu, Globe, ShieldCheck, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LogEntry {
  message: string;
  timestamp: string;
}

export default function LoadingHandshake() {
  const { finishLoading } = useSession();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const stepDuration = 1500; // 1.5 seconds per step as requested

  useEffect(() => {
    const script = [
      "Establishing secure OAuth2 handshake with hyper-scalers...",
      "Syncing configuration items with ServiceNow Core Ledger...",
      "Parsing real-time regional grid variables via Visual Studio GSF Engine...",
      "Decrypting token vault balances... Complete."
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < script.length) {
        setLogs(prev => [...prev, {
          message: script[currentIdx],
          timestamp: new Date().toLocaleTimeString()
        }]);
        setProgress(((currentIdx + 1) / script.length) * 100);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(finishLoading, 800);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [finishLoading]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-6 font-code animate-in fade-in duration-500">
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Cpu className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse -z-10" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase flex items-center justify-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              GreenNodes Initialization Engine
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
              Running Diagnostic Optimization Pipeline
            </p>
          </div>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
            <span className="text-[10px] text-muted-foreground ml-2 font-mono uppercase opacity-50">optimization_engine_v4.2.sh</span>
          </div>
          <div 
            ref={scrollRef}
            className="h-64 p-4 overflow-y-auto font-mono text-xs space-y-1.5 selection:bg-primary/30 scroll-smooth"
          >
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-primary/50 opacity-50">[{log.timestamp}]</span>
                <span className={log.message?.includes("Complete") ? "text-primary font-bold" : "text-white/80"}>
                  {log.message}
                </span>
              </div>
            ))}
            <div className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
            <span>Progress: {Math.round(progress)}%</span>
            <span>Security Status: Authenticated</span>
          </div>
          <Progress value={progress} className="h-1.5 bg-white/5" />
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-2 opacity-50">
              <Globe className="text-primary h-3 w-3" />
              <span className="text-[9px] uppercase font-bold text-white">OAuth2 Handshake</span>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <ShieldCheck className="text-primary h-3 w-3" />
              <span className="text-[9px] uppercase font-bold text-white">Ledger Sync</span>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <Zap className="text-primary h-3 w-3" />
              <span className="text-[9px] uppercase font-bold text-white">GSF Engine Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
