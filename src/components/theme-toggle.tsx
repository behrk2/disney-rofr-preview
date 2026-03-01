"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";

function MickeyHead({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 20" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="6" cy="5" r="5" />
      <circle cx="22" cy="5" r="5" />
      <circle cx="14" cy="12" r="8" />
    </svg>
  );
}
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" aria-label="Change theme">
          {theme === "light" && <Sun className="h-4 w-4" />}
          {theme === "dark" && <Moon className="h-4 w-4" />}
          {theme === "system" && <Monitor className="h-4 w-4" />}
          {theme === "mouse" && <MickeyHead className="h-4 w-4" />}
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="justify-between">
          <span className="flex items-center gap-2"><Sun className="h-4 w-4" /> Light</span>
          {theme === "light" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="justify-between">
          <span className="flex items-center gap-2"><Moon className="h-4 w-4" /> Dark</span>
          {theme === "dark" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="justify-between">
          <span className="flex items-center gap-2"><Monitor className="h-4 w-4" /> System</span>
          {theme === "system" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("mouse")} className="justify-between">
          <span className="flex items-center gap-2"><MickeyHead className="h-4 w-4" /> Mouse</span>
          {theme === "mouse" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
