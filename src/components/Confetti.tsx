"use client";

import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";

interface ConfettiProps {
  triggerText: string;
}

export function Confetti({ triggerText }: ConfettiProps) {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fireConfetti = () => {
    setIsActive(true);
    // Reset after animation
    setTimeout(() => setIsActive(false), 3000);
  };

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const colors = ["#ef4444", "#ec4899", "#f43f5e", "#e11d48"];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20 - 5, // Upward bias
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // Gravity
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.01;

        if (p.opacity <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        
        // Draw Heart
        const size = p.size;
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
        ctx.bezierCurveTo(-size / 2, size / 2, 0, size * 0.8, 0, size);
        ctx.bezierCurveTo(0, size * 0.8, size / 2, size / 2, size / 2, topCurveHeight);
        ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.fill();
        
        ctx.restore();
      });

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        setIsActive(false);
      }
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  return (
    <>
      <button
        onClick={fireConfetti}
        className="inline-flex items-center gap-2 px-6 py-4 border-2 border-red-200 text-red-800 font-serif text-lg rounded-full hover:bg-red-50 transition-colors"
      >
        <Heart className="w-5 h-5 text-red-500" />
        {triggerText}
      </button>
      
      {isActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-[100]"
        />
      )}
    </>
  );
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}
