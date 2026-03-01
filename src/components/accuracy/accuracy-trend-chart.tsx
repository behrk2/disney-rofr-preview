"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyAccuracyPoint } from "@/lib/types";

interface AccuracyTrendChartProps {
  data: MonthlyAccuracyPoint[];
}

export function AccuracyTrendChart({ data }: AccuracyTrendChartProps) {
  if (data.length < 2) return null;

  return (
    <div className="w-full" role="img" aria-label="Model accuracy trend chart showing prediction accuracy over time">
      <div
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
      <ResponsiveContainer width="100%" height={120}>
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="modelGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="year_month" hide />
          <YAxis domain={[0, 100]} hide />
          <Tooltip
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "var(--font-mono)",
            }}
            formatter={(value, name) => [
              `${Number(value).toFixed(1)}%`,
              name === "accuracy_pct" ? "Model" : "Actual",
            ]}
            labelFormatter={(label) => label}
          />
          {/* Model — green with gradient fill (rendered first = behind) */}
          <Area
            type="monotone"
            dataKey="accuracy_pct"
            stroke="var(--primary)"
            strokeWidth={2.5}
            fill="url(#modelGlow)"
            dot={false}
            activeDot={{ r: 4, fill: "var(--primary)", strokeWidth: 0 }}
          />
          {/* Baseline — dim, dashed (rendered second = on top) */}
          <Line
            type="monotone"
            dataKey="naive_pct"
            stroke="rgba(128,128,128,0.5)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      </div>
      {/* Inline legend */}
      <div className="flex justify-center gap-6 mt-1">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="inline-block h-px w-4 bg-primary" />
          Model
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="inline-block h-px w-4 border-t border-dashed border-muted-foreground" />
          Actual
        </span>
      </div>
    </div>
  );
}
