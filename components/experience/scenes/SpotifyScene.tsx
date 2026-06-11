"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SceneShell } from "@/components/experience/renderer/SceneShell";
import type { SceneComponentProps } from "@/components/experience/renderer/SceneRegistry";
import type { SpotifyPlayerSceneBlock } from "@/components/experience/types/experience";
import { theme } from "@/lib/theme";

export default function SpotifyScene({ block, onNext, spotify }: SceneComponentProps) {
  const sceneData = block as SpotifyPlayerSceneBlock;
  const [showMeta, setShowMeta] = useState(false);
  const hasPlaybackConfig = Boolean(spotify?.playback?.isAuthenticated);

  useEffect(() => {
    if (!spotify?.hasStartedPlayback || showMeta) {
      return;
    }

    const timer = setTimeout(() => {
      setShowMeta(true);
    }, sceneData.revealDelayMs ?? 450);

    return () => clearTimeout(timer);
  }, [sceneData.revealDelayMs, showMeta, spotify?.hasStartedPlayback]);

  const canContinue = Boolean(spotify?.hasStartedPlayback) && showMeta;

  const handlePlay = () => {
    if (hasPlaybackConfig) {
      spotify?.startPlayback(sceneData.spotifyUrl);
    } else {
      spotify?.startPlayback(sceneData.spotifyUrl);
    }
  };

  return (
    <SceneShell contentClassName="text-center">
      <div className="space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-2xl leading-relaxed"
          style={{
            fontFamily: theme.typography.displayFamily,
            color: theme.colors.textPrimary,
          }}
        >
          Press play on our song
        </motion.p>

        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: theme.typography.bodyFamily,
            color: theme.colors.textSecondary,
          }}
        >
          Tap once to start the music. It will keep playing as you continue through the story.
        </p>

        {!spotify?.hasStartedPlayback ? (
          <button
            type="button"
            onClick={handlePlay}
            className="rounded-full px-6 py-3 text-sm tracking-[0.12em] font-medium"
            style={{
              backgroundColor: theme.colors.textPrimary,
              color: theme.colors.background,
            }}
          >
            Play
          </button>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-sm uppercase tracking-[0.14em]"
            style={{
              fontFamily: theme.typography.bodyFamily,
              color: theme.colors.accent,
            }}
          >
              Playing now
          </motion.p>
        )}

        <div className="min-h-16">
          {showMeta && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-1"
            >
              <p
                className="text-xl"
                style={{
                  fontFamily: theme.typography.displayFamily,
                  color: theme.colors.textPrimary,
                }}
              >
                {sceneData.songTitle}
              </p>
              <p
                className="text-sm uppercase tracking-[0.14em]"
                style={{
                  fontFamily: theme.typography.bodyFamily,
                  color: theme.colors.textSecondary,
                }}
              >
                {sceneData.artistName}
              </p>
            </motion.div>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="rounded-full px-8 py-3 text-sm tracking-[0.14em] font-medium disabled:pointer-events-none disabled:opacity-40"
          style={{
            backgroundColor: theme.colors.accent,
            color: "white",
          }}
        >
          {sceneData.continueLabel || "Continue"}
        </button>
      </div>
    </SceneShell>
  );
}
