/**
 * ChoiceScene: Interactive choice prompt with decision buttons.
 * Users can choose between affirmative or dodge option, with celebration state.
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import type { SceneComponentProps } from "@/components/experience/renderer/SceneRegistry";
import { SceneShell } from "@/components/experience/renderer/SceneShell";
import type { ChoiceSceneBlock } from "@/components/experience/types/experience";
import { theme } from "@/lib/theme";

interface Position {
  x: number;
  y: number;
}

export default function ChoiceScene({ block }: SceneComponentProps) {
  const sceneData = block as ChoiceSceneBlock;
  const [showQuestion, setShowQuestion] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [noPosition, setNoPosition] = useState<Position>({ x: 16, y: 18 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowQuestion(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const moveNoButton = () => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const buttonWidth = 110;
    const buttonHeight = 46;
    const padding = 8;

    const maxX = Math.max(padding, bounds.width - buttonWidth - padding);
    const maxY = Math.max(padding, bounds.height - buttonHeight - padding);

    setNoPosition({
      x: Math.random() * (maxX - padding) + padding,
      y: Math.random() * (maxY - padding) + padding,
    });
  };

  const celebrationText = useMemo(
    () => (
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-10 text-center"
      >
        <motion.p
          animate={{ scale: [1, 1.04, 1], opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="text-3xl leading-tight sm:text-4xl"
          style={{
            fontFamily: theme.typography.displayFamily,
            color: theme.colors.accent,
          }}
        >
          {sceneData.celebrationText || "SHE SAID YES ❤️"}
        </motion.p>
      </motion.div>
    ),
    [sceneData.celebrationText]
  );

  return (
    <SceneShell contentClassName="text-center">
      <div className="w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-2xl leading-relaxed"
          style={{
            fontFamily: theme.typography.displayFamily,
            color: theme.colors.textPrimary,
          }}
        >
          So I have one question...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showQuestion ? 1 : 0, y: showQuestion ? 0 : 12 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mt-5 text-3xl leading-snug"
          style={{
            fontFamily: theme.typography.displayFamily,
            color: theme.colors.textPrimary,
          }}
        >
          {sceneData.prompt}
        </motion.p>

        {!saidYes && (
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setSaidYes(true)}
              className="w-full rounded-full px-8 py-3 text-base font-medium shadow-[0_10px_26px_rgba(217,122,140,0.35)]"
              style={{
                backgroundColor: theme.colors.accent,
                color: "white",
              }}
            >
              {sceneData.yesLabel || "Yes ❤️"}
            </button>

            <div
              ref={containerRef}
              className="relative mt-5 h-44 w-full rounded-2xl border sm:h-48"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
              }}
            >
              <motion.button
                type="button"
                onClick={moveNoButton}
                onMouseEnter={moveNoButton}
                animate={{ x: noPosition.x, y: noPosition.y }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="absolute left-0 top-0 rounded-full border px-6 py-2 text-sm font-medium"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background,
                  color: theme.colors.textPrimary,
                }}
              >
                {sceneData.noLabel || "No 😡"}
              </motion.button>
            </div>
          </div>
        )}

        {saidYes && celebrationText}
      </div>
    </SceneShell>
  );
}
