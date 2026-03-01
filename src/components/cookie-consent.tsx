"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // Storage unavailable — don't show banner
    }
  }, []);

  function handleConsent(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage unavailable
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card p-4 shadow-lg transition-transform duration-300 ease-out md:p-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          We use essential cookies for authentication. Accept all to allow
          future analytics cookies, or reject to keep essential only.{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleConsent("rejected")}
          >
            Reject Non-Essential
          </Button>
          <Button size="sm" onClick={() => handleConsent("accepted")}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
