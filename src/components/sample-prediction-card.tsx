"use client";

import { useState, useEffect } from "react";

// Prices calibrated against dvcresalemarket monthly ceiling data (buyback upper fences)
// OKW ~$100, SSR ~$118, AKV ~$135, BWV ~$148, BCV ~$150, RIV ~$150,
// BLT ~$155, PVB ~$163, CCV ~$160, VGF ~$144, HHI ~$75, AUL ~$100, BRV ~$110
const samples = [
  { resort: "SSR", points: 150, price: 105, risk: 12 },
  { resort: "SSR", points: 200, price: 115, risk: 30 },
  { resort: "OKW", points: 230, price: 90, risk: 8 },
  { resort: "OKW", points: 150, price: 100, risk: 18 },
  { resort: "AKV", points: 160, price: 120, risk: 15 },
  { resort: "AKV", points: 100, price: 140, risk: 48 },
  { resort: "BCV", points: 75, price: 135, risk: 22 },
  { resort: "BCV", points: 50, price: 155, risk: 58 },
  { resort: "BWV", points: 100, price: 125, risk: 20 },
  { resort: "BWV", points: 150, price: 145, risk: 50 },
  { resort: "BLT", points: 160, price: 145, risk: 28 },
  { resort: "BLT", points: 100, price: 160, risk: 55 },
  { resort: "PVB", points: 100, price: 150, risk: 25 },
  { resort: "PVB", points: 75, price: 170, risk: 62 },
  { resort: "VGF", points: 50, price: 140, risk: 35 },
  { resort: "VGF", points: 100, price: 155, risk: 60 },
  { resort: "RIV", points: 100, price: 135, risk: 18 },
  { resort: "RIV", points: 150, price: 155, risk: 52 },
  { resort: "CCV", points: 75, price: 145, risk: 30 },
  { resort: "HHI", points: 200, price: 65, risk: 6 },
  { resort: "AUL", points: 100, price: 90, risk: 10 },
  { resort: "BRV", points: 200, price: 100, risk: 12 },
];

function dotColor(risk: number) {
  if (risk < 25) return "var(--chart-1)";
  if (risk < 50) return "var(--chart-4)";
  if (risk < 75) return "var(--chart-5)";
  return "var(--chart-3)";
}

function riskLabel(risk: number) {
  if (risk < 25) return "Low";
  if (risk < 50) return "Medium";
  if (risk < 75) return "High";
  return "Very High";
}

export function SamplePredictionCard({ className }: { className?: string }) {
  const [sample, setSample] = useState(samples[0]);

  useEffect(() => {
    setSample(samples[Math.floor(Math.random() * samples.length)]);
  }, []);

  return (
    <div className={`inline-flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-4 py-2 text-xs font-mono text-muted-foreground ${className ?? ""}`}>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
        Sample
      </span>
      <span className="text-foreground font-medium">{sample.resort}</span>
      <span>{sample.points} pts</span>
      <span>${sample.price}/pt</span>
      <span className="inline-flex items-center gap-1.5">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: dotColor(sample.risk) }}
          aria-hidden="true"
        />
        {sample.risk}% {riskLabel(sample.risk)}
      </span>
    </div>
  );
}
