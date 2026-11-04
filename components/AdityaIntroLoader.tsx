'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * ============================================================================
 * ADITYA — PREMIUM INTRO LOADING SCREEN COMPONENT
 * ============================================================================
 * Recreates the exact multi-stage reference animation sequence:
 * - Stage 1 (Initial Appearance): Near-black (#111111) full-screen overlay,
 *   centered ultra-bold tight-tracked "Aditya" base text in #363636 with a
 *   subtle initial opacity fade-in and bottom-right aligned "loading... 0 %".
 * - Stage 2 (Progressive White Reveal): Smooth 0% -> 100% counter paired with
 *   an organic undulating wave & progressive clip reveal in pure white (#FFFFFF)
 *   over the #363636 base layer.
 * - Stage 3 (100% Hold & Dramatic Center Zoom): At 100%, the percentage text
 *   cleanly disappears, holds briefly on pure white, then scales dramatically
 *   from the center beyond the viewport edges while fading opacity through
 *   monochrome greys (matching frames 4, 5, and 6 of the references).
 * - Stage 4 (Hero Section Reveal): Smoothly dissolves into the already-rendered
 *   hero section underneath with zero layout shift or flash, unlocking scroll.
 */

const SESSION_STORAGE_KEY = 'aditya_intro_seen_v1';

export interface AdityaIntroLoaderProps {
  text?: string;
  minimumDuration?: number;
  forceReplayCounter?: number;
  onComplete?: () => void;
  disableSessionStorage?: boolean;
}

export function AdityaIntroLoader({
  text = 'Aditya',
  minimumDuration = 3200,
  forceReplayCounter = 0,
  onComplete,
  disableSessionStorage = false,
}: AdityaIntroLoaderProps) {
  // Stages: 'initial' | 'loading' | 'hold' | 'zoom' | 'complete'
  const [stage, setStage] = useState<'initial' | 'loading' | 'hold' | 'zoom' | 'complete'>('initial');
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [wavePhase, setWavePhase] = useState(0);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Check session storage & reduced motion on mount
  useEffect(() => {
    let isCancelled = false;

    // Allow manual replay when forceReplayCounter > 0
    if (forceReplayCounter === 0 && !disableSessionStorage) {
      try {
        const alreadySeen = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (alreadySeen === 'true') {
          const skipTimer = setTimeout(() => {
            if (!isCancelled) {
              setIsVisible(false);
              setStage('complete');
              if (onComplete) onComplete();
            }
          }, 0);
          return () => {
            isCancelled = true;
            clearTimeout(skipTimer);
          };
        }
      } catch {
        // Ignore storage errors in restricted environments
      }
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lock background scrolling while loader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (prefersReducedMotion) {
      // Respect reduced motion: quick fade without dramatic zoom
      const motionTimer = setTimeout(() => {
        if (!isCancelled) {
          setProgress(100);
          setStage('complete');
          setIsVisible(false);
          document.body.style.overflow = originalOverflow;
          if (!disableSessionStorage) {
            try {
              sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
            } catch {}
          }
          if (onComplete) onComplete();
        }
      }, 900);
      return () => {
        isCancelled = true;
        clearTimeout(motionTimer);
        document.body.style.overflow = originalOverflow;
      };
    }

    // Stage 1 -> Stage 2 transition (subtle initial fade-in before progress starts)
    const initialTimer = setTimeout(() => {
      if (isCancelled) return;
      setStage('loading');
      startTimeRef.current = performance.now();

      const animateProgress = (now: number) => {
        if (isCancelled) return;
        const start = startTimeRef.current ?? now;
        const elapsed = now - start;
        const rawT = Math.min(elapsed / minimumDuration, 1);

        // Custom cinematic easing curve (smooth acceleration and deliberate finish)
        const easedT =
          rawT < 0.5
            ? 2 * rawT * rawT
            : 1 - Math.pow(-2 * rawT + 2, 2) / 2;

        const currentPct = Math.round(easedT * 100);
        setProgress(currentPct);
        setWavePhase(elapsed * 0.0045);

        if (rawT < 1) {
          rafRef.current = requestAnimationFrame(animateProgress);
        } else {
          setProgress(100);
          // Stage 3A: Hold briefly at 100% pure white (percentage indicator hidden)
          setStage('hold');
        }
      };

      rafRef.current = requestAnimationFrame(animateProgress);
    }, 350);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = originalOverflow;
    };
  }, [minimumDuration, forceReplayCounter, onComplete, disableSessionStorage]);

  // Handle Stage 3B (Zoom) -> Stage 4 (Hero Reveal)
  useEffect(() => {
    if (stage === 'hold') {
      // Hold pure white "Aditya" for 380ms (matches Screenshot 4)
      const holdTimer = setTimeout(() => {
        setStage('zoom');
      }, 380);
      return () => clearTimeout(holdTimer);
    }

    if (stage === 'zoom') {
      // Zoom & dissolve duration: 1150ms (matches Screenshots 5 & 6)
      const zoomTimer = setTimeout(() => {
        setStage('complete');
        setIsVisible(false);
        document.body.style.overflow = '';
        if (!disableSessionStorage) {
          try {
            sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
          } catch {}
        }
        if (onComplete) onComplete();
      }, 1150);
      return () => clearTimeout(zoomTimer);
    }
  }, [stage, onComplete, disableSessionStorage]);

  if (!isVisible) return null;

  /**
   * Generate a smooth organic SVG wave path in objectBoundingBox coordinates (0..1)
   * so that as `progress` goes from 0% to 100%, the white typography reveals with
   * the exact liquid wave contour seen in the 30% and 53% reference screenshots,
   * while also progressing cleanly from left to right / bottom to top.
   */
  const buildWaveClipPath = (pct: number, phase: number) => {
    if (pct <= 0) {
      return 'M 0 1.2 L 1 1.2 L 1 1.2 L 0 1.2 Z';
    }
    if (pct >= 100) {
      return 'M -0.05 -0.2 L 1.05 -0.2 L 1.05 1.2 L -0.05 1.2 Z';
    }

    const normalized = pct / 100;
    // Base vertical level rises from bottom (1.02) to top (-0.05)
    const baseLevel = 1.02 - normalized * 1.06;
    // Wave amplitude tapers to 0 near 0% and 100% for crisp start/end
    const edgeTaper = Math.sin(normalized * Math.PI);
    const amp = 0.085 * edgeTaper;

    const points: string[] = [];
    const steps = 28;
    for (let i = 0; i <= steps; i++) {
      const x = i / steps;
      // Left-to-right bias so the left side reveals slightly ahead of the right
      const lrBias = (x - 0.5) * 0.08 * edgeTaper;
      const waveY =
        baseLevel +
        lrBias +
        Math.sin(x * Math.PI * 3.5 - phase * 2.2) * amp +
        Math.cos(x * Math.PI * 2.0 + phase * 1.4) * (amp * 0.45);
      points.push(`${x.toFixed(4)} ${waveY.toFixed(4)}`);
    }

    return `M 0 ${points[0].split(' ')[1]} L ${points.join(
      ' L '
    )} L 1.05 1.25 L -0.05 1.25 Z`;
  };

  const wavePathD = buildWaveClipPath(progress, wavePhase);

  // Compute transform and opacity across stages to match screenshots 1..6
  const isZooming = stage === 'zoom';
  const isInitial = stage === 'initial';
  const showPercentage = stage === 'initial' || stage === 'loading';

  return (
    <div
      aria-label="Loading screen"
      role="status"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
      style={{
        backgroundColor: '#111111',
        opacity: isZooming ? 0 : 1,
        // Keep background solid during initial zoom, then smoothly dissolve into hero
        transition: isZooming
          ? 'opacity 650ms cubic-bezier(0.65, 0, 0.35, 1) 500ms'
          : 'none',
        pointerEvents: stage === 'complete' ? 'none' : 'auto',
      }}
    >
      {/* Hidden SVG defining the responsive 0..1 bounding-box clipPath */}
      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="aditya-wave-reveal" clipPathUnits="objectBoundingBox">
            <path d={wavePathD} />
          </clipPath>
        </defs>
      </svg>

      {/* Centered Typography Wrapper that scales from exact center on Stage 3 */}
      <div
        className="relative flex flex-col items-center justify-center px-4"
        style={{
          opacity: isInitial ? 0 : isZooming ? 0.08 : 1,
          transform: isZooming
            ? 'scale(4.65) translateZ(0)'
            : 'scale(1) translateZ(0)',
          transformOrigin: 'center center',
          transition: isInitial
            ? 'opacity 320ms ease-out'
            : isZooming
            ? 'transform 1120ms cubic-bezier(0.76, 0, 0.24, 1), opacity 1050ms cubic-bezier(0.45, 0, 0.55, 1)'
            : 'opacity 250ms ease-out',
          willChange: 'transform, opacity',
        }}
      >
        {/* Main Typography Stack ("Aditya") */}
        <div className="relative inline-block leading-none">
          {/* Layer 1: Dark Grey Base Text (#363636) */}
          <h1
            className="font-sans font-black tracking-[-0.055em] leading-[0.88] m-0 p-0"
            style={{
              color: '#363636',
              fontSize: 'clamp(4.5rem, 17.5vw, 18.5rem)',
              fontWeight: 900,
              fontFeatureSettings: '"kern" 1, "liga" 1',
            }}
          >
            {text}
          </h1>

          {/* Layer 2: Pure White Revealed Text (#FFFFFF) clipped by wave/progress */}
          <h1
            aria-hidden="true"
            className="font-sans font-black tracking-[-0.055em] leading-[0.88] m-0 p-0 absolute inset-0 pointer-events-none"
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(4.5rem, 17.5vw, 18.5rem)',
              fontWeight: 900,
              fontFeatureSettings: '"kern" 1, "liga" 1',
              clipPath: 'url(#aditya-wave-reveal)',
              WebkitClipPath: 'url(#aditya-wave-reveal)',
            }}
          >
            {text}
          </h1>

          {/* Bottom-Right Loading Percentage Indicator ("loading... X %") */}
          <div
            className="absolute right-[0.5%] -bottom-[1.65rem] sm:-bottom-[2.1rem] flex items-center justify-end pointer-events-none"
            style={{
              opacity: showPercentage ? 1 : 0,
              transition: 'opacity 180ms ease-out',
            }}
          >
            <span
              className="font-sans font-medium tracking-[-0.01em] whitespace-nowrap"
              style={{
                color: '#E5E5E5',
                fontSize: 'clamp(0.75rem, 1.05vw, 1.05rem)',
              }}
            >
              loading...&nbsp;&nbsp;{progress} %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdityaIntroLoader;
