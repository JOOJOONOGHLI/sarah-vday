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
        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-red-900 text-white font-serif text-lg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-200/50"
      >
        <Mail className="w-5 h-5" />
        <span className="relative z-10">{triggerText}</span>
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-lg w-full p-8 md:p-12 rounded-2xl shadow-2xl relative max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="prose prose-stone prose-lg font-serif">
                {content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-stone-700 leading-relaxed">
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
