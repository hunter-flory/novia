/**
 * Centralized theme tokens for the romantic card experience.
 * All colors, radii, shadows, and typography are defined here.
 */

import type { Theme } from "@/components/experience/types/experience";

export const theme: Theme = {
  colors: {
    background: "#FAF6F0",
    surface: "#FFFDF8",
    textPrimary: "#1E1E1E",
    textSecondary: "#1E1E1E",
    accent: "#D97A8C",
    border: "#1E1E1E",
  },
  radius: {
    scene: "28px",
    card: "28px",
    button: "20px",
  },
  shadow: {
    soft: "0_14px_42px_rgba(0,0,0,0.12)",
    card: "0_20px_60px_rgba(0,0,0,0.08)",
  },
  typography: {
    displayFamily: '"Didot", "Bodoni MT", "Times New Roman", serif',
    bodyFamily: '"Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif',
  },
};

export default theme;
