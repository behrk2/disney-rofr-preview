"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ThemeToggle = dynamic(
  () => import("@/components/theme-toggle").then((m) => m.ThemeToggle),
  { ssr: false },
);

const links = [
  { href: "/", label: "Home" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold font-mono" aria-label="rofr.ai home">
          <span className="text-foreground">rofr</span>
          <span className="text-accent">.</span>
          <span className="text-primary glow-green-sm">ai</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex gap-1" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(pathname, link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Open navigation menu">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side="right" className="w-64">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav className="mt-8 flex flex-col gap-2" aria-label="Main navigation">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive(pathname, link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
