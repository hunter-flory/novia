"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
//import IntroScene from "@/components/experience/scenes/IntroScene";
import MemoryScene from "@/components/experience/scenes/MemoryScene";
import TwistScene from "@/components/experience/scenes/TwistScene";
import EnvelopeScene from "@/components/experience/scenes/EnvelopeScene";
import QuestionScene from "@/components/experience/scenes/QuestionScene";

const demoMoment = {
  senderName: "Hunter",
  recipientName: "Anyoly",
  memories: [
    {
      imageUrl: "https://picsum.photos/600/800?1",
      caption: "Do you remember this day?",
    },
    {
      imageUrl: "https://picsum.photos/600/800?2",
      caption: "I still think about it.",
    },
  ],
};

const TOTAL_SCENES = 6;

export default function ExperiencePlayer() {
  const [currentScene, setCurrentScene] = useState(0);

  const goNext = () => {
    setCurrentScene((prev) => Math.min(prev + 1, TOTAL_SCENES - 1));
  };

  const sceneContent = (() => {
    switch (currentScene) {
      case 0:
        return (
        //   <IntroScene
        //     recipientName={demoMoment.recipientName}
        //     senderName={demoMoment.senderName}
        //     onNext={goNext}
        //   />
        null // skipping intro now
        );
      case 1:
        return (
          <MemoryScene
            imageUrl={demoMoment.memories[0].imageUrl}
            caption={demoMoment.memories[0].caption}
            onNext={goNext}
          />
        );
      case 2:
        return (
          <MemoryScene
            imageUrl={demoMoment.memories[1].imageUrl}
            caption={demoMoment.memories[1].caption}
            onNext={goNext}
          />
        );
      case 3:
        return <TwistScene onNext={goNext} />;
      case 4:
        return <EnvelopeScene onNext={goNext} />;
      default:
        return <QuestionScene />;
    }
  })();

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden bg-[#FAF6F0] text-[#1E1E1E]"
      style={{ fontFamily: '"Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,122,140,0.18),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(217,122,140,0.12),transparent_45%)]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, y: 18, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.995 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative z-10 h-full"
        >
          {sceneContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
