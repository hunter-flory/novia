/**
 * Hook for detecting and tracking prefers-reduced-motion system preference.
 * Used to gracefully disable animations for users who have motion sensitivity.
 */

"use client";

import { useEffect, useState } from "react";

export function useReducedMotionPreference(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    // Initialize from matchMedia on client only
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReduced;
}
