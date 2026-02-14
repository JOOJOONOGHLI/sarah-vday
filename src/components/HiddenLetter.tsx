"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";

interface HiddenLetterProps {
  triggerText: string;
  content: string;
}

export function HiddenLetter({ triggerText, content }: HiddenLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-serif text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,8,68,0.4)] active:scale-95 glow"
      >
        <Mail className="w-6 h-6" />
        <span className="relative z-10 font-semibold tracking-wide">{triggerText}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-w-2xl w-full p-10 md:p-14 rounded-3xl shadow-2xl relative max-h-[85vh] overflow-y-auto border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)'
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Close letter"
              >
                <X className="w-7 h-7" />
              </button>
              
              <div className="prose prose-invert prose-xl font-serif max-w-none">
                {content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-gray-200 leading-relaxed text-xl md:text-2xl first:mt-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
