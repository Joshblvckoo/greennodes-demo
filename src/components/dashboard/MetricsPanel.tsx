
'use client';

import { useState, useEffect } from 'react';
import { generateRandomTelemetry, MockTelemetryData } from '@/utils/telemetryGenerator';
import { Activity, RefreshCcw, Cloud, Cpu, AlertCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MetricsPanel() {
  const [telemetryItems, setTelemetryItems] = useState<MockTelemetryData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize the sandbox with random records on execution
  useEffect(() => {
    setTelemetryItems(generateRandomTelemetry(4));
  }, []);

  // Event handler allowing testers to dynamically shift data sets live
  const triggerMetricsShuffle = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTelemetryItems(generateRandomTelemetry(4));
      setIsRefreshing(false);
    }, 600); // Small timeout to mimic a network handshake delay
  };

  return (
    <div className="mt-8 p-6 glass-card border-none rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="text-primary h-5 w-5" />
            Live Sandbox Infrastructure Nodes
          </h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mt-1">
            Simulating active multi-cloud anomalies for Anonymous Tester Session
          </p>
        </div>
        <button 
          onClick={triggerMetricsShuffle}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all duration-150 glow-primary"
        >
          <RefreshCcw className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
          {isRefreshing ? 'Shaking Hands...' : 'Shuffle Telemetry Stream'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {telemetryItems.map((item) => (
          <div key={item.id} className="p-5 bg-black/40 border border-white/5 rounded-xl hover:border-primary/20 transition-colors group">
            <div className="flex justify-between items-start border-b border-white/5 pb-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                    {item.environment}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">{item.id}</span>
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight group-hover:text-primary transition-colors">{item.workloadName}</h3>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter flex items-center gap-1">
                  <Cloud size={10} /> {item.provider}
                </span>
                {item.metrics.idleVariancePercentage > 90 && (
                  <span className="text-[9px] font-bold text-destructive uppercase animate-pulse flex items-center gap-1">
                    <AlertCircle size={9} /> Critical Leak
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Runaway Cost</p>
                  <p className="text-sm font-bold text-destructive">${item.metrics.monthlyWasteRate}/mo</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Idle Variance</p>
                  <p className="text-sm font-bold text-primary">{item.metrics.idleVariancePercentage}%</p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-accent/20 rounded">
                    <Zap size={10} className="text-accent" />
                  </div>
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">GSF Carbon Intensity</span>
                </div>
                <span className="text-xs font-mono font-bold text-accent">{item.metrics.carbonIntensity} <span className="text-[9px] font-normal">gCO2e/hr</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
