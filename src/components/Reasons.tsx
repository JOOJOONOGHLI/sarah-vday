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
        <div 
          key={index}
          className="bg-white rounded-xl overflow-hidden border border-red-50 shadow-sm"
        >
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50/50 transition-colors"
          >
            <span className="font-serif text-lg text-red-900 flex items-center gap-3">
              <Heart className={clsx("w-4 h-4", expandedIndex === index ? "fill-red-500 text-red-500" : "text-red-300")} />
              Reason #{index + 1}
            </span>
            <ChevronDown 
              className={clsx(
                "w-5 h-5 text-red-300 transition-transform duration-300",
                expandedIndex === index && "rotate-180"
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
                <div className="p-4 pt-0 text-stone-600 leading-relaxed">
                  {reason}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
