import type { Measurement } from "@/types/api";
import type { BodyData, CalculationResult } from "@/types/body";
import { apiClient } from "./apiClient";

export async function calculate(body: BodyData): Promise<CalculationResult> {
  const { data } = await apiClient.post<CalculationResult>("/calculate", body);
  return data;
}

export async function saveMeasurement(body: BodyData): Promise<Measurement> {
  const { data } = await apiClient.post<Measurement>("/measurements", body);
  return data;
}

export async function getMeasurements(): Promise<Measurement[]> {
  const { data } = await apiClient.get<Measurement[]>("/measurements");
  return data;
}

export async function deleteMeasurement(id: string): Promise<void> {
  await apiClient.delete(`/measurements/${id}`);
}
