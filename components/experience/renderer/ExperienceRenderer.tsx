/**
 * Main orchestrator for the romantic card rendering engine.
 * Handles navigation state, scene routing, progress, and reduced-motion context.
 */

"use client";

import { useState, useCallback } from "react";
import type {
  Experience,
  ExperienceRuntimeState,
} from "@/components/experience/types/experience";
import { SceneFrame } from "@/components/experience/renderer/SceneFrame";
import { getSceneComponent } from "@/components/experience/renderer/SceneRegistry";
import { useReducedMotionPreference } from "@/components/experience/renderer/useReducedMotionPreference";

function extractSpotifyTrackId(input: string): string | null {
  const trimmed = input.trim();
  const trackPathMatch = trimmed.match(/track\/([a-zA-Z0-9]+)/);
  if (trackPathMatch?.[1]) {
    return trackPathMatch[1];
  }

  const uriMatch = trimmed.match(/^spotify:track:([a-zA-Z0-9]+)$/);
  if (uriMatch?.[1]) {
    return uriMatch[1];
  }

  return null;
}

interface ExperienceRendererProps {
  experience: Experience;
  onComplete?: () => void;
}

export function ExperienceRenderer({
  experience,
  onComplete,
}: ExperienceRendererProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotionPreference();
  const [spotifyTrackId, setSpotifyTrackId] = useState<string | null>(null);
  const [spotifyHasStartedPlayback, setSpotifyHasStartedPlayback] = useState(false);

  const sceneCount = experience.scenes.length;
  const activeScene = experience.scenes[activeIndex];

  const runtimeState: ExperienceRuntimeState = {
    activeIndex,
    sceneCount,
    direction: 1,
    completed: activeIndex === sceneCount - 1,
    reducedMotion: prefersReduced,
  };

  const handleNext = useCallback(() => {
    if (activeIndex < sceneCount - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (onComplete) {
      onComplete();
    }
  }, [activeIndex, sceneCount, onComplete]);

  const handleStartSpotifyPlayback = useCallback((spotifyUrl: string) => {
    const trackId = extractSpotifyTrackId(spotifyUrl);
    if (!trackId) {
      return;
    }

    setSpotifyTrackId((current) => (current === trackId ? current : trackId));
    setSpotifyHasStartedPlayback(true);
  }, []);

  const spotifyEmbedUrl = spotifyTrackId && spotifyHasStartedPlayback
    ? `https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&autoplay=1`
    : null;

  const showSpotifyDock = Boolean(spotifyEmbedUrl);

  return (
    <div className="relative">
      <SceneFrame
        sceneKey={activeIndex}
        animationPreset={experience.animationPreset}
        state={runtimeState}
      >
        <div className={showSpotifyDock ? "h-full pb-[84px]" : "h-full"}>
          <DynamicSceneRenderer
            sceneBlock={activeScene}
            onNext={handleNext}
            spotify={{
              hasStartedPlayback: spotifyHasStartedPlayback,
              startPlayback: handleStartSpotifyPlayback,
            }}
          />
        </div>
      </SceneFrame>

      {spotifyEmbedUrl && (
        <div
          className="absolute bottom-0 left-0 right-0 z-30 h-[64px] overflow-hidden border-t border-black/5 bg-[#F9F7F2] shadow-[0_-1px_0_rgba(255,255,255,0.35)]"
          aria-label="Spotify player dock"
        >
          <iframe
            src={spotifyEmbedUrl}
            width="100%"
            height="100%"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
            title="Spotify song player"
          />
        </div>
      )}
    </div>
  );
}

/**
 * Dynamic scene renderer that resolves component at render time.
 * The registry lookup is deterministic: same sceneBlock.type always returns same component.
 * This pattern is safe and required for the dynamic scene routing architecture.
 */
function DynamicSceneRenderer({
  sceneBlock,
  onNext,
  spotify,
}: {
  sceneBlock: Experience["scenes"][0];
  onNext: () => void;
  spotify?: {
    hasStartedPlayback: boolean;
    startPlayback: (spotifyUrl: string) => void;
  };
}) {
  const SceneComponent = getSceneComponent(sceneBlock.type);
  // eslint-disable-next-line react-hooks/static-components
  return <SceneComponent block={sceneBlock} onNext={onNext} spotify={spotify} />;
}

export default ExperienceRenderer;
