"use client";

import { motion } from "framer-motion";

interface HeroProps {
  name: string;
  nicknames: string[];
}

export function Hero({ name, nicknames }: HeroProps) {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 bg-red-100 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-rose-100 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="block text-red-500 font-serif italic text-xl md:text-2xl mb-4">
          Happy Valentine's Day
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-red-900 mb-6 tracking-tight">
          {name}
        </h1>
        <p className="text-stone-500 text-lg md:text-xl max-w-md mx-auto">
          To my {nicknames.join(", my ")}...
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 animate-bounce text-red-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
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
    </section>
  );
}
