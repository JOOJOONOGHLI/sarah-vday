"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Memory {
  date: string;
  description: string;
  image?: string;
}

interface MemoriesProps {
  memories: Memory[];
}

export function Memories({ memories }: MemoriesProps) {
  return (
    <div className="relative pl-8 space-y-20 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-red-100">
      {memories.map((memory, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -left-[29px] top-8 w-6 h-6 rounded-full bg-red-50 border-4 border-white shadow-sm flex items-center justify-center z-10">
            <div className="w-2 h-2 rounded-full bg-red-400" />
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-stone-100 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
               <span className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full">
                Memory #{memory.date}
              </span>
            </div>
            
            {memory.image && (
              <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-stone-100 shadow-inner">
                <Image
                  src={memory.image}
                  alt={`Memory ${memory.date}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={index < 2}
                />
              </div>
            )}
            
            <p className="text-stone-700 text-lg sm:text-xl font-serif leading-relaxed">
              {memory.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
