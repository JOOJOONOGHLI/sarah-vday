"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { X } from "lucide-react";

interface NotesGridProps {
  notes: string[];
}

export function NotesGrid({ notes }: NotesGridProps) {
  const filledItems = notes.slice(0, 24);
  
  const [openNoteIndex, setOpenNoteIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setOpenNoteIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center relative border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)'
              }}
            >
              <button
                onClick={() => setOpenNoteIndex(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Close note"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-pink-400 font-serif text-3xl mb-6 glow-text">Note #{openNoteIndex + 1}</div>
              <p className="text-gray-200 text-xl leading-relaxed">{filledItems[openNoteIndex]}</p>
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
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        "aspect-square rounded-2xl flex items-center justify-center text-2xl font-serif font-bold transition-all duration-300 shadow-lg relative overflow-hidden",
        isOpen 
          ? "bg-gradient-to-br from-pink-500 to-pink-600 text-white glow" 
          : "glass border border-white/20 text-pink-400 hover:border-pink-500/50"
      )}
      style={!isOpen ? {
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(20, 20, 20, 0.8) 100%)'
      } : undefined}
    >
      <span className="relative z-10">{index + 1}</span>
      {!isOpen && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
}
