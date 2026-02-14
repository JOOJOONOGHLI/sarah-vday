"use client";

import { Music } from "lucide-react";

interface PlaylistProps {
  link: string;
  title?: string;
}

export function Playlist({ link, title = "Our Song" }: PlaylistProps) {
  const getSpotifyEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "open.spotify.com" && urlObj.pathname.startsWith("/track/")) {
        const id = urlObj.pathname.split("/track/")[1];
        return `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
      }
      if (urlObj.hostname === "open.spotify.com" && urlObj.pathname.startsWith("/playlist/")) {
        const id = urlObj.pathname.split("/playlist/")[1];
        return `https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const embedUrl = getSpotifyEmbedUrl(link);

  return (
    <div className="w-full max-w-lg mx-auto glass p-6 rounded-3xl border border-white/10 hover:border-pink-500/30 transition-all duration-500 group"
      style={{
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(20, 20, 20, 0.8) 100%)'
      }}
    >
      <div className="flex items-center gap-3 mb-6 text-pink-400 text-sm uppercase tracking-widest font-bold px-2">
        <Music className="w-5 h-5" />
        <span>{title}</span>
      </div>
      
      {embedUrl ? (
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <iframe
            style={{ borderRadius: "16px" }}
            src={embedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      ) : (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg"
        >
          <Music className="w-6 h-6" />
          Listen on Spotify
        </a>
      )}
    </div>
  );
}
