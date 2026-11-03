'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TimelineMilestone } from './timelineData';

interface TimelineEntryProps {
  milestone: TimelineMilestone;
  index: number;
  isActive: boolean;
  isPast: boolean;
  isFuture: boolean;
  onVisible?: (index: number) => void;
}

export default function TimelineEntry({
  milestone,
  index,
  isActive,
  isPast,
  isFuture,
}: TimelineEntryProps) {
  // Determine opacity state based on scroll hierarchy
  let opacityClass = 'opacity-100';
  if (isPast) {
    opacityClass = 'opacity-55 hover:opacity-85';
  } else if (isFuture) {
    opacityClass = 'opacity-25 hover:opacity-60';
  }

  return (
    <div
      id={milestone.id}
      data-milestone-index={index}
      data-milestone-year={milestone.year}
      className={`relative pl-8 sm:pl-12 pb-20 sm:pb-28 transition-opacity duration-500 ${opacityClass}`}
    >
      {/* ===================================================================
          CIRCULAR TIMELINE MARKER NODE
          Positioned directly on the left vertical axis line
         =================================================================== */}
      <div className="absolute -left-[7px] sm:-left-[7.5px] top-1.5 flex items-center justify-center">
        {/* Outer glowing pulsing halo when active */}
        {isActive && (
          <motion.div
            layoutId="activeTimelineMarkerHalo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-7 h-7 rounded-full bg-white/20 blur-[2px]"
          />
        )}

        {/* Node Circle */}
        <div
          className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
            isActive
              ? 'bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.7)] scale-110'
              : isPast
              ? 'bg-[#181715] border-white/40'
              : 'bg-[#181715] border-white/20'
          }`}
        >
          {isActive ? (
            <span className="w-1.5 h-1.5 rounded-full bg-[#181715]" />
          ) : isPast ? (
            <span className="w-1 h-1 rounded-full bg-white/40" />
          ) : null}
        </div>
      </div>

      {/* ===================================================================
          ENTRY CONTENT CARD / EDITORIAL LAYOUT
         =================================================================== */}
      <div className="space-y-4">
        
        {/* Top Meta Row: Date Range + Highlight Tag */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/45">
            {milestone.dateRange}
          </span>

          {milestone.highlightTag && (
            <span
              className={`text-[10px] font-mono tracking-[0.14em] uppercase px-2 py-0.5 rounded-full border transition-colors ${
                isActive
                  ? 'bg-white/10 border-white/30 text-white font-medium'
                  : 'bg-white/[0.03] border-white/10 text-white/50'
              }`}
            >
              {milestone.highlightTag}
            </span>
          )}
        </div>

        {/* Role / Milestone Headline */}
        <h3
          className={`font-jakarta text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-[-0.025em] leading-[1.2] transition-colors ${
            isActive ? 'text-white' : 'text-white/80'
          }`}
        >
          {milestone.role}
        </h3>

        {/* Company & Location Context */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm sm:text-[14.5px] font-medium text-white/55">
          <span className="text-white/75">{milestone.company}</span>
          <span className="text-white/20">/</span>
          <span>{milestone.location}</span>
        </div>

        {/* Detailed Narrative Story Body */}
        <p className="text-[14.5px] sm:text-[15.5px] font-normal leading-[1.72] text-white/70 max-w-2xl">
          {milestone.description}
        </p>

        {/* Focus / Skills Chips */}
        {milestone.skills && milestone.skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {milestone.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-full text-xs font-medium border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white/90 hover:border-white/20 transition-all select-none"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
