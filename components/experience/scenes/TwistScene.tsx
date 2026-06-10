"use client";

import { motion } from "motion/react";

type TwistSceneProps = {
  onNext: () => void;
};

export default function TwistScene({ onNext }: TwistSceneProps) {
  return (
    <button
      type="button"
      onClick={onNext}
      className="flex h-full w-full items-center justify-center px-8 text-center"
      aria-label="Continue"
    >
      <div className="space-y-7">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-2xl leading-relaxed sm:text-3xl"
          style={{ fontFamily: '"Didot", "Bodoni MT", "Times New Roman", serif' }}
        >
          I never told you something about that day...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.15, ease: "easeOut" }}
          className="text-lg text-[#1E1E1E]/80 sm:text-xl"
        >
          It was the moment I realized something.
        </motion.p>
      </div>
    </button>
  );
}
