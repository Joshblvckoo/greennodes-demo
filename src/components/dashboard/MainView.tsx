'use client';

import { useState, useEffect } from 'react';
import { extendedDataMatrix, VerticalMetrics } from '@/utils/sandboxDataProviders';

type Timeframe = '7D' | '14D' | 'ALL';

export default function MainView() {
  const [vertical, setVertical] = useState<VerticalMetrics | null>(null);
  const [timeframe, setTimeframe] = useState<Timeframe>('7D');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTrack = localStorage.getItem('sandbox_tenant_focus');
    const selectedVertical = (savedTrack && extendedDataMatrix[savedTrack]) 
      ? extendedDataMatrix[savedTrack] 
      : extendedDataMatrix.whaleTracker; // Fallback to a valid vertical
    
    setVertical(selectedVertical);
    setLoading(false);
  }, []);

  if (loading || !vertical) {
    return <div className="text-emerald-400 font-mono text-xs text-center py-12 animate-pulse">
      Building Real-time Vectors...
    </div>;
  }

  const currentData = vertical.timeframes[timeframe];
  const points = currentData.points;

  // 📐 SVG path calculation logic
  const values = points.map(p => p.amount);
  const maxVal = Math.max(...values, 1000);
  const minVal = Math.min(...values, 0);
  const range = maxVal - minVal || 1;

  const svgPointsPath = points.map((p, index) => {
    const xPosition = (index / (points.length - 1)) * 500;
    const yPosition = 130 - ((p.amount - minVal) / range) * 100;
    return `${xPosition},${yPosition}`;
  }).join(' ');

  return (
    <div className="p-6 bg-zinc-950 text-zinc-100 rounded-xl border border-zinc-800 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-4 gap-4">
        <div>
          <span className={`text-[10px] font-mono border font-semibold px-2 py-0.5 rounded ${vertical.badgeColor}`}>
            {vertical.badgeText}
          </span>
          <h2 className="text-xl font-bold mt-2 text-white tracking-tight">{vertical.title}</h2>
        </div>
        <div className="flex gap-2">
          {(['7D', '14D', 'ALL'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all border ${
                timeframe === tf 
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tf}
            </button>
          ))}
          <button 
            onClick={() => { window.location.hash = ''; }}
            className="text-[10px] text-zinc-500 hover:text-zinc-300 border border-zinc-800 px-3 py-1.5 rounded bg-zinc-900 font-bold uppercase tracking-widest ml-2"
          >
            Reset
          </button>
        </div>
      </div>

      {/* --- STATS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 group hover:border-rose-900/50 transition-colors">
          <p className="text-[10px] uppercase font-mono text-zinc-500 font-bold tracking-wider">Infrastructure Leak</p>
          <p className="text-2xl font-bold font-mono text-rose-400 mt-1">${currentData.kpiLeakRate.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 group hover:border-amber-900/50 transition-colors">
          <p className="text-[10px] uppercase font-mono text-zinc-500 font-bold tracking-wider">Operational Efficiency</p>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{currentData.kpiEfficiency}%</p>
        </div>
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 group hover:border-emerald-900/50 transition-colors">
          <p className="text-[10px] uppercase font-mono text-zinc-500 font-bold tracking-wider">Carbon Overhead</p>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{currentData.kpiCarbon} <span className="text-xs">gCO2e</span></p>
        </div>
      </div>

      {/* --- CHART --- */}
      <div className="p-5 bg-zinc-900 rounded-lg border border-zinc-800 space-y-3">
        <div>
          <h3 className="text-xs font-bold text-zinc-300 uppercase font-mono tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            Telemetry Runaway Profile — {timeframe} View
          </h3>
        </div>

        <div className="relative h-40 w-full bg-zinc-950 rounded border border-zinc-800/60 p-2 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
            <line x1="0" y1="30" x2="500" y2="30" stroke="#27272a" strokeWidth="1" strokeDasharray="4" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="#27272a" strokeWidth="1" strokeDasharray="4" />
            <line x1="0" y1="130" x2="500" y2="130" stroke="#3f3f46" strokeWidth="1" />

            <polyline
              fill="none"
              stroke="#f43f5e" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={svgPointsPath}
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>

          <div className="absolute bottom-1 left-2 right-2 flex justify-between text-[9px] font-mono text-zinc-500 uppercase">
            {points.map((p, i) => (
              <span key={i} className={i % Math.ceil(points.length / 7) === 0 ? '' : 'hidden sm:inline opacity-30'}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- LOGS --- */}
      <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 font-mono text-xs space-y-2">
        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider opacity-50">Local Handshake streaming...</p>
        {vertical.telemetryStream.map((log, index) => (
          <div key={index} className="flex justify-between items-center bg-zinc-950 p-2 rounded border border-zinc-800/60">
            <div className="flex items-center gap-2">
              <span className="text-zinc-700">[{log.id}]</span>
              <span className="text-zinc-300">{log.event}</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
              log.status === 'OPTIMAL' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
            }`}>
              {log.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
