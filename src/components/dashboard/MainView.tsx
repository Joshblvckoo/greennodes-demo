'use client';

import { useState, useEffect } from 'react';
import { dataMatrix, DashboardMetricSet } from '@/utils/sandboxDataProviders';

export default function MainView() {
  const [metrics, setMetrics] = useState<DashboardMetricSet>(dataMatrix.general_metrics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTrack = localStorage.getItem('sandbox_tenant_focus');
    if (savedTrack && dataMatrix[savedTrack]) {
      setMetrics(dataMatrix[savedTrack]);
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="text-zinc-500 font-mono text-xs text-center py-12">Building Real-time Vectors...</div>;

  // 📐 Math logic helper to map raw financial leaks into an SVG layout box dimensions (e.g. 500x150)
  const leakValues = metrics.graphData.map(d => d.leakAmount);
  const maxVal = Math.max(...leakValues, 1000);
  const minVal = Math.min(...leakValues, 0);
  const range = maxVal - minVal || 1;

  // Convert array coordinate maps to an SVG line command string
  const svgPointsPath = metrics.graphData.map((d, index) => {
    const xPosition = (index / (metrics.graphData.length - 1)) * 500;
    const yPosition = 130 - ((d.leakAmount - minVal) / range) * 100; // Constrain vertical space bounds cleanly
    return `${xPosition},${yPosition}`;
  }).join(' ');

  return (
    <div className="p-6 bg-zinc-950 text-zinc-100 rounded-xl border border-zinc-800 max-w-4xl mx-auto space-y-6">
      
      {/* --- SECTION 1: HEADER CONTROLS --- */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <div>
          <span className={`text-[10px] font-mono border font-semibold px-2 py-0.5 rounded ${metrics.badgeColor}`}>
            {metrics.badge}
          </span>
          <h2 className="text-xl font-bold mt-2 tracking-tight">{metrics.title}</h2>
        </div>
        <button 
          onClick={() => { 
            localStorage.removeItem('sandbox_tenant_focus');
            window.location.hash = ''; 
          }}
          className="text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-800 px-3 py-1.5 rounded bg-zinc-900 font-medium transition-colors"
        >
          ⚙️ Change Track
        </button>
      </div>

      {/* --- SECTION 2: STATS CARDS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <p className="text-[10px] uppercase font-mono text-zinc-500">Infrastructure Leak Velocity</p>
          <p className="text-2xl font-bold font-mono text-rose-400 mt-1">${metrics.leakRate.toLocaleString()}/mo</p>
        </div>
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <p className="text-[10px] uppercase font-mono text-zinc-500">Resource Operational Efficiency</p>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{metrics.efficiencyPercent}%</p>
        </div>
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <p className="text-[10px] uppercase font-mono text-zinc-500">Carbon Overhead Signature</p>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{metrics.carbonIntensity} gCO2e/p</p>
        </div>
      </div>

      {/* --- 📈 SECTION 3: THE DYNAMIC RUNAWAY WAVE CHART --- */}
      <div className="p-5 bg-zinc-900 rounded-lg border border-zinc-800 space-y-3">
        <div>
          <h3 className="text-xs font-bold text-zinc-300 uppercase font-mono tracking-wider">📊 Telemetry Runaway Velocity Profile</h3>
          <p className="text-[11px] text-zinc-500">Real-time infrastructure waste progression array mapped inside active telemetry window</p>
        </div>

        {/* The Graphic SVG Canvas Context Container */}
        <div className="relative h-40 w-full bg-zinc-950 rounded border border-zinc-800/60 p-2 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
            {/* Soft Grid Horizontal Baseline Guides */}
            <line x1="0" y1="30" x2="500" y2="30" stroke="#27272a" strokeWidth="1" strokeDasharray="4" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="#27272a" strokeWidth="1" strokeDasharray="4" />
            <line x1="0" y1="130" x2="500" y2="130" stroke="#3f3f46" strokeWidth="1" />

            {/* Dynamic Polyline Render Stroke */}
            <polyline
              fill="none"
              stroke="#f43f5e" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={svgPointsPath}
              className="transition-all duration-700 ease-in-out"
            />
          </svg>

          {/* Time axis text mappings */}
          <div className="absolute bottom-1 left-2 right-2 flex justify-between text-[9px] font-mono text-zinc-500">
            {metrics.graphData.map((d, i) => (
              <span key={i}>{d.time}</span>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECTION 4: STREAM EVENT STACK LOGS --- */}
      <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 font-mono text-xs space-y-2">
        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">🛰️ Local Event Handshake Streaming Stack:</p>
        {metrics.telemetryStream.map((log, index) => (
          <div key={index} className="flex justify-between items-center bg-zinc-950 p-2 rounded border border-zinc-800/60">
            <div className="flex items-center gap-2">
              <span className="text-zinc-600">[{log.id}]</span>
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