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
  { date: "1", description: "The job interview", image: "/memories/jobinterview.png" },
  { date: "2", description: "Asking you to be my girlfriend in front of Steak 48", image: "/memories/Steak48.png" },
  { date: "3", description: "Big game when I convinced you to match the Stanford Dad/Cal mom theme", image: "/memories/big_game.jpg" },
  { date: "4", description: "NYE where shay was incredibly mast", image: "/memories/NYE.png" },
  { date: "5", description: "Shay and Shay trip to Carmel when I had too many Celsius drinks and nearly died", image: "/memories/carmel.png" },
  { date: "6", description: "Your bday at Bacari Beverly when I was terrible at hiding the surprise", image: "/memories/bacari.jpg" },
  { date: "7", description: "Last Valentines day when you blew my mind with my favorite hoodie of all time (McLaren Hoodie)", image: "/memories/lastvday.png" },
  { date: "8", description: "Having Fuki Sushi, I just had to add it here because it was so gas and I miss it", image: "/memories/fuki.png" },
  { date: "9", description: "Shay visiting me in Miami when I was there for 30 seconds, and my fatass deciding to go and make brownies in a cooking class", image: "/memories/miami.png" },
  { date: "10", description: "When I surprised shay in Berkeley on our anniversary, and the day I got into YC", image: "/memories/anniversary.png" }
];

const promises = [
  "I promise to always listen to you.",
  "I promise to make always look at every reel you send me.",
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

// 24 Little Notes - Edit these to customize the clickable cards
const twentyFourNotes = [
  "You make every ordinary moment feel extraordinary.",
  "Your smile and laugh are my favorite things in the world.",
  "I love how you replicate my drive, and understand what it's like to be dedicated.",
  "You inspire me to be better every single day.",
  "You have such a genuine and kind heart, and I love you for it.",
  "I love how hard you work, and how you always want to be the best at whatever you do.",
  "You make me believe that I can do anything I put my mind to.",
  "The world feels brighter when you're around.",
  "I could listen to you talk about anything for hours.",
  "I love how you always choose to see the best in people.",
  "I love how you text me random memes, and reels.",
  "Home, to me, is wherever you are.",
  "You make me laugh harder than anyone else.",
  "I love how passionate you get about things you care about, and I love that it has nothing to do with my interests.",
  "Your intelligence is incredibly attractive.",
  "I find it so cute how you always stress about little things, and I like calming you down.",
  "You make me want to be the best version of myself.",
  "I love how you always know what I'm thinking.",
  "Your  never ceases to amaze me.",
  "Your sense of humor is so unique, and I love how you always make me laugh.",
  "I love how we have adopted each other's vocabularies.",
  "I love how you light up when you're excited.",
  "I love those little fashionista faashion shows you had as a kid",
  "I will always be your biggest champion, and I know that the future holds big things for you."
];

const apologyParagraph = "I am so incredibly sorry that I can't be there with you today. Being sick is the worst, but being away from you on Valentine's Day is even harder. I hate that I'm missing our plans, but I promise to make it up to you as soon as I'm back on my feet.";

const missYouParagraph = "I miss your smile, your laugh, and just being in your presence. The room feels empty without you. I'm counting down the minutes until I can see you again and give you the biggest hug.";

const popupParagraph = "My dear Sarah, I love you so much. I know you are going through a ton, and we both have lofty ambitions, I know you have the strength to persevere, and triumph in anything you choose. I'm always right here when you need me, I adore your strength, and I want you to keep going. Thank you for making my day sweeter because of your presence, thank you for giving my life color and being the hilight.";

const nextDateIdea = "As soon as I'm better, I'm taking you to dinner and giving you your real Vday gifts.";

const spotifySongLink = "https://open.spotify.com/track/6ps9xNXuKMgRdj32QTVS1s";
const songTitle = "The Way You Look Tonight - Frank Sinatra";

// =================================================================================================
//  END PERSONALIZATION SECTION
// =================================================================================================

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <main className="min-h-screen bg-dark-900 text-white selection:bg-pink-500 selection:text-white overflow-x-hidden relative">
      
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

        {spotifySongLink && (
          <section className="flex justify-center -mt-12 mb-12 relative z-10">
             <Playlist link={spotifySongLink} title={songTitle} />
          </section>
        )}

        <div className="max-w-5xl mx-auto px-6 py-20 space-y-32">
          
          <section className="text-center space-y-8">
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto italic">
              {apologyParagraph}
            </p>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {missYouParagraph}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
               <HiddenLetter 
                 triggerText="Open when you miss me" 
                 content={popupParagraph}
               />
               <Confetti triggerText="A tiny surprise" />
            </div>
          </section>

          <section>
            <h2 className="text-4xl md:text-6xl font-serif text-white text-center mb-16 glow-text">
              24 Little Notes
            </h2>
            <NotesGrid 
              notes={twentyFourNotes}
            />
          </section>

          <section>
            <h2 className="text-4xl md:text-6xl font-serif text-white text-center mb-16 glow-text">
              Why I Love You
            </h2>
            <Reasons reasons={reasonsILoveYou} />
          </section>

          <section>
            <h2 className="text-4xl md:text-6xl font-serif text-white text-center mb-16 glow-text">
              Our Memories
            </h2>
            <Memories memories={favoriteMemories} />
          </section>

          <section>
            <h2 className="text-4xl md:text-6xl font-serif text-white text-center mb-16 glow-text">
              My Promises
            </h2>
            <Promises promises={promises} />
          </section>

          <section className="text-center py-16 border-t border-white/10 mt-32">
            <p className="text-2xl font-serif text-pink-400 mb-6 glow-text">
              Next Date: {nextDateIdea}
            </p>
            <p className="text-base text-gray-500 italic">
              Made with love, even from across the room.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
