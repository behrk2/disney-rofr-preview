import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "rofr.ai — DVC ROFR Intelligence",
    template: "%s | rofr.ai",
  },
  description:
    "ROFR risk prediction, pricing intelligence, and market signals for DVC resale contracts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initThemeScript = `
    (function () {
      try {
        var stored = localStorage.getItem("theme");
        var valid = ["light", "dark", "system", "mouse"];
        var theme = valid.indexOf(stored) !== -1 ? stored : "system";
        var root = document.documentElement;
        root.classList.remove("dark", "mouse");
        if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
          root.classList.add("dark");
        } else if (theme === "mouse") {
          root.classList.add("mouse");
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initThemeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:top-2 focus:left-2"
          >
            Skip to main content
          </a>
          <Nav />
          <main id="main-content" className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
            <p>rofr.ai: machine-learned ROFR intelligence for DVC resale. Not financial advice.</p>
          </footer>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
