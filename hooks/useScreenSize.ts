"use client";

import { useEffect, useState } from "react";
import type { ScreenSize } from "@/types";

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1024;

function read(): ScreenSize {
  if (typeof window === "undefined") {
    return {
      width: 1280,
      height: 800,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
    isMobile: width < MOBILE_BREAKPOINT,
    isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
    isDesktop: width >= TABLET_BREAKPOINT,
  };
}

export function useScreenSize(): ScreenSize {
  const [size, setSize] = useState<ScreenSize>(read);

  useEffect(() => {
    const onResize = (): void => setSize(read());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}
