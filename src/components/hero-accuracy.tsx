"use client";

import { useEffect, useState, useRef, useId, useCallback } from "react";
import { getAccuracy } from "@/lib/api";
import type { AccuracySummary } from "@/lib/types";

const statInfo: Record<string, string> = {
  "Prediction Accuracy": "Percentage of all predictions (buy and exercise) that matched the actual outcome.",
  Tested: "Total predictions verified against actual outcomes. More samples = more reliable metrics.",
  Recall: "Of all actual ROFR exercises, how many did we catch? 80%+ is strong.",
  Precision: "Of all predicted ROFR exercises, how many were correct? 80%+ is strong.",
  "F1 Score": "Harmonic mean of recall and precision — balances both. 80%+ is strong.",
};

function InfoTip({ label }: { label: string }) {
  const info = statInfo[label];
  const [open, setOpen] = useState(false);
  const tipId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onClick(e: MouseEvent) {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) close();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, close]);

  if (!info) return null;

  return (
    <span className="relative inline-flex items-center">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={open ? tipId : undefined}
        aria-label={`What is ${label}?`}
        className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-muted-foreground/40 text-muted-foreground/70 transition-colors hover:border-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="text-[9px] font-bold leading-none" aria-hidden="true">i</span>
      </button>
      {open && (
        <span
          id={tipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-md border border-border bg-popover px-3 py-2 text-left text-xs leading-relaxed text-popover-foreground shadow-md"
        >
          {info}
        </span>
      )}
    </span>
  );
}

function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target <= 0) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    startTime.current = null;

    function animate(timestamp: number) {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

export function HeroAccuracy() {
  const [data, setData] = useState<AccuracySummary | null>(null);
  const animatedPct = useCountUp(data?.accuracy_pct ?? 0, 2000);

  useEffect(() => {
    getAccuracy().then(setData).catch(() => {});
  }, []);

  if (!data || data.total === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center py-12">
      {/* Live indicator */}
      <div className="mb-6 flex items-center gap-2">
        <svg width="10" height="9" viewBox="0 0 10 9" className="text-primary pulse-dot" aria-hidden="true">
          <circle cx="5" cy="5.5" r="3" fill="currentColor" />
          <circle cx="1.8" cy="2.2" r="1.8" fill="currentColor" />
          <circle cx="8.2" cy="2.2" r="1.8" fill="currentColor" />
        </svg>
        <span className="font-mono text-xs uppercase tracking-widest text-primary/70">
          Model Active
        </span>
      </div>

      {/* Giant accuracy number */}
      <div className="font-mono text-7xl font-bold text-primary glow-green sm:text-8xl md:text-9xl">
        {animatedPct.toFixed(1)}%
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          Prediction Accuracy
        </p>
        <InfoTip label="Prediction Accuracy" />
      </div>

      {/* Supporting stats */}
      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <StatReadout label="Tested" value={data.total.toString()} />
        <StatReadout
          label="Recall"
          value={data.recall != null ? `${(data.recall * 100).toFixed(0)}%` : "—"}
        />
        <StatReadout
          label="Precision"
          value={data.precision != null ? `${(data.precision * 100).toFixed(0)}%` : "—"}
        />
        <StatReadout
          label="F1 Score"
          value={data.f1 != null ? `${(data.f1 * 100).toFixed(0)}%` : "—"}
        />
      </div>
    </div>
  );
}

function StatReadout({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-mono text-xl font-bold text-foreground">{value}</p>
      <div className="flex items-center justify-center gap-1">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <InfoTip label={label} />
      </div>
    </div>
  );
}
