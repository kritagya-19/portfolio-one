"use client";
import React, { useEffect, useRef, useCallback } from "react";

export interface InkRevealProps {
  /** RGB color of the mask overlay, e.g. [252, 250, 248] */
  maskColor?: [number, number, number];
  /** Optional image URL to use as the mask overlay instead of a solid color */
  maskImageSrc?: string;
  /** Optional CSS filter applied to the mask image, e.g. 'grayscale(100%) contrast(110%)' */
  grayscaleFilter?: string;
  /** Radius of each ink stamp in px */
  brushSize?: number;
  /** How long each stamp lives before fading (ms) */
  lifetime?: number;
  /** Initial radius before the stamp expands */
  rStart?: number;
  /** Random variation factor for stamp radius (0–1) */
  rVary?: number;
  /** Min pixel distance between stamps along a stroke */
  stampStep?: number;
  /** Max stamps alive at once (oldest are pruned) */
  maxStamps?: number;
  /** Number of segments on the wobble circle (higher = smoother) */
  segments?: number;
  /** Wobble amplitude weights [primary, secondary, tertiary] */
  wobble?: [number, number, number];
  /** Gradient inner-radius factor (0–1, relative to stamp radius) */
  gradientInnerRadius?: number;
  /** Gradient opacity stops [center, mid, edge] */
  gradientStops?: [number, number, number];
  /** Extra CSS class for the canvas element */
  className?: string;
  /** Extra inline styles for the canvas element */
  style?: React.CSSProperties;
}

interface Stamp {
  x: number;
  y: number;
  born: number;
  seed: number;
  rmax: number;
}

export default function InkReveal({
  maskColor = [252, 250, 248],
  maskImageSrc,
  grayscaleFilter = "grayscale(100%) contrast(110%) brightness(96%)",
  brushSize = 128,
  lifetime = 700,
  rStart = 12,
  rVary = 0.45,
  stampStep = 10,
  maxStamps = 220,
  segments = 36,
  wobble = [0.14, 0.08, 0.05],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  className,
  style,
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const runningRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const loopRef = useRef<() => void>(() => {});
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgLoadedRef = useRef(false);

  const mc = maskColor;

  // Preload mask image if provided
  useEffect(() => {
    if (!maskImageSrc) {
      imgRef.current = null;
      imgLoadedRef.current = false;
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = maskImageSrc;
    img.onload = () => {
      imgRef.current = img;
      imgLoadedRef.current = true;
      drawFrame();
    };
  }, [maskImageSrc]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = parent.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    dimsRef.current = { w, h };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawFrame();
  }, [mc]);

  const drawBaseLayer = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.globalCompositeOperation = "source-over";

      if (maskImageSrc && imgLoadedRef.current && imgRef.current) {
        ctx.clearRect(0, 0, w, h);
        const naturalW = imgRef.current.naturalWidth || 1;
        const naturalH = imgRef.current.naturalHeight || 1;
        const imgRatio = naturalW / naturalH;
        const containerRatio = w / h;

        let drawW: number;
        let drawH: number;
        let drawX: number;
        let drawY: number;

        if (containerRatio > imgRatio) {
          drawH = h;
          drawW = h * imgRatio;
          drawX = (w - drawW) / 2;
          drawY = 0;
        } else {
          drawW = w;
          drawH = w / imgRatio;
          drawX = 0;
          drawY = h - drawH;
        }

        try {
          ctx.filter = grayscaleFilter;
          ctx.drawImage(imgRef.current, drawX, drawY, drawW, drawH);
          ctx.filter = "none";
        } catch {
          ctx.drawImage(imgRef.current, drawX, drawY, drawW, drawH);
        }
      } else {
        ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
        ctx.fillRect(0, 0, w, h);
      }
    },
    [maskImageSrc, grayscaleFilter, mc]
  );

  const carveInk = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      seed: number,
      alpha: number
    ) => {
      const g = ctx.createRadialGradient(
        x,
        y,
        r * gradientInnerRadius,
        x,
        y,
        r
      );
      g.addColorStop(0, `rgba(0,0,0,${gradientStops[0] * alpha})`);
      g.addColorStop(0.5, `rgba(0,0,0,${gradientStops[1] * alpha})`);
      g.addColorStop(1, `rgba(0,0,0,${gradientStops[2] * alpha})`);
      ctx.fillStyle = g;

      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7);
        const px = x + Math.cos(a) * r * wob;
        const py = y + Math.sin(a) * r * wob;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    },
    [segments, wobble, gradientInnerRadius, gradientStops]
  );

  const addStamp = useCallback(
    (x: number, y: number) => {
      const stamps = stampsRef.current;
      if (stamps.length >= maxStamps) stamps.shift();
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      });
    },
    [brushSize, rVary, maxStamps]
  );

  const stampAlong = useCallback(
    (x: number, y: number) => {
      const last = lastPosRef.current;
      if (!last) {
        addStamp(x, y);
      } else {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / stampStep));
        for (let i = 1; i <= steps; i++) {
          addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
        }
      }
      lastPosRef.current = { x, y };
    },
    [addStamp, stampStep]
  );

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = dimsRef.current;
    if (w === 0 || h === 0) return;

    drawBaseLayer(ctx, w, h);

    const now = performance.now();
    const stamps = stampsRef.current;

    ctx.globalCompositeOperation = "destination-out";

    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / lifetime;
      if (t >= 1) {
        stamps.splice(i, 1);
        continue;
      }
      const ease = 1 - Math.pow(1 - t, 3);
      const r = rStart + (stamps[i].rmax - rStart) * ease;
      const alpha = 1 - t * t;
      carveInk(ctx, stamps[i].x, stamps[i].y, r, stamps[i].seed, alpha);
    }

    ctx.globalCompositeOperation = "source-over";
  }, [drawBaseLayer, carveInk, lifetime, rStart]);

  const loop = useCallback(() => {
    drawFrame();

    if (stampsRef.current.length > 0) {
      requestAnimationFrame(() => loopRef.current());
    } else {
      runningRef.current = false;
    }
  }, [drawFrame]);

  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      requestAnimationFrame(() => loopRef.current());
    }
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const getRelativePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        cursor: "pointer",
        ...style,
      }}
      onMouseEnter={(e) => {
        const pos = getRelativePos(e);
        lastPosRef.current = pos;
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseMove={(e) => {
        const pos = getRelativePos(e);
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseLeave={() => {
        lastPosRef.current = null;
      }}
      onTouchStart={(e) => {
        if (!e.touches[0]) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
        lastPosRef.current = pos;
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onTouchMove={(e) => {
        if (!e.touches[0]) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onTouchEnd={() => {
        lastPosRef.current = null;
      }}
    />
  );
}
