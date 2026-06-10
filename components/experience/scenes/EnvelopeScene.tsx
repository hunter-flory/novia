"use client";

import { useState } from "react";
import { motion } from "motion/react";

type EnvelopeSceneProps = {
  onNext: () => void;
};

export default function EnvelopeScene({ onNext }: EnvelopeSceneProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6">
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: isOpen ? 1 : 0.985 }}
        className="relative h-[250px] w-full max-w-[340px] rounded-[28px] border border-[#d9c4b9] bg-[#fff7f0] shadow-[0_18px_36px_rgba(0,0,0,0.12)]"
        aria-label="Open envelope"
      >
        <motion.div
          className="absolute inset-x-0 top-0 h-[58%] origin-top rounded-t-[28px] bg-[#f7e8dc]"
          animate={{ rotateX: isOpen ? 170 : 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        />

        <motion.div
          initial={false}
          animate={{ y: isOpen ? -96 : 10, opacity: 1 }}
          transition={{ duration: 0.95, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-x-4 bottom-4 rounded-[20px] border border-[#eadfd5] bg-[#fffdfb] px-6 py-5 text-center text-[15px] leading-relaxed text-[#1E1E1E]/85"
        >
          Every memory with you became my favorite part of the story.
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mt-12"
      >
        <button
          type="button"
          onClick={onNext}
          disabled={!isOpen}
          className="rounded-full bg-[#1E1E1E] px-8 py-3 text-sm tracking-[0.14em] text-[#FAF6F0] disabled:pointer-events-none disabled:opacity-0"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
