"use client";

import { Music } from "lucide-react";

interface PlaylistProps {
  link: string;
  title?: string;
}

export function Playlist({ link, title = "Our Song" }: PlaylistProps) {
  // Extract Spotify ID if possible
  const getSpotifyEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "open.spotify.com" && urlObj.pathname.startsWith("/track/")) {
        const id = urlObj.pathname.split("/track/")[1];
        return `https://open.spotify.com/embed/track/${id}?utm_source=generator`;
      }
      if (urlObj.hostname === "open.spotify.com" && urlObj.pathname.startsWith("/playlist/")) {
        const id = urlObj.pathname.split("/playlist/")[1];
        return `https://open.spotify.com/embed/playlist/${id}?utm_source=generator`;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const embedUrl = getSpotifyEmbedUrl(link);

  return (
    <div className="w-full max-w-md mx-auto mt-12 bg-white p-4 rounded-2xl shadow-lg border border-stone-100">
      <div className="flex items-center gap-2 mb-4 text-stone-500 text-sm uppercase tracking-widest font-bold px-2">
        <Music className="w-4 h-4" />
        <span>{title}</span>
      </div>
      
      {embedUrl ? (
        <iframe
          style={{ borderRadius: "12px" }}
          src={embedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      ) : (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 bg-[#1DB954] text-white rounded-xl font-bold hover:bg-[#1ed760] transition-colors"
        >
          <Music className="w-5 h-5" />
          Listen on Spotify
        </a>
      )}
    </div>
  );
}
