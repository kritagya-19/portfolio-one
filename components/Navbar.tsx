'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export type NavItem =
  | 'Home'
  | 'Web Development'
  | 'App Development'
  | 'UI/UX Design'
  | 'Graphic Design'
  | 'My story'
  | 'Contact';

export const NAV_ITEMS: NavItem[] = [
  'Home',
  'Web Development',
  'App Development',
  'UI/UX Design',
  'Graphic Design',
  'My story',
  'Contact',
];

export interface NavbarProps {
  activeServiceId?: string | null;
  theme?: 'dark' | 'light';
  onSelectService?: (serviceId: string) => void;
  onBackHome?: () => void;
  onOpenContact?: () => void;
}

export default function Navbar({
  activeServiceId,
  theme = 'dark',
  onSelectService,
  onBackHome,
  onOpenContact,
}: NavbarProps) {
  const isDark = theme === 'dark';
  const [scrollSpyNav, setScrollSpyNav] = useState<NavItem>('Home');
  const [navHoveredItem, setNavHoveredItem] = useState<NavItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive active item from activeServiceId or scroll-spy state
  const activeServiceNav = React.useMemo<NavItem | null>(() => {
    if (activeServiceId === 'web-development') return 'Web Development';
    if (activeServiceId === 'app-development') return 'App Development';
    if (activeServiceId === 'ui-ux-design') return 'UI/UX Design';
    if (activeServiceId === 'graphic-design') return 'Graphic Design';
    return null;
  }, [activeServiceId]);

  const activeNav = activeServiceNav || scrollSpyNav;

  // Scroll spy on home page when no dedicated service is open
  useEffect(() => {
    if (activeServiceId) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      const storyEl = document.getElementById('my-story');
      const contactEl = document.getElementById('contact');

      if (contactEl) {
        const contactTop = contactEl.offsetTop - 300;
        if (scrollY >= contactTop) {
          setScrollSpyNav('Contact');
          return;
        }
      }

      if (storyEl) {
        const storyTop = storyEl.offsetTop - 260;
        const storyBottom = storyTop + storyEl.offsetHeight;
        if (scrollY >= storyTop && scrollY < storyBottom) {
          setScrollSpyNav('My story');
          return;
        }
      }

      if (scrollY < 500) {
        setScrollSpyNav('Home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeServiceId]);

  const handleItemClick = (item: NavItem) => {
    setMobileMenuOpen(false);
    setScrollSpyNav(item);

    if (item === 'Contact') {
      if (onOpenContact) {
        onOpenContact();
      } else {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (item === 'Home') {
      if (activeServiceId && onBackHome) {
        onBackHome();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (
      item === 'Web Development' ||
      item === 'App Development' ||
      item === 'UI/UX Design' ||
      item === 'Graphic Design'
    ) {
      const serviceIdMap: Record<string, string> = {
        'Web Development': 'web-development',
        'App Development': 'app-development',
        'UI/UX Design': 'ui-ux-design',
        'Graphic Design': 'graphic-design',
      };
      const sId = serviceIdMap[item];
      if (sId && onSelectService) {
        onSelectService(sId);
      }
      return;
    }

    if (item === 'My story') {
      if (activeServiceId && onBackHome) {
        onBackHome();
        setTimeout(() => {
          const el = document.getElementById('my-story');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById('my-story');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
  };

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center items-center pointer-events-none px-4">
      {/* Centered Minimalist Glass Capsule */}
      <div
        className={`pointer-events-auto relative flex items-center justify-between sm:justify-center rounded-full px-2 py-1.5 transition-all duration-500 backdrop-blur-xl border ${
          isDark
            ? 'bg-[#1b1a18]/80 border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-[#FAF8F5]/85 border-black/[0.06] shadow-[0_8px_25px_rgba(0,0,0,0.06)]'
        }`}
      >
        {/* Desktop Navigation Items */}
        <nav
          onMouseLeave={() => setNavHoveredItem(null)}
          className="hidden sm:flex items-center gap-0.5"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item;
            const isHovered = navHoveredItem === item;

            return (
              <button
                key={item}
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setNavHoveredItem(item)}
                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-[12.5px] sm:text-[13px] font-medium tracking-tight transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                  isActive
                    ? isDark
                      ? 'text-white'
                      : 'text-neutral-900'
                    : isDark
                    ? 'text-[#96928B] hover:text-[#E8E6E1]'
                    : 'text-[#736E67] hover:text-[#171615]'
                }`}
              >
                {/* Active Pill Indicator */}
                {isActive && (
                  <span
                    className={`absolute inset-0 rounded-full -z-10 transition-all duration-300 ${
                      isDark
                        ? 'bg-white/[0.12] border border-white/10 shadow-sm'
                        : 'bg-white border border-black/[0.06] shadow-sm'
                    }`}
                  />
                )}

                {/* Hover Pill Indicator */}
                {!isActive && isHovered && (
                  <span
                    className={`absolute inset-0 rounded-full -z-10 transition-all duration-200 ${
                      isDark ? 'bg-white/[0.05]' : 'bg-black/[0.03]'
                    }`}
                  />
                )}

                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Simple Label & Menu Toggle */}
        <div className="flex sm:hidden items-center justify-between w-full min-w-[260px] px-3 py-1">
          <span
            className={`text-xs font-semibold tracking-wider uppercase opacity-75 ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            {activeNav}
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className={`pointer-events-auto sm:hidden fixed top-20 left-4 right-4 rounded-2xl p-2.5 border backdrop-blur-2xl shadow-2xl transition-all flex flex-col gap-1 z-50 ${
            isDark
              ? 'bg-[#181715]/95 border-white/10 text-white shadow-black/80'
              : 'bg-[#FAF8F5]/95 border-black/10 text-neutral-900 shadow-xl'
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => handleItemClick(item)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-white/10 text-white font-semibold'
                      : 'bg-black/10 text-black font-semibold'
                    : isDark
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

