export interface StoredSpotifyAuth {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

const AUTH_STORAGE_KEY = "novia.spotify.auth";
const PKCE_PREFIX = "novia.spotify.pkce.";

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function generateCodeVerifier(): string {
  const values = new Uint8Array(32);
  crypto.getRandomValues(values);
  return base64UrlEncode(values.buffer);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return base64UrlEncode(digest);
}

export function generateState(): string {
  const values = new Uint8Array(16);
  crypto.getRandomValues(values);
  return base64UrlEncode(values.buffer);
}

export function storePkceVerifier(state: string, verifier: string): void {
  localStorage.setItem(`${PKCE_PREFIX}${state}`, verifier);
}

export function readPkceVerifier(state: string): string | null {
  return localStorage.getItem(`${PKCE_PREFIX}${state}`);
}

export function clearPkceVerifier(state: string): void {
  localStorage.removeItem(`${PKCE_PREFIX}${state}`);
}

export function storeSpotifyAuth(auth: StoredSpotifyAuth): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export function readSpotifyAuth(): StoredSpotifyAuth | null {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredSpotifyAuth;
  } catch {
    return null;
  }
}

export function clearSpotifyAuth(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function buildSpotifyAuthorizeUrl({
  clientId,
  redirectUri,
  state,
  challenge,
}: {
  clientId: string;
  redirectUri: string;
  state: string;
  challenge: string;
}): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state",
    state,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function exchangeSpotifyCodeForToken({
  clientId,
  code,
  redirectUri,
  codeVerifier,
}: {
  clientId: string;
  code: string;
  redirectUri: string;
  codeVerifier: string;
}): Promise<StoredSpotifyAuth> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to exchange Spotify authorization code.");
  }

  const data = (await response.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
}

export async function refreshSpotifyAccessToken({
  clientId,
  refreshToken,
}: {
  clientId: string;
  refreshToken: string;
}): Promise<StoredSpotifyAuth> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to refresh Spotify access token.");
  }

  const data = (await response.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? refreshToken,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
}
