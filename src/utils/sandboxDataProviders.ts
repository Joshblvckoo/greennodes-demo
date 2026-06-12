// src/utils/sandboxDataProviders.ts

/**
 * @fileOverview Unified mock engine matrix for sandbox operational datasets.
 * Aggregates target metrics for specific industry use cases.
 */

export interface SandboxMetrics {
  title: string;
  subtitle: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  wasteLabel: string;
  wasteValue: string;
  carbonLabel: string;
  carbonValue: string;
  anomalies: string[];
}

export const sandboxUseCases: Record<string, SandboxMetrics> = {
  whaleTracker: {
    title: "🐋 WhaleTracker — Orbital Telemetry & Marine GreenOps",
    subtitle: "Tracking deep-water migration corridors via satellite downlinks and spatial carbon awareness constraints.",
    primaryMetricLabel: "Orbital Data Egress Rate",
    primaryMetricValue: "14.2 PB / hr",
    wasteLabel: "Over-Provisioned Ground Stations",
    wasteValue: "$4,230 / mo",
    carbonLabel: "Satellite Link Carbon Draw",
    carbonValue: "1.4 gCO2e/packet",
    anomalies: [
      "Anomaly: Ground Station Alpha (Svalbard) processing idle carrier waves.",
      "Optimization: Spatial shifting active. Route payload downlinks to clean grid zones."
    ]
  },
  jollofPay: {
    title: "💳 Jollof Pay — Cross-Border FinTech Gateway",
    subtitle: "Optimizing high-frequency remittance settlement channels (GBP to NGN) across global availability zones.",
    primaryMetricLabel: "API Transaction Throughput",
    primaryMetricValue: "8,450 tx / sec",
    wasteLabel: "Database Read/Write Idle Bleed",
    wasteValue: "$12,890 / mo",
    carbonLabel: "Ledger Sync Energy Intensity",
    carbonValue: "34.1 gCO2e/settlement",
    anomalies: [
      "Anomaly: Secondary validation database clusters running at 98% idle variance.",
      "Optimization: Downscaling webhook ready. Automated compute compression queued."
    ]
  },
  odysseyDestinations: {
    title: "✈️ Odyssey Destinations — AI Travel Assistance Engine",
    subtitle: "Physics-informed routing matrices and RAG pipelines calculating dynamic multi-modal travel itineraries.",
    primaryMetricLabel: "LLM Token Context Ingestion",
    primaryMetricValue: "4.2B tokens / min",
    wasteLabel: "Unused GPU Core Cluster Leak",
    wasteValue: "$18,400 / mo",
    carbonLabel: "Neural Net Inference Footprint",
    carbonValue: "124.8 gCO2e/query",
    anomalies: [
      "Anomaly: HNN trajectory cluster drawing full idle capacity during off-peak hours.",
      "Optimization: Dynamic cluster suspension recommended via ChatOps pipeline."
    ]
  }
};
