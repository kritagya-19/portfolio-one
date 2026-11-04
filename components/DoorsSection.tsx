'use client';

import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'motion/react';
import { ArrowLeft, Check, ArrowUpRight } from 'lucide-react';
import FooterCTA from '@/components/FooterCTA';

// ==========================================
// TYPE DEFINITIONS
// ==========================================
export interface ServiceProject {
  category: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  recordingNote?: string;
  previewType: string;
  liveUrl?: string;
}

export interface ServiceItem {
  id: string;
  doorLabel: string[];
  title: string;
  tagline: string;
  shortDesc: string;
  color: string;
  borderColor: string;
  highlightColor: string;
  ambientGlow: string;
  badgeBg: string;
  badgeText: string;
  features: string[];
  projects: ServiceProject[];
}

// ==========================================
// SERVICE & PROJECT DATA CONFIGURATION
// ==========================================
export const SERVICES: ServiceItem[] = [
  {
    id: 'web-development',
    doorLabel: ['WEB', 'DEVELOPER'],
    title: 'Web Development',
    tagline: 'FROM ARCHITECTURE TO HIGH-CONVERTING LAUNCH',
    shortDesc: 'Websites, landing pages and interactive tools, built end to end: from layout and interaction to responsive front-end, SEO and launch.',
    color: '#1a2436',
    borderColor: '#111824',
    highlightColor: '#2b3b55',
    ambientGlow: 'rgba(56, 114, 224, 0.22)',
    badgeBg: '#d6e4f9',
    badgeText: '#10223f',
    features: [
      'Custom front-end & WebGL interactions',
      'Responsive architecture & accessibility',
      'CMS integration & scalable APIs',
      'Technical SEO & core web vitals optimization',
      'End-to-end deployment & analytics'
    ],
    projects: [
      {
        category: 'WEBSITE BUILD',
        name: 'Sundown Studio',
        subtitle: 'Studio website',
        description: 'An editorial website for a multi-disciplinary studio that creates spaces and experiences: oversized type, a soft red glow that follows the story and a project list that reveals imagery on hover.',
        tags: ['Design & build', 'Motion', 'Hover interactions'],
        recordingNote: 'Screen recording of the build',
        previewType: 'sundown'
      },
      {
        category: 'WEBSITE BUILD',
        name: 'Personal portfolio',
        subtitle: 'Product designer portfolio',
        description: 'A dark, type-led portfolio with a large display headline, a project list with hover previews and an about section.',
        tags: ['Design & build', 'Typography', 'Hover previews'],
        recordingNote: 'Screen recording of the build',
        previewType: 'personal-portfolio'
      },
      {
        category: 'QUICKO · LIVE',
        name: 'P&L Page for Zerodha',
        subtitle: 'Broker landing page · pnl.page',
        description: 'Landing page that helps Zerodha users connect their demat account, track profit & loss, download tax-ready reports and share verified P&L with their tax advisor.',
        tags: ['Landing page', 'Responsive build', 'SEO'],
        liveUrl: 'https://pnl.page',
        previewType: 'zerodha-pnl'
      },
      {
        category: 'INTERACTIVE PLATFORM',
        name: 'Krono Architecture',
        subtitle: 'Spatial portfolio · krono.studio',
        description: 'A brutalist grid layout paired with fluid WebGL image transitions, smooth inertial scrolling, and real-time day/night architectural lighting toggles.',
        tags: ['Next.js', 'WebGL Shaders', 'Lenis Scroll'],
        liveUrl: 'https://krono.studio',
        previewType: 'krono'
      }
    ]
  },
  {
    id: 'app-development',
    doorLabel: ['APP', 'DEVELOPER'],
    title: 'App Development',
    tagline: 'FROM THE FIRST IDEA TO THE APP STORE',
    shortDesc: 'Native and cross-platform mobile applications engineered for tactile speed, offline resilience, and seamless daily utility.',
    color: '#341f3a',
    borderColor: '#231228',
    highlightColor: '#4f2e58',
    ambientGlow: 'rgba(192, 98, 224, 0.22)',
    badgeBg: '#ebd6f5',
    badgeText: '#32103d',
    features: [
      'Product scoping & user flows',
      'Interface design',
      'Cross-platform development',
      'Device testing & store launch',
      'Analytics, monitoring & updates'
    ],
    projects: [
      {
        category: 'MOBILE APPLICATION',
        name: 'Veloce Pay',
        subtitle: 'Fintech iOS & Android app',
        description: 'A zero-latency personal treasury and multi-currency card manager featuring gesture-driven transfers, biometric vault locks, and real-time spend categorization.',
        tags: ['React Native', 'Biometrics', 'Haptic UI'],
        recordingNote: 'Screen recording of the build',
        previewType: 'veloce'
      },
      {
        category: 'WELLNESS ECOSYSTEM',
        name: 'Aether Breath',
        subtitle: 'Spatial audio & bio-feedback',
        description: 'Synchronizes Apple Watch heart-rate variability with generative ambient soundscapes and adaptive 120fps fluid ring visualizations.',
        tags: ['SwiftUI', 'HealthKit', 'CoreAudio'],
        recordingNote: 'Screen recording of the build',
        previewType: 'aether'
      },
      {
        category: 'CONSUMER SOCIAL',
        name: 'Kinetix Run Club',
        subtitle: 'Live GPS & territory tracker',
        description: 'Real-time multiplayer running companion with 3D Mapbox terrain elevation, live pace audio coaching, and instant Strava/Garmin webhook sync.',
        tags: ['Flutter', 'Mapbox 3D', 'Realtime Sync'],
        liveUrl: '#kinetix',
        previewType: 'veloce'
      }
    ]
  },
  {
    id: 'ui-ux-design',
    doorLabel: ['UI/UX', 'DESIGNER'],
    title: 'UI/UX Design',
    tagline: 'INTUITIVE SYSTEMS & DIGITAL PRODUCT CRAFT',
    shortDesc: 'Research-backed product interfaces, comprehensive design systems, and interactive prototypes that bridge human psychology and business clarity.',
    color: '#3d4d3e',
    borderColor: '#29352a',
    highlightColor: '#536854',
    ambientGlow: 'rgba(92, 179, 108, 0.2)',
    badgeBg: '#d8e8d7',
    badgeText: '#18301c',
    features: [
      'User research & journey mapping',
      'Wireframing & interactive prototyping',
      'Multi-brand design systems in Figma',
      'Micro-interaction & motion specs',
      'Usability testing & conversion audits'
    ],
    projects: [
      {
        category: 'DESIGN SYSTEM & SAAS',
        name: 'Linearity Cloud',
        subtitle: 'Enterprise workflow suite',
        description: 'Consolidated four legacy enterprise dashboards into a single keyboard-first workspace with a 400+ token component library and dark/light adaptive contrast.',
        tags: ['Design System', 'Prototyping', 'UX Audit'],
        recordingNote: 'Screen recording of the build',
        previewType: 'linearity'
      },
      {
        category: 'PRODUCT REDESIGN',
        name: 'Noma Commerce',
        subtitle: 'B2B wholesale checkout',
        description: 'Reduced checkout friction by 42% through progressive disclosure, instant bulk-SKU matrix editing, and predictive shipping estimators.',
        tags: ['User Research', 'Figma Variables', 'Interaction'],
        liveUrl: '#noma',
        previewType: 'noma'
      },
      {
        category: 'AI WORKSPACE',
        name: 'SynthOS Canvas',
        subtitle: 'Node-based generative studio',
        description: 'Infinite spatial canvas for chaining multimodal AI prompts, real-time shader previews, and collaborative team branching.',
        tags: ['Spatial UI', 'Design Tokens', 'Motion Specs'],
        recordingNote: 'Screen recording of the build',
        previewType: 'linearity'
      }
    ]
  },
  {
    id: 'graphic-design',
    doorLabel: ['GRAPHIC', 'DESIGNER'],
    title: 'Graphic Design',
    tagline: 'DISTINCTIVE IDENTITIES & VISUAL STORYTELLING',
    shortDesc: 'Timeless brand identities, custom typography, packaging systems, and art direction crafted to command attention across physical and digital mediums.',
    color: '#8b4a24',
    borderColor: '#633316',
    highlightColor: '#ad5c2c',
    ambientGlow: 'rgba(235, 126, 61, 0.22)',
    badgeBg: '#fae3d2',
    badgeText: '#4e2309',
    features: [
      'Brand strategy & visual identity',
      'Logo systems & custom typography',
      'Packaging & print production',
      'Editorial layout & art direction',
      '3D brand assets & social toolkits'
    ],
    projects: [
      {
        category: 'BRAND IDENTITY',
        name: 'Solstice Roasters',
        subtitle: 'Visual identity & packaging',
        description: 'A tactile specialty coffee identity inspired by astronomical almanacs, featuring custom serif ligatures, embossed metallic foil tins, and a modular origin system.',
        tags: ['Brand Identity', 'Packaging', 'Typography'],
        recordingNote: 'Screen recording of the build',
        previewType: 'solstice'
      },
      {
        category: 'ART DIRECTION',
        name: 'Monolith Festival',
        subtitle: 'Exhibition & kinetic campaign',
        description: 'Generative Swiss-grid poster series and wayfinding system for an electronic arts biennial in Zurich, adapting dynamically to audio frequencies.',
        tags: ['Art Direction', 'Print & Motion', 'Wayfinding'],
        liveUrl: '#monolith',
        previewType: 'monolith'
      },
      {
        category: 'EDITORIAL ARCHIVE',
        name: 'Forma Monograph',
        subtitle: 'Hardcover architectural book',
        description: 'A 320-page cloth-bound monograph celebrating Brutalist civic structures, set in bespoke grotesk numerals with exposed Smyth-sewn binding.',
        tags: ['Editorial', 'Print Production', 'Custom Type'],
        recordingNote: 'Screen recording of the build',
        previewType: 'solstice'
      }
    ]
  }
];

// ==========================================
// REALISTIC GOLDEN DOOR HARDWARE COMPONENTS
// ==========================================
const BrassNameplate = ({ lines, isBright }: { lines: string[]; isBright: boolean }) => (
  <div
    className="relative w-[132px] sm:w-[148px] h-[44px] sm:h-[48px] rounded-[2px] flex flex-col items-center justify-center select-none transition-all duration-500"
    style={{
      background: isBright
        ? 'linear-gradient(135deg, #d7be82 0%, #f4e3b2 28%, #b99754 55%, #e5cd94 80%, #8f6f32 100%)'
        : 'linear-gradient(135deg, #8e7a52 0%, #a99266 30%, #6d5a37 65%, #514125 100%)',
      boxShadow: isBright
        ? '0 4px 10px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.4)'
        : '0 3px 8px rgba(0,0,0,0.6), inset 0 1px 0.5px rgba(255,255,255,0.25)',
      border: '1px solid rgba(50, 38, 15, 0.65)'
    }}
  >
    {/* Left & Right Brass Screws */}
    <span
      className="absolute left-[7px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full"
      style={{
        background: 'radial-gradient(circle at 30% 30%, #f7e7bc, #6d5322)',
        boxShadow: '0 1px 1px rgba(0,0,0,0.6), inset 0 0.5px 0.5px rgba(255,255,255,0.8)'
      }}
    />
    <span
      className="absolute right-[7px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full"
      style={{
        background: 'radial-gradient(circle at 30% 30%, #f7e7bc, #6d5322)',
        boxShadow: '0 1px 1px rgba(0,0,0,0.6), inset 0 0.5px 0.5px rgba(255,255,255,0.8)'
      }}
    />
    {/* Engraved Typography */}
    <div className="text-center leading-[1.15] tracking-[0.11em] font-semibold text-[10px] sm:text-[11px] text-[#231b0c] uppercase">
      <div style={{ textShadow: '0 0.5px 0 rgba(255,255,255,0.35)' }}>{lines[0]}</div>
      <div style={{ textShadow: '0 0.5px 0 rgba(255,255,255,0.35)' }}>{lines[1]}</div>
    </div>
  </div>
);

const BrassHandleAndLock = ({
  isBright,
  isHovered,
  isUnlatching
}: {
  isBright: boolean;
  isHovered: boolean;
  isUnlatching?: boolean;
}) => (
  <div className="relative flex flex-col items-end select-none pointer-events-none">
    {/* Door Lever Handle with silky smooth spring tilt & physical unlatch depression */}
    <motion.div
      animate={{ rotate: isUnlatching ? -28 : isHovered ? -8.5 : 0 }}
      transition={{
        type: 'spring',
        stiffness: isUnlatching ? 340 : 220,
        damping: isUnlatching ? 15 : 18,
        mass: 0.7
      }}
      style={{ transformOrigin: '38px 10px' }}
      className="relative w-[48px] h-[22px]"
    >
      {/* Circular Rose / Baseplate on right */}
      <div
        className="absolute right-0 top-[2px] w-[18px] h-[18px] rounded-full transition-all duration-300"
        style={{
          background: isBright
            ? 'radial-gradient(circle at 35% 30%, #f7e8be 0%, #c8a45d 55%, #6e521f 100%)'
            : 'radial-gradient(circle at 35% 30%, #9e875b 0%, #735e38 65%, #3d3019 100%)',
          boxShadow: isBright
            ? '0 4px 10px rgba(0,0,0,0.7), 0 0 12px rgba(247, 232, 190, 0.25), inset 0 1px 1px rgba(255,255,255,0.7)'
            : '0 3px 6px rgba(0,0,0,0.65), inset 0 1px 1px rgba(255,255,255,0.3)'
        }}
      />
      {/* Horizontal Sculpted Lever Bar */}
      <div
        className="absolute right-[6px] top-[6px] w-[41px] h-[9px] rounded-l-full rounded-r-full transition-all duration-300"
        style={{
          background: isBright
            ? 'linear-gradient(180deg, #faeac3 0%, #d8b269 45%, #8a6829 85%, #b8944d 100%)'
            : 'linear-gradient(180deg, #a89164 0%, #7c663d 55%, #4a3b1f 90%)',
          boxShadow: isBright
            ? '0 6px 12px rgba(0,0,0,0.65), 0 0 10px rgba(250, 234, 195, 0.2), inset 0 1px 1px rgba(255,255,255,0.75)'
            : '0 4px 7px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.4)'
        }}
      />
    </motion.div>

    {/* Keyhole Escutcheon Below Handle */}
    <div
      className="mt-[10px] mr-[4px] w-[10px] h-[19px] rounded-full flex flex-col items-center justify-center transition-all duration-300"
      style={{
        background: isBright
          ? 'linear-gradient(145deg, #f3e0b0 0%, #bf9950 55%, #755821 100%)'
          : 'linear-gradient(145deg, #988156 0%, #685430 65%, #3b2e17 100%)',
        boxShadow: isBright
          ? '0 4px 7px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.6)'
          : '0 3px 5px rgba(0,0,0,0.65), inset 0 1px 0.5px rgba(255,255,255,0.35)'
      }}
    >
      {/* Keyhole Cutout */}
      <div className="w-[3.5px] h-[3.5px] rounded-full bg-[#151109]" />
      <div className="w-[2px] h-[5px] -mt-[1px] bg-[#151109] rounded-b-[1px]" />
    </div>
  </div>
);

// ==========================================
// MONITOR LIVE PREVIEW SIMULATIONS
// ==========================================
const MonitorScreenContent = ({ previewType }: { previewType: string }) => {
  const [cursorPos, setCursorPos] = useState({ x: 58, y: 54 });
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 2);
      setCursorPos({
        x: 42 + Math.sin(Date.now() / 650) * 18,
        y: 38 + Math.cos(Date.now() / 800) * 16
      });
    }, 3400);
    return () => clearInterval(interval);
  }, [previewType]);

  // 1. SUNDOWN STUDIO
  if (previewType === 'sundown') {
    const projectsList = [
      { title: 'SOHO NYC', active: true },
      { title: '50th Aniversery', active: false },
      { title: 'Make Studios HOI', active: false },
      { title: 'NYFW Popup', active: false },
      { title: 'Air Force 1 2021', active: false },
      { title: 'NYFW Popup', active: false }
    ];

    return (
      <div className="relative w-full h-full bg-[#efeae3] text-[#111111] overflow-hidden select-none">
        <AnimatePresence mode="wait">
          {slideIndex === 0 ? (
            <motion.div
              key="sundown-editorial"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full"
            >
              <div className="w-full overflow-hidden leading-none border-b border-black/10">
                <div className="text-[36px] sm:text-[50px] font-black tracking-tighter -mt-[22px] sm:-mt-[30px] whitespace-nowrap">
                  ENVIRONMENTS
                </div>
              </div>

              {/* Pulsing red-orange orb */}
              <motion.div
                animate={{
                  x: [0, 14, -8, 0],
                  y: [0, -10, 10, 0],
                  scale: [1, 1.08, 0.96, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-[45%] top-[32%] w-[125px] sm:w-[165px] h-[125px] sm:h-[165px] rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, #ff330a 0%, #fe4818 52%, rgba(239,234,227,0) 74%)',
                  filter: 'blur(8px)'
                }}
              />

              <div className="relative z-10 grid grid-cols-12 gap-3 px-5 sm:px-7 pt-7 sm:pt-10 items-start">
                <div className="col-span-8 pr-2">
                  <p className="text-[12.5px] sm:text-[16px] font-bold leading-[1.15] tracking-[-0.025em]">
                    We are a group of design-driven, goal-focused creators, producers, and designers who believe that the details make all the difference.
                  </p>
                </div>

                <div className="col-span-4 flex flex-col items-end">
                  <div className="w-full aspect-[16/10] rounded-[5px] overflow-hidden bg-neutral-800 shadow-md mb-3 relative">
                    <div
                      className="w-full h-full"
                      style={{
                        background:
                          'linear-gradient(125deg, #3c424a 0%, #8f96a0 45%, #22252a 100%)'
                      }}
                    />
                    <div className="absolute inset-0 opacity-45 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(255,255,255,0.2)_8px,rgba(255,255,255,0.2)_9px)]" />
                  </div>
                  <p className="text-[6.5px] sm:text-[7.5px] leading-[1.35] opacity-75 font-medium">
                    We love to create, we love to solve, we love to collaborate, and we love to turn amazing ideas into reality.
                  </p>
                </div>
              </div>

              <div className="absolute bottom-[-7px] left-5 sm:left-7 text-[13px] sm:text-[16px] font-extrabold tracking-tight">
                SOHO NYC
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sundown-list"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex flex-col justify-between"
            >
              <div className="w-full divide-y divide-black/15">
                {projectsList.map((item, idx) => (
                  <div
                    key={`${item.title}-${idx}`}
                    className={`px-4 sm:px-5 py-[7px] sm:py-[9.5px] flex items-center justify-between transition-colors ${
                      item.active ? 'bg-[#ff8c24] text-[#111111]' : 'bg-[#efeae3] text-[#111111]'
                    }`}
                  >
                    <span className="text-[12px] sm:text-[15.5px] font-bold tracking-[-0.02em]">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Floating Dark Exhibition Preview Card on Hover */}
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, y: [0, -5, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-[47%] top-[21%] w-[108px] sm:w-[132px] h-[126px] sm:h-[152px] rounded-[9px] bg-[#0e1312] shadow-[0_18px_38px_rgba(0,0,0,0.45)] overflow-hidden border border-black/20 flex flex-col items-center justify-center p-2"
              >
                <div className="grid grid-cols-5 gap-1 w-full px-2 opacity-75">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2.5 rounded-[1px] bg-gradient-to-br from-amber-300/80 via-amber-500/40 to-transparent border border-amber-200/30"
                    />
                  ))}
                </div>
                <div className="my-1.5 w-6 h-6 rounded-full border border-amber-300/90 flex items-center justify-center text-[7px] font-bold text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.8)]">
                  R
                </div>
                <div className="w-6 h-9 rounded-t-full bg-black/95 -mb-3 shadow-lg" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Pointer Cursor */}
        <motion.div
          animate={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute z-20 w-2.5 h-2.5 pointer-events-none"
        >
          <svg viewBox="0 0 16 16" className="w-3 h-3 fill-black drop-shadow">
            <path d="M3 2l10 5.5-4.5 1.3L6.8 14 3 2z" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // 2. PERSONAL PORTFOLIO
  if (previewType === 'personal-portfolio') {
    return (
      <div className="relative w-full h-full bg-[#050505] text-[#e5e5e5] overflow-hidden select-none flex flex-col justify-between p-4 sm:p-5">
        <div className="flex items-center justify-between text-[7.5px] sm:text-[8.5px] font-medium tracking-tight text-white/80">
          <span>Aditya Portfolio</span>
          <span className="uppercase tracking-widest text-[7px]">MENU+</span>
        </div>

        <motion.div
          animate={{ y: slideIndex === 0 ? 0 : -8 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="my-auto relative"
        >
          <div className="text-[28px] sm:text-[41px] font-bold tracking-[-0.03em] leading-[0.94] text-[#9fa1a6] uppercase">
            <div>PRODUCT</div>
            <div className="pl-[36px] sm:pl-[56px]">DESIGNER</div>
          </div>
          <div className="pl-[132px] sm:pl-[195px] mt-1 text-[6px] sm:text-[7px] tracking-[0.14em] uppercase text-white/80 font-semibold">
            AVAILABLE WORLDWIDE
          </div>

          <div className="mt-4 sm:mt-6 text-right text-[5.5px] sm:text-[6.5px] tracking-[0.08em] uppercase text-white/75 leading-[1.45]">
            <div>AVAILABLE FOR FREELANCE</div>
            <div>NEW PROJECTS OPEN</div>
          </div>
        </motion.div>

        <div className="flex items-center justify-between text-[6px] sm:text-[7px] tracking-[0.06em] uppercase text-white/75 pt-2 border-t border-white/10">
          <span>DESIGN &amp; MOTION ↗</span>
          <span>FULLSTACK CODE ↗</span>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center text-[6px]">
              ↓
            </span>
            <span className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center text-[6px]">
              ↓
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. P&L PAGE FOR ZERODHA
  if (previewType === 'zerodha-pnl') {
    return (
      <div className="relative w-full h-full bg-[#080907] text-[#eef2ec] overflow-hidden select-none">
        <AnimatePresence mode="wait">
          {slideIndex === 0 ? (
            <motion.div
              key="zerodha-hero"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex flex-col justify-between items-center pt-3 pb-4 px-4"
            >
              <div className="relative w-[68%] h-[58%] rounded-[4px] bg-[#141812] border border-white/15 p-2 flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.9)]">
                <div className="flex justify-between text-[5.5px] text-lime-300/80 font-mono">
                  <span>₹1,10,692.00</span>
                  <span>₹23,480.00</span>
                </div>
                <div className="grid grid-cols-12 gap-[2px] my-auto py-1">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-[1px] ${
                        i % 5 === 0
                          ? 'bg-red-500/75'
                          : i % 3 === 0
                          ? 'bg-lime-400/85'
                          : 'bg-emerald-600/45'
                      }`}
                    />
                  ))}
                </div>
                <div className="h-[2px] w-full bg-white/10" />
              </div>
              <div className="w-full h-[14px] bg-gradient-to-r from-[#0e1116] via-[#2b313d] to-[#0e1116] -mt-1 border-t border-white/10" />

              <div className="text-center mt-1">
                <div className="text-[12px] sm:text-[15px] font-bold leading-[1.15] tracking-tight text-white">
                  Make informed,
                  <br />
                  tax-advantaged decisions.
                </div>
                <p className="text-[6px] text-white/50 mt-1 max-w-[230px] mx-auto leading-tight">
                  Capture every financial opportunity by understanding your taxes including Incomes and deductions.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="zerodha-bento"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full p-4 grid grid-cols-12 gap-2.5"
            >
              <div className="col-span-6 bg-[#111310] border border-white/10 rounded-lg p-2.5 flex flex-col justify-between">
                <div className="h-2.5 w-3/4 rounded-sm bg-[#658322]" />
                <div className="my-auto h-14 w-full relative overflow-hidden flex items-center">
                  <div className="w-full h-8 bg-gradient-to-r from-amber-600/50 via-rose-500/40 to-lime-500/50 rounded blur-[1px]" />
                </div>
                <div className="text-[6px] text-white/45 font-mono">REALIZED STCG / LTCG FLOW</div>
              </div>

              <div className="col-span-6 bg-[#111310] border border-white/10 rounded-lg p-2.5 space-y-1.5">
                <div className="flex justify-between text-[7px]">
                  <span className="text-white/80 font-bold">₹1,10,692.00</span>
                  <span className="text-lime-400 font-bold">₹23,480.00</span>
                </div>
                <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-[6px] text-white/60">
                  Profit taxed at 20%
                  <div className="text-[5px] text-white/40">Listed Stocks, Mutual Funds</div>
                </div>
                <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-[6px] text-white/60">
                  Profit taxed at Slab Rate
                  <div className="text-[5px] text-white/40">Bonds and Debentures</div>
                </div>
              </div>

              <div className="col-span-6 bg-[#111310] border border-white/10 rounded-lg p-2.5">
                <div className="text-[7.5px] font-bold text-white">Accrual Summary</div>
                <p className="text-[5.5px] text-white/45 mt-0.5 leading-tight">
                  Get a clear picture of accrued capital gains, dividends and quarterly instalments.
                </p>
              </div>
              <div className="col-span-6 bg-[#111310] border border-white/10 rounded-lg p-2.5">
                <div className="text-[7.5px] font-bold text-white">Carry forward losses</div>
                <p className="text-[5.5px] text-white/45 mt-0.5 leading-tight">
                  Understand your current year losses and offset schedules.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 4. KRONO ARCHITECTURE
  if (previewType === 'krono') {
    return (
      <div className="relative w-full h-full overflow-hidden select-none bg-[#121316] text-[#f2f0ea]">
        <div className="w-full overflow-hidden leading-none border-b border-white/10">
          <div className="text-[36px] sm:text-[50px] font-black tracking-tighter -mt-[22px] sm:-mt-[30px] whitespace-nowrap">
            ARCHITECTURE LAB
          </div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.09, 0.96, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[46%] top-[34%] w-[125px] sm:w-[155px] h-[125px] sm:h-[155px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(56,189,248,0.85) 0%, rgba(37,99,235,0.45) 55%, rgba(0,0,0,0) 75%)',
            filter: 'blur(8px)'
          }}
        />
        <div className="relative z-10 grid grid-cols-12 gap-3 px-5 sm:px-7 pt-7 sm:pt-10 items-start">
          <div className="col-span-8 pr-2">
            <p className="text-[12px] sm:text-[15.5px] font-bold leading-[1.18] tracking-[-0.02em]">
              We engineer spatial digital flagships where brutalist structure meets fluid 60fps shader choreography.
            </p>
          </div>
          <div className="col-span-4 flex flex-col items-end">
            <div className="w-full aspect-[16/10] rounded-[5px] overflow-hidden bg-slate-800 shadow-md mb-3 relative" />
            <p className="text-[6.5px] sm:text-[7.5px] leading-[1.35] opacity-75 font-medium">
              Real-time raymarched concrete surfaces and daylight azimuth simulation.
            </p>
          </div>
        </div>
        <div className="absolute bottom-[-7px] left-5 sm:left-7 text-[13px] sm:text-[16px] font-extrabold tracking-tight">
          ZURICH / TOKYO
        </div>
      </div>
    );
  }

  // 5. VELOCE / AETHER MOBILE
  if (previewType === 'veloce' || previewType === 'aether') {
    const isAether = previewType === 'aether';
    return (
      <div className="relative w-full h-full bg-[#111015] text-white overflow-hidden flex items-center justify-between px-6 sm:px-9">
        <div
          className="absolute -right-10 -top-10 w-48 h-48 rounded-full blur-2xl pointer-events-none"
          style={{
            background: isAether
              ? 'radial-gradient(circle, rgba(168,85,247,0.45), transparent 70%)'
              : 'radial-gradient(circle, rgba(236,72,153,0.4), transparent 70%)'
          }}
        />
        <div className="max-w-[52%] z-10">
          <span className="text-[8px] uppercase tracking-[0.2em] text-purple-300/80 font-semibold">
            {isAether ? 'BIO-FEEDBACK ENGINE' : 'MOBILE TREASURY OS'}
          </span>
          <h4 className="text-[15px] sm:text-[19px] font-bold tracking-tight mt-1 leading-tight">
            {isAether ? 'Spatial coherence in 120fps.' : 'Instant multi-currency liquidity.'}
          </h4>
          <p className="text-[8.5px] text-white/60 mt-2 leading-relaxed">
            Built with native gesture physics, zero-frame-drop transitions, and offline cryptographic caching.
          </p>
          <div className="mt-3 flex gap-1.5">
            <span className="px-2 py-0.5 rounded-full text-[7.5px] bg-white/10 text-white/90">iOS 18</span>
            <span className="px-2 py-0.5 rounded-full text-[7.5px] bg-white/10 text-white/90">Swift / RN</span>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-[98px] sm:w-[116px] h-[175px] sm:h-[195px] rounded-[18px] bg-[#1d1b24] border-2 border-white/15 p-2 shadow-2xl flex flex-col justify-between"
        >
          <div className="w-8 h-1 bg-white/20 rounded-full mx-auto" />
          <div className="my-auto space-y-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/40 to-fuchsia-600/20 border border-white/10">
              <div className="text-[7px] text-white/60">TOTAL BALANCE</div>
              <div className="text-[12px] font-bold">$48,920.00</div>
            </div>
            <div className="h-12 rounded-xl bg-white/5 p-1.5 flex items-end gap-1">
              {[45, 70, 55, 90, 65, 95, 80].map((h, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: `${((h + slideIndex * 15) % 85) + 15}%` }}
                  className="flex-1 bg-purple-400/80 rounded-t-sm"
                />
              ))}
            </div>
          </div>
          <div className="h-5 rounded-lg bg-white text-black text-[7.5px] font-bold flex items-center justify-center">
            Send Instant
          </div>
        </motion.div>
      </div>
    );
  }

  // 6. LINEARITY / NOMA UI/UX
  if (previewType === 'linearity' || previewType === 'noma') {
    return (
      <div className="relative w-full h-full bg-[#161916] text-[#ebf0ea] overflow-hidden p-4 sm:p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8fb983]" />
            <span className="text-[9px] font-mono tracking-wider uppercase text-white/70">
              FIGMA TOKEN SYSTEM v4.2
            </span>
          </div>
          <span className="text-[8px] px-2 py-0.5 rounded bg-[#8fb983]/20 text-[#b4dca8]">
            WCAG AAA Verified
          </span>
        </div>

        <div className="grid grid-cols-12 gap-3 my-auto py-2">
          <div className="col-span-7 bg-white/[0.04] border border-white/10 rounded-lg p-3 space-y-2">
            <div className="text-[8px] text-white/50 uppercase tracking-wider">Interactive Component Matrix</div>
            <div className="text-[13px] font-semibold leading-snug">
              Unified keyboard-first command palette &amp; multi-theme variables
            </div>
            <div className="flex gap-1.5 pt-1">
              <div className="px-2 py-1 rounded bg-[#7c9473] text-[#111510] text-[8px] font-bold">
                Primary Action
              </div>
              <div className="px-2 py-1 rounded border border-white/20 text-[8px]">
                Token Inspect
              </div>
            </div>
          </div>

          <div className="col-span-5 bg-white/[0.04] border border-white/10 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="text-[7.5px] text-white/50">CONVERSION LIFT</div>
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0.4, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[22px] font-bold text-[#a9cc9c]"
            >
              +{42 + slideIndex * 4}%
            </motion.div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${68 + slideIndex * 10}%` }}
                className="h-full bg-[#8fb983]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[7.5px] text-white/40 font-mono">
          <span>420+ ATOMIC COMPONENTS</span>
          <span>AUTO-LAYOUT GRID: 8PX</span>
        </div>
      </div>
    );
  }

  // 7. GRAPHIC DESIGN
  return (
    <div className="relative w-full h-full bg-[#f3ece2] text-[#1d1612] overflow-hidden p-5 sm:p-7 flex flex-col justify-between">
      <motion.div
        animate={{ rotate: [0, 8, -4, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[10%] top-[18%] w-[120px] h-[120px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #c85a28 0%, rgba(200,90,40,0.25) 60%, transparent 75%)',
          filter: 'blur(6px)'
        }}
      />
      <div className="flex justify-between items-start border-b border-[#1d1612]/20 pb-2 relative z-10">
        <span className="text-[8px] font-mono tracking-[0.22em] uppercase">ISSUE NO. 09 — ARCHIVE</span>
        <span className="text-[8px] font-mono">SWISS GRID / CUSTOM SERIF</span>
      </div>

      <div className="relative z-10 my-auto">
        <div className="text-[26px] sm:text-[34px] font-black tracking-tighter leading-[0.95] uppercase">
          SOLSTICE
          <br />
          ROASTERS®
        </div>
        <p className="text-[8.5px] max-w-[65%] mt-2 leading-relaxed font-medium text-[#1d1612]/80">
          Bespoke editorial typography, tactile foil-stamped packaging systems, and kinetic art direction.
        </p>
      </div>

      <div className="relative z-10 flex justify-between items-end text-[8px] font-bold tracking-widest uppercase">
        <span>PANTONE 1675 C</span>
        <span>ZURICH • MILAN</span>
      </div>
    </div>
  );
};

// ==========================================
// 3D APPLE STUDIO DISPLAY MONITOR COMPONENT
// ==========================================
const DesktopMonitorMockup = ({
  previewType,
  orientation = 'right'
}: {
  previewType: string;
  orientation?: 'left' | 'right';
}) => {
  const isLeft = orientation === 'left';
  const baseRotateY = isLeft ? 13 : -13;
  const hoverRotateY = isLeft ? 7 : -7;

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center py-2 select-none"
      style={{ perspective: '1300px' }}
    >
      <motion.div
        initial={{ rotateY: baseRotateY, rotateX: 2 }}
        animate={{ rotateY: baseRotateY, rotateX: 2 }}
        whileHover={{ rotateY: hoverRotateY, rotateX: 0, scale: 1.01 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full max-w-[565px]"
      >
        <div
          className="relative w-full aspect-[16/10.3] rounded-[16px] p-[9px] sm:p-[11px] bg-[#0a0a0c]"
          style={{
            border: '1.5px solid rgba(255,255,255,0.16)',
            boxShadow: isLeft
              ? '-6px 8px 0px #2b2b2e, -7px 9px 0px rgba(255,255,255,0.18), 0 35px 70px rgba(0,0,0,0.85)'
              : '6px 8px 0px #2b2b2e, 7px 9px 0px rgba(255,255,255,0.18), 0 35px 70px rgba(0,0,0,0.85)'
          }}
        >
          <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[#25272c] border border-white/10" />

          <div className="w-full h-full rounded-[7px] overflow-hidden bg-[#0a0a0a] relative shadow-inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={previewType}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                <MonitorScreenContent previewType={previewType} />
              </motion.div>
            </AnimatePresence>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(115deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.015) 38%, transparent 42%)'
              }}
            />
          </div>
        </div>

        <div className="relative flex flex-col items-center -mt-[2px] pointer-events-none">
          <div
            className="w-[62px] sm:w-[74px] h-[52px] sm:h-[62px]"
            style={{
              clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)',
              background:
                'linear-gradient(90deg, #7c7d82 0%, #dcdde2 32%, #ffffff 50%, #b5b7bd 75%, #66686d 100%)',
              boxShadow: 'inset 0 8px 14px rgba(0,0,0,0.45)'
            }}
          />
          <div
            className="w-[145px] sm:w-[175px] h-[9px] rounded-[3px] -mt-[2px]"
            style={{
              transform: isLeft ? 'rotate(2deg)' : 'rotate(-2deg)',
              background:
                'linear-gradient(90deg, #8e9096 0%, #f1f2f6 40%, #c1c3c9 80%, #6f7177 100%)',
              boxShadow: '0 10px 24px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.6)'
            }}
          />
          <div className="w-[240px] h-[14px] rounded-full bg-black/80 blur-md -mt-[4px] -z-10" />
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// SCROLL-DRIVEN STICKY PARALLAX PROJECT CARD
// ==========================================
interface ProjectCardProps {
  project: ServiceProject;
  index: number;
  totalCards: number;
  scrollTop: number;
  containerHeight: number;
}

const StickyProjectCard = ({
  project,
  index,
  totalCards,
  scrollTop,
  containerHeight,
}: ProjectCardProps) => {
  const cardSlotRef = useRef<HTMLDivElement>(null);
  const isAlternated = index % 2 === 1;
  // Comfortable clearance below floating navigation capsule (~68px bottom)
  const stickyTopPx = 104 + index * 22;

  const [cardTransform, setCardTransform] = useState({
    scale: 1,
    darkness: 0,
    translateY: 0,
  });

  // Calculate dynamic scale and darkening based on scroll position in effect
  useEffect(() => {
    if (!cardSlotRef.current || index >= totalCards - 1) return;

    const rect = cardSlotRef.current.getBoundingClientRect();
    const isPinned = rect.top <= stickyTopPx + 2;

    if (isPinned) {
      const pastStick = Math.max(0, stickyTopPx - rect.top);
      const overlapThreshold = Math.max(320, containerHeight * 0.52);
      const progress = Math.min(1, Math.max(0, pastStick / overlapThreshold));

      setCardTransform({
        scale: 1 - progress * 0.055,
        darkness: progress * 0.38,
        translateY: -progress * 10,
      });
    } else {
      setCardTransform({ scale: 1, darkness: 0, translateY: 0 });
    }
  }, [scrollTop, containerHeight, index, totalCards, stickyTopPx]);

  return (
    <div
      ref={cardSlotRef}
      className="sticky w-full transition-all duration-150 ease-out will-change-transform"
      style={{
        top: `${stickyTopPx}px`,
        zIndex: (index + 1) * 10,
        marginBottom: index === totalCards - 1 ? '4vh' : '20vh',
      }}
    >
      <div
        style={{
          transform: `scale(${cardTransform.scale}) translateY(${cardTransform.translateY}px)`,
          transformOrigin: 'top center',
          transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative w-full rounded-[24px] sm:rounded-[30px] bg-[#201f1d] border border-white/[0.09] px-6 py-9 sm:px-12 sm:py-12 md:px-14 md:py-14 shadow-[0_-18px_45px_rgba(0,0,0,0.85),0_28px_70px_rgba(0,0,0,0.75)] min-h-[500px] sm:min-h-[570px] flex items-center overflow-hidden will-change-transform"
      >
        {/* Subtle dark depth veil as card is pushed into background by incoming card */}
        <div
          style={{ opacity: cardTransform.darkness }}
          className="absolute inset-0 bg-black pointer-events-none z-20 rounded-[24px] sm:rounded-[30px] transition-opacity duration-150"
        />

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div
            className={`lg:col-span-5 flex flex-col justify-center ${
              isAlternated ? 'lg:order-2 lg:pl-3' : 'lg:order-1 lg:pr-3'
            }`}
          >
            <div className="text-[10.5px] tracking-[0.2em] uppercase text-white/55 font-semibold font-mono">
              {project.category}
            </div>

            <h2 className="mt-2.5 text-[30px] sm:text-[40px] font-bold tracking-[-0.025em] text-[#f4f2ed] leading-[1.08]">
              {project.name}
            </h2>

            <div className="text-[13px] text-white/55 mt-1.5 font-normal">
              {project.subtitle}
            </div>

            <p className="mt-4 sm:mt-5 text-[13.5px] sm:text-[14.5px] leading-[1.68] text-white/70 max-w-[440px]">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full text-[11px] text-white/80 bg-transparent border border-white/[0.13]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.liveUrl ? (
              <div className="mt-7">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e8e6e1] hover:bg-white text-[#141413] text-[12px] font-semibold tracking-tight transition shadow-md cursor-pointer"
                >
                  <span>Visit live site</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
                </a>
              </div>
            ) : (
              <div className="mt-7 flex items-center gap-2 text-[11.5px] text-white/55">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b8982]" />
                <span>{project.recordingNote || 'Screen recording of the build'}</span>
              </div>
            )}
          </div>

          <div
            className={`lg:col-span-7 flex items-center justify-center ${
              isAlternated ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <DesktopMonitorMockup
              previewType={project.previewType}
              orientation={isAlternated ? 'left' : 'right'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// DEDICATED SERVICE PORTFOLIO PAGE
// ==========================================
export const DedicatedServicePage = ({
  service,
  onBack,
  onSelectOtherService,
  onOpenContact
}: {
  service: ServiceItem;
  onBack: () => void;
  onSelectOtherService: (serviceId: string) => void;
  onOpenContact?: () => void;
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(800);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll the dedicated service overlay container to top on mount / change
    pageContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });

    const containerEl = pageContainerRef.current;
    if (!containerEl) return;

    setContainerHeight(containerEl.clientHeight);

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setScrollTop(containerEl.scrollTop);
        setShowScrollTop(containerEl.scrollTop > 320);
        rafId = null;
      });
    };

    const handleResize = () => {
      if (containerEl) setContainerHeight(containerEl.clientHeight);
    };

    containerEl.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      containerEl.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [service.id]);

  const scrollToTop = () => {
    pageContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={pageContainerRef}
      className="w-full h-[100dvh] min-h-[100dvh] overflow-y-auto overflow-x-hidden bg-[#181817] text-[#f3f2ee] scroll-smooth"
    >
      {/* SECTION INTRODUCTION: Generous top spacing below floating capsule navbar & deliberate bottom gap before first card */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 md:pt-40 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20 md:mb-24 lg:mb-28"
        >
          <h1 className="text-[40px] sm:text-[56px] md:text-[68px] lg:text-[78px] font-bold tracking-[-0.035em] leading-[1.04] text-[#f2f0ec]">
            {service.title}
          </h1>
          <p className="mt-5 sm:mt-6 text-[14px] sm:text-[15.5px] text-white/65 max-w-[500px] leading-[1.65] font-normal">
            {service.shortDesc}
          </p>
        </motion.div>

        {/* SCROLL-DRIVEN OVERLAPPING PARALLAX PROJECT CARDS (Section 4) */}
        <div
          ref={cardsContainerRef}
          className="relative w-full pb-20 sm:pb-28"
        >
          {service.projects.map((project, idx) => (
            <StickyProjectCard
              key={project.name}
              project={project}
              index={idx}
              totalCards={service.projects.length}
              scrollTop={scrollTop}
              containerHeight={containerHeight}
            />
          ))}
        </div>
      </div>

      {/* FOOTER & CTA SECTION */}
      <FooterCTA
        onSelectService={onSelectOtherService}
      />

      {/* FIXED BOTTOM-LEFT "Back to the doors" PILL (Section 5) */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        onClick={onBack}
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-full bg-[#222220]/90 hover:bg-[#2c2c29] text-white/90 hover:text-white border border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.65)] backdrop-blur-md flex items-center gap-2 text-[12px] font-medium transition-all group cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-white/70 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to the doors</span>
      </motion.button>

      {/* FIXED BOTTOM-RIGHT SCROLL-TO-TOP CIRCLE BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[#e4e2dd] hover:bg-white text-[#141413] shadow-[0_8px_24px_rgba(0,0,0,0.6)] flex items-center justify-center text-[15px] font-bold transition cursor-pointer"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// COMPONENT HANDLES & PROPS
// ==========================================
export interface DoorsSectionHandle {
  openService: (serviceId: string) => void;
  backToDoors: () => void;
}

export interface DoorsSectionProps {
  activeServiceId?: string | null;
  onActiveServiceChange?: (serviceId: string | null) => void;
  onServiceOpened?: (serviceId: string, cameraCoords?: { x: number; y: number; z: number }) => void;
}

// 3D Viewport coordinate & scale calculation for doorway camera alignment
export interface CameraFlightState {
  x: number;
  y: number;
  scale: number;
  originX: number;
  originY: number;
}

export function computeDoorCameraCoords(
  index: number,
  doorEl?: HTMLElement | null,
  containerEl?: HTMLElement | null
): CameraFlightState {
  const isBrowser = typeof window !== 'undefined';
  const vpW = isBrowser ? window.innerWidth : 1200;
  const vpH = isBrowser ? window.innerHeight : 800;

  if (doorEl && containerEl) {
    const doorRect = doorEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    // Center of clicked door in container pixel coordinates
    const doorCenterX = doorRect.left - containerRect.left + doorRect.width * 0.5;
    const doorCenterY = doorRect.top - containerRect.top + doorRect.height * 0.46;

    // Viewport center in container pixel coordinates
    const vpCenterX = containerRect.width * 0.5;
    const vpCenterY = containerRect.height * 0.5;

    // Pan required to align the door center directly with viewport center
    const panX = vpCenterX - doorCenterX;
    const panY = vpCenterY - doorCenterY;

    // Scale factor so the doorway opening cleanly covers the entire viewport in both axes
    const scaleX = vpW / (doorRect.width * 0.78);
    const scaleY = vpH / (doorRect.height * 0.78);
    const scaleFactor = Math.max(7.2, Math.min(10.5, Math.max(scaleX, scaleY)));

    return {
      x: panX,
      y: panY,
      scale: scaleFactor,
      originX: doorCenterX,
      originY: doorCenterY,
    };
  }

  // Geometric fallback based on responsive layout
  const fallbackPans = [380, 125, -125, -380];
  return {
    x: fallbackPans[index] ?? 0,
    y: 0,
    scale: 7.5,
    originX: vpW * 0.5,
    originY: vpH * 0.5,
  };
}

// ==========================================
// MAIN INTERACTIVE FOUR-DOOR COMPONENT
// ==========================================
const DoorsSection = forwardRef<DoorsSectionHandle, DoorsSectionProps>(function DoorsSection(
  { onActiveServiceChange, onServiceOpened }: DoorsSectionProps,
  ref
) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<
    'idle' | 'opening' | 'entering' | 'blackout' | 'page' | 'exiting_camera' | 'exiting_door'
  >('idle');
  const [selectedDoorIndex, setSelectedDoorIndex] = useState<number | null>(null);
  const [unlatchingIndex, setUnlatchingIndex] = useState<number | null>(null);
  const [cameraFlight, setCameraFlight] = useState<CameraFlightState>({
    x: 0,
    y: 0,
    scale: 1,
    originX: 0,
    originY: 0,
  });
  const [veilOpacity, setVeilOpacity] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const doorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const transitionLockRef = useRef<boolean>(false);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
      transitionLockRef.current = false;
      document.body.style.overflow = '';
    };
  }, []);

  // Lock body scroll while reading the full-screen service page overlay
  useEffect(() => {
    if (phase === 'page') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [phase]);

  // Initial deep link support (#web-development, etc.)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const foundIdx = SERVICES.findIndex((s) => s.id === hash);
    if (foundIdx !== -1 && phase === 'idle' && selectedDoorIndex === null) {
      const flight = computeDoorCameraCoords(
        foundIdx,
        doorRefs.current[foundIdx],
        containerRef.current
      );
      setCameraFlight(flight);
      setSelectedDoorIndex(foundIdx);
      setPhase('page');
      if (onActiveServiceChange) {
        onActiveServiceChange(SERVICES[foundIdx].id);
      }
      containerRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Browser history popstate (Back/Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      const foundIdx = SERVICES.findIndex((s) => s.id === hash);
      if (foundIdx !== -1) {
        if (selectedDoorIndex !== foundIdx) {
          handleDoorClick(foundIdx);
        }
      } else {
        if (phase === 'page') {
          handleBackToDoors();
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, selectedDoorIndex]);

  // Expose imperative control for Navbar and Hero Section buttons
  useImperativeHandle(ref, () => ({
    openService: (serviceId: string) => {
      const idx = SERVICES.findIndex((s) => s.id === serviceId);
      if (idx !== -1) {
        if (phase === 'page') {
          handleSwitchServiceDirectly(serviceId);
        } else if (phase === 'idle') {
          containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            handleDoorClick(idx);
          }, 350);
        }
      }
    },
    backToDoors: () => {
      if (phase === 'page') {
        handleBackToDoors();
      }
    }
  }));

  function handleDoorClick(index: number) {
    // Guard against clicks during active transition
    if (transitionLockRef.current || phase !== 'idle') return;
    transitionLockRef.current = true;

    const flight = computeDoorCameraCoords(
      index,
      doorRefs.current[index],
      containerRef.current
    );
    setCameraFlight(flight);

    setSelectedDoorIndex(index);
    setHoveredIndex(null);
    setUnlatchingIndex(index);
    setPhase('opening');
    setVeilOpacity(0);

    clearAllTimers();

    // Stage 1: Lever handle depression (0ms - 200ms)
    const t1 = setTimeout(() => {
      setUnlatchingIndex(null);
    }, 200);
    timersRef.current.push(t1);

    // Stage 2: Gate reaches open position; camera begins moving FORWARD through the open doorway (650ms)
    const t2 = setTimeout(() => {
      setPhase('entering');
    }, 650);
    timersRef.current.push(t2);

    // Stage 3: Camera passes through doorway; black veil fades in (1350ms)
    const t3 = setTimeout(() => {
      setPhase('blackout');
      setVeilOpacity(1);
    }, 1350);
    timersRef.current.push(t3);

    // Stage 4: Screen is 100% solid pitch black; mount service page overlay and fade out veil (1680ms)
    const t4 = setTimeout(() => {
      const serviceId = SERVICES[index].id;
      setPhase('page');
      setVeilOpacity(0);
      transitionLockRef.current = false;
      if (onActiveServiceChange) {
        onActiveServiceChange(serviceId);
      }
      if (onServiceOpened) {
        onServiceOpened(serviceId);
      }
      try {
        window.history.pushState({ serviceId }, '', `#${serviceId}`);
      } catch {
        // Ignore
      }
    }, 1680);
    timersRef.current.push(t4);
  }

  function handleBackToDoors() {
    if (transitionLockRef.current) return;
    transitionLockRef.current = true;
    clearAllTimers();

    if (onActiveServiceChange) {
      onActiveServiceChange(null);
    }
    try {
      window.history.pushState({}, '', window.location.pathname);
    } catch {
      // Ignore
    }

    // PHASE 1: Fade service page smoothly to solid pitch black (0ms - 320ms)
    setVeilOpacity(1);

    // PHASE 2: At 320ms, screen is 100% solid pitch black!
    // Unmount service page overlay.
    // Ensure viewport is anchored directly to the four gates!
    const t1 = setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
      setPhase('exiting_camera');
      setVeilOpacity(0); // Fade out veil to reveal open doorway interior

      // PHASE 3: Camera moves BACKWARDS through the doorway (0ms to 920ms)
      // Selected door remains firmly open at 80deg while camera pulls backward
      const t2 = setTimeout(() => {
        // PHASE 4: Camera arrives at normal view; now the selected gate rotates closed!
        setPhase('exiting_door');

        // PHASE 5: Door finishes swinging closed (0ms to 650ms)
        const t3 = setTimeout(() => {
          setPhase('idle');
          setSelectedDoorIndex(null);
          setCameraFlight({ x: 0, y: 0, scale: 1, originX: 0, originY: 0 });
          transitionLockRef.current = false;
        }, 650);
        timersRef.current.push(t3);
      }, 920);
      timersRef.current.push(t2);
    }, 320);
    timersRef.current.push(t1);
  }

  const handleSwitchServiceDirectly = (serviceId: string) => {
    const idx = SERVICES.findIndex((s) => s.id === serviceId);
    if (idx !== -1) {
      setSelectedDoorIndex(idx);
      setPhase('page');
      if (onActiveServiceChange) {
        onActiveServiceChange(serviceId);
      }
      try {
        window.history.pushState({ serviceId }, '', `#${serviceId}`);
      } catch {
        // Ignore
      }
    }
  };

  const getInfoPanelPositionStyle = (index: number) => {
    if (index === 0) return { left: '27.5%' };
    if (index === 1) return { left: '51.5%' };
    if (index === 2) return { left: '74.5%' };
    return { left: '46%' };
  };

  // Camera flight phase flags
  const isCameraEntering = phase === 'entering' || phase === 'blackout' || phase === 'page';
  const isCameraExiting = phase === 'exiting_camera';

  return (
    <div id="doors" className="w-full bg-[#181715] text-[#f4f2ed] font-sans antialiased selection:bg-amber-200 selection:text-black relative">
      {/* 1. CONTINUOUS 3D GATE ENTRANCE SCENE: Full viewport height (100dvh) with centered perspective */}
      <section
        ref={containerRef}
        className="relative w-full h-[100dvh] min-h-[100dvh] bg-[#181715] flex flex-col justify-between items-center overflow-hidden select-none"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* 3D CAMERA VIEWPOINT RIG: Moves forward and backward through the open doorway along the depth axis */}
        <motion.div
          animate={
            isCameraEntering
              ? {
                  x: cameraFlight.x,
                  y: cameraFlight.y,
                  scale: cameraFlight.scale,
                }
              : {
                  x: 0,
                  y: 0,
                  scale: 1,
                }
          }
          transition={
            isCameraEntering
              ? {
                  duration: 0.92,
                  ease: [0.35, 0, 0.2, 1],
                }
              : isCameraExiting
              ? {
                  duration: 0.88,
                  ease: [0.22, 1, 0.36, 1],
                }
              : {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          style={{
            transformOrigin:
              cameraFlight.originX && cameraFlight.originY
                ? `${cameraFlight.originX}px ${cameraFlight.originY}px`
                : '50% 50%',
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full flex flex-col justify-between items-center relative will-change-transform"
        >
          {/* BACKGROUND WALL LIGHTING & VIGNETTE */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background:
                hoveredIndex !== null
                  ? `radial-gradient(ellipse 65% 55% at 50% 48%, #2b2825 0%, #1c1b19 55%, #131211 100%)`
                  : 'radial-gradient(ellipse 70% 60% at 50% 48%, #2a2825 0%, #1f1e1c 58%, #151413 100%)'
            }}
          />

          {/* MAIN HEADING: "Magic happens behind the doors" with clearance below floating navbar */}
          <div className="relative z-20 pt-16 sm:pt-20 md:pt-24 pb-2 px-4 text-center pointer-events-none">
            <h2
              className="text-[32px] sm:text-[44px] md:text-[52px] font-bold tracking-[-0.03em] text-[#f2f0ec] leading-tight text-center drop-shadow-md"
              style={{
                textShadow: '0 8px 28px rgba(0,0,0,0.55)'
              }}
            >
              Magic happens behind the doors
            </h2>
          </div>

          {/* FOUR ARCHED DOORS STAGE + SYNCHRONIZED HOVER PANEL */}
          <div className="relative z-20 w-full max-w-[1260px] mx-auto px-4 sm:px-8 flex flex-col justify-end">
            <div
              onMouseLeave={() => {
                if (phase === 'idle' && !transitionLockRef.current) setHoveredIndex(null);
              }}
              className="relative w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-end"
            >
              {SERVICES.map((service, index) => {
                const isAnyHovered = hoveredIndex !== null;
                const isThisHovered = hoveredIndex === index && phase === 'idle';
                const isSelected = selectedDoorIndex === index;
                const isOpeningThis = isSelected && (phase === 'opening' || phase === 'entering' || phase === 'blackout');
                const isExitingCameraThis = isSelected && phase === 'exiting_camera';
                const isExitingDoorThis = isSelected && phase === 'exiting_door';
                const isDoorHeldOpen = isOpeningThis || isExitingCameraThis;
                const isDimmedByHover = isAnyHovered && !isThisHovered && phase === 'idle';

                const isHardwareBright =
                  isThisHovered ||
                  isDoorHeldOpen ||
                  (!isAnyHovered && phase === 'idle' && (index === 2 || index === 3));

                const isUnlatching = unlatchingIndex === index;

                return (
                  <div
                    key={service.id}
                    className="relative flex flex-col items-center justify-end"
                    style={{
                      zIndex: isSelected ? 40 : isThisHovered ? 30 : 10
                    }}
                  >
                    {/* DOOR FRAME: Stays STATIONARY during door open and camera flight (Section 2) */}
                    <div
                      ref={(el) => {
                        doorRefs.current[index] = el;
                      }}
                      onMouseEnter={() => {
                        if (phase === 'idle' && !transitionLockRef.current) {
                          setHoveredIndex(index);
                        }
                      }}
                      onClick={() => handleDoorClick(index)}
                      className="relative w-full max-w-[275px] h-[440px] sm:h-[490px] md:h-[530px] lg:h-[570px] max-h-[64vh] rounded-t-full p-[9px] sm:p-[12px] pb-0 cursor-pointer group will-change-transform transition-all duration-300"
                      style={{
                        background:
                          'linear-gradient(180deg, #3d3b37 0%, #2c2927 45%, #22201e 100%)',
                        boxShadow:
                          isThisHovered || isDoorHeldOpen
                            ? `0 -12px 35px rgba(0,0,0,0.85), 0 24px 60px rgba(0,0,0,0.92), 0 0 38px ${service.ambientGlow}, inset 0 2px 2px rgba(255,255,255,0.18)`
                            : '0 12px 32px rgba(0,0,0,0.75), inset 0 1px 1px rgba(255,255,255,0.08)',
                        border: '1px solid #171615',
                        borderBottom: 'none',
                        opacity: isDimmedByHover ? 0.22 : 1,
                        filter: isDimmedByHover ? 'brightness(0.6) contrast(0.9)' : 'none',
                      }}
                    >
                      <div
                        className="relative w-full h-full rounded-t-full p-[6px] pb-0 bg-[#000000] overflow-visible"
                        style={{
                          perspective: '1150px',
                          perspectiveOrigin: '50% 52%',
                          border: '2px solid #141312',
                          borderBottom: 'none'
                        }}
                      >
                        {/* 3D HINGED DOOR LEAF: Rotates around actual hinge (0% 50%) INWARD (Section 2) */}
                        <motion.div
                          initial={
                            (isExitingCameraThis || isExitingDoorThis) ? { rotateY: 80 } : false
                          }
                          animate={{
                            rotateY: isDoorHeldOpen ? 80 : isThisHovered ? 8 : 0
                          }}
                          transition={
                            isOpeningThis
                              ? {
                                  duration: 0.65,
                                  ease: [0.22, 1, 0.36, 1]
                                }
                              : isExitingDoorThis
                              ? {
                                  duration: 0.65,
                                  ease: [0.22, 1, 0.36, 1]
                                }
                              : {
                                  type: 'spring',
                                  stiffness: 185,
                                  damping: 22,
                                  mass: 0.85
                                }
                          }
                          style={{
                            transformOrigin: '0% 50%',
                            transformStyle: 'preserve-3d',
                            backgroundColor: service.color,
                            boxShadow: isDoorHeldOpen
                              ? '24px 12px 42px rgba(0,0,0,0.98), inset 0 2px 3px rgba(255,255,255,0.18)'
                              : isThisHovered
                              ? `14px 14px 28px rgba(0,0,0,0.88), 0 0 25px ${service.ambientGlow}, inset 0 2px 3px rgba(255,255,255,0.24)`
                              : 'inset 0 2px 4px rgba(255,255,255,0.12), inset 0 -10px 25px rgba(0,0,0,0.45)'
                          }}
                          className="relative z-20 w-full h-full rounded-t-full p-[10px] sm:p-[14px] pb-0 flex flex-col items-center will-change-transform"
                        >
                          <div
                            className="relative w-full h-full rounded-t-full overflow-hidden flex flex-col items-center"
                            style={{
                              border: `3px solid ${service.borderColor}`,
                              borderBottom: 'none',
                              boxShadow:
                                'inset 0 4px 12px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.1)'
                            }}
                          >
                            <div
                              className="absolute inset-0 pointer-events-none opacity-90"
                              style={{
                                backgroundImage: `repeating-linear-gradient(
                                  90deg,
                                  rgba(255,255,255,0.045) 0px,
                                  rgba(255,255,255,0.045) 3px,
                                  rgba(0,0,0,0.26) 3px,
                                  rgba(0,0,0,0.26) 6px,
                                  transparent 6px,
                                  transparent 9px
                                )`
                              }}
                            />

                            <motion.div
                              animate={{
                                opacity: isDoorHeldOpen
                                  ? 0.55
                                  : isThisHovered
                                  ? 1
                                  : isHardwareBright
                                  ? 0.75
                                  : 0.35
                              }}
                              transition={{ duration: 0.6 }}
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background:
                                  'radial-gradient(ellipse 90% 55% at 50% 22%, rgba(255,246,220,0.22) 0%, transparent 72%)'
                              }}
                            />

                            <motion.div
                              animate={{
                                opacity: isDoorHeldOpen ? 0.35 : 0
                              }}
                              transition={{ duration: 0.9 }}
                              className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/65 via-black/20 to-transparent"
                            />

                            <div className="relative z-10 mt-[120px] sm:mt-[155px] md:mt-[175px]">
                              <BrassNameplate
                                lines={service.doorLabel}
                                isBright={isHardwareBright}
                              />
                            </div>

                            <div className="absolute right-[10px] sm:right-[15px] top-[60%] z-10">
                              <BrassHandleAndLock
                                isBright={isHardwareBright}
                                isHovered={isThisHovered}
                                isUnlatching={isUnlatching}
                              />
                            </div>
                          </div>

                          <div
                            className="absolute top-[15%] bottom-0 -right-[7px] w-[7px] pointer-events-none"
                            style={{
                              background: service.borderColor,
                              transform: 'rotateY(90deg)',
                              transformOrigin: 'left center'
                            }}
                          />
                        </motion.div>

                        {/* Active Hover "Click to enter" Badge (Horizontally Centered, only on hovered door) */}
                        <AnimatePresence>
                          {isThisHovered && phase === 'idle' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.86, y: 8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.88, y: 5 }}
                              transition={{
                                type: 'spring',
                                stiffness: 280,
                                damping: 20
                              }}
                              className="absolute left-1/2 -translate-x-1/2 top-[52%] z-30 px-4 py-1.5 rounded-full bg-[#f4f3ee] text-[#161514] text-[11px] font-semibold tracking-tight shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_15px_rgba(255,255,255,0.25)] pointer-events-none whitespace-nowrap"
                            >
                              Click to enter
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="absolute -bottom-[1px] -left-[4px] w-[14px] h-[16px] bg-[#2a2826] border border-[#171615]" />
                      <div className="absolute -bottom-[1px] -right-[4px] w-[14px] h-[16px] bg-[#2a2826] border border-[#171615]" />
                    </div>

                    {/* Mobile tap button */}
                    <button
                      onClick={() => handleDoorClick(index)}
                      disabled={phase !== 'idle'}
                      className="lg:hidden mt-2 mb-3 text-center group cursor-pointer disabled:cursor-default"
                    >
                      <div className="text-[12px] font-semibold text-white/90">
                        {service.title}
                      </div>
                      <div className="text-[10px] text-amber-200/75 flex items-center justify-center gap-1">
                        <span>Tap to open door</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </button>
                  </div>
                );
              })}

              {/* FLOATING SYNCHRONIZED SERVICE INFO PANEL */}
              <AnimatePresence>
                {hoveredIndex !== null && phase === 'idle' && SERVICES[hoveredIndex] && (
                  <motion.div
                    key={SERVICES[hoveredIndex].id}
                    initial={{
                      opacity: 0,
                      x: hoveredIndex === 3 ? 20 : -20,
                      y: 8,
                      filter: 'blur(4px)'
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      filter: 'blur(0px)'
                    }}
                    exit={{
                      opacity: 0,
                      x: hoveredIndex === 3 ? 12 : -12,
                      y: 4,
                      filter: 'blur(3px)'
                    }}
                    transition={{
                      duration: 0.38,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    style={getInfoPanelPositionStyle(hoveredIndex)}
                    className="hidden lg:block absolute top-[33%] z-30 w-[340px] pointer-events-none select-none"
                  >
                    <motion.h2
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05, duration: 0.3 }}
                      className="text-[32px] font-bold tracking-[-0.025em] text-white leading-tight drop-shadow-md"
                    >
                      {SERVICES[hoveredIndex]?.title}
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/70"
                    >
                      {SERVICES[hoveredIndex]?.tagline}
                    </motion.div>

                    <ul className="mt-5 space-y-2.5">
                      {SERVICES[hoveredIndex]?.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.12 + i * 0.045,
                            duration: 0.28,
                            ease: 'easeOut'
                          }}
                          className="flex items-center gap-2.5 text-[13.5px] text-white/95 font-normal drop-shadow-sm"
                        >
                          <span
                            className="w-[17px] h-[17px] rounded-full flex items-center justify-center shrink-0 shadow-sm"
                            style={{
                              backgroundColor: SERVICES[hoveredIndex]?.badgeBg,
                              color: SERVICES[hoveredIndex]?.badgeText,
                              boxShadow: `0 0 10px ${SERVICES[hoveredIndex]?.ambientGlow}`
                            }}
                          >
                            <Check className="w-[10px] h-[10px]" strokeWidth={3.4} />
                          </span>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* BASEBOARD MOULDING: Fixed to bottom edge of 100dvh viewport */}
          <div className="relative z-20 w-full pointer-events-none">
            <div
              className="w-full h-[20px] sm:h-[24px]"
              style={{
                background:
                  'linear-gradient(180deg, #353330 0%, #252422 35%, #1c1b19 85%, #121110 100%)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 -4px 16px rgba(0,0,0,0.65)'
              }}
            />
            <div className="w-full h-[12px] bg-[#11100f]" />
          </div>
        </motion.div>
      </section>

      {/* 2. DEDICATED SERVICE PAGE OVERLAY: Mounted during phase === 'page' */}
      <AnimatePresence>
        {phase === 'page' && selectedDoorIndex !== null && (
          <motion.div
            key="service-page-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#181817] pointer-events-auto"
          >
            <DedicatedServicePage
              service={SERVICES[selectedDoorIndex]}
              onBack={handleBackToDoors}
              onSelectOtherService={handleSwitchServiceDirectly}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. FULL-VIEWPORT BLACK TRANSITION VEIL: Clean fade with no abrupt display cuts (Section 2 & 5) */}
      <motion.div
        initial={false}
        animate={{
          opacity: veilOpacity
        }}
        transition={{
          duration: veilOpacity === 1 ? 0.32 : 0.28,
          ease: 'easeInOut'
        }}
        className="fixed inset-0 bg-black z-[9999] pointer-events-none"
      />
    </div>
  );
});

export default DoorsSection;
