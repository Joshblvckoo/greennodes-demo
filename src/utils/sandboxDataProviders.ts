/**
 * @fileOverview Curated multi-timeframe operational datasets for sandbox industry verticals.
 */

export interface DetailedPoint {
  date: string;
  spend: number;
  carbon: number;
}

export interface DetailedDataset {
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
  points: DetailedPoint[];
}

export interface TimeframeConfig {
  kpiLeakRate: number;
  kpiEfficiency: number;
  kpiCarbon: number;
  points: DetailedPoint[];
}

export const trackMetadata: Record<string, { title: string; badgeText: string; badgeColor: string }> = {
  whaleTracker: {
    title: " WhaleTracker — Orbital Satellite Telemetry Plane",
    badgeText: "ORBITAL GREENOPS PREVIEW",
    badgeColor: "border-blue-900 bg-blue-950 text-blue-300",
  },
  jollofPay: {
    title: " Jollof Pay — Fintech Remittance Engine Grid",
    badgeText: "FINOPS TRANSACTION PREVIEW",
    badgeColor: "border-amber-900 bg-amber-950 text-amber-300",
  },
  odysseyDestinations: {
    title: " Odyssey Destinations — AI Itinerary Engine RAG Plane",
    badgeText: "AI CORE RUNTIME PREVIEW",
    badgeColor: "border-purple-900 bg-purple-950 text-purple-300",
  }
};

export const detailedMatrix: Record<string, Record<'7D' | '14D' | 'ALL', DetailedDataset>> = {
  whaleTracker: {
    '14D': {
      totalPeriodSpend: "$597,196",
      potentialWaste: "$89,579",
      periodTokenFlux: "1,313,831 GNC",
      periodCarbonLoad: "16,586 kg",
      periodSavings: "-35% Emissions",
      efficiencyText: "Spike detected in timeline caused a 40% carbon drift. Root cause: Deployment Drift.",
      hasSpike: true, spikeIndex: 7,
      hasGnActive: true, gnActiveIndex: 12,
      insights: [
        "Insight: High carbon intensity peaks correlate directly with your regional usage of the AWS us-east-1 grid between 2 PM and 6 PM. Consider shifting heavy batch workloads to overnight cycles.",
        "Insight: Automated weekend downscaling would preserve an estimated 45,000 GNC tokens per month in your Vault based on your current weekly run-rate."
      ],
      points: [
        { date: "Jun 07", spend: 32000, carbon: 900 }, { date: "Jun 08", spend: 48000, carbon: 1300 },
        { date: "Jun 09", spend: 46000, carbon: 1250 }, { date: "Jun 10", spend: 47000, carbon: 1280 },
        { date: "Jun 11", spend: 45000, carbon: 1200 }, { date: "Jun 12", spend: 92000, carbon: 2600 },
        { date: "Jun 13", spend: 38000, carbon: 950 }, { date: "Jun 14", spend: 42000, carbon: 1100 },
        { date: "Jun 15", spend: 49000, carbon: 1350 }, { date: "Jun 16", spend: 47000, carbon: 1300 },
        { date: "Jun 17", spend: 46000, carbon: 1250 }, { date: "Jun 18", spend: 45000, carbon: 1200 },
        { date: "Jun 19", spend: 32000, carbon: 850 },  { date: "Jun 20", spend: 18000, carbon: 400 }
      ]
    },
    '7D': {
      totalPeriodSpend: "$284,500",
      potentialWaste: "$31,200",
      periodTokenFlux: "620,450 GNC",
      periodCarbonLoad: "7,120 kg",
      periodSavings: "-40% Emissions",
      efficiencyText: "System operating inside optimal carbon scaling coefficients.",
      hasSpike: false, spikeIndex: -1,
      hasGnActive: true, gnActiveIndex: 5,
      insights: [
        "Insight: Orbital workload paths show a 65% drop in non-essential downlink noise during weekend cooling frames.",
        "Insight: Ground station array successfully paired with localized clean energy grids."
      ],
      points: [
        { date: "Mon", spend: 45000, carbon: 1200 }, { date: "Tue", spend: 47000, carbon: 1300 },
        { date: "Wed", spend: 46000, carbon: 1250 }, { date: "Thu", spend: 48000, carbon: 1320 },
        { date: "Fri", spend: 44000, carbon: 1150 }, { date: "Sat", spend: 20000, carbon: 450 },
        { date: "Sun", spend: 16000, carbon: 350 }
      ]
    },
    'ALL': {
      totalPeriodSpend: "$2,140,500",
      potentialWaste: "$412,000",
      periodTokenFlux: "5,840,000 GNC",
      periodCarbonLoad: "64,200 kg",
      periodSavings: "-15% Baseline",
      efficiencyText: "Macro tracking illustrates progressive reduction in baseline compute leaks since platform deployment.",
      hasSpike: true, spikeIndex: 1,
      hasGnActive: false, gnActiveIndex: -1,
      insights: [
        "Insight: Q1 telemetry indicates high legacy over-provisioning across satellite communication ground tracks.",
        "Insight: Incremental mitigation loops successfully deployed over trailing 90-day cycle."
      ],
      points: [
        { date: "Jan", spend: 98000, carbon: 2800 }, { date: "Feb", spend: 92000, carbon: 2600 },
        { date: "Mar", spend: 81000, carbon: 2300 }, { date: "Apr", spend: 58000, carbon: 1550 },
        { date: "May", spend: 49000, carbon: 1300 }, { date: "Jun", spend: 38000, carbon: 950 }
      ]
    }
  },
  jollofPay: {
    '14D': {
      totalPeriodSpend: "$842,150",
      potentialWaste: "$142,300",
      periodTokenFlux: "2,450,110 GNC",
      periodCarbonLoad: "42,190 kg",
      periodSavings: "-28% Emissions",
      efficiencyText: "Remittance validation node overhead spike observed on trailing settlement burst.",
      hasSpike: true, spikeIndex: 6,
      hasGnActive: true, gnActiveIndex: 11,
      insights: [
        "Insight: Settlement channels between London and Lagos availability zones experience high latency idle cycles during processing intervals.",
        "Insight: Enforcing transaction routing batch intervals would preserve up to 80,000 GNC tokens."
      ],
      points: [
        { date: "Jun 07", spend: 55000, carbon: 1400 }, { date: "Jun 08", spend: 58000, carbon: 1500 },
        { date: "Jun 09", spend: 56000, carbon: 1450 }, { date: "Jun 10", spend: 57000, carbon: 1480 },
        { date: "Jun 11", spend: 89000, carbon: 2400 }, { date: "Jun 12", spend: 52000, carbon: 1300 },
        { date: "Jun 13", spend: 51000, carbon: 1250 }, { date: "Jun 14", spend: 53000, carbon: 1280 },
        { date: "Jun 15", spend: 54000, carbon: 1300 }, { date: "Jun 16", spend: 52000, carbon: 1250 },
        { date: "Jun 17", spend: 53000, carbon: 1280 }, { date: "Jun 18", spend: 41000, carbon: 950 },
        { date: "Jun 19", spend: 25000, carbon: 550 },  { date: "Jun 20", spend: 22000, carbon: 450 }
      ]
    },
    '7D': {
      totalPeriodSpend: "$412,000",
      potentialWaste: "$65,400",
      periodTokenFlux: "980,000 GNC",
      periodCarbonLoad: "18,200 kg",
      periodSavings: "-20% Emissions",
      efficiencyText: "Real-time settlement efficiency is within nominal parameters for the current week.",
      hasSpike: false, spikeIndex: -1,
      hasGnActive: true, gnActiveIndex: 6,
      insights: [
        "Insight: Regional grid pairing in Lagos has reduced scope 2 emissions by 15%.",
        "Insight: High-frequency transaction bursts are now better aligned with clean energy cycles."
      ],
      points: [
        { date: "Mon", spend: 58000, carbon: 1500 }, { date: "Tue", spend: 61000, carbon: 1600 },
        { date: "Wed", spend: 59000, carbon: 1550 }, { date: "Thu", spend: 62000, carbon: 1650 },
        { date: "Fri", spend: 57000, carbon: 1450 }, { date: "Sat", spend: 28000, carbon: 700 },
        { date: "Sun", spend: 24000, carbon: 600 }
      ]
    },
    'ALL': {
      totalPeriodSpend: "$3,450,000",
      potentialWaste: "$620,000",
      periodTokenFlux: "7,200,000 GNC",
      periodCarbonLoad: "92,000 kg",
      periodSavings: "-18% Baseline",
      efficiencyText: "Historical data confirms a steady downward trend in transaction-specific energy intensity.",
      hasSpike: true, spikeIndex: 2,
      hasGnActive: false, gnActiveIndex: -1,
      insights: [
        "Insight: Q2 transition to sustainable ledger sync protocols saved approximately $120,000.",
        "Insight: Legacy database clusters continue to show minor idle variance drift."
      ],
      points: [
        { date: "Jan", spend: 145000, carbon: 3800 }, { date: "Feb", spend: 132000, carbon: 3500 },
        { date: "Mar", spend: 158000, carbon: 4200 }, { date: "Apr", spend: 98000, carbon: 2600 },
        { date: "May", spend: 82000, carbon: 2100 }, { date: "Jun", spend: 75000, carbon: 1900 }
      ]
    }
  },
  odysseyDestinations: {
    '14D': {
      totalPeriodSpend: "$1,420,900",
      potentialWaste: "$384,120",
      periodTokenFlux: "4,820,150 GNC",
      periodCarbonLoad: "114,800 kg",
      periodSavings: "-12% Emissions",
      efficiencyText: "Neural net training execution vector triggered temporary cooling capacity exception.",
      hasSpike: true, spikeIndex: 5,
      hasGnActive: true, gnActiveIndex: 13,
      insights: [
        "Insight: RAG contextual indexing operations feature memory leaks across standard persistent storage containers.",
        "Insight: Dynamic index memory tier suspension recommended to avoid downstream idle compute penalties."
      ],
      points: [
        { date: "Jun 07", spend: 85000, carbon: 2400 }, { date: "Jun 08", spend: 88000, carbon: 2500 },
        { date: "Jun 09", spend: 86000, carbon: 2450 }, { date: "Jun 10", spend: 145000, carbon: 4200 },
        { date: "Jun 11", spend: 89000, carbon: 2500 }, { date: "Jun 12", spend: 87000, carbon: 2400 },
        { date: "Jun 13", spend: 85000, carbon: 2350 }, { date: "Jun 14", spend: 88000, carbon: 2450 },
        { date: "Jun 15", spend: 89000, carbon: 2500 }, { date: "Jun 16", spend: 87000, carbon: 2400 },
        { date: "Jun 17", spend: 88000, carbon: 2450 }, { date: "Jun 18", spend: 82000, carbon: 2200 },
        { date: "Jun 19", spend: 45000, carbon: 1100 }, { date: "Jun 20", spend: 38000, carbon: 950 }
      ]
    },
    '7D': {
      totalPeriodSpend: "$620,000",
      potentialWaste: "$112,000",
      periodTokenFlux: "1,200,000 GNC",
      periodCarbonLoad: "28,500 kg",
      periodSavings: "-10% Emissions",
      efficiencyText: "GPU cluster utilization is peaking within expected training window parameters.",
      hasSpike: false, spikeIndex: -1,
      hasGnActive: true, gnActiveIndex: 5,
      insights: [
        "Insight: Inference cycles for RAG are currently 20% more efficient than the baseline q1 average.",
        "Insight: Vector database sharding has reduced active compute time by 12%."
      ],
      points: [
        { date: "Mon", spend: 88000, carbon: 2500 }, { date: "Tue", spend: 92000, carbon: 2650 },
        { date: "Wed", spend: 89000, carbon: 2550 }, { date: "Thu", spend: 94000, carbon: 2700 },
        { date: "Fri", spend: 86000, carbon: 2450 }, { date: "Sat", spend: 35000, carbon: 900 },
        { date: "Sun", spend: 31000, carbon: 800 }
      ]
    },
    'ALL': {
      totalPeriodSpend: "$5,800,000",
      potentialWaste: "$1,250,000",
      periodTokenFlux: "15,000,000 GNC",
      periodCarbonLoad: "185,000 kg",
      periodSavings: "-10% Baseline",
      efficiencyText: "Macro trend reflects high upfront GPU training costs followed by optimized inference cycles.",
      hasSpike: true, spikeIndex: 3,
      hasGnActive: false, gnActiveIndex: -1,
      insights: [
        "Insight: Initial model training in March accounts for the highest historical carbon footprint.",
        "Insight: Shift to local inference nodes has successfully reduced long-haul data egress costs."
      ],
      points: [
        { date: "Jan", spend: 245000, carbon: 6800 }, { date: "Feb", spend: 220000, carbon: 6200 },
        { date: "Mar", spend: 380000, carbon: 10500 }, { date: "Apr", spend: 185000, carbon: 5200 },
        { date: "May", spend: 162000, carbon: 4500 }, { date: "Jun", spend: 145000, carbon: 4100 }
      ]
    }
  }
};

export const getLiveTimeframeMetrics = (track: string, timeframe: '7D' | '14D' | 'ALL'): TimeframeConfig => {
  const data = detailedMatrix[track]?.[timeframe] || detailedMatrix.whaleTracker[timeframe];
  
  const parseAmount = (str: string) => parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
  
  return {
    kpiLeakRate: parseAmount(data.totalPeriodSpend),
    kpiEfficiency: parseInt(data.periodSavings.replace(/[^0-9]/g, ''), 10) || 0,
    kpiCarbon: parseAmount(data.periodCarbonLoad),
    points: data.points
  };
};
