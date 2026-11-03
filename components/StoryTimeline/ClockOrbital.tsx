'use client';

import React from 'react';
import { motion } from 'motion/react';

interface ClockOrbitalProps {
  activeProgress?: number; // 0 to 1
  className?: string;
}

/**
 * ClockOrbital
 * Subtle, editorial clock-inspired graphics behind the sticky year.
 * Features ultra-thin concentric rings, understated radial tick marks,
 * and a slow counter-clockwise orbital pulse symbolizing "going back in time".
 */
export default function ClockOrbital({
  activeProgress = 0,
  className = '',
}: ClockOrbitalProps) {
  // Generate 24 minimal tick marks around the 360deg perimeter
  const ticks = Array.from({ length: 24 });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none relative flex items-center justify-center ${className}`}
    >
      {/* Soft Ambient Radial Backlight Glow */}
      <div className="absolute w-[340px] h-[340px] rounded-full bg-white/[0.025] blur-[80px] -z-10" />

      {/* Outermost Ring with Counter-Clockwise Time Rotation */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] rounded-full border border-white/[0.04]"
      >
        {/* Tiny orbital point drifting backward along the outer rim */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/30 blur-[0.5px]" />
      </motion.div>

      {/* Middle Concentric Ring with Clock Dial Ticks */}
      <div className="absolute w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] rounded-full border border-white/[0.06]">
        {ticks.map((_, i) => {
          const deg = i * (360 / 24);
          const isMajor = i % 6 === 0;
          return (
            <div
              key={i}
              className="absolute inset-0 flex justify-center"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <span
                className={`w-[1px] transition-colors duration-500 ${
                  isMajor
                    ? 'h-3 bg-white/25'
                    : 'h-1.5 bg-white/10'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Inner Concentric Dash Ring */}
      <svg
        viewBox="0 0 240 240"
        className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] opacity-20"
      >
        <circle
          cx="120"
          cy="120"
          r="108"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 6"
          className="text-white"
        />
        {/* Arc reflecting timeline progress */}
        <circle
          cx="120"
          cy="120"
          r="108"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="678"
          strokeDashoffset={678 - 678 * Math.min(Math.max(activeProgress, 0.04), 1)}
          strokeLinecap="round"
          className="text-white/60 transition-all duration-700 -rotate-90 origin-center"
        />
      </svg>
    </div>
  );
}
