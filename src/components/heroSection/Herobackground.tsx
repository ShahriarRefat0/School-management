"use client";

import React, { useState, useEffect } from "react";

interface Particle {
  id: number;
  left: number;
  width: number;
  height: number;
  animationDelay: number;
  animationDuration: number;
  opacity: number;
}

const Herobackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const temp: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      width: Math.random() * 9 + 5,
      height: Math.random() * 4 + 1,
      animationDelay: Math.random() * 20,
      animationDuration: Math.random() * 20 + 10,
      opacity: Math.random() * 1 + 1,
    }));
    setParticles(temp);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full bg-primary/20 dark:bg-blue-500/30 animate-particle-drift"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            animationDelay: `${p.animationDelay}s`,
            animationDuration: `${p.animationDuration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default Herobackground;
