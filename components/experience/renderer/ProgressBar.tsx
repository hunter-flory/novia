/**
 * Optional progress bar component for scene progression visualization.
 * Scene-agnostic and can be disabled via props.
 */

"use client";

import type { ExperienceRuntimeState } from "@/components/experience/types/experience";

interface ProgressBarProps {
  state: ExperienceRuntimeState;
  hidden?: boolean;
}

export function ProgressBar({ state, hidden }: ProgressBarProps) {
  if (hidden) return null;

  const progress = ((state.activeIndex + 1) / state.sceneCount) * 100;

  return (
    <div className="h-1 w-full bg-white/10">
      <div
        className="h-full bg-gradient-to-r from-transparent via-[#D97A8C] to-transparent transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
