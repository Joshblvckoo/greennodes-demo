/**
 * @fileOverview Telemetry data generator for infrastructure simulation.
 */

export interface MockTelemetryData {
  id: string;
  environment: 'STAGING' | 'PRODUCTION' | 'EPHEMERAL-SIM';
  workloadName: string;
  provider: 'AWS (eu-west-2)' | 'GCP (europe-west1)' | 'Azure (uk-south)';
  metrics: {
    monthlyWasteRate: number;
    idleVariancePercentage: number;
    potentialQ3Recovery: number;
    carbonIntensity: number; // gCO2e/hr
    ghgScope: 'Scope 2 (Compute)' | 'Scope 3 (Supply Chain)';
  };
}

const mockWorkloads = [
  "HNN-Orbital-Sim-Alpha",
  "HNN-Trajectory-Core",
  "FinOps-Data-Pipeline",
  "GreenNodes-Web-Staging",
  "Particle-Collision-Stream",
  "Robotics-Vision-Model"
];

const mockProviders = [
  "AWS (eu-west-2)",
  "GCP (europe-west1)",
  "Azure (uk-south)"
] as const;

const mockEnvs = ["STAGING", "PRODUCTION", "EPHEMERAL-SIM"] as const;

/**
 * Generates an array of completely randomized infrastructure telemetry profiles
 * scaled to resemble real enterprise cloud leaks.
 */
export const generateRandomTelemetry = (count: number = 5): MockTelemetryData[] => {
  return Array.from({ length: count }, () => {
    const idleVariance = parseFloat((Math.random() * (99.8 - 65.0) + 65.0).toFixed(1));
    const monthlyWaste = Math.floor(Math.random() * (2400 - 150) + 150);
    const carbonIntensity = parseFloat((Math.random() * (45.0 - 5.2) + 5.2).toFixed(1));

    return {
      id: `i-${Math.random().toString(36).substring(2, 15)}`,
      environment: mockEnvs[Math.floor(Math.random() * mockEnvs.length)],
      workloadName: mockWorkloads[Math.floor(Math.random() * mockWorkloads.length)],
      provider: mockProviders[Math.floor(Math.random() * mockProviders.length)],
      metrics: {
        idleVariancePercentage: idleVariance,
        monthlyWasteRate: monthlyWaste,
        potentialQ3Recovery: monthlyWaste * 3,
        carbonIntensity: carbonIntensity,
        ghgScope: Math.random() > 0.3 ? 'Scope 2 (Compute)' : 'Scope 3 (Supply Chain)'
      }
    };
  });
};
