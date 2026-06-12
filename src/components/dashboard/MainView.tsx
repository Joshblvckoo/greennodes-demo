'use client';

import { useState, useEffect } from 'react';
import { getLiveTimeframeMetrics, trackMetadata, TimeframeConfig } from '@/utils/sandboxDataProviders';

type TimeframeKey = '7D' | '14D' | 'ALL';

export default function MainView() {
  const [activeTrack, setActiveTrack] = useState<string>('whaleTracker');
  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeKey>('7D');
  const [dashboardData, setDashboardData] = useState<TimeframeConfig | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Trigger state evaluation whenever the user swaps the track OR alters the time filter
  useEffect(() => {
    const savedTrack = localStorage.getItem('sandbox_tenant_focus') || 'whaleTracker';
    setActiveTrack(savedTrack);
    
    // Generate fresh, context-aware telemetry aligned to the active time filter
    const freshMetrics = getLiveTimeframeMetrics(savedTrack, activeTimeframe);
    setDashboardData(freshMetrics);
  }, [activeTrack, activeTimeframe]);

  if (!dashboardData) {
    return (
      <div className="p-6 bg-zinc-950 text-zinc-500 font-mono text-xs text-center py-24 border border-zinc-800 rounded-xl">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          Ingesting Live Operational Signals...
        </div>
      </div>
    );
  }

  const currentMetadata = trackMetadata[activeTrack] || trackMetadata.whaleTracker;

  // 📐 Math logic helper to map raw financial leaks into an SVG layout box dimensions
  const amounts = dashboardData.points.map(p => p.amount);
  const maxVal = Math.max(...amounts, 1000);
  const minVal = Math.min(...amounts, 0);
  const range = maxVal - minVal || 1;

  const svgPointsPath = dashboardData.points.map((p, index) => {
    const x = (index / (dashboardData.points.length - 1)) * 500;
    const y = 130 - ((p.amount - minVal) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="p-6 bg-zinc-950 text-zinc-100 rounded-xl border border-zinc-800 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
      
      {/* Header Context Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-4 gap-4">
        <div>
          <span className={`text-[10px] font-mono border font-semibold px-2 py-0.5 rounded ${currentMetadata.badgeColor}`}>
            {currentMetadata.badgeText}
          </span>
          <h2 className="text-xl font-bold mt-2 text-white">{currentMetadata.title}</h2>
        </div>
        
        {/* ⏱️ Dynamic Filter Switch Toggles */}
        <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-lg self-start">
          {(['7D', '14D', 'ALL'] as TimeframeKey[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all duration-200 ${
                activeTimeframe === tf 
                  ? 'bg-emerald-600 text-white font-bold shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tf === '7D' ? 'Past 7 Days' : tf === '14D' ? 'Past 14 Days' : 'Full History'}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic KPI Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 group hover:border-rose-900/50 transition-colors shadow-sm">
          <p className="text-[10px] uppercase font-mono text-zinc-500 font-bold">Tracked Leak Value</p>
          <p className="text-2xl font-bold font-mono text-rose-400 mt-1">
            ${dashboardData.kpiLeakRate.toLocaleString()}/mo
          </p>
        </div>
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 group hover:border-amber-900/50 transition-colors shadow-sm">
          <p className="text-[10px] uppercase font-mono text-zinc-500 font-bold">Runtime Optimization Margin</p>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-1">
            {dashboardData.kpiEfficiency}%
          </p>
        </div>
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 group hover:border-emerald-900/50 transition-colors shadow-sm">
          <p className="text-[10px] uppercase font-mono text-zinc-500 font-bold">Carbon Footprint Signature</p>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            {dashboardData.kpiCarbon} <span className="text-xs font-sans">gCO2e/p</span>
          </p>
        </div>
      </div>

      {/* Interactive Chart Workspace */}
      <div className="p-5 bg-zinc-900 rounded-lg border border-zinc-800 space-y-4 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xs font-bold text-zinc-300 uppercase font-mono tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Telemetry Runaway Velocity Profile
            </h3>
            <p className="text-[11px] text-zinc-500">
              {activeTimeframe === 'ALL' ? 'Aggregated monthly business cycles' : 'Granular baseline timeline analysis'}
            </p>
          </div>
          
          {/* Interactive Custom Tooltip In-UI Display */}
          {hoveredIndex !== null && dashboardData.points[hoveredIndex] && (
            <div className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded text-right font-mono text-xs text-zinc-300 animate-in fade-in slide-in-from-right-2">
              <span className="text-zinc-500 text-[10px] mr-2">[{dashboardData.points[hoveredIndex].label}]:</span>
              <span className="text-rose-400 font-bold">${dashboardData.points[hoveredIndex].amount.toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className="relative h-44 w-full bg-zinc-950 rounded border border-zinc-800/60 p-2 overflow-hidden shadow-inner">
          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
            {/* Background Grid Lines */}
            <line x1="0" y1="30" x2="500" y2="30" stroke="#18181b" strokeWidth="1" strokeDasharray="3" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="#18181b" strokeWidth="1" strokeDasharray="3" />
            <line x1="0" y1="130" x2="500" y2="130" stroke="#27272a" strokeWidth="1" />

            {/* Smooth-morphing Polyline */}
            <polyline
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500 ease-in-out"
              points={svgPointsPath}
            />

            {/* Hidden Hover Interactive Triggers */}
            {dashboardData.points.map((p, index) => {
              const cx = (index / (dashboardData.points.length - 1)) * 500;
              return (
                <rect
                  key={index}
                  x={cx - (500 / dashboardData.points.length / 2)}
                  y={0}
                  width={500 / dashboardData.points.length}
                  height={150}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>

          {/* Time axis text mappings */}
          <div className="absolute bottom-1 left-2 right-2 flex justify-between text-[9px] font-mono text-zinc-500 pointer-events-none uppercase opacity-50">
            {dashboardData.points.map((p, i) => (
              <span key={i} className={i % Math.ceil(dashboardData.points.length / 6) === 0 ? '' : 'hidden sm:inline'}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          onClick={() => { 
            localStorage.removeItem('sandbox_tenant_focus');
            window.location.hash = ''; 
          }}
          className="text-[10px] text-zinc-500 hover:text-zinc-300 border border-zinc-800 px-3 py-1.5 rounded bg-zinc-900 font-bold uppercase tracking-widest transition-all shadow-sm"
        >
          Reset Session Node
        </button>
      </div>

    </div>
  );
}
