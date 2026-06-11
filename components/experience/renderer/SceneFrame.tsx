/**
 * Safe viewport container and transition wrapper for scenes.
 * Handles layout, background, transitions, and mobile viewport safety.
 */

"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import type {
  ExperienceRuntimeState,
  AnimationPresetName,
} from "@/components/experience/types/experience";
import { theme } from "@/lib/theme";
import { getAnimationPreset } from "@/lib/animations";
import { useReducedMotionPreference } from "@/components/experience/renderer/useReducedMotionPreference";

interface SceneFrameProps {
  children: ReactNode;
  sceneKey: string | number;
  animationPreset: string;
  state: ExperienceRuntimeState;
}

export function SceneFrame({
  children,
  sceneKey,
  animationPreset,
  state,
}: SceneFrameProps) {
  const prefersReduced = useReducedMotionPreference();
  const preset = getAnimationPreset(animationPreset as AnimationPresetName);

  // Use reduced preset if prefers-reduced-motion is set
  const effectivePreset = prefersReduced
    ? { ...preset, sceneEnter: { ...preset.sceneEnter, durationMs: 0 }, sceneExit: { ...preset.sceneExit, durationMs: 0 } }
    : preset;

  const easing = (effectivePreset.sceneEnter.ease as unknown) as
    | "easeInOut"
    | "easeOut"
    | "linear"
    | "easeIn";

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden sm:rounded-[28px]"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Background decorative layer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,122,140,0.18),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(217,122,140,0.12),transparent_45%)]" />

      {/* Top progress indicator */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-transparent via-[#D97A8C] to-transparent transition-all duration-300"
          style={{
            width: `${((state.activeIndex + 1) / state.sceneCount) * 100}%`,
          }}
        />
      </div>

      {/* Scene transition wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneKey}
          initial={{
            opacity: 0,
            y: effectivePreset.sceneEnter.offsetY || 0,
            scale: effectivePreset.sceneEnter.scale || 1,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: effectivePreset.sceneExit.offsetY || 0,
            scale: effectivePreset.sceneExit.scale || 1,
          }}
          transition={{
            duration: effectivePreset.sceneEnter.durationMs / 1000,
            ease: easing,
          }}
          className="relative z-10 h-full w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
