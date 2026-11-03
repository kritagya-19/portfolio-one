'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ClockOrbital from './ClockOrbital';
import { TimelineMilestone } from './timelineData';

interface YearDisplayProps {
  currentYear: string;
  activeMilestone?: TimelineMilestone;
  activeIndex?: number;
  totalMilestones?: number;
  onSelectMilestone?: (index: number) => void;
  milestones?: TimelineMilestone[];
}

export default function YearDisplay({
  currentYear,
  activeIndex = 0,
  totalMilestones = 4,
}: YearDisplayProps) {
  const progressRatio = totalMilestones > 1 ? activeIndex / (totalMilestones - 1) : 0;

  return (
    <div className="relative w-full flex flex-col items-start justify-center select-none py-4">
      {/* ===================================================================
          1. HEADER: CAPSULE BADGE + EDITORIAL HEADLINE
         =================================================================== */}
      <div className="space-y-4 mb-6 sm:mb-8">
        {/* Monospace Pill Badge: • MY STORY */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/75 font-medium">
            MY STORY
          </span>
        </div>

        {/* Editorial Heading: Let's go back in time. */}
        <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.12]">
          Let&apos;s go back <br />
          <span className="text-white/40 font-light">in time.</span>
        </h2>
      </div>

      {/* ===================================================================
          2. VISUAL HERO: CONCENTRIC CLOCK MOTIF + MONUMENTAL FOCAL YEAR
             Year is positioned squarely at the center of the orbital dials.
         =================================================================== */}
      <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-start pl-2 sm:pl-4">
        {/* Clock Orbital Rings centered directly on the year */}
        <div className="absolute left-[130px] sm:left-[160px] top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none">
          <ClockOrbital activeProgress={progressRatio} />
        </div>

        {/* Centered Monumental Year with Smooth Editorial Crossfade Slide */}
        <div className="relative z-10 flex items-baseline gap-2.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentYear}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline gap-2.5"
            >
              <span className="font-jakarta text-7xl sm:text-8xl lg:text-9xl font-black tracking-[-0.05em] text-white leading-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.85)]">
                {currentYear}
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase font-medium">
                ERA
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
