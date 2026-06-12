/**
 * @fileOverview Refined multi-timeframe mock engine for sandbox operational datasets.
 * Includes curated coordinate lines for 7D, 14D, and Macro history.
 */

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

export interface VerticalMetrics {
  title: string;
  badgeColor: string;
  badgeText: string;
  timeframes: {
    '7D': TimeframeConfig;
    '14D': TimeframeConfig;
    'ALL': TimeframeConfig;
  };
  telemetryStream: { id: string; event: string; status: string }[];
}

export const extendedDataMatrix: Record<string, VerticalMetrics> = {
  whaleTracker: {
    title: "🐋 WhaleTracker — Orbital Satellite Telemetry Plane",
    badgeColor: "border-blue-900 bg-blue-950 text-blue-300",
    badgeText: "ORBITAL GREENOPS PREVIEW",
    telemetryStream: [
      { id: "SAT-SVALBARD", event: "Ground Station Alpha Processing Idle Waves", status: "ANOMALY" },
      { id: "SAT-AZORES", event: "Downlink Route Shifted to Clean Energy Grid", status: "OPTIMAL" }
    ],
    timeframes: {
      '7D': {
        kpiLeakRate: 4230,
        kpiEfficiency: 76.2,
        kpiCarbon: 1.2,
        points: [
          { label: "Mon", amount: 4100 }, { label: "Tue", amount: 4300 }, 
          { label: "Wed", amount: 4500 }, { label: "Thu", amount: 4400 }, 
          { label: "Fri", amount: 4200 }, { label: "Sat", amount: 1500 }, { label: "Sun", amount: 1200 }
        ]
      },
      '14D': {
        kpiLeakRate: 8940,
        kpiEfficiency: 68.5,
        kpiCarbon: 1.8,
        points: [
          { label: "D1", amount: 3900 }, { label: "D2", amount: 4100 }, { label: "D3", amount: 4000 },
          { label: "D4", amount: 1200 }, { label: "D5", amount: 1100 }, 
          { label: "D6", amount: 4200 }, { label: "D7", amount: 4300 }, { label: "D8", amount: 9800 }, 
          { label: "D9", amount: 4400 }, { label: "D10", amount: 4500 }, { label: "D11", amount: 4100 },
          { label: "D12", amount: 4230 }, { label: "D13", amount: 1400 }, { label: "D14", amount: 1300 }
        ]
      },
      'ALL': {
        kpiLeakRate: 14230,
        kpiEfficiency: 42.1,
        kpiCarbon: 2.4,
        points: [
          { label: "Jan", amount: 24500 },
          { label: "Feb", amount: 21200 }, 
          { label: "Mar", amount: 19800 }, 
          { label: "Apr", amount: 17300 }, 
          { label: "May", amount: 15100 }, 
          { label: "Jun", amount: 14230 }
        ]
      }
    }
  },
  jollofPay: {
    title: "💳 Jollof Pay — Fintech Remittance Engine Grid",
    badgeColor: "border-amber-900 bg-amber-950 text-amber-300",
    badgeText: "FINOPS TRANSACTION PREVIEW",
    telemetryStream: [
      { id: "DB-LAGOS-01", event: "Secondary Validation Cluster Idle Bleed Detected", status: "CRITICAL" },
      { id: "DB-LONDON-02", event: "Automated Compute Compression Hooks Armed", status: "OPTIMAL" }
    ],
    timeframes: {
      '7D': {
        kpiLeakRate: 12400,
        kpiEfficiency: 89.2,
        kpiCarbon: 31.2,
        points: [
          { label: "Mon", amount: 14000 }, { label: "Tue", amount: 15500 }, 
          { label: "Wed", amount: 16200 }, { label: "Thu", amount: 15900 }, 
          { label: "Fri", amount: 14100 }, { label: "Sat", amount: 6200 }, { label: "Sun", amount: 5800 }
        ]
      },
      '14D': {
        kpiLeakRate: 18900,
        kpiEfficiency: 81.4,
        kpiCarbon: 33.5,
        points: [
          { label: "D1", amount: 13500 }, { label: "D2", amount: 14100 }, { label: "D3", amount: 13900 },
          { label: "D4", amount: 5500 }, { label: "D5", amount: 5200 },
          { label: "D6", amount: 14200 }, { label: "D7", amount: 15100 }, { label: "D8", amount: 34000 },
          { label: "D9", amount: 16200 }, { label: "D10", amount: 16400 }, { label: "D11", amount: 15900 },
          { label: "D12", amount: 14100 }, { label: "D13", amount: 6100 }, { label: "D14", amount: 5900 }
        ]
      },
      'ALL': {
        kpiLeakRate: 28400,
        kpiEfficiency: 89.7,
        kpiCarbon: 34.1,
        points: [
          { label: "Jan", amount: 48000 },
          { label: "Feb", amount: 44100 },
          { label: "Mar", amount: 39500 },
          { label: "Apr", amount: 32000 },
          { label: "May", amount: 29400 },
          { label: "Jun", amount: 28400 }
        ]
      }
    }
  },
  odysseyDestinations: {
    title: "✈️ Odyssey Destinations — AI Itinerary Engine RAG Plane",
    badgeColor: "border-purple-900 bg-purple-950 text-purple-300",
    badgeText: "AI CORE RUNTIME PREVIEW",
    telemetryStream: [
      { id: "GPU-NODE-ALPHA", event: "HNN Trajectory Array Drawing Idle Capacity", status: "ANOMALY" },
      { id: "RAG-VECTOR-01", event: "Context Ingestion Buffer Compressing Dynamically", status: "OPTIMAL" }
    ],
    timeframes: {
      '7D': {
        kpiLeakRate: 45200,
        kpiEfficiency: 41.2,
        kpiCarbon: 112.4,
        points: [
          { label: "Mon", amount: 48000 }, { label: "Tue", amount: 51000 }, 
          { label: "Wed", amount: 53000 }, { label: "Thu", amount: 49000 }, 
          { label: "Fri", amount: 46000 }, { label: "Sat", amount: 18000 }, { label: "Sun", amount: 15000 }
        ]
      },
      '14D': {
        kpiLeakRate: 54800,
        kpiEfficiency: 36.8,
        kpiCarbon: 118.9,
        points: [
          { label: "D1", amount: 46000 }, { label: "D2", amount: 49000 }, { label: "D3", amount: 47000 },
          { label: "D4", amount: 16000 }, { label: "D5", amount: 14000 },
          { label: "D6", amount: 49500 }, { label: "D7", amount: 52000 }, { label: "D8", amount: 92000 },
          { label: "D9", amount: 54000 }, { label: "D10", amount: 55000 }, { label: "D11", amount: 51000 },
          { label: "D12", amount: 48000 }, { label: "D13", amount: 19000 }, { label: "D14", amount: 16000 }
        ]
      },
      'ALL': {
        kpiLeakRate: 64100,
        kpiEfficiency: 31.5,
        kpiCarbon: 124.8,
        points: [
          { label: "Jan", amount: 115000 },
          { label: "Feb", amount: 102000 },
          { label: "Mar", amount: 94000 },
          { label: "Apr", amount: 79000 },
          { label: "May", amount: 68000 },
          { label: "Jun", amount: 64100 }
        ]
      }
    }
  }
};
