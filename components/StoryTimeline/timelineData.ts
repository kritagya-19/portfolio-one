export interface TimelineMilestone {
  id: string;
  year: string;
  dateRange: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlightTag?: string;
  skills: string[];
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'milestone-2023',
    year: '2023',
    dateRange: 'JAN 2023 — DEC 2023',
    role: 'Mobile & Fintech Interface Specialist',
    company: 'Veloce Protocol & Quicko Labs',
    location: 'Bangalore / Remote',
    description:
      'Crafted zero-latency mobile treasury experiences for iOS and Android. Designed biometric security flows, real-time capital gains data visualization engines, and gesture-driven card management with haptic feedback physics.',
    highlightTag: 'MOBILE CRAFT',
    skills: ['React Native', 'SwiftUI', 'Fintech UX', 'Haptic Engineering']
  },
  {
    id: 'milestone-2024',
    year: '2024',
    dateRange: 'JAN 2024 — DEC 2024',
    role: 'Senior Creative Frontend Engineer',
    company: 'Sundown Studio Collaborations',
    location: 'New York / Milan',
    description:
      'Engineered editorial exhibition portfolios with oversized typography, ambient story-following lighting glows, and custom hover project image reveal mechanics. Optimized core web vitals to consistent 99+ Lighthouse scores.',
    highlightTag: 'EDITORIAL WEB',
    skills: ['Custom Shaders', 'Lenis Smooth Scroll', 'Responsive Architecture', 'SEO Vitals']
  },
  {
    id: 'milestone-2025',
    year: '2025',
    dateRange: 'JAN 2025 — DEC 2025',
    role: 'Lead Interaction & Product Designer',
    company: 'Linearity & Distributed Studios',
    location: 'Zurich / Remote',
    description:
      'Spearheaded the unification of four legacy enterprise workspaces into a cohesive keyboard-first command palette. Authored a 400+ token design system with dynamic WCAG AAA contrast scales and sub-16ms shader preview choreography.',
    highlightTag: 'SYSTEM SCALE',
    skills: ['Figma Variables', 'Design Tokens', 'Interaction Spec', 'B2B SaaS']
  },
  {
    id: 'milestone-2026',
    year: '2026',
    dateRange: 'JAN 2026 — PRESENT',
    role: 'Independent Creative Director & Technologist',
    company: 'Self-Employed · Global Practice',
    location: 'Remote · Worldwide',
    description:
      'Partnering directly with founders, seed-to-Series B venture startups, and multidisciplinary design studios. Engineering spatial digital flagships, tactile micro-interactions, and high-converting marketing architectures with zero-dependency performance.',
    highlightTag: 'CURRENT CHAPTER',
    skills: ['Creative Direction', 'WebGL & Next.js', 'Design Systems', 'Tactile Motion']
  }
];
