"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Heart } from "lucide-react";

interface ValentineModalProps {
  onAccept: () => void;
}

export function ValentineModal({ onAccept }: ValentineModalProps) {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [particles, setParticles] = useState<Array<{x: number, y: number, scale: number, delay: number}>>([]);

  useEffect(() => {
    if (isAccepted) {
      const newParticles = Array.from({ length: 30 }).map(() => ({
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 1) * 300 - 20,
        scale: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 0.3
      }));
      setParticles(newParticles);
    }
  }, [isAccepted]);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    setTimeout(() => {
      onAccept();
    }, 2500);
  };

  const getNoText = () => {
    const texts = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Please?",
      "Come on...",
      "You're breaking my heart!",
      "One more chance?",
      "Pretty please?",
      "I'll be sad...",
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  return (
    <AnimatePresence>
      {!isAccepted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-pink-500/10 animate-gradient" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
            className="glass p-10 md:p-16 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-white/20 relative overflow-visible"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)'
            }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-serif text-white mb-12 glow-text"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Will you be my Valentine?
            </motion.h2>

            <div className="flex flex-col gap-6 items-center justify-center">
              {/* Yes Option */}
              <label className="flex items-center gap-5 cursor-pointer group w-full max-w-[250px] relative">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={handleYesClick}
                    checked={isAccepted}
                  />
                  <div className="w-10 h-10 border-2 border-pink-500/30 rounded-xl flex items-center justify-center peer-checked:bg-gradient-to-br peer-checked:from-pink-500 peer-checked:to-pink-600 peer-checked:border-pink-500 transition-all shadow-lg peer-checked:shadow-pink-500/50 z-20 relative bg-dark-800">
                    <Check className="w-6 h-6 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Floating Hearts Animation */}
                  {isAccepted && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                      {particles.map((p, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                          animate={{ 
                            opacity: 0, 
                            scale: p.scale,
                            x: p.x,
                            y: p.y
                          }}
                          transition={{ duration: 2, ease: "easeOut", delay: p.delay }}
                          className="absolute"
                        >
                          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-2xl font-serif text-white group-hover:text-pink-400 transition-colors font-semibold">
                  Yes
                </span>
              </label>

              {/* No Option */}
              <label 
                className="flex items-center gap-5 cursor-pointer group w-full max-w-[250px]"
                onClick={(e) => {
                  e.preventDefault();
                  handleNoClick();
                }}
              >
                <div className="relative">
                  <div className="w-10 h-10 border-2 border-white/20 rounded-xl flex items-center justify-center transition-all bg-dark-800 group-hover:border-white/30">
                    <X className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
                <span className="text-2xl font-serif text-gray-500 group-hover:text-gray-400 transition-colors">
                  {getNoText()}
                </span>
              </label>
            </div>
            
            {noCount > 0 && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 text-pink-400/70 text-sm italic"
              >
                (The "No" button is just for decoration 😉)
              </motion.p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
