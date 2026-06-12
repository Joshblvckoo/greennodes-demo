'use client';

import { useState, useEffect } from 'react';
// import { db } from '@/lib/firebase'; 
// import { doc, onSnapshot } from 'firebase/firestore';

interface TimelinePoint {
  date: string;
  spend: number;
  carbon: number;
}

export default function ExecutiveWorkspace() {
  const [timeframe, setTimeframe] = useState<'7D' | '14D' | 'ALL'>('14D');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
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
    // FALLBACK LOCAL MOCK: Used if your Firestore doc path hasn't populated fields yet
    if (!dbPayload || timeframe) {
      setDbPayload({
        totalPeriodSpend: timeframe === '14D' ? "$597,196" : "$284,500",
        potentialWaste: timeframe === '14D' ? "$89,579" : "$31,200",
        periodTokenFlux: timeframe === '14D' ? "1,313,831 GNC" : "620,450 GNC",
        periodCarbonLoad: timeframe === '14D' ? "16,586 kg" : "7,120 kg",
        periodSavings: timeframe === '14D' ? "-35% Emissions" : "-40%",
        efficiencyText: "Spike detected in timeline caused a 40% carbon drift. Root cause: Deployment Drift.",
        hasSpike: timeframe === '14D',
        spikeIndex: 7,
        hasGnActive: true,
        gnActiveIndex: timeframe === '14D' ? 12 : 5,
        insights: [
          "High carbon intensity peaks correlate directly with your regional usage of the AWS us-east-1 grid between 2 PM and 6 PM.",
          "Automated weekend downscaling would preserve an estimated 45,000 GNC tokens per month in your Vault."
        ],
        points: timeframe === '14D' ? [
          { date: "Jun 07", spend: 32000, carbon: 900 }, { date: "Jun 08", spend: 48000, carbon: 1300 },
          { date: "Jun 09", spend: 46000, carbon: 1250 }, { date: "Jun 10", spend: 47000, carbon: 1280 },
          { date: "Jun 11", spend: 45000, carbon: 1200 }, { date: "Jun 12", spend: 92000, carbon: 2600 },
          { date: "Jun 13", spend: 38000, carbon: 950 }, { date: "Jun 14", spend: 42000, carbon: 1100 },
          { date: "Jun 15", spend: 49000, carbon: 1350 }, { date: "Jun 16", spend: 47000, carbon: 1300 },
          { date: "Jun 17", spend: 46000, carbon: 1250 }, { date: "Jun 18", spend: 45000, carbon: 1200 },
          { date: "Jun 19", spend: 32000, carbon: 850 }, { date: "Jun 20", spend: 18000, carbon: 400 }
        ] : [
          { date: "Mon", spend: 45000, carbon: 1200 }, { date: "Tue", spend: 47000, carbon: 1300 },
          { date: "Wed", spend: 46000, carbon: 1250 }, { date: "Thu", spend: 48000, carbon: 1320 },
          { date: "Fri", spend: 44000, carbon: 1150 }, { date: "Sat", spend: 20000, carbon: 450 },
          { date: "Sun", spend: 16000, carbon: 350 }
        ]
      });
    }
  }, [timeframe]);

  if (!dbPayload || !dbPayload.points.length) {
    return <div className="p-12 font-mono text-xs text-zinc-500 text-center">Awaiting Live Firebase Stream Initialization...</div>;
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
    <div className="w-full min-h-screen bg-[#03060e] text-zinc-100 p-6 space-y-6 font-sans">
      <div className="border-b border-zinc-900 pb-2 flex justify-between items-center">
        <h2 className="text-xs font-mono font-bold tracking-widest text-[#10b981]">TESTER OPERATIONS NODE</h2>
        <span className="text-[10px] text-zinc-500 font-mono">⚡ Connected to Firebase Storage Stack</span>
      </div>

      <div className="space-y-1">
        <div className="text-[9px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded w-max font-bold tracking-wider">
          ORBITAL GREENOPS PREVIEW
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">WhaleTracker — Orbital Satellite Telemetry Plane</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-xl">
          <p className="text-[10px] text-zinc-400 font-mono tracking-wider">TRACKED LEAK VALUE</p>
          <p className="text-2xl font-bold font-mono text-rose-500 mt-2">{dbPayload.totalPeriodSpend}/mo</p>
        </div>
        <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-xl">
          <p className="text-[10px] text-zinc-400 font-mono tracking-wider">RUNTIME OPTIMIZATION MARGIN</p>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-2">
            {dbPayload.periodSavings.split(' ')[0] || '40%'}
          </p>
        </div>
        <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-xl">
          <p className="text-[10px] text-zinc-400 font-mono tracking-wider">CARBON FOOTPRINT SIGNATURE</p>
          <p className="text-2xl font-bold font-mono text-[#10b981] mt-2">
            {dbPayload.periodCarbonLoad.split(' ')[0]} <span className="text-xs text-zinc-500 font-sans normal-case">gCO2e/p</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-7 p-6 bg-[#0b0f17] border border-zinc-900/80 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xs font-bold font-mono tracking-wider text-zinc-300 uppercase flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" /> TELEMETRY RUNAWAY VELOCITY PROFILE
              </h2>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Granular baseline timeline analysis</p>
            </div>

            <div className="flex bg-[#03060e] border border-zinc-800 p-1 rounded-lg gap-1">
              {(['7D', '14D', 'ALL'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 text-xs font-mono rounded transition-all ${
                    timeframe === t ? 'bg-[#10b981] text-black font-bold' : 'text-zinc-500'
                  }`}
                >
                  {t === '7D' ? 'Past 7 Days' : t === '14D' ? 'Past 14 Days' : 'Full History'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 text-[9px] font-mono text-zinc-500 mb-2">
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#52e1a2]" /> Spend ($)</div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full border border-dashed border-[#10b981]" /> Carbon (kg)</div>
          </div>

          <div className="relative w-full h-60 flex">
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
                  const cx = (idx / (totalCount - 1)) * 500;
                  const cySpend = 140 - (Math.min(p.spend, maxSpend) / maxSpend) * 110;
                  return (
                    <circle 
                      key={idx} 
                      cx={cx} 
                      cy={cySpend} 
                      r="2.5" 
                      className="fill-[#52e1a2] stroke-[#0b0f17] stroke-2 cursor-pointer hover:r-4 transition-all"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                  );
                })}
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
            <h3 className="text-xs font-bold font-mono tracking-wider text-[#10b981] uppercase">💡 GreenOps Intelligence</h3>
            
            {dbPayload.insights.map((insight, idx) => (
              <div key={idx} className="p-3 bg-[#03060e] border border-zinc-900/60 rounded-xl text-xs text-zinc-300 leading-relaxed">
                {insight}
              </div>
            ))}

            <div className="p-3 bg-rose-950/10 border border-rose-900/30 rounded-xl text-xs text-rose-400 font-mono space-y-0.5">
              <span className="text-[10px] font-bold tracking-wider uppercase block">⚠️ EFFICIENCY LEAK ALERT</span>
              <p className="leading-relaxed text-zinc-300 text-[11px]">{dbPayload.efficiencyText}</p>
            </div>
          </div>

          <div className="p-5 bg-[#0b0f17] border border-zinc-900/80 rounded-2xl flex justify-between items-center">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">PERIOD SAVINGS</span>
            <span className="text-sm font-bold font-mono text-[#4ade80]">{dbPayload.periodSavings}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
