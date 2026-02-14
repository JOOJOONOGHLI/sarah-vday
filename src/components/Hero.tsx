"use client";

import { motion } from "framer-motion";

interface HeroProps {
  name: string;
  nicknames: string[];
}

export function Hero({ name, nicknames }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-pink-500/5 animate-gradient" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <span className="block text-pink-400 font-serif italic text-xl md:text-2xl mb-6 tracking-widest uppercase">
            Happy Valentine's Day
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 tracking-tighter glow-text">
            {name}
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
            To my {nicknames.map((nickname, index) => (
              <span key={index}>
                <span className="text-pink-400 font-semibold">{nickname}</span>
                {index < nicknames.length - 1 && ", my "}
              </span>
            ))}...
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-20 flex flex-col items-center gap-3 text-pink-400/60"
      >
        <span className="text-lg md:text-xl font-serif italic tracking-wider">Play before viewing</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
