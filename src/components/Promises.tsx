"use client";

import { motion } from "framer-motion";

interface PromisesProps {
  promises: string[];
}

export function Promises({ promises }: PromisesProps) {
  return (
    <div className="grid gap-6">
      {promises.map((promise, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ x: 10 }}
          className="flex items-start gap-5 p-6 glass rounded-2xl border border-white/10 hover:border-pink-500/30 transition-all duration-300 group"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.6) 0%, rgba(20, 20, 20, 0.6) 100%)'
          }}
        >
          <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white font-serif font-bold text-lg shadow-lg group-hover:scale-110 transition-transform glow">
            {index + 1}
          </span>
          <p className="text-gray-300 leading-relaxed font-medium text-lg pt-1 group-hover:text-white transition-colors">
            {promise}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
