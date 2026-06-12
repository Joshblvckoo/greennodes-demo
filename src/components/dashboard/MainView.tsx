'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/context/SessionContext';
import { dataMatrix, DashboardMetricSet } from '@/utils/sandboxDataProviders';
import { Activity, RefreshCcw, LogOut, LayoutDashboard, Zap, Trash2, Leaf } from 'lucide-react';

export default function MainView() {
  const { logout } = useSession();
  const [metrics, setMetrics] = useState<DashboardMetricSet>(dataMatrix.general_metrics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Read the use case key selected at the LoginGate screen
    const savedTrack = localStorage.getItem('sandbox_tenant_focus');
    
    // 2. Assign the specific config state if it matches our data matrix keys
    if (savedTrack && dataMatrix[savedTrack]) {
      setMetrics(dataMatrix[savedTrack]);
    } else {
      setMetrics(dataMatrix.general_metrics);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Activity className="h-8 w-8 text-primary animate-pulse" />
        <p className="p-6 text-muted-foreground font-mono text-xs text-center uppercase tracking-widest">
          Configuring Sandbox Instance Layers...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6 gap-4">
        <div>
          <span className={`inline-block text-[10px] font-mono border font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 ${metrics.badgeColor}`}>
            {metrics.badge}
          </span>
          <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            {metrics.title}
          </h2>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('sandbox_tenant_focus');
            logout();
          }}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-white border border-white/10 px-4 py-2 rounded-xl bg-white/5 font-bold uppercase tracking-widest transition-all hover:bg-white/10"
        >
          <LogOut className="h-3.5 w-3.5" />
          Change Track
        </button>
      </div>

      {/* Dynamic Numeric Metric Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-2xl border border-white/5 glow-destructive/10 transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Infrastructure Leak Velocity</p>
            <Trash2 className="h-4 w-4 text-destructive opacity-50" />
          </div>
          <p className="text-3xl font-black font-mono text-destructive tracking-tighter">${metrics.leakRate.toLocaleString()}<span className="text-sm font-normal text-muted-foreground ml-1">/mo</span></p>
          <p className="text-[10px] text-muted-foreground mt-2 font-medium">Estimated monthly financial drift</p>
        </div>
        
        <div className="p-6 bg-card rounded-2xl border border-white/5 transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Operational Efficiency</p>
            <Zap className="h-4 w-4 text-amber-400 opacity-50" />
          </div>
          <p className="text-3xl font-black font-mono text-amber-400 tracking-tighter">{metrics.efficiencyPercent}%</p>
          <p className="text-[10px] text-muted-foreground mt-2 font-medium">Resource utilization weight</p>
        </div>

        <div className="p-6 bg-card rounded-2xl border border-white/5 glow-primary/10 transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Carbon Intensity Signature</p>
            <Leaf className="h-4 w-4 text-primary opacity-50" />
          </div>
          <p className="text-3xl font-black font-mono text-primary tracking-tighter">{metrics.carbonIntensity} <span className="text-xs font-normal text-muted-foreground">gCO2e/p</span></p>
          <p className="text-[10px] text-muted-foreground mt-2 font-medium">GSF-Standardized emission rate</p>
        </div>
      </div>

      {/* Dynamic Event Stream Logs */}
      <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] flex items-center gap-2">
            <RefreshCcw className="h-3 w-3 animate-spin text-primary" />
            Local Event Handshake Streaming Stack
          </p>
          <span className="text-[9px] font-mono text-primary/50">LIVE_TELEMETRY_FEED</span>
        </div>
        <div className="space-y-3">
          {metrics.telemetryStream.map((log, index) => (
            <div key={index} className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5 transition-colors hover:border-white/10 group">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground opacity-50">[{log.id}]</span>
                <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{log.event}</span>
              </div>
              <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest border ${
                log.status === 'OPTIMAL' ? 'bg-primary/10 text-primary border-primary/20' :
                log.status === 'ANOMALY' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 
                'bg-destructive/10 text-destructive border-destructive/20'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
