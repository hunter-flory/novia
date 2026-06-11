/**
 * Registry mapping scene type strings to React scene components.
 * Handles unknown scene types gracefully by routing to FallbackScene.
 */

import type { ComponentType } from "react";
import type { SceneBlock } from "@/components/experience/types/experience";
import type { SpotifyPlaybackState } from "@/components/experience/types/experience";

import IntroScene from "@/components/experience/scenes/IntroScene";
import MemoryPhotoScene from "@/components/experience/scenes/MemoryPhotoScene";
import NarrativeScene from "@/components/experience/scenes/NarrativeScene";
import EnvelopeRevealScene from "@/components/experience/scenes/EnvelopeRevealScene";
import ChoiceScene from "@/components/experience/scenes/ChoiceScene";
import SpotifyScene from "@/components/experience/scenes/SpotifyScene";
import FallbackScene from "@/components/experience/scenes/FallbackScene";

/**
 * Scene component props contract.
 * All scene components must accept block data and runtime actions.
 */
export interface SceneComponentProps {
  block: SceneBlock;
  onNext: () => void;
  spotify?: {
    hasStartedPlayback: boolean;
    startPlayback: (spotifyUrl: string) => void;
    playback?: SpotifyPlaybackState;
  };
}

type SceneComponentType = ComponentType<SceneComponentProps>;

/**
 * Registry of all known scene types.
 */
export const sceneRegistry: Record<string, SceneComponentType> = {
  intro: IntroScene,
  "spotify-player": SpotifyScene,
  "memory-photo": MemoryPhotoScene,
  "narrative-text": NarrativeScene,
  "envelope-reveal": EnvelopeRevealScene,
  choice: ChoiceScene,
};

/**
 * Get scene component by type ID.
 * Falls back to FallbackScene if type is unknown.
 */
export function getSceneComponent(sceneType: string): SceneComponentType {
  return sceneRegistry[sceneType] ?? FallbackScene;
}

/**
 * Check if a scene type is registered.
 */
export function isSceneTypeRegistered(sceneType: string): boolean {
  return sceneType in sceneRegistry;
}
