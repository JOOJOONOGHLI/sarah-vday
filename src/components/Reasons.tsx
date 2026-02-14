"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { clsx } from "clsx";

interface ReasonsProps {
  reasons: string[];
}

export function Reasons({ reasons }: ReasonsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {reasons.map((reason, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/30 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.6) 0%, rgba(20, 20, 20, 0.6) 100%)'
          }}
        >
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
          >
            <span className="font-serif text-xl text-white flex items-center gap-4">
              <Heart className={clsx("w-5 h-5 transition-all", expandedIndex === index ? "fill-pink-500 text-pink-500 scale-110" : "text-pink-400/50")} />
              <span className={clsx("transition-colors", expandedIndex === index && "text-pink-400")}>
                Reason #{index + 1}
              </span>
            </span>
            <ChevronDown 
              className={clsx(
                "w-6 h-6 text-pink-400/60 transition-transform duration-300",
                expandedIndex === index && "rotate-180 text-pink-400"
              )} 
            />
          </button>
          
          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-6 pt-0 text-gray-300 leading-relaxed text-lg border-t border-white/5 mt-2 pt-4">
                  {reason}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
