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
    <div className="relative pl-12 space-y-24 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[3px] before:bg-gradient-to-b before:from-pink-500 before:via-pink-500/50 before:to-transparent">
      {memories.map((memory, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          <motion.div 
            className="absolute -left-[43px] top-10 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 border-4 border-dark-900 shadow-lg flex items-center justify-center z-10 glow"
            whileHover={{ scale: 1.2 }}
          >
            <div className="w-3 h-3 rounded-full bg-white" />
          </motion.div>
          
          <motion.div 
            className="glass p-6 sm:p-8 rounded-3xl overflow-hidden border border-white/10 hover:border-pink-500/30 transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.6) 0%, rgba(20, 20, 20, 0.6) 100%)'
            }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-6">
               <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500/20 to-pink-600/20 text-pink-400 text-sm font-bold uppercase tracking-widest rounded-full border border-pink-500/30">
                Memory #{memory.date}
              </span>
            </div>
            
            {memory.image && (
              <div className="relative w-full min-h-[400px] sm:min-h-[500px] rounded-2xl overflow-hidden mb-8 bg-black/40 border border-white/10 flex items-center justify-center">
                <Image
                  src={memory.image}
                  alt={`Memory ${memory.date}`}
                  width={1200}
                  height={1200}
                  className="object-contain w-full h-auto max-h-[80vh]"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={index < 2}
                />
              </div>
            )}
            
            <p className="text-gray-300 text-xl sm:text-2xl font-serif leading-relaxed">
              {memory.description}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
