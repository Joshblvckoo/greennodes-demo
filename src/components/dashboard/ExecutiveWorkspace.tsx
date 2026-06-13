'use client';

import { useState, useEffect } from 'react';
import { detailedMatrix, DetailedDataset } from '@/utils/sandboxDataProviders';

interface TimelinePoint {
  date: string;
  spend: number;
  carbon: number;
}

export default function ExecutiveWorkspace() {
  const [timeframe, setTimeframe] = useState<'7D' | '14D' | 'ALL'>('14D');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  const [dbPayload, setDbPayload] = useState<{
    totalPeriodSpend: string;
    potentialWaste: string;
    periodTokenFlux: string;
    periodCarbonLoad: string;
    periodSavings: string;
    efficiencyText: string;
    hasSpike: boolean;
    spikeIndex: number;
    hasGnActive: boolean;
    gnActiveIndex: number;
    insights: string[];
    points: TimelinePoint[];
  } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).ethereum = undefined; 
    }

    const controller = new AbortController();
    let isMounted = true;

    async function initializeSystemGateways() {
      try {
        if (!isMounted) return;
        
        const activeTrack = localStorage.getItem('sandbox_tenant_focus') || 'whaleTracker';
        const selectedTrackData = detailedMatrix[activeTrack] || detailedMatrix.whaleTracker;
        const currentData = selectedTrackData[timeframe] || selectedTrackData['14D'];

        setDbPayload({
          totalPeriodSpend: currentData.totalPeriodSpend,
          potentialWaste: currentData.potentialWaste,
          periodTokenFlux: currentData.periodTokenFlux,
          periodCarbonLoad: currentData.periodCarbonLoad,
          periodSavings: currentData.periodSavings,
          efficiencyText: currentData.efficiencyText,
          hasSpike: currentData.hasSpike,
          spikeIndex: currentData.spikeIndex,
          hasGnActive: currentData.hasGnActive,
          gnActiveIndex: currentData.gnActiveIndex,
          insights: currentData.insights,
          points: currentData.points.map(p => ({
            date: p.date,
            spend: p.spend,
            carbon: p.carbon
          }))
        });

        setIsReady(true);
      } catch (error) {
        console.error("Gateway synchronization intercepted safely:", error);
      }
    }

    initializeSystemGateways();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [timeframe]);

  if (!isReady || !dbPayload || !dbPayload.points.length) {
    return <div className="p-12 font-mono text-xs text-zinc-500 text-center animate-pulse">Syncing Core Telemetry Planes...</div>;
  }

  const maxSpend = 100000;
  const maxCarbon = 2800;
  const totalCount = dbPayload.points.length;

  const spendPath = dbPayload.points.map((p, i) => {
    const x = (i / (totalCount - 1)) * 500;
    const y = 140 - (Math.min(p.spend, maxSpend) / maxSpend) * 110;
    return `${x},${y}`;
  }).join(' ');

  const carbonPath = dbPayload.points.map((p, i) => {
    const x = (i / (totalCount - 1)) * 500;
    const y = 140 - (Math.min(p.carbon, maxCarbon) / maxCarbon) * 110;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full min-h-screen bg-[#03060e] text-zinc-100 p-6 space-y-6 font-sans select-none animate-in fade-in duration-500">
      
      <div className="border-b border-zinc-900 pb-2 flex justify-between items-center">
        <h2 className="text-xs font-mono font-bold tracking-widest text-[#10b981]">OPERATIONS NODE</h2>
        <span className="text-[10px] text-zinc-500 font-mono tracking-wider">⚡ MULTI-CLOUD TELEMETRY ACTIVE</span>
      </div>

      {/* KPI METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-xl group hover:border-rose-900/40 transition-colors">
          <p className="text-[10px] text-zinc-400 font-mono tracking-wider">TRACKED LEAK VALUE</p>
          <p className="text-2xl font-bold font-mono text-rose-500 mt-2">{dbPayload.totalPeriodSpend}</p>
        </div>
        <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-xl group hover:border-emerald-900/40 transition-colors">
          <p className="text-[10px] text-zinc-400 font-mono tracking-wider">RUNTIME OPTIMIZATION MARGIN</p>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-2">
            {dbPayload.periodSavings.split(' ')[0]}
          </p>
        </div>
        <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-xl group hover:border-primary/40 transition-colors">
          <p className="text-[10px] text-zinc-400 font-mono tracking-wider">CARBON FOOTPRINT SIGNATURE</p>
          <p className="text-2xl font-bold font-mono text-[#10b981] mt-2">
            {dbPayload.periodCarbonLoad.split(' ')[0]} <span className="text-xs text-zinc-500 font-sans normal-case">gCO2e/p</span>
          </p>
        </div>
      </div>

      {/* CHART & INTELLIGENCE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        <div className="lg:col-span-7 p-6 bg-[#0b0f17] border border-zinc-900/80 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xs font-bold font-mono tracking-wider text-zinc-300 uppercase flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" /> TELEMETRY VELOCITY PROFILE
              </h2>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Real-time baseline optimization timeline</p>
            </div>

            <div className="flex bg-[#03060e] border border-zinc-800 p-1 rounded-lg gap-1">
              {(['7D', '14D', 'ALL'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 text-[10px] font-mono rounded transition-all ${
                    timeframe === t ? 'bg-[#10b981] text-black font-bold' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 text-[9px] font-mono text-zinc-500 mb-4">
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#52e1a2]" /> Spend ($)</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full border border-dashed border-[#10b981]" /> Carbon (kg)</div>
          </div>

          <div className="relative w-full h-64 flex">
            <div className="w-10 h-full flex flex-col justify-between text-[10px] font-mono text-zinc-600 text-right pr-2 pb-6">
              <span>$100k</span><span>$75k</span><span>$50k</span><span>$25k</span><span>$0k</span>
            </div>

            <div className="flex-1 h-full relative border-b border-zinc-800">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                {[10, 42.5, 75, 107.5, 140].map((yVal, i) => (
                  <line key={i} x1="0" y1={yVal} x2="500" y2={yVal} stroke="#0e1420" strokeWidth="1" strokeDasharray={i === 4 ? "0" : "3"} />
                ))}

                {dbPayload.hasSpike && dbPayload.spikeIndex !== -1 && (
                  <>
                    <line x1={(dbPayload.spikeIndex / (totalCount - 1)) * 500} y1="10" x2={(dbPayload.spikeIndex / (totalCount - 1)) * 500} y2="140" stroke="#ef4444" strokeWidth="1.2" />
                    <text x={(dbPayload.spikeIndex / (totalCount - 1)) * 500} y="5" fill="#ef4444" className="text-[9px] font-mono font-bold" textAnchor="middle">Spike</text>
                  </>
                )}

                {dbPayload.hasGnActive && dbPayload.gnActiveIndex !== -1 && (
                  <>
                    <line x1={(dbPayload.gnActiveIndex / (totalCount - 1)) * 500} y1="10" x2={(dbPayload.gnActiveIndex / (totalCount - 1)) * 500} y2="140" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3" />
                    <text x={(dbPayload.gnActiveIndex / (totalCount - 1)) * 500} y="5" fill="#10b981" className="text-[9px] font-mono font-bold" textAnchor="middle">GN Active</text>
                  </>
                )}

                <polyline fill="none" stroke="#52e1a2" strokeWidth="2.5" points={spendPath} strokeLinecap="round" strokeLinejoin="round" />
                <polyline fill="none" stroke="#10b981" strokeWidth="1.2" strokeDasharray="4" points={carbonPath} strokeLinecap="round" strokeLinejoin="round" />

                {dbPayload.points.map((p, idx) => {
                  const x = (idx / (totalCount - 1)) * 500;
                  const y = 140 - (Math.min(p.spend, maxSpend) / maxSpend) * 110;
                  return (
                    <circle key={idx} cx={x} cy={y} r={hoveredIndex === idx ? "4" : "2.5"} className="fill-[#52e1a2] stroke-[#0b0f17] stroke-2 transition-all duration-150" />
                  );
                })}

                {dbPayload.points.map((p, idx) => (
                  <rect
                    key={idx}
                    x={(idx / (totalCount - 1)) * 500 - 15}
                    y={0}
                    width={30}
                    height={150}
                    fill="transparent"
                    className="cursor-crosshair"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </svg>

              <div className="absolute top-[146px] left-0 right-0 flex justify-between text-[9px] font-mono text-zinc-600 px-1 pointer-events-none">
                {dbPayload.points.map((p, i) => <span key={i}>{p.date}</span>)}
              </div>
            </div>

            <div className="w-12 h-full flex flex-col justify-between text-[10px] font-mono text-zinc-600 pl-2 pb-6">
              <span>2800kg</span><span>2100kg</span><span>1400kg</span><span>700kg</span><span>0kg</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
          <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-2xl space-y-4 flex-1">
            <h3 className="text-xs font-bold font-mono tracking-wider text-[#10b981] uppercase flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              Intelligence
            </h3>
            
            {dbPayload.insights.map((insight, idx) => (
              <div key={idx} className="p-3 bg-[#03060e] border border-zinc-900/60 rounded-xl text-xs text-zinc-300 leading-relaxed group hover:border-emerald-900/40 transition-colors">
                {insight}
              </div>
            ))}

            <div className="p-3 bg-rose-950/10 border border-rose-900/30 rounded-xl text-xs text-rose-400 font-mono space-y-0.5">
              <span className="text-[10px] font-bold tracking-wider uppercase block">⚠️ EFFICIENCY LEAK</span>
              <p className="leading-relaxed text-zinc-300 text-[11px]">{dbPayload.efficiencyText}</p>
            </div>
          </div>

          <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-2xl flex justify-between items-center group hover:border-emerald-900/40 transition-colors">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">PERIOD SAVINGS</span>
            <span className="text-sm font-bold font-mono text-[#4ade80]">{dbPayload.periodSavings}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
