'use client';

import { useState, useEffect } from 'react';
import { detailedMatrix, DetailedDataset } from '@/utils/sandboxDataProviders';

export default function ExecutiveWorkspace() {
  const [trackKey, setTrackKey] = useState<string>('whaleTracker');
  const [timeframe, setTimeframe] = useState<'7D' | '14D' | 'ALL'>('14D');
  const [data, setData] = useState<DetailedDataset | null>(null);

  useEffect(() => {
    const activeTrack = localStorage.getItem('sandbox_tenant_focus') || 'whaleTracker';
    setTrackKey(activeTrack);
    
    const selectedTrackData = detailedMatrix[activeTrack] || detailedMatrix.whaleTracker;
    setData(selectedTrackData[timeframe] || selectedTrackData['14D']);
  }, [timeframe]);

  if (!data) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="p-12 font-mono text-xs text-emerald-400 text-center animate-pulse">
        Syncing Grid Telemetry Modules...
      </div>
    </div>
  );

  // 📐 Precise Scaling Metrics for Chart Construction
  const spends = data.points.map(p => p.spend);
  const carbons = data.points.map(p => p.carbon);
  
  const maxSpend = Math.max(...spends, 1000);
  const maxCarbon = Math.max(...carbons, 10);
  const totalCount = data.points.length;

  // Generate coordinate mappings for lines
  const spendLinePath = data.points.map((p, i) => {
    const x = (i / (totalCount - 1)) * 500;
    const y = 130 - (p.spend / maxSpend) * 100;
    return `${x},${y}`;
  }).join(' ');

  const carbonLinePath = data.points.map((p, i) => {
    const x = (i / (totalCount - 1)) * 500;
    const y = 130 - (p.carbon / maxCarbon) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-700">
      
      {/* --- WORKSPACE SUB-HEADER --- */}
      <div className="flex justify-between items-end border-b border-white/5 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Executive Workspace</h1>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-medium">
            Real-time infrastructure intelligence for Global Sandbox Alpha.
          </p>
        </div>
        <button
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-lg transition-all glow-primary"
        >
          Run On-Demand Cloud Scan
        </button>
      </div>

      {/* --- TOP BANNER KPI MATRIX CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-card border border-white/5 rounded-xl relative overflow-hidden group hover:border-primary/20 transition-colors">
          <span className="absolute top-3 right-3 text-[9px] font-mono bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded font-bold">LIVE</span>
          <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">TOTAL PERIOD SPEND</p>
          <p className="text-2xl font-black font-mono mt-2">{data.totalPeriodSpend}</p>
          <p className="text-[9px] text-muted-foreground font-mono mt-1 opacity-50">{timeframe === 'ALL' ? 'Macro Log' : `${timeframe} Aggregation`}</p>
        </div>

        <div className="p-4 bg-card border border-white/5 rounded-xl relative overflow-hidden group hover:border-destructive/20 transition-colors">
          <span className="absolute top-3 right-3 text-[9px] font-mono bg-destructive/10 text-destructive border border-destructive/20 px-1.5 py-0.5 rounded font-bold">LIVE</span>
          <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">POTENTIAL WASTE</p>
          <p className="text-2xl font-black font-mono text-destructive mt-2">{data.potentialWaste}</p>
          <p className="text-[9px] text-muted-foreground font-mono mt-1 opacity-50">-15% Estimated Drift</p>
        </div>

        <div className="p-4 bg-card border border-white/5 rounded-xl relative overflow-hidden group hover:border-primary/20 transition-colors">
          <span className="absolute top-3 right-3 text-[9px] font-mono bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded font-bold">LIVE</span>
          <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">PERIOD TOKEN FLUX</p>
          <p className="text-2xl font-black font-mono text-foreground mt-2">{data.periodTokenFlux}</p>
          <p className="text-[9px] text-muted-foreground font-mono mt-1 opacity-50">Calculated yield weight</p>
        </div>

        <div className="p-4 bg-card border border-white/5 rounded-xl relative overflow-hidden group hover:border-accent/20 transition-colors">
          <span className="absolute top-3 right-3 text-[9px] font-mono bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded font-bold">LIVE</span>
          <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">PERIOD CARBON LOAD</p>
          <p className="text-2xl font-black font-mono text-foreground mt-2">{data.periodCarbonLoad}</p>
          <p className="text-[9px] text-muted-foreground font-mono mt-1 opacity-50">Total footprint for view</p>
        </div>
      </div>

      {/* --- WORKSPACE TIMELINE CONTENT MATRIX --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Deep Detailed Line Canvas Card Block */}
        <div className="lg:col-span-2 p-6 bg-card border border-white/5 rounded-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-widest">
                🔄 Cloud Spend & Carbon Intensity Timeline
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1">
                Detailed {timeframe === '7D' ? '7-day' : timeframe === '14D' ? '14-day' : 'macro multi-month'} view demonstrating operational cycles.
              </p>
            </div>

            {/* Time Filter Toggle Controls */}
            <div className="flex bg-background border border-white/5 p-1 rounded-lg gap-1">
              {(['7D', '14D', 'ALL'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 text-[10px] font-bold font-mono rounded-md transition-all uppercase tracking-tighter ${
                    timeframe === t 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {t === '7D' ? '7D' : t === '14D' ? '14D' : 'History'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Legends Indicator */}
          <div className="flex justify-end gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              <span>Cloud Spend</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-dashed border-primary" />
              <span>Carbon Intensity</span>
            </div>
          </div>

          {/* Graph Output Engine Area */}
          <div className="relative h-64 w-full bg-background/40 rounded-xl border border-white/5 p-4 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
              
              {/* Grid Baseline Renders */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3" className="text-white/5" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3" className="text-white/5" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="currentColor" strokeWidth="1" className="text-white/10" />

              {/* Dynamic RED Anomaly Spike Line Annotation */}
              {data.hasSpike && data.spikeIndex !== -1 && (
                <>
                  <line
                    x1={(data.spikeIndex / (totalCount - 1)) * 500}
                    y1="0"
                    x2={(data.spikeIndex / (totalCount - 1)) * 500}
                    y2="130"
                    stroke="hsl(var(--destructive))"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                  <text
                    x={(data.spikeIndex / (totalCount - 1)) * 500}
                    y="12"
                    fill="hsl(var(--destructive))"
                    className="text-[8px] font-bold uppercase tracking-widest"
                    textAnchor="middle"
                  >
                    SPIKE
                  </text>
                </>
              )}

              {/* Dynamic GREEN GN Active Line Annotation */}
              {data.hasGnActive && data.gnActiveIndex !== -1 && (
                <>
                  <line
                    x1={(data.gnActiveIndex / (totalCount - 1)) * 500}
                    y1="0"
                    x2={(data.gnActiveIndex / (totalCount - 1)) * 500}
                    y2="130"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                  <text
                    x={(data.gnActiveIndex / (totalCount - 1)) * 500}
                    y="12"
                    fill="hsl(var(--primary))"
                    className="text-[8px] font-bold uppercase tracking-widest"
                    textAnchor="middle"
                  >
                    GN ACTIVE
                  </text>
                </>
              )}

              {/* Spend Trendline (Solid Path) */}
              <polyline
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-500 ease-in-out"
                points={spendLinePath}
              />

              {/* Carbon Trendline (Dotted Path) */}
              <polyline
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeDasharray="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-500 ease-in-out opacity-50"
                points={carbonLinePath}
              />

              {/* Interactive Point Node Circles */}
              {data.points.map((p, idx) => {
                const cx = (idx / (totalCount - 1)) * 500;
                const cy = 130 - (p.spend / maxSpend) * 100;
                return (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r="3.5"
                    className="fill-primary stroke-background stroke-2"
                  />
                );
              })}
            </svg>

            {/* Bottom Timeline Axis Mappings */}
            <div className="absolute bottom-1.5 left-4 right-4 flex justify-between text-[9px] font-bold font-mono text-muted-foreground uppercase tracking-widest pointer-events-none">
              {data.points.map((p, i) => (
                <span key={i} className={i % 2 === 0 ? '' : 'hidden sm:inline'}>{p.date}</span>
              ))}
            </div>
          </div>
        </div>

        {/* --- DYNAMIC SIDE PANEL CONTEXT BLOCK --- */}
        <div className="space-y-4">
          <div className="p-6 bg-card border border-white/5 rounded-xl space-y-6">
            <h4 className="text-[10px] font-black tracking-[0.2em] text-primary uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              GreenOps Intelligence
            </h4>

            <div className="space-y-4">
              {data.insights.map((insight, idx) => (
                <div key={idx} className="p-4 bg-background/50 border border-white/5 rounded-xl text-xs text-muted-foreground leading-relaxed">
                  <span className="text-primary font-bold mr-2">💡</span>
                  {insight}
                </div>
              ))}
            </div>

            {/* Efficiency Leak Notification Box */}
            <div className="p-4 bg-destructive/5 border border-destructive/20 text-destructive text-xs rounded-xl font-medium leading-relaxed">
              <span className="font-black block text-[10px] uppercase tracking-widest mb-1.5">⚠️ Efficiency Leak Alert</span>
              {data.efficiencyText}
            </div>
          </div>

          {/* Savings KPI Bar */}
          <div className="p-5 bg-card border border-white/5 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">Period Savings</span>
            <span className="text-xs font-black font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-lg">
              {data.periodSavings}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
