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

  // Generate particles only once when accepted to avoid re-render randomization issues
  useEffect(() => {
    if (isAccepted) {
      const newParticles = Array.from({ length: 20 }).map(() => ({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 1) * 200 - 20, // Mostly upwards
        scale: Math.random() * 1 + 0.5,
        delay: Math.random() * 0.2
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
    }, 2000); // Give enough time for the animation
  };

  const getNoText = () => {
    const texts = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  return (
    <AnimatePresence>
      {!isAccepted && ( // Keep modal mounted until we decide to unmount it manually? 
                        // Actually we want the modal to stay visible while animation plays, 
                        // then onAccept triggers parent to hide it.
                        // But wait, the parent hides it by removing it from DOM?
                        // The parent uses: {isLocked && <ValentineModal ... />} ?
                        // No, parent uses: <ValentineModal onAccept={() => setIsLocked(false)} />
                        // And the modal itself handles its own exit animation via AnimatePresence?
                        // The parent code: <ValentineModal onAccept={() => setIsLocked(false)} />
                        // The modal code: <AnimatePresence>{!isAccepted && (...)}</AnimatePresence>
                        // Wait! If isAccepted is true, the modal content is removed from DOM immediately!
                        // That's why the animation isn't seen!
                        // We need to KEEP the modal content visible while isAccepted is true, 
                        // and ONLY hide it when the parent unmounts it or we handle the exit differently.
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full text-center border border-red-100 relative"
            // Removed overflow-hidden so hearts can fly out
          >
            <h2 className="text-3xl md:text-4xl font-serif text-red-900 mb-8 relative z-10">
              Will you be my Valentine?
            </h2>

            <div className="flex flex-col gap-4 items-center justify-center relative z-10">
              {/* Yes Option */}
              <label className="flex items-center gap-4 cursor-pointer group w-full max-w-[200px] relative">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={handleYesClick}
                    checked={isAccepted}
                  />
                  <div className="w-8 h-8 border-2 border-red-300 rounded flex items-center justify-center peer-checked:bg-red-500 peer-checked:border-red-500 transition-colors z-20 relative bg-white peer-checked:bg-red-500">
                    <Check className="w-5 h-5 text-white opacity-0 peer-checked:opacity-100" />
                  </div>
                  
                  {/* Floating Hearts Animation on Check */}
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
                          transition={{ duration: 1.5, ease: "easeOut", delay: p.delay }}
                          className="absolute"
                        >
                          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xl font-serif text-stone-700 group-hover:text-red-700 transition-colors">
                  Yes
                </span>
              </label>

              {/* No Option */}
              <label 
                className="flex items-center gap-4 cursor-pointer group w-full max-w-[200px]"
                onClick={(e) => {
                  e.preventDefault();
                  handleNoClick();
                }}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    disabled
                  />
                  <div className="w-8 h-8 border-2 border-stone-300 rounded flex items-center justify-center transition-colors group-hover:border-red-200 bg-white">
                    <X className="w-5 h-5 text-stone-300" />
                  </div>
                </div>
                <span className="text-xl font-serif text-stone-500 group-hover:text-stone-600 transition-colors">
                  {getNoText()}
                </span>
              </label>
            </div>
            
            {noCount > 0 && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-red-400 text-sm italic relative z-10"
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
