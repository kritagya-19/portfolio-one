'use client';

import React, { useState, useEffect, useRef } from 'react';
import InkReveal from '@/components/ui/ink-reveal';
import { 
  ArrowRight, 
  ArrowDown, 
  X,
} from 'lucide-react';

// ============================================================================
// SOUND EFFECT HELPER (Synthesized mechanical pull-chain switch click)
// ============================================================================
const playSwitchSound = (isTurningLight: boolean) => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // First click (pull down)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(isTurningLight ? 620 : 480, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.045);
    
    gain1.gain.setValueAtTime(0.18, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.05);

    // Second subtle latch click (release)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(isTurningLight ? 980 : 720, ctx.currentTime + 0.055);
    osc2.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.09);

    gain2.gain.setValueAtTime(0.12, ctx.currentTime + 0.055);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.095);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.055);
    osc2.stop(ctx.currentTime + 0.1);
  } catch {
    // Ignore audio errors if browser blocks autoplay
  }
};

// ============================================================================
// REUSABLE CHARACTER ARTWORK (Hero Character Photo)
// ============================================================================
interface CharacterArtworkProps {
  customCharImg?: string | null;
  idSuffix?: string;
  className?: string;
}

const CharacterArtwork = ({
  customCharImg,
  idSuffix = 'base',
  className = '',
}: CharacterArtworkProps) => {
  const imgSrc = customCharImg || '/hero.png';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt="Aditya Portrait"
      className={`w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] pointer-events-none select-none transition-all duration-300 ${className}`}
      draggable={false}
    />
  );
};

// ============================================================================
// MAIN PORTFOLIO HERO COMPONENT
// ============================================================================
export interface HeroSectionProps {
  onSelectService?: (serviceId: string) => void;
  onOpenContact?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export default function HeroSection({
  onSelectService,
  onOpenContact,
  theme: controlledTheme,
  onToggleTheme,
}: HeroSectionProps = {}) {
  // Theme state: controlled by parent or fallback to local
  const [internalTheme, setInternalTheme] = useState<'dark' | 'light'>('dark');
  const theme = controlledTheme || internalTheme;
  const isDark = theme === 'dark';

  // Hanging Rope Pull Physics State
  const [isPulling, setIsPulling] = useState(false);
  const [ropeHovered, setRopeHovered] = useState(false);

  // Rotating Calendar Roles State
  const roles = [
    { title: 'UI/UX Designer' },
    { title: 'Video Editor' },
    { title: 'Graphic Designer' },
    { title: 'Product Designer' },
    { title: 'Creative Dev' },
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isCalendarPaused, setIsCalendarPaused] = useState(false);

  // Character Hover & Image State
  const [isCharHovered, setIsCharHovered] = useState(false);
  const [customCharImg] = useState<string | null>('/hero.png');

  // Modals
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const triggerNextRole = React.useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setIsFlipping(false);
    }, 280);
  }, [roles.length]);

  // Automatic Calendar Role Flip Timer (every 2.8 seconds)
  useEffect(() => {
    if (isCalendarPaused) return;
    const timer = setInterval(() => {
      triggerNextRole();
    }, 2800);
    return () => clearInterval(timer);
  }, [roleIndex, isCalendarPaused, triggerNextRole]);

  // Handle Rope Click -> Pull physics + Theme Toggle
  const handleRopePull = () => {
    if (isPulling) return;
    setIsPulling(true);
    playSwitchSound(isDark);

    // Toggle theme right at the bottom of the pull stroke
    setTimeout(() => {
      if (onToggleTheme) {
        onToggleTheme();
      } else {
        setInternalTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
      }
    }, 160);

    // Release cord back up with spring bounce
    setTimeout(() => {
      setIsPulling(false);
    }, 450);
  };


  const currentRole = roles[roleIndex];

  const scrollToDoors = (hash?: string) => {
    if (hash && typeof window !== 'undefined') {
      try {
        window.history.pushState(null, '', `#${hash}`);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      } catch {
        // Ignore
      }
    }
    const el = document.getElementById('doors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden select-none transition-colors duration-700 ease-out font-sans flex flex-col justify-between ${
        isDark
          ? 'bg-[#171615] text-[#F3F1ED]'
          : 'bg-[#F5F2EB] text-[#181715]'
      }`}
    >
      {/* =====================================================================
          AMBIENT LIGHTING & ATMOSPHERIC GLOW
         ===================================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top warm lamp spotlight when in Light mode or subtle ember in Dark mode */}
        <div
          className={`absolute -top-40 right-[12%] h-[520px] w-[520px] rounded-full blur-[130px] transition-all duration-1000 ${
            isDark
              ? 'bg-[#b37d4e]/10 opacity-60'
              : 'bg-amber-300/40 opacity-90'
          }`}
        />
        {/* Glow behind character */}
        <div
          className={`absolute bottom-10 right-[16%] h-[420px] w-[420px] rounded-full blur-[120px] transition-all duration-700 ${
            isCharHovered
              ? isDark
                ? 'bg-[#e07a5f]/25 scale-110'
                : 'bg-[#e07a5f]/35 scale-110'
              : isDark
              ? 'bg-white/[0.03]'
              : 'bg-black/[0.04]'
          }`}
        />
        <div className="bg-noise absolute inset-0 opacity-60" />
      </div>

      {/* =====================================================================
          HANGING ROPE / PULL-CORD LIGHT SWITCH (TOP RIGHT)
         ===================================================================== */}
      <div
        className="fixed top-0 right-8 sm:right-16 lg:right-36 z-50 flex flex-col items-center"
        onMouseEnter={() => setRopeHovered(true)}
        onMouseLeave={() => setRopeHovered(false)}
      >
        {/* Interactive Pull Cord Container */}
        <button
          onClick={handleRopePull}
          aria-label="Pull rope to switch theme"
          className={`group relative flex flex-col items-center focus:outline-none cursor-pointer rope-sway transition-transform duration-300 ${
            isPulling
              ? 'translate-y-11 ease-in'
              : ropeHovered
              ? 'translate-y-2'
              : 'translate-y-0'
          }`}
          style={{
            transitionTimingFunction: isPulling
              ? 'cubic-bezier(0.2, 0.8, 0.2, 1)'
              : 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Ceiling Grommet / Mount */}
          <div
            className={`w-4 h-2 rounded-b-full shadow-md transition-colors ${
              isDark ? 'bg-[#3a3632] border-b border-white/10' : 'bg-[#c7bfb3] border-b border-black/20'
            }`}
          />

          {/* Braided Rope Line */}
          <div className="relative -mt-12 pt-12 flex flex-col items-center">
            <div
              className="w-[3.5px] h-[220px] sm:h-[265px] rounded-full shadow-sm transition-all duration-300"
              style={{
                backgroundImage: isDark
                  ? 'repeating-linear-gradient(45deg, #e5dac9 0px, #e5dac9 3px, #b09d84 3px, #b09d84 6px)'
                  : 'repeating-linear-gradient(45deg, #8c7355 0px, #8c7355 3px, #5c4933 3px, #5c4933 6px)',
                boxShadow: isDark
                  ? '2px 4px 10px rgba(0,0,0,0.75)'
                  : '2px 4px 8px rgba(0,0,0,0.2)',
              }}
            />

            {/* Brass Ferrule / Knot Cap */}
            <div className="w-2.5 h-2.5 rounded-t-sm bg-gradient-to-r from-[#8f683b] via-[#d9a76a] to-[#6e4f2a] shadow-sm -mt-0.5" />

            {/* Realistic Wooden Teardrop Pull Knob */}
            <div
              className="relative w-5 h-8 rounded-full transition-transform duration-200 group-hover:scale-110"
              style={{
                borderRadius: '48% 48% 52% 52% / 62% 62% 38% 38%',
                background:
                  'radial-gradient(circle at 32% 28%, #e6a972 0%, #9e5827 42%, #4a2309 85%, #291203 100%)',
                boxShadow: isDark
                  ? '0 10px 20px rgba(0,0,0,0.85), inset 1px 2px 3px rgba(255,230,200,0.45)'
                  : '0 10px 18px rgba(80,45,15,0.35), inset 1px 2px 3px rgba(255,230,200,0.6)',
              }}
            >
              {/* Specular Wood Highlight */}
              <div className="absolute top-1.5 left-1 w-1.5 h-3.5 rounded-full bg-white/30 blur-[0.5px] rotate-[-8deg]" />
            </div>
          </div>
        </button>
      </div>

      {/* =====================================================================
          MAIN HERO CONTENT (LEFT: GREETING & CALENDAR | RIGHT: CHARACTER)
         ===================================================================== */}
      <main className="relative z-20 flex-1 w-full max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-20 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-6 pt-24 sm:pt-28 lg:pt-20">
        
        {/* -----------------------------------------------------------------
            LEFT COLUMN: FREELANCER TAG, NAME, SPIRAL CALENDAR, CTA BUTTONS
           ----------------------------------------------------------------- */}
        <div className="w-full lg:w-[54%] flex flex-col items-start justify-center self-center pb-4 lg:pb-14">
          
          {/* • Independent Freelancer Status */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDark ? 'bg-emerald-400' : 'bg-emerald-600'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isDark ? 'bg-[#A6A29B]' : 'bg-[#57534E]'
                }`}
              />
            </span>
            <span
              className={`text-[13.5px] font-medium tracking-wide ${
                isDark ? 'text-[#A6A29B]' : 'text-[#57534E]'
              }`}
            >
              Independent Freelancer
            </span>
          </div>

          {/* Main Heading: "Hi, I'm Aditya." & "I am a" */}
          <h1 className="font-jakarta tracking-[-0.03em] leading-[1.08]">
            <span
              className={`block text-5xl sm:text-6xl xl:text-[68px] font-bold transition-colors duration-500 ${
                isDark ? 'text-[#F5F3EF]' : 'text-[#181715]'
              }`}
            >
              Hi, I&apos;m Aditya.
            </span>
            <span
              className={`block text-4xl sm:text-5xl xl:text-[58px] font-semibold mt-1 transition-colors duration-500 ${
                isDark ? 'text-[#6A6763]' : 'text-[#8C867E]'
              }`}
            >
              I am a
            </span>
          </h1>

          {/* ---------------------------------------------------------------
              WHITE SPIRAL DESK CALENDAR FLIP CARD (ONLY SKILL NAME)
              Changes every few seconds: UI/UX Designer -> Video Editor -> Graphic Designer
             --------------------------------------------------------------- */}
          <div
            onClick={triggerNextRole}
            onMouseEnter={() => setIsCalendarPaused(true)}
            onMouseLeave={() => setIsCalendarPaused(false)}
            title="Click to flip role"
            className="calendar-perspective relative mt-6 mb-9 cursor-pointer group"
          >
            {/* Subtle Tilt Wrapper matching reference image (-1.8deg tilt) */}
            <div className="relative transform -rotate-[1.65deg] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.015]">
              
              {/* 11 Metallic Spiral Binder Rings across the top */}
              <div className="relative z-30 flex items-center justify-between px-5 sm:px-7 -mb-3.5 pointer-events-none">
                {Array.from({ length: 11 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    {/* Ring Loop */}
                    <div
                      className="w-[9px] sm:w-[11px] h-[22px] sm:h-[26px] rounded-full border-[2.5px] shadow-md"
                      style={{
                        borderColor: isDark ? '#A8A49F' : '#78736D',
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(0,0,0,0.15) 100%)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.45)',
                      }}
                    />
                    {/* Punch Hole Shadow on the Paper */}
                    <div className="w-2.5 h-1.5 rounded-full bg-black/35 -mt-1.5" />
                  </div>
                ))}
              </div>

              {/* Stacked Bottom Paper Sheets for 3D Depth */}
              <div
                className={`absolute inset-0 translate-y-[10px] translate-x-[3px] rounded-[18px] transition-shadow duration-500 ${
                  isDark
                    ? 'bg-[#C9C5BD] shadow-[0_26px_50px_rgba(0,0,0,0.85)]'
                    : 'bg-[#CFCBC2] shadow-[0_22px_40px_rgba(24,23,21,0.18)]'
                }`}
              />
              <div className="absolute inset-0 translate-y-[6px] translate-x-[1.5px] rounded-[18px] bg-[#DFDCD5] border-b border-black/15" />
              <div className="absolute inset-0 translate-y-[3px] rounded-[18px] bg-[#ECEAE4] border-b border-black/10" />

              {/* Active Top White Calendar Card */}
              <div
                className={`calendar-page-flip relative z-20 min-w-[310px] sm:min-w-[460px] xl:min-w-[520px] rounded-[18px] bg-[#FAF8F5] px-6 sm:px-9 py-6 sm:py-7 border border-black/5 flex items-center justify-center ${
                  isFlipping ? 'calendar-flipping' : ''
                }`}
                style={{
                  boxShadow:
                    'inset 0 -3px 0 #E5E2DC, 0 4px 12px rgba(0,0,0,0.12)',
                }}
              >
                {/* Role Title Text Only */}
                <span className="font-jakarta text-[32px] sm:text-[46px] xl:text-[52px] font-extrabold tracking-[-0.03em] text-[#141413] leading-tight text-center whitespace-nowrap">
                  {currentRole.title}
                </span>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------
              CTA BUTTONS: "Hire me ->" AND "See my work"
             --------------------------------------------------------------- */}
          <div className="flex flex-wrap items-center gap-4 mt-1">
            {/* Hire Me Button */}
            <button
              onClick={() => setContactModalOpen(true)}
              className={`group relative flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full text-[13.5px] font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.98] ${
                isDark
                  ? 'bg-[#F3F1ED] text-[#171615] hover:bg-white shadow-black/40'
                  : 'bg-[#181715] text-[#F5F2EB] hover:bg-black shadow-black/15'
              }`}
            >
              <span>Hire me</span>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 ${
                  isDark
                    ? 'bg-[#171615] text-[#F3F1ED]'
                    : 'bg-[#F5F2EB] text-[#181715]'
                }`}
              >
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
              </span>
            </button>

            {/* See My Work Button */}
            <button
              onClick={() => scrollToDoors()}
              className={`px-6 py-2.5 rounded-full text-[13.5px] font-medium transition-all duration-300 cursor-pointer border ${
                isDark
                  ? 'bg-[#1E1D1B]/60 border-white/15 text-[#D8D4CE] hover:border-white/40 hover:bg-white/5 hover:text-white'
                  : 'bg-white/60 border-black/15 text-[#2C2A27] hover:border-black/40 hover:bg-black/5 hover:text-black'
              }`}
            >
              See my work
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            RIGHT COLUMN: HERO CHARACTER PORTRAIT (INK REVEAL)
            Frameless, moved slightly to the left, and enlarged
           ----------------------------------------------------------------- */}
        <div className="relative w-full lg:w-[48%] xl:w-[46%] flex flex-col items-center lg:items-end justify-end self-end pb-0 lg:-translate-x-8 xl:-translate-x-14">
          
          {/* Character Interactive Container with Ink Reveal */}
          <div
            onMouseEnter={() => setIsCharHovered(true)}
            onMouseLeave={() => setIsCharHovered(false)}
            className="relative w-[340px] sm:w-[440px] md:w-[490px] xl:w-[540px] 2xl:w-[580px] h-[450px] sm:h-[550px] md:h-[610px] xl:h-[660px] 2xl:h-[700px] flex items-end justify-center select-none"
          >
            {/* 1. UNDERNEATH: Full-Color Vibrant Portrait */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none">
              <CharacterArtwork customCharImg={customCharImg} idSuffix="color" />
            </div>

            {/* 2. ON TOP: InkReveal Canvas */}
            <InkReveal
              maskImageSrc={customCharImg || '/hero.png'}
              grayscaleFilter={
                isDark
                  ? 'grayscale(100%) contrast(110%) brightness(96%)'
                  : 'grayscale(100%) contrast(108%) brightness(92%)'
              }
              brushSize={140}
              lifetime={700}
              rStart={14}
              rVary={0.4}
              stampStep={8}
              maxStamps={220}
              segments={36}
              wobble={[0.15, 0.08, 0.05]}
              style={{
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </main>

      {/* =====================================================================
          BOTTOM STATUS BAR
         ===================================================================== */}
      <footer className="relative z-30 w-full max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-20 pb-5">
        <div
          className={`w-full pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[10.5px] sm:text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-500 ${
            isDark
              ? 'border-white/[0.08] text-[#8E8A84]'
              : 'border-black/[0.1] text-[#6E6A63]'
          }`}
        >
          {/* Left: Available for work */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>AVAILABLE FOR WORK</span>
          </div>

          {/* Center: Remote-First, Worldwide */}
          <div className="tracking-[0.16em]">REMOTE-FIRST, WORLDWIDE</div>

          {/* Right: Scroll to explore ↓ */}
          <button
            onClick={() => scrollToDoors()}
            className="group flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3 h-3 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      </footer>

      {/* =====================================================================
          CONTACT / HIRE ADITYA MODAL
         ===================================================================== */}
      {contactModalOpen && (
        <div
          onClick={() => setContactModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl transition-all ${
              isDark
                ? 'bg-[#1D1C1A] border-white/15 text-[#F3F1ED]'
                : 'bg-[#FAF8F5] border-black/10 text-[#181715]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-emerald-500">
                  ● Booking Open
                </span>
                <h3 className="text-2xl font-bold font-jakarta mt-0.5">
                  Work with Aditya
                </h3>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="p-2 rounded-full hover:bg-current/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm opacity-75 mb-5">
              Need a high-converting UI/UX design, dynamic video edit, or complete brand identity? Let&apos;s build something memorable.
            </p>

            <div className="space-y-3 text-sm">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors ${
                  isDark
                    ? 'bg-black/30 border-white/10 focus:border-white/30'
                    : 'bg-white border-black/10 focus:border-black/30'
                }`}
              />
              <input
                type="email"
                placeholder="your@email.com"
                className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors ${
                  isDark
                    ? 'bg-black/30 border-white/10 focus:border-white/30'
                    : 'bg-white border-black/10 focus:border-black/30'
                }`}
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {['UI/UX Design', 'Video Editing', 'Graphic Design', 'Web App'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs border border-current/15 opacity-80 hover:opacity-100 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setContactModalOpen(false)}
              className={`mt-6 w-full py-3 rounded-full text-sm font-semibold transition-transform active:scale-98 cursor-pointer ${
                isDark
                  ? 'bg-[#F3F1ED] text-[#171615] hover:bg-white'
                  : 'bg-[#181715] text-[#F5F2EB] hover:bg-black'
              }`}
            >
              Send Inquiry to Aditya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
