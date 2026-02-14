"use client";

import { motion } from "framer-motion";

interface PromisesProps {
  promises: string[];
}

export function Promises({ promises }: PromisesProps) {
  return (
    <div className="grid gap-4">
      {promises.map((promise, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="flex items-start gap-4 p-4 bg-white/50 rounded-lg border border-red-50/50"
        >
          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-serif text-sm mt-0.5">
            {index + 1}
          </span>
          <p className="text-stone-700 leading-relaxed font-medium">
            {promise}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
