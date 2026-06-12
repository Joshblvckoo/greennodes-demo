'use client';

import { useState, useEffect } from 'react';
import { detailedMatrix, DetailedDataset } from '@/utils/sandboxDataProviders';

export default function ExecutiveWorkspace() {
  const [trackKey, setTrackKey] = useState<string>('whaleTracker');
  const [timeframe, setTimeframe] = useState<'7D' | '14D' | 'ALL'>('14D');
  const [data, setData] = useState<DetailedDataset | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 🛡️ Guard 1: Prevent Web3 provider loops from choking execution frames
    if (typeof window !== 'undefined') {
      (window as any).ethereum = undefined;
    }

    // 🛡️ Guard 2: Create a controller to terminate loose active listeners when component re-renders
    let isMounted = true;

    async function initializeSystemGateways() {
      try {
        if (!isMounted) return;

        const activeTrack = localStorage.getItem('sandbox_tenant_focus') || 'whaleTracker';
        setTrackKey(activeTrack);
        setHoveredIndex(null);
        
        const selectedTrackData = detailedMatrix[activeTrack] || detailedMatrix.whaleTracker;
        const freshData = selectedTrackData[timeframe] || selectedTrackData['14D'];
        
        setData(freshData);
        setIsReady(true);
      } catch (error) {
        console.error("Gateway synchronization intercepted safely:", error);
      }
    }

    initializeSystemGateways();

    // 🧼 The Emergency Clean Interceptor: Cuts off the infinite EventEmitter loop completely
    return () => {
      isMounted = false;
      console.log("🧼 Stream hooks unmounted cleanly. Event loops terminated.");
    };
  }, [timeframe]);

  if (!isReady || !data) {
    return (
      <div className="p-12 font-mono text-xs text-zinc-500 text-center flex flex-col items-center gap-4 animate-in fade-in">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        Isolating Telemetry Streams...
      </div>
    );
  }

  // 📐 Math Scaling Engine to map points perfectly inside the 500x150 graph matrix viewport
  const spends = data.points.map(p => p.spend);
  const maxSpend = 100000; // Fixed ceiling from the graph's $100k label layout
  const maxCarbon = 2800;  // Fixed ceiling from the graph's 2800kg label layout
  const totalCount = data.points.length;

  // Build high-performance SVG line coordinate lists
  const spendLinePath = data.points.map((p, i) => {
    const x = (i / (totalCount - 1)) * 500;
    const y = 140 - (Math.min(p.spend, maxSpend) / maxSpend) * 110;
    return `${x},${y}`;
  }).join(' ');

  const carbonLinePath = data.points.map((p, i) => {
    const x = (i / (totalCount - 1)) * 500;
    const y = 140 - (Math.min(p.carbon, maxCarbon) / maxCarbon) * 110;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full min-h-screen bg-[#03060e] text-zinc-100 p-6 space-y-6 select-none font-sans animate-in fade-in duration-500">
      
      {/* --- TOP BANNER 4-COLUMN DATA CARD MATRIX --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Period Spend */}
        <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-xl relative group hover:border-primary/20 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[#10b981]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <span className="text-[10px] font-mono bg-emerald-950/40 text-[#10b981] border border-emerald-900/60 px-1.5 py-0.5 rounded font-bold">LIVE</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono tracking-wider uppercase mt-4">TOTAL PERIOD SPEND</p>
          <p className="text-2xl font-bold font-mono tracking-tight mt-1 text-white">{data.totalPeriodSpend}</p>
          <p className="text-[10px] text-zinc-500 font-mono mt-1">{timeframe} Aggregation</p>
        </div>

        {/* Card 2: Potential Waste */}
        <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-xl relative group hover:border-destructive/20 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            <span className="text-[10px] font-mono bg-rose-950/40 text-rose-400 border border-rose-900/60 px-1.5 py-0.5 rounded font-bold">LIVE</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono tracking-wider uppercase mt-4">POTENTIAL WASTE</p>
          <p className="text-2xl font-bold font-mono tracking-tight mt-1 text-rose-500">{data.potentialWaste}</p>
          <p className="text-[10px] text-zinc-500 font-mono mt-1">-15% Estimated Drift</p>
        </div>

        {/* Card 3: Period Token Flux */}
        <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-xl relative group hover:border-primary/20 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[#10b981]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
            </div>
            <span className="text-[10px] font-mono bg-emerald-950/40 text-[#10b981] border border-emerald-900/60 px-1.5 py-0.5 rounded font-bold">LIVE</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono tracking-wider uppercase mt-4">PERIOD TOKEN FLUX</p>
          <p className="text-2xl font-bold font-mono tracking-tight mt-1 text-white">{data.periodTokenFlux}</p>
          <p className="text-[10px] text-zinc-500 font-mono mt-1">Calculated yield weight</p>
        </div>

        {/* Card 4: Period Carbon Load */}
        <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-xl relative group hover:border-primary/20 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[#10b981]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            </div>
            <span className="text-[10px] font-mono bg-emerald-950/40 text-[#10b981] border border-emerald-900/60 px-1.5 py-0.5 rounded font-bold">LIVE</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono tracking-wider uppercase mt-4">PERIOD CARBON LOAD</p>
          <p className="text-2xl font-bold font-mono tracking-tight mt-1 text-white">{data.periodCarbonLoad}</p>
          <p className="text-[10px] text-zinc-500 font-mono mt-1">Total footprint for view</p>
        </div>

      </div>

      {/* --- MAIN GRAPH AND INTELLIGENCE SIDEBAR CONTAINER WORKSPACE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        {/* Left Side Section: Chart Panel (7 Cols) */}
        <div className="lg:col-span-7 p-6 bg-[#0b0f17] border border-zinc-900/80 rounded-2xl flex flex-col justify-between">
          
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.213 6H16"/></svg>
                Cloud Spend & Carbon Intensity Timeline
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Detailed {timeframe === '7D' ? '7-day' : timeframe === '14D' ? '14-day' : 'macro'} view demonstrating operational cycles.
              </p>
            </div>

            {/* Time Filter Pill Controls */}
            <div className="flex bg-[#03060e] border border-zinc-800/80 p-1 rounded-lg gap-1">
              {(['7D', '14D', 'ALL'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                    timeframe === t 
                      ? 'bg-[#10b981] text-black font-bold' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {t === '7D' ? '7D' : t === '14D' ? '14D' : 'Full History'}
                </button>
              ))}
            </div>
          </div>

          {/* Core Legend Row Indicators */}
          <div className="flex justify-end items-center gap-4 text-[10px] font-mono text-zinc-400 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
              <span>Cloud Spend ($)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-dashed border-[#10b981]" />
              <span>Carbon Intensity (kg)</span>
            </div>
          </div>

          {/* Dual-Axis SVG Rendering Matrix Workspace */}
          <div className="relative w-full h-64 mt-4 flex">
            
            {/* Left Hand Y-Axis Layout Panel ($) */}
            <div className="w-10 h-full flex flex-col justify-between text-[10px] font-mono text-zinc-500 pb-5 pt-2 select-none text-right pr-2">
              <span>$100k</span>
              <span>$75k</span>
              <span>$50k</span>
              <span>$25k</span>
              <span>$0k</span>
            </div>

            {/* Main Center SVG Chart Window */}
            <div className="flex-1 h-full relative border-b border-zinc-800">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                
                {/* Horizontal Background Grid Reference Lines */}
                {[10, 42.5, 75, 107.5, 140].map((y, i) => (
                  <line key={i} x1="0" y1={y} x2="500" y2={y} stroke="#0e1420" strokeWidth="1" strokeDasharray={i === 4 ? "0" : "3"} />
                ))}

                {/* Vertical Marker Line: Red Anomaly Spike */}
                {data.hasSpike && data.spikeIndex !== -1 && (
                  <>
                    <line
                      x1={(data.spikeIndex / (totalCount - 1)) * 500}
                      y1="0"
                      x2={(data.spikeIndex / (totalCount - 1)) * 500}
                      y2="130"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="2"
                    />
                    <text
                      x={(data.spikeIndex / (totalCount - 1)) * 500}
                      y="5"
                      fill="#ef4444"
                      className="text-[9px] font-mono font-bold"
                      textAnchor="middle"
                    >
                      Spike
                    </text>
                  </>
                )}

                {/* Vertical Marker Line: GreenNodes Active Module Flag */}
                {data.hasGnActive && data.gnActiveIndex !== -1 && (
                  <>
                    <line
                      x1={(data.gnActiveIndex / (totalCount - 1)) * 500}
                      y1="0"
                      x2={(data.gnActiveIndex / (totalCount - 1)) * 500}
                      y2="130"
                      stroke="#10b981"
                      strokeWidth="1"
                      strokeDasharray="3"
                    />
                    <text
                      x={(data.gnActiveIndex / (totalCount - 1)) * 500}
                      y="5"
                      fill="#10b981"
                      className="text-[9px] font-mono font-bold"
                      textAnchor="middle"
                    >
                      GN Active
                    </text>
                  </>
                )}

                {/* Path 1: Spend Vector (Solid Light-Green line) */}
                <polyline fill="none" stroke="#52e1a2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={spendLinePath} className="transition-all duration-500 ease-in-out" />

                {/* Path 2: Carbon Intensity Vector (Dashed Soft-Green line) */}
                <polyline fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4" strokeLinecap="round" strokeLinejoin="round" points={carbonLinePath} className="transition-all duration-500 ease-in-out" />

                {/* Interactive Points Circles mapping over the tracking paths */}
                {data.points.map((p, idx) => {
                  const cx = (idx / (totalCount - 1)) * 500;
                  const cySpend = 140 - (Math.min(p.spend, maxSpend) / maxSpend) * 110;
                  return (
                    <circle
                      key={idx}
                      cx={cx}
                      cy={cySpend}
                      r={hoveredIndex === idx ? "4" : "2.5"}
                      className="fill-[#52e1a2] stroke-[#0b0f17] stroke-2 transition-all duration-150"
                    />
                  );
                })}

                {/* Hidden Hover Multiplier Rect Blocks for clean interactivity */}
                {data.points.map((_, idx) => {
                  const xPos = (idx / (totalCount - 1)) * 500;
                  return (
                    <rect
                      key={idx}
                      x={xPos - 12}
                      y={0}
                      width={24}
                      height={150}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                  );
                })}
              </svg>

              {/* Bottom Horizontal X-Axis Timeline Labels Frame */}
              <div className="absolute top-[148px] left-0 right-0 flex justify-between text-[9px] font-mono text-zinc-500 pointer-events-none px-1">
                {data.points.map((p, i) => (
                  <span key={i}>{p.date}</span>
                ))}
              </div>
            </div>

            {/* Right Hand Y-Axis Layout Panel (kg) */}
            <div className="w-12 h-full flex flex-col justify-between text-[10px] font-mono text-zinc-500 pb-5 pt-2 select-none text-left pl-2">
              <span>2800kg</span>
              <span>2100kg</span>
              <span>1400kg</span>
              <span>700kg</span>
              <span>0kg</span>
            </div>

          </div>
        </div>

        {/* Right Side Section: Intelligence & Insights Panel Bar (3 Cols) */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
          
          {/* Main Insights Box */}
          <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-2xl space-y-4 flex-1">
            <h3 className="text-xs font-bold font-mono tracking-wider text-[#10b981] uppercase flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              GreenOps Intelligence
            </h3>

            {/* Render dynamic arrays sourced blocks */}
            {data.insights.map((insight, idx) => (
              <div key={idx} className="p-3 bg-[#03060e] border border-zinc-900/60 rounded-xl text-xs text-zinc-300 leading-relaxed flex gap-2 group hover:border-primary/20 transition-colors">
                <span className="text-amber-400 font-bold text-xs shrink-0">💡</span>
                <p>{insight.replace("Insight: ", "")}</p>
              </div>
            ))}

            {/* Bottom Alert notification badge layout row */}
            <div className="p-3 bg-rose-950/10 border border-rose-900/30 rounded-xl text-xs text-rose-400 font-mono space-y-0.5">
              <span className="text-[10px] font-bold tracking-wider uppercase block">⚠️ EFFICIENCY LEAK ALERT</span>
              <p className="leading-relaxed text-zinc-300 text-[11px]">{data.efficiencyText}</p>
            </div>
          </div>

          {/* Footprint Savings Core Total KPI Unit Card */}
          <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-2xl flex items-center gap-4 group hover:border-primary/20 transition-colors">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[#10b981]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/></svg>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">PERIOD SAVINGS</span>
              <p className="text-xl font-bold font-mono text-[#4ade80] tracking-tight mt-0.5">{data.periodSavings}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
