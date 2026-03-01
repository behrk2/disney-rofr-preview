import type {
  AccuracySummary,
  MonthlyAccuracyResponse,
} from "./types";

async function fetchSnapshot<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return res.json();
}

export async function getAccuracy(): Promise<AccuracySummary> {
  return fetchSnapshot<AccuracySummary>("/snapshots/accuracy.json");
}

export async function getMonthlyAccuracy(): Promise<MonthlyAccuracyResponse> {
  return fetchSnapshot<MonthlyAccuracyResponse>("/snapshots/accuracy-monthly.json");
}
