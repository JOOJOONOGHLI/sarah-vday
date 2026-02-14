"use client";

import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { HiddenLetter } from "@/components/HiddenLetter";
import { Confetti } from "@/components/Confetti";
import { NotesGrid } from "@/components/NotesGrid";
import { Reasons } from "@/components/Reasons";
import { Memories } from "@/components/Memories";
import { Promises } from "@/components/Promises";
import { Playlist } from "@/components/Playlist";
import { ValentineModal } from "@/components/ValentineModal";

// =================================================================================================
//  PERSONALIZATION SECTION - EDIT THESE CONSTANTS
// =================================================================================================

const girlfriendName = "My dear Sarah";
const myName = "Ryan";
const relationshipNicknames = ["Shay", "Love", "My Favorite Person"];

const reasonsILoveYou = [
  "The way you laugh at my terrible jokes.",
  "How you always know exactly what to say when I'm down.",
  "Your kindness towards everyone you meet.",
  "The way your eyes light up when you talk about your passions.",
  "How safe I feel when I'm with you.",
  "That you always want to leave things on a happy note",
  "Your hard work and dedication to your craft",
  "Just being you, every single day."
];

const favoriteMemories = [
  { date: "1", description: "The job interview", image: "/memories/job_interview.jpeg" },
  { date: "2", description: "Asking you to be my girlfriend in front of Steak 48", image: "/memories/Steak48.png" },
  { date: "3", description: "Big game when I convinced you to match the Stanford Dad/Cal mom theme", image: "/memories/big_game.jpg" },
  { date: "4", description: "NYE where shay was incredibly mast", image: "/memories/NYE.jpeg" },
  { date: "5", description: "Shay and Shay trip to Carmel when I had too many Celsius drinks and nearly died", image: "/memories/carmel.jpeg" },
  { date: "6", description: "Your bday at Bacari Beverly when you thought I was cheating on you", image: "/memories/bacari.jpg" },
  { date: "7", description: "Last Valentines day when you blew my mind with my favorite hoodie of all time (McLaren Hoodie)", image: "/memories/hoodie.png" },
  { date: "8", description: "Having Fuki Sushi, I just had to add it here because it was so gas and I miss it", image: "/memories/fuki.png" },
  { date: "9", description: "Shay visiting me in Miami when I was there for 30 seconds, and my fatass deciding to go and make brownies in a cooking class", image: "/memories/cooking_class.jpeg" },
  { date: "10", description: "When I surprised shay in Berkeley on our anniversary, and the day I got into YC", image: "/memories/anniversary.jpeg" }
];

const promises = [
  "I promise to always listen to you.",
  "I promise to make you soup when you're sick (better than I am now).",
  "I promise to support your dreams, no matter how big.",
  "I promise to never stop trying to make you smile.",
  "I promise to be your biggest fan.",
  "I promise to always be honest with you.",
  "I promise to hold your hand when you're scared.",
  "I promise to share my dessert (mostly).",
  "I promise to love you more every day.",
  "I promise to make up for this missed Valentine's Day.",
  "I promise to take you on a trip after your MCAT",
  "I promise to always choose you."
];

const apologyParagraph = "I am so incredibly sorry that I can't be there with you today. Being sick is the worst, but being away from you on Valentine's Day is even harder. I hate that I'm missing our plans, but I promise to make it up to you as soon as I'm back on my feet.";

const missYouParagraph = "I miss your smile, your laugh, and just being in your presence. The room feels empty without you. I'm counting down the minutes until I can see you again and give you the biggest hug.";

const nextDateIdea = "As soon as I'm better, I'm taking you to dinner and giving you your real Vday gifts.";

const spotifySongLink = "https://open.spotify.com/track/6ps9xNXuKMgRdj32QTVS1s";
const songTitle = "The Way You Look Tonight - Frank Sinatra";

// =================================================================================================
//  END PERSONALIZATION SECTION
// =================================================================================================

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <main className="min-h-screen bg-cream-50 text-stone-800 selection:bg-red-100 selection:text-red-900 overflow-x-hidden relative">
      
      <ValentineModal onAccept={() => setIsLocked(false)} />

      <div className={`transition-all duration-1000 ${isLocked ? "blur-xl h-screen overflow-hidden pointer-events-none" : ""}`}>
        {/* Instructions for the user (hidden in production if needed, but useful for dev) */}
        <div className="hidden">
          {/* 
            HOW TO RUN LOCALLY:
            1. Install dependencies: npm install
            2. Run development server: npm run dev
            3. Open http://localhost:3000

            HOW TO DEPLOY TO VERCEL:
            1. Push this code to a GitHub repository.
            2. Go to https://vercel.com/new and import your repository.
            3. Click "Deploy". Vercel will handle the rest!
          */}
        </div>

        <Hero 
          name={girlfriendName} 
          nicknames={relationshipNicknames}
        />

        <div className="max-w-3xl mx-auto px-6 py-12 space-y-20">
          
          <section className="text-center space-y-6">
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto italic">
              "{apologyParagraph}"
            </p>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
              {missYouParagraph}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
               <HiddenLetter 
                 triggerText="Open when you miss me" 
                 content={apologyParagraph + "\n\n" + missYouParagraph + "\n\n" + "Love,\n" + myName}
               />
               <Confetti triggerText="A tiny surprise" />
            </div>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl font-serif text-red-900 text-center mb-10">
              24 Little Notes
            </h2>
            <NotesGrid 
              reasons={reasonsILoveYou} // Using reasons to populate notes for now, or could mix
              promises={promises}
              memories={favoriteMemories.map(m => m.description)}
            />
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl font-serif text-red-900 text-center mb-10">
              Why I Love You
            </h2>
            <Reasons reasons={reasonsILoveYou} />
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl font-serif text-red-900 text-center mb-10">
              Our Memories
            </h2>
            <Memories memories={favoriteMemories} />
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl font-serif text-red-900 text-center mb-10">
              My Promises
            </h2>
            <Promises promises={promises} />
          </section>

          {spotifySongLink && (
            <section className="flex justify-center">
               <Playlist link={spotifySongLink} title={songTitle} />
            </section>
          )}

          <section className="text-center py-10 border-t border-red-100 mt-20">
            <p className="text-xl font-serif text-red-800 mb-4">
              Next Date: {nextDateIdea}
            </p>
            <p className="text-sm text-stone-500">
              Made with love, even from across the room.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
