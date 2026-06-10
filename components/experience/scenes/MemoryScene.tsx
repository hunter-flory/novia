"use client";

import { motion } from "motion/react";

type MemorySceneProps = {
  imageUrl: string;
  caption: string;
  onNext: () => void;
};

export default function MemoryScene({ imageUrl, caption, onNext }: MemorySceneProps) {
  return (
    <button
      type="button"
      onClick={onNext}
      className="flex h-full w-full items-center justify-center px-5 py-8"
      aria-label="Continue to the next memory"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="overflow-hidden rounded-[28px] bg-white/70 shadow-[0_14px_42px_rgba(0,0,0,0.12)]">
          <img src={imageUrl} alt={caption} className="h-[62vh] w-full object-cover" />
        </div>
        <p className="pt-6 text-center text-lg leading-relaxed text-[#1E1E1E]/85">{caption}</p>
      </motion.div>
    </button>
  );
}
