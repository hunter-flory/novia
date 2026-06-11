/**
 * Centralized animation presets for the romantic card experience.
 * All transition timings, easing, and reduced-motion variants are defined here.
 */

import type { AnimationPreset, AnimationPresetName } from "@/components/experience/types/experience";

/**
 * Romantic-soft preset: smooth, gentle, romantic feel.
 * Longer durations with ease-out for elegant reveal.
 */
export const romanticSoftPreset: AnimationPreset = {
  sceneEnter: {
    durationMs: 700,
    ease: "easeInOut",
    offsetY: 18,
    scale: 0.995,
  },
  sceneExit: {
    durationMs: 500,
    ease: "easeInOut",
    offsetY: -10,
    scale: 0.995,
  },
  contentReveal: {
    durationMs: 950,
    ease: "easeOut",
    offsetY: 24,
    scale: 0.985,
  },
  emphasis: {
    durationMs: 2200,
    ease: "easeInOut",
  },
  reducedMotionStrategy: "fade-only",
};

/**
 * Minimal preset: fast, understated transitions.
 */
export const minimalPreset: AnimationPreset = {
  sceneEnter: {
    durationMs: 300,
    ease: "linear",
  },
  sceneExit: {
    durationMs: 200,
    ease: "linear",
  },
  contentReveal: {
    durationMs: 400,
    ease: "linear",
  },
  emphasis: {
    durationMs: 1200,
    ease: "linear",
  },
  reducedMotionStrategy: "instant",
};

/**
 * None preset: instant transitions.
 */
export const nonePreset: AnimationPreset = {
  sceneEnter: {
    durationMs: 0,
    ease: "linear",
  },
  sceneExit: {
    durationMs: 0,
    ease: "linear",
  },
  contentReveal: {
    durationMs: 0,
    ease: "linear",
  },
  emphasis: {
    durationMs: 0,
    ease: "linear",
  },
  reducedMotionStrategy: "instant",
};

/**
 * Get animation preset by name.
 */
export function getAnimationPreset(name: AnimationPresetName): AnimationPreset {
  switch (name) {
    case "romantic-soft":
      return romanticSoftPreset;
    case "minimal":
      return minimalPreset;
    case "none":
      return nonePreset;
    default:
      return romanticSoftPreset;
  }
}

const animations = {
  romanticSoftPreset,
  minimalPreset,
  nonePreset,
  getAnimationPreset,
};

export default animations;
