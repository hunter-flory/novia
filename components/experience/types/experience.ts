/**
 * Canonical types for the romantic card rendering engine.
 * All scene blocks, themes, animations, and runtime state are defined here.
 */

/* Theme and styling tokens */

export interface Theme {
  colors: {
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    border: string;
  };
  radius: {
    scene: string;
    card: string;
    button: string;
  };
  shadow: {
    soft: string;
    card: string;
  };
  typography: {
    displayFamily: string;
    bodyFamily: string;
  };
}

/* Animation presets */

export interface TransitionSpec {
  durationMs: number;
  ease: string;
  offsetY?: number;
  scale?: number;
}

export interface AnimationPreset {
  sceneEnter: TransitionSpec;
  sceneExit: TransitionSpec;
  contentReveal: TransitionSpec;
  emphasis: TransitionSpec;
  reducedMotionStrategy: "instant" | "fade-only";
}

export type AnimationPresetName = "romantic-soft" | "minimal" | "none";

/* Scene block types */

export interface BaseSceneBlock {
  id: string;
  type: string;
  transition?: Partial<TransitionSpec>;
  layout?: Record<string, unknown>;
}

export interface IntroSceneBlock extends BaseSceneBlock {
  type: "intro";
  heading: string;
  subheading?: string;
  ctaLabel?: string;
}

export interface MemoryPhotoSceneBlock extends BaseSceneBlock {
  type: "memory-photo";
  imageUrl: string;
  caption?: string;
  alt?: string;
}

export interface NarrativeSceneBlock extends BaseSceneBlock {
  type: "narrative-text";
  line1: string;
  line2?: string;
}

export interface EnvelopeRevealSceneBlock extends BaseSceneBlock {
  type: "envelope-reveal";
  letterText: string;
  continueLabel?: string;
}

export interface SpotifyPlayerSceneBlock extends BaseSceneBlock {
  type: "spotify-player";
  spotifyUrl: string;
  songTitle: string;
  artistName: string;
  continueLabel?: string;
  revealDelayMs?: number;
}

export interface SpotifyPlaybackConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
}

export interface SpotifyPlaybackState {
  isConfigured: boolean;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isReady: boolean;
  isPlaying: boolean;
  trackId?: string;
  error?: string;
}

export interface ChoiceSceneBlock extends BaseSceneBlock {
  type: "choice";
  prompt: string;
  yesLabel?: string;
  noLabel?: string;
  celebrationText?: string;
}

export interface UnknownSceneBlock extends BaseSceneBlock {
  type: string;
  payload?: Record<string, unknown>;
}

export type SceneBlock =
  | IntroSceneBlock
  | SpotifyPlayerSceneBlock
  | MemoryPhotoSceneBlock
  | NarrativeSceneBlock
  | EnvelopeRevealSceneBlock
  | ChoiceSceneBlock
  | UnknownSceneBlock;

/* Experience JSON schema */

export interface ExperienceMeta {
  title?: string;
  senderName?: string;
  recipientName?: string;
  locale?: string;
}

export interface Experience {
  id: string;
  version: 1;
  meta: ExperienceMeta;
  theme: Theme;
  animationPreset: AnimationPresetName;
  scenes: SceneBlock[];
}

/* Runtime state and actions */

export interface ExperienceRuntimeState {
  activeIndex: number;
  sceneCount: number;
  direction: 1 | -1;
  completed: boolean;
  reducedMotion: boolean;
}

export interface ExperienceRuntimeActions {
  goNext: () => void;
  goPrev: () => void;
  goTo: (index: number) => void;
  restart: () => void;
}

export interface ExperienceRuntimeContext {
  state: ExperienceRuntimeState;
  actions: ExperienceRuntimeActions;
}
