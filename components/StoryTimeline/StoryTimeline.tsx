'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'motion/react';
import YearDisplay from './YearDisplay';
import TimelineEntry from './TimelineEntry';
import { TIMELINE_MILESTONES } from './timelineData';

export default function StoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const rightListRef = useRef<HTMLDivElement>(null);

  // Milestones progressing forward from 2023 to 2026
  const milestones = TIMELINE_MILESTONES;
  const totalCount = milestones.length;

  const activeMilestone = milestones[activeIndex] ?? milestones[0];
  const currentYear = activeMilestone.year;

  // Track scroll through the pinned container from start to finish
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Silky smooth spring physics for parallax response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.8,
    restDelta: 0.0005,
  });

  // Calculate active index based on scroll progress (0 to 1 mapped across the milestones)
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const rawIndex = latest * (totalCount - 1);
    const newIdx = Math.min(totalCount - 1, Math.max(0, Math.round(rawIndex)));
    if (newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  });

  // Each milestone item has a predictable spacing rhythm
  // Translate the right timeline items upward as user scrolls so each milestone centers into focus
  const ITEM_TRAVEL = 320;
  const maxDistance = (totalCount - 1) * ITEM_TRAVEL;
  const rightColumnY = useTransform(smoothProgress, [0, 1], [0, -maxDistance]);

  // Jump to specific milestone when year pill is clicked
  const handleSelectMilestone = (index: number) => {
    if (!containerRef.current) return;
    setActiveIndex(index);
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (totalCount - 1)) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      id="my-story"
      ref={containerRef}
      // Height 320vh provides ample scroll runway to pin the viewport and journey from 2023 to 2026
      className="relative w-full bg-[#181715] text-[#F3F1ED]"
      style={{ height: '320vh' }}
    >
      {/* =====================================================================
          STICKY PINNED VIEWPORT
          The entire screen remains locked in place during scroll;
          Left column text NEVER goes above or shifts away.
          Only the right side timeline cards and lines move with parallax.
         ===================================================================== */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden border-t border-white/[0.06]">
        
        {/* Ambient atmospheric backlight halos */}
        <div className="absolute top-1/4 left-1/12 w-[520px] h-[520px] rounded-full bg-white/[0.015] blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/12 w-[600px] h-[600px] rounded-full bg-white/[0.012] blur-[140px] pointer-events-none -z-10" />

        {/* Content Max Container */}
        <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-20 h-full flex items-center">
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* -----------------------------------------------------------------
                LEFT COLUMN: FIXED / PINNED STICKY YEAR DISPLAY
                Stays stationary on screen throughout the entire timeline scroll.
               ----------------------------------------------------------------- */}
            <div className="lg:col-span-5 relative z-20 flex flex-col justify-center select-none">
              <YearDisplay
                currentYear={currentYear}
                activeMilestone={activeMilestone}
                activeIndex={activeIndex}
                totalMilestones={totalCount}
                onSelectMilestone={handleSelectMilestone}
                milestones={milestones}
              />
            </div>

            {/* -----------------------------------------------------------------
                RIGHT COLUMN: PARALLAX TIMELINE VIEWPORT
                Only the right side timeline and texts move through this window.
                Equipped with subtle vertical fade gradients at top & bottom.
               ----------------------------------------------------------------- */}
            <div className="lg:col-span-7 relative h-[480px] sm:h-[540px] lg:h-[580px] overflow-hidden">
              
              {/* Soft vertical gradient mask at top and bottom */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#181715] to-transparent z-10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#181715] to-transparent z-10" />

              {/* Parallax Container with Vertical Timeline Line & Exactly 5 Items */}
              <div className="relative h-full pl-2 sm:pl-4">
                
                {/* Continuous Vertical Connecting Line */}
                <div
                  aria-hidden="true"
                  className="absolute left-[7px] sm:left-[8.5px] top-6 bottom-6 w-[1.5px] bg-white/[0.08]"
                >
                  {/* Glowing progress line fill */}
                  <motion.div
                    style={{ scaleY: smoothProgress, originY: 0 }}
                    className="w-full h-full bg-gradient-to-b from-white/40 via-white/80 to-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  />
                </div>

                {/* Vertically Translating Story Cards Track */}
                <motion.div
                  ref={rightListRef}
                  style={{ y: rightColumnY }}
                  className="pt-6"
                >
                  {milestones.map((milestone, idx) => {
                    const isActive = idx === activeIndex;
                    const isPast = idx < activeIndex;
                    const isFuture = idx > activeIndex;

                    return (
                      <div
                        key={milestone.id}
                        style={{ minHeight: `${ITEM_TRAVEL}px` }}
                        className="flex flex-col justify-start cursor-pointer transition-transform duration-300 hover:translate-x-1"
                        onClick={() => handleSelectMilestone(idx)}
                      >
                        <TimelineEntry
                          milestone={milestone}
                          index={idx}
                          isActive={isActive}
                          isPast={isPast}
                          isFuture={isFuture}
                          onVisible={() => setActiveIndex(idx)}
                        />
                      </div>
                    );
                  })}
                </motion.div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
