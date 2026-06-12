"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "@/context/SessionContext";
import { Terminal, Cpu, Globe, ShieldCheck, Zap, Layers } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function LoadingHandshake() {
  const { finishLoading } = useSession();
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Dynamic duration logic: 10-15 seconds
  const totalDuration = useRef(10000 + Math.random() * 5000);
  const zombieAssets = useRef(Math.floor(Math.random() * 12) + 3);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / totalDuration.current) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(finishLoading, 800);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [finishLoading]);

  useEffect(() => {
    const assetLines = Array.from({ length: zombieAssets.current }).map(() => {
      const id = Math.random().toString(36).substring(2, 10);
      const cpu = (Math.random() * 4).toFixed(1);
      return `[AUDIT] Asset ID i-${id} has a CPU utilization of ${cpu}%. Flagged as Zombie.`;
    });

    const script = [
      "[INIT] Establishing authenticated handshake via Firebase auth tokens...",
      "[AUTH] JWT validated with Google Identity Platform.",
      "[SCANNING] Pinging regional cloud clusters (us-east-1, eu-west-1, asia-east-1)...",
      ...assetLines,
      "[GSF ENGINE] Computing SCI score: S = (E * I) + M...",
      "[ANALYSIS] Decoupling carbon intensity from infrastructure spend...",
      "[SYNC] Writing immutable state ledger back to ServiceNow Core tables...",
      "[SYNC] Complete. Session ready."
    ];

    let currentLogIdx = 0;
    const logInterval = setInterval(() => {
      if (currentLogIdx < script.length) {
        setLogs(prev => [...prev, script[currentLogIdx]]);
        currentLogIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, totalDuration.current / (script.length + 2));

    return () => clearInterval(logInterval);
  }, []);

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
                <span className="text-primary/50 opacity-50">[{new Date().toLocaleTimeString()}]</span>
                <span className={log.includes("Flagged as Zombie") ? "text-destructive" : log.includes("Complete") ? "text-primary font-bold" : "text-white/80"}>
                  {log}
                </span>
              </div>
            ))}
            <div className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
            <span>Progress: {Math.round(progress)}%</span>
            <span>Latency: {Math.round(totalDuration.current / 100)}ms</span>
          </div>
          <Progress value={progress} className="h-1.5 bg-white/5" />
          <div className="grid grid-cols-3 gap-4 pt-2">
            <StatusIcon icon={<Globe />} label="Clusters" status="Live" />
            <StatusIcon icon={<ShieldCheck />} label="Vault" status="Secured" />
            <StatusIcon icon={<Zap />} label="GSF" status="Optimizing" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ icon, label, status }: { icon: React.ReactNode, label: string, status: string }) {
  return (
    <div className="flex items-center gap-2 opacity-50">
      <div className="p-1.5 bg-white/5 rounded text-primary">
        {React.cloneElement(icon as React.ReactElement, { size: 12 })}
      </div>
      <div className="text-[9px] uppercase font-bold tracking-tighter">
        <span className="text-muted-foreground block">{label}</span>
        <span className="text-white">{status}</span>
      </div>
    </div>
  );
}