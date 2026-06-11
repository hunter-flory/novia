/**
 * IntroScene: Opening title card for the experience.
 * Displays a heading and CTA to begin the card journey.
 */

"use client";

import { motion } from "motion/react";
import type { SceneComponentProps } from "@/components/experience/renderer/SceneRegistry";
import { SceneShell } from "@/components/experience/renderer/SceneShell";
import type { IntroSceneBlock } from "@/components/experience/types/experience";
import { theme } from "@/lib/theme";

export default function IntroScene({ block, onNext }: SceneComponentProps) {
  const sceneData = block as IntroSceneBlock;

  return (
    <SceneShell contentClassName="text-center">
      <button
        type="button"
        onClick={onNext}
        className="w-full space-y-6"
        aria-label="Start the experience"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl leading-relaxed sm:text-3xl"
          style={{
            fontFamily: theme.typography.displayFamily,
            color: theme.colors.textPrimary,
          }}
        >
          {sceneData.heading}
        </motion.p>

        {sceneData.subheading && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base leading-relaxed sm:text-lg"
            style={{
              fontFamily: theme.typography.bodyFamily,
              color: theme.colors.textSecondary,
            }}
          >
            {sceneData.subheading}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <span
            className="inline-flex rounded-full px-6 py-3 text-sm tracking-[0.14em] font-medium"
            style={{
              backgroundColor: theme.colors.textPrimary,
              color: theme.colors.background,
            }}
          >
            {sceneData.ctaLabel || "Tap to begin"}
          </span>
        </motion.div>
      </button>
    </SceneShell>
  );
}
