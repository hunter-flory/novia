/**
 * Fallback scene for unknown or unregistered scene types.
 * Ensures app never crashes on unrecognized scene blocks.
 */

"use client";

import { motion } from "motion/react";
import type { SceneComponentProps } from "@/components/experience/renderer/SceneRegistry";
import { SceneShell } from "@/components/experience/renderer/SceneShell";
import { theme } from "@/lib/theme";

export default function FallbackScene({ onNext }: SceneComponentProps) {
  return (
    <SceneShell contentClassName="text-center">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <p
            className="text-2xl leading-relaxed"
            style={{
              color: theme.colors.textPrimary,
              fontFamily: theme.typography.displayFamily,
            }}
          >
            Scene not found
          </p>
          <p
            className="text-base leading-relaxed"
            style={{
              color: theme.colors.textSecondary,
              fontFamily: theme.typography.bodyFamily,
            }}
          >
            This scene isn&apos;t available yet. Let&apos;s continue.
          </p>
          <button
            type="button"
            onClick={onNext}
            className="rounded-full px-8 py-3 text-sm tracking-[0.14em] font-medium"
            style={{
              backgroundColor: theme.colors.textPrimary,
              color: theme.colors.background,
            }}
          >
            Continue
          </button>
        </motion.div>
      </div>
    </SceneShell>
  );
}
