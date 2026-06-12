/**
 * @fileOverview Unified mock engine matrix for sandbox operational datasets.
 * Aggregates target metrics for specific industry use cases.
 */

export interface GraphDataPoint {
  time: string;
  leakAmount: number;
}

export interface DashboardMetricSet {
  title: string;
  badge: string;
  badgeColor: string;
  leakRate: number;
  efficiencyPercent: number;
  carbonIntensity: number;
  telemetryStream: { id: string; event: string; status: string }[];
  // 📈 Add this new chart vector array
  graphData: GraphDataPoint[];
}

export const dataMatrix: Record<string, DashboardMetricSet> = {
  general_metrics: {
    title: "Global Enterprise Overview Workspace",
    badge: "GENERAL TESTER PROFILE",
    badgeColor: "border-emerald-900 bg-emerald-950 text-emerald-300",
    leakRate: 4890,
    efficiencyPercent: 78.4,
    carbonIntensity: 45.2,
    telemetryStream: [
      { id: "SYS-01", event: "Standard Core Sync Completed", status: "OPTIMAL" },
      { id: "SYS-02", event: "Global Database Node Refresh Loop", status: "OPTIMAL" }
    ],
    graphData: [
      { time: "09:00", leakAmount: 4200 },
      { time: "10:00", leakAmount: 4600 },
      { time: "11:00", leakAmount: 4500 },
      { time: "12:00", leakAmount: 4890 }
    ]
  },
  whaleTracker: {
    title: "🐋 WhaleTracker — Orbital Satellite Telemetry Plane",
    badge: "ORBITAL GREENOPS PREVIEW",
    badgeColor: "border-blue-900 bg-blue-950 text-blue-300",
    leakRate: 14230,
    efficiencyPercent: 42.1,
    carbonIntensity: 1.4,
    telemetryStream: [
      { id: "SAT-SVALBARD", event: "Ground Station Alpha Processing Idle Waves", status: "ANOMALY" },
      { id: "SAT-AZORES", event: "Downlink Route Shifted to Clean Energy Grid", status: "OPTIMAL" }
    ],
    graphData: [
      { time: "09:00", leakAmount: 8500 },
      { time: "10:00", leakAmount: 11200 },
      { time: "11:00", leakAmount: 16400 },
      { time: "12:00", leakAmount: 14230 }
    ]
  },
  jollofPay: {
    title: "💳 Jollof Pay — Fintech Remittance Engine Grid",
    badge: "FINOPS TRANSACTION PREVIEW",
    badgeColor: "border-amber-900 bg-amber-950 text-amber-300",
    leakRate: 28400,
    efficiencyPercent: 89.7,
    carbonIntensity: 34.1,
    telemetryStream: [
      { id: "DB-LAGOS-01", event: "Secondary Validation Cluster Idle Bleed Detected", status: "CRITICAL" },
      { id: "DB-LONDON-02", event: "Automated Compute Compression Hooks Armed", status: "OPTIMAL" }
    ],
    graphData: [
      { time: "09:00", leakAmount: 12000 },
      { time: "10:00", leakAmount: 19500 },
      { time: "11:00", leakAmount: 31000 },
      { time: "12:00", leakAmount: 28400 }
    ]
  },
  odysseyDestinations: {
    title: "✈️ Odyssey Destinations — AI Itinerary Engine RAG Plane",
    badge: "AI CORE RUNTIME PREVIEW",
    badgeColor: "border-purple-900 bg-purple-950 text-purple-300",
    leakRate: 64100,
    efficiencyPercent: 31.5,
    carbonIntensity: 124.8,
    telemetryStream: [
      { id: "GPU-NODE-ALPHA", event: "HNN Trajectory Array Drawing Idle Capacity", status: "ANOMALY" },
      { id: "RAG-VECTOR-01", event: "Context Ingestion Buffer Compressing Dynamically", status: "OPTIMAL" }
    ],
    graphData: [
      { time: "09:00", leakAmount: 45000 },
      { time: "10:00", leakAmount: 52000 },
      { time: "11:00", leakAmount: 78000 },
      { time: "12:00", leakAmount: 64100 }
    ]
  }
};
