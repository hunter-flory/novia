/**
 * Demo experience object representing a romantic card flow.
 * Structured as Experience JSON, consumed by ExperienceRenderer.
 */

import type { Experience } from "@/components/experience/types/experience";
import { theme } from "@/lib/theme";

export const demoExperience: Experience = {
  id: "demo-proposal-card",
  version: 1,
  meta: {
    title: "A Special Moment",
    senderName: "Hunter",
    recipientName: "Anyoly",
    locale: "en-US",
  },
  theme,
  animationPreset: "romantic-soft",
  scenes: [
    {
      id: "scene-intro",
      type: "intro",
      heading: "For Anyoly",
      subheading: "A small story waits here.",
      ctaLabel: "Tap to begin",
    },
    {
      id: "scene-song",
      type: "spotify-player",
      spotifyUrl:
        "https://open.spotify.com/track/3vxsXUUU9jUJrGNP4APtj3?si=d6ae49dc26854fca",
      songTitle: "Te Amo",
      artistName: "Franco De Vita",
      continueLabel: "Continue",
      revealDelayMs: 550,
    },
    {
      id: "scene-memory-1",
      type: "memory-photo",
      imageUrl: "https://picsum.photos/600/800?1",
      caption: "Do you remember this day?",
      alt: "A cherished memory",
    },
    {
      id: "scene-memory-2",
      type: "memory-photo",
      imageUrl: "https://picsum.photos/600/800?2",
      caption: "I still think about it.",
      alt: "Another cherished moment",
    },
    {
      id: "scene-twist",
      type: "narrative-text",
      line1: "I never told you something about that day...",
      line2: "It was the moment I realized something.",
    },
    {
      id: "scene-letter",
      type: "envelope-reveal",
      letterText: "Every memory with you became my favorite part of the story.",
      continueLabel: "Continue",
    },
    {
      id: "scene-proposal",
      type: "choice",
      prompt: "Will you be my girlfriend?",
      yesLabel: "Yes ❤️",
      noLabel: "No 😡",
      celebrationText: "SHE SAID YES ❤️",
    },
  ],
};

export default demoExperience;
