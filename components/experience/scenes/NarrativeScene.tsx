/**
 * NarrativeScene: Text-only narrative reveal.
 * Displays story text with staggered animation reveals.
 */

"use client";

import { motion } from "motion/react";
import type { SceneComponentProps } from "@/components/experience/renderer/SceneRegistry";
import { SceneShell } from "@/components/experience/renderer/SceneShell";
import type { NarrativeSceneBlock } from "@/components/experience/types/experience";
import { theme } from "@/lib/theme";

export default function NarrativeScene({ block, onNext }: SceneComponentProps) {
  const sceneData = block as NarrativeSceneBlock;

  return (
    <SceneShell contentClassName="max-w-[24rem] text-center">
      <button type="button" onClick={onNext} className="w-full space-y-7" aria-label="Continue">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-2xl leading-relaxed sm:text-3xl"
          style={{
            fontFamily: theme.typography.displayFamily,
            color: theme.colors.textPrimary,
          }}
        >
          {sceneData.line1}
        </motion.p>

        {sceneData.line2 && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1.15, ease: "easeOut" }}
            className="text-lg sm:text-xl"
            style={{
              fontFamily: theme.typography.bodyFamily,
              color: theme.colors.textSecondary,
            }}
          >
            {sceneData.line2}
          </motion.p>
        )}
      </button>
    </SceneShell>
  );
}
