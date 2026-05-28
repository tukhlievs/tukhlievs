"use client";

import { useEffect, useState } from "react";
import type { LocalTimeState, ThemeMode } from "@/types";

const NIGHT_START = 18;
const NIGHT_END = 6;

function resolveMode(hour: number): ThemeMode {
  return hour >= NIGHT_START || hour < NIGHT_END ? "night" : "day";
}

/**
 * Returns the user's approximate local theme mode based on the device clock.
 * SSR-safe: starts in an unresolved state and updates after hydration so the
 * server- and client-rendered HTML match.
 */
export function useLocalTime(): LocalTimeState {
  const [state, setState] = useState<LocalTimeState>({
    mode: "night",
    hour: NIGHT_START,
    isReady: false,
  });

  useEffect(() => {
    const tick = (): void => {
      const hour = new Date().getHours();
      setState({ hour, mode: resolveMode(hour), isReady: true });
    };

    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
