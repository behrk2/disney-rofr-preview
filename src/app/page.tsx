"use client";

import { useEffect, useState } from "react";
import { HeroAccuracy } from "@/components/hero-accuracy";
import { SamplePredictionCard } from "@/components/sample-prediction-card";
import { AccuracyTrendChart } from "@/components/accuracy/accuracy-trend-chart";
import { getMonthlyAccuracy } from "@/lib/api";
import type { MonthlyAccuracyPoint } from "@/lib/types";

export default function Home() {
  const [monthlyData, setMonthlyData] = useState<MonthlyAccuracyPoint[]>([]);

  useEffect(() => {
    getMonthlyAccuracy()
      .then((res) => setMonthlyData(res.months))
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="sr-only">rofr.ai — DVC ROFR Prediction</h1>
      <AccuracyTrendChart data={monthlyData} />

      <div className="space-y-8 py-8 flex flex-col items-center">
        <HeroAccuracy />

        <SamplePredictionCard className="-mt-6" />

        <div className="text-center space-y-4">
          <p className="max-w-md text-muted-foreground">
            Machine-learning predictions for Disney Vacation Club Right of
            First Refusal (ROFR) outcomes.
          </p>

          <span
            className="inline-flex items-center justify-center rounded-md bg-muted px-6 py-3 text-sm font-medium text-muted-foreground cursor-default"
            aria-disabled="true"
          >
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}
