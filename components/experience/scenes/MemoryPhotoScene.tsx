/**
 * MemoryPhotoScene: Photo memory card with caption.
 * Displays an image and accompanying narrative caption.
 */

"use client";

import { motion } from "motion/react";
import type { SceneComponentProps } from "@/components/experience/renderer/SceneRegistry";
import { SceneShell } from "@/components/experience/renderer/SceneShell";
import type { MemoryPhotoSceneBlock } from "@/components/experience/types/experience";
import { theme } from "@/lib/theme";

export default function MemoryPhotoScene({ block, onNext }: SceneComponentProps) {
  const sceneData = block as MemoryPhotoSceneBlock;

  return (
    <SceneShell>
      <button
        type="button"
        onClick={onNext}
        className="w-full text-left"
        aria-label="Continue to the next memory"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, ease: "easeOut" }}
          className="w-full"
        >
          <div
            className="overflow-hidden rounded-[28px] shadow-[0_14px_42px_rgba(0,0,0,0.12)]"
            style={{ backgroundColor: theme.colors.surface }}
          >
            <img
              src={sceneData.imageUrl}
              alt={sceneData.alt || sceneData.caption || "Memory"}
              className="aspect-[4/5] w-full max-h-[60dvh] object-cover"
            />
          </div>
          {sceneData.caption && (
            <p
              className="pt-6 text-center text-lg leading-relaxed"
              style={{
                fontFamily: theme.typography.bodyFamily,
                color: theme.colors.textSecondary,
              }}
            >
              {sceneData.caption}
            </p>
          )}
        </motion.div>
      </button>
    </SceneShell>
  );
}
