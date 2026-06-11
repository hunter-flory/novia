/**
 * EnvelopeRevealScene: Interactive envelope with letter reveal.
 * User taps to open the envelope and reveal a letter message inside.
 */

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { SceneComponentProps } from "@/components/experience/renderer/SceneRegistry";
import { SceneShell } from "@/components/experience/renderer/SceneShell";
import type { EnvelopeRevealSceneBlock } from "@/components/experience/types/experience";
import { theme } from "@/lib/theme";

export default function EnvelopeRevealScene({
  block,
  onNext,
}: SceneComponentProps) {
  const sceneData = block as EnvelopeRevealSceneBlock;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SceneShell contentClassName="text-center">
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: isOpen ? 1 : 0.985 }}
        className="relative h-[250px] w-full rounded-[28px] border shadow-[0_18px_36px_rgba(0,0,0,0.12)]"
        style={{
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
        }}
        aria-label="Open envelope"
      >
        <motion.div
          className="absolute inset-x-0 top-0 h-[58%] origin-top rounded-t-[28px]"
          animate={{ rotateX: isOpen ? 170 : 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            transformStyle: "preserve-3d",
            backgroundColor: theme.colors.textSecondary,
            opacity: 0.8,
          }}
        />

        <motion.div
          initial={false}
          animate={{ y: isOpen ? -96 : 10, opacity: 1 }}
          transition={{ duration: 0.95, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-x-4 bottom-4 rounded-[20px] border px-6 py-5 text-center text-[15px] leading-relaxed"
          style={{
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.background,
            color: theme.colors.textPrimary,
            fontFamily: theme.typography.bodyFamily,
          }}
        >
          {sceneData.letterText}
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mt-12"
      >
        <button
          type="button"
          onClick={onNext}
          disabled={!isOpen}
          className="rounded-full px-8 py-3 text-sm tracking-[0.14em] font-medium disabled:pointer-events-none disabled:opacity-0"
          style={{
            backgroundColor: theme.colors.textPrimary,
            color: theme.colors.background,
          }}
        >
          {sceneData.continueLabel || "Continue"}
        </button>
      </motion.div>
    </SceneShell>
  );
}
