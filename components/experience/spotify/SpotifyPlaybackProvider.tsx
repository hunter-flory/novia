"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { SpotifyPlaybackState, SpotifyPlaybackConfig } from "@/components/experience/types/experience";
import {
  buildSpotifyAuthorizeUrl,
  clearPkceVerifier,
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
  readPkceVerifier,
  readSpotifyAuth,
  refreshSpotifyAccessToken,
  storePkceVerifier,
  storeSpotifyAuth,
  exchangeSpotifyCodeForToken,
} from "@/components/experience/spotify/spotifyAuth";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify?: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }) => {
        connect: () => Promise<boolean>;
        disconnect: () => void;
        addListener: (eventName: string, callback: (...args: never[]) => void) => void;
        removeListener: (eventName: string, callback: (...args: never[]) => void) => void;
        togglePlay: () => Promise<void>;
        activateElement?: () => Promise<void>;
        getCurrentState: () => Promise<unknown>;
      };
    };
  }
}

interface SpotifyPlaybackContextValue {
  playback: SpotifyPlaybackState;
  startPlayback: (spotifyUrl: string) => void;
}

const SpotifyPlaybackContext = ({ children }: { children: ReactNode }) => children;

export function useSpotifyPlaybackConfig(): SpotifyPlaybackConfig | null {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return null;
  }

  return {
    clientId,
    redirectUri,
    scope:
      "streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state",
  };
}

export default function SpotifyPlaybackProvider({ children }: { children: ReactNode }) {
  return <SpotifyPlaybackContext>{children}</SpotifyPlaybackContext>;
}
