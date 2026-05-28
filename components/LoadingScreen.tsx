"use client";

import { useEffect, useState } from "react";

/** Shows once per initial page load — removed from DOM after animation. */
export function LoadingScreen(): JSX.Element | null {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 3200);
    return () => window.clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all",
        animation: "loader-screen 0.5s 2.6s cubic-bezier(0.4,0,1,1) both",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontWeight: 600,
          fontSize: "clamp(2.4rem, 10vw, 7rem)",
          letterSpacing: "0.3em",
          textIndent: "0.3em",
          color: "var(--fg)",
          animation: "loader-text 2.6s cubic-bezier(0.4,0,0.6,1) both",
          willChange: "transform, opacity, letter-spacing",
        }}
      >
        TUKHLIEV
      </span>
    </div>
  );
}
