"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

interface NotesGridProps {
  reasons: string[];
  promises: string[];
  memories: string[];
}

export function NotesGrid({ reasons, promises, memories }: NotesGridProps) {
  // Combine all items and ensure we have at least 24 by repeating if necessary
  const allItems = [...reasons, ...promises, ...memories];
  const filledItems = Array.from({ length: 24 }, (_, i) => allItems[i % allItems.length]);
  
  // Shuffle deterministically or just use as is. Let's shuffle slightly based on index to mix types.
  // Actually simple mapping is fine.
  
  const [openNoteIndex, setOpenNoteIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
        {filledItems.map((note, index) => (
          <NoteCard 
            key={index} 
            index={index} 
            note={note} 
            isOpen={openNoteIndex === index}
            onClick={() => setOpenNoteIndex(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {openNoteIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm"
            onClick={() => setOpenNoteIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center relative"
            >
              <div className="text-red-900 font-serif text-2xl mb-4">Note #{openNoteIndex + 1}</div>
              <p className="text-stone-600 text-lg leading-relaxed">{filledItems[openNoteIndex]}</p>
              <button 
                onClick={() => setOpenNoteIndex(null)}
                className="mt-6 text-sm text-stone-400 hover:text-stone-600 underline"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NoteCard({ index, note, isOpen, onClick }: { index: number, note: string, isOpen: boolean, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        "aspect-square rounded-lg flex items-center justify-center text-xl font-serif transition-colors duration-300",
        isOpen ? "bg-red-900 text-white" : "bg-white text-red-900 shadow-sm hover:shadow-md border border-red-100"
      )}
    >
      {index + 1}
    </motion.button>
  );
}
