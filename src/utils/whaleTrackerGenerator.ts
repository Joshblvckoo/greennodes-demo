/**
 * @fileOverview Generator for WhaleTracker specific telemetry data.
 */

export interface WhaleTelemetry {
  id: string;
  metrics: {
    computeOverheadKW: number;
    associatedCarbonIntensity: number;
  };
}

/**
 * Generates an array of live telemetry snapshots for the simulation.
 * @param count Number of snapshots to generate.
 */
export const generateWhaleTelemetry = (count: number): WhaleTelemetry[] => {
  return Array.from({ length: count }, () => ({
    id: `whale-${Math.random().toString(36).substring(2, 7)}`,
    metrics: {
      computeOverheadKW: Math.random() * 100 + 50,
      associatedCarbonIntensity: Math.random() * 2 + 0.5,
    },
  }));
};
