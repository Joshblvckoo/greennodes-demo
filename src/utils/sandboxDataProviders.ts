/**
 * @fileOverview Refined multi-timeframe mock engine for sandbox operational datasets.
 * Includes dynamic generation logic to bridge live telemetry with dashboard views.
 */

import { generateWhaleTelemetry } from './whaleTrackerGenerator';

export interface ChartPoint {
  label: string;
  amount: number;
}

export interface TimeframeConfig {
  kpiLeakRate: number;
  kpiEfficiency: number;
  kpiCarbon: number;
  points: ChartPoint[];
}

export const trackMetadata: Record<string, { title: string; badgeText: string; badgeColor: string }> = {
  whaleTracker: {
    title: "🐋 WhaleTracker — Orbital Satellite Telemetry Plane",
    badgeText: "ORBITAL GREENOPS PREVIEW",
    badgeColor: "border-blue-900 bg-blue-950 text-blue-300",
  },
  jollofPay: {
    title: "💳 Jollof Pay — Fintech Remittance Engine Grid",
    badgeText: "FINOPS TRANSACTION PREVIEW",
    badgeColor: "border-amber-900 bg-amber-950 text-amber-300",
  },
  odysseyDestinations: {
    title: "✈️ Odyssey Destinations — AI Itinerary Engine RAG Plane",
    badgeText: "AI CORE RUNTIME PREVIEW",
    badgeColor: "border-purple-900 bg-purple-950 text-purple-300",
  }
};

/**
 * Dynamically constructs the active metric parameters for the dashboard
 * by mapping live telemetry values directly into the active timeline view.
 */
export const getLiveTimeframeMetrics = (track: string, timeframe: '7D' | '14D' | 'ALL'): TimeframeConfig => {
  // Pull a live snapshot array from your structural generator engine
  const liveSnapshot = generateWhaleTelemetry(timeframe === '7D' ? 7 : timeframe === '14D' ? 14 : 6);
  
  // Calculate specific weights based on the track focus
  const multiplier = track === 'odysseyDestinations' ? 4.5 : track === 'jollofPay' ? 2.0 : 1.0;
  
  const labels7D = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const labelsAll = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const points = liveSnapshot.map((item, idx) => {
    let rawAmount = item.metrics.computeOverheadKW * 10 * multiplier;
    
    // Enforce the weekend drop logic for 7D and 14D granular views
    if (timeframe === '7D' && (idx === 5 || idx === 6)) rawAmount *= 0.3;
    if (timeframe === '14D' && (idx === 4 || idx === 5 || idx === 11 || idx === 12)) rawAmount *= 0.25;
    
    // Inject the mid-week corporate peak season spike right in the middle
    if (timeframe === '14D' && idx === 7) rawAmount *= 2.8;

    return {
      label: timeframe === '7D' ? labels7D[idx] : timeframe === 'ALL' ? labelsAll[idx] : `D${idx + 1}`,
      amount: Math.floor(rawAmount)
    };
  });

  // Mathematically align total KPI values to the active view array weightings
  const totalLeak = points.reduce((sum, p) => sum + p.amount, 0);
  
  return {
    kpiLeakRate: Math.floor(totalLeak / points.length),
    kpiEfficiency: timeframe === '7D' ? 88.4 : timeframe === '14D' ? 74.2 : 45.1,
    kpiCarbon: parseFloat((liveSnapshot[0].metrics.associatedCarbonIntensity * multiplier).toFixed(1)),
    points
  };
};
