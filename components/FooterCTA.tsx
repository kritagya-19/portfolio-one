'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp, X } from 'lucide-react';

interface FooterCTAProps {
  onSelectService?: (serviceId: string) => void;
  onOpenContact?: () => void;
}

export default function FooterCTA({ onSelectService, onOpenContact }: FooterCTAProps) {
  const [timeString, setTimeString] = useState('2:12pm');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  // Live real-time local clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
      setTimeString(`${hours}:${minutes}${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToDoors = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('doors');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToStory = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('my-story');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHireClick = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      setContactModalOpen(true);
    }
  };

  return (
    <div className="w-full bg-[#181715] px-3 sm:px-6 lg:px-10 pb-6 pt-2">
      {/* ===================================================================
          MASSIVE DARK CURVED CARD
         =================================================================== */}
      <section id="contact" className="relative w-full rounded-t-[32px] sm:rounded-t-[44px] bg-[#121211] border-t border-x border-white/[0.08] shadow-[0_-20px_50px_rgba(0,0,0,0.6)] pt-16 sm:pt-24 pb-12 px-6 sm:px-12 lg:px-20 overflow-hidden select-none">
        
        {/* Subtle top ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/4 w-[500px] h-[300px] bg-white/[0.02] rounded-full blur-[100px]" />

        <div className="max-w-[1240px] mx-auto">
          {/* • AVAILABLE FOR NEW WORK status */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.16em] uppercase text-white/70 font-mono">
              AVAILABLE FOR NEW WORK
            </span>
          </div>

          {/* TWO-LINE DISPLAY HEADING */}
          <h2 className="font-jakarta text-[42px] sm:text-[66px] lg:text-[84px] font-bold tracking-[-0.035em] leading-[1.03]">
            <span className="block text-[#f4f2ed]">Need something built?</span>
            <span className="block text-[#6a6762]">Let&apos;s make it happen.</span>
          </h2>

          {/* PARAGRAPH */}
          <p className="mt-6 text-[14.5px] sm:text-[16px] text-white/65 max-w-[530px] leading-[1.65] font-normal">
            I&apos;m available for freelance work: websites, apps, interfaces and visual content. Tell me what you need and I&apos;ll get back to you within a day.
          </p>

          {/* CTA BUTTONS ROW: "Hire me ->" AND "See my work" */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            {/* Hire me button */}
            <button
              onClick={handleHireClick}
              className="group relative flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full text-[13.5px] font-semibold bg-[#f2f0ec] hover:bg-white text-[#141413] shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <span>Hire me</span>
              <span className="w-8 h-8 rounded-full bg-[#141413] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
              </span>
            </button>

            {/* See my work button */}
            <button
              onClick={scrollToDoors}
              className="px-6 py-2.5 rounded-full text-[13.5px] font-medium transition-all duration-300 cursor-pointer bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white/85 hover:border-white/30 hover:text-white"
            >
              See my work
            </button>
          </div>

          {/* HORIZONTAL DIVIDER */}
          <div className="w-full border-t border-white/[0.08] my-16 sm:my-24" />

          {/* ===============================================================
              FOOTER LINKS: WORK (3 SUBCOLUMNS) | NAVIGATE | STATUS
             =============================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 text-[13px] sm:text-[13.5px]">
            
            {/* WORK COLUMN & SUBCOLUMNS (6 cols) */}
            <div className="md:col-span-6 lg:col-span-7">
              <div className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4 font-semibold">
                WORK
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 text-white/80 font-medium">
                {/* Subcol 1 */}
                <div className="space-y-3">
                  <div>
                    <button
                      onClick={() => onSelectService ? onSelectService('web-development') : null}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Web Development
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => onSelectService ? onSelectService('graphic-design') : null}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Graphic Design
                    </button>
                  </div>
                </div>

                {/* Subcol 2 */}
                <div className="space-y-3">
                  <div>
                    <button
                      onClick={() => onSelectService ? onSelectService('app-development') : null}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      App Development
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setPhotoModalOpen(true)}
                      className="hover:text-white transition-colors cursor-pointer text-left text-white/70 hover:text-white"
                    >
                      Photography
                    </button>
                  </div>
                </div>

                {/* Subcol 3 */}
                <div className="space-y-3">
                  <div>
                    <button
                      onClick={() => onSelectService ? onSelectService('ui-ux-design') : null}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      UI/UX Design
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* NAVIGATE COLUMN (3 cols) */}
            <div className="md:col-span-3 lg:col-span-2">
              <div className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4 font-semibold">
                NAVIGATE
              </div>
              <ul className="space-y-3 text-white/80 font-medium">
                <li>
                  <button
                    onClick={scrollToTop}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={scrollToStory}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    My story
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleHireClick}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* STATUS COLUMN (3 cols) */}
            <div className="md:col-span-3 lg:col-span-3">
              <div className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4 font-semibold">
                STATUS
              </div>
              <ul className="space-y-3 text-white/75">
                <li className="flex items-center gap-2 text-white/90 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span>Available for work</span>
                </li>
                <li className="text-white/65">Remote-first, worldwide</li>
                <li className="text-white/65">
                  Local time <span className="text-white font-medium ml-1">{timeString}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ===============================================================
              BOTTOM COPYRIGHT & PRIVACY / BACK TO TOP ROW
             =============================================================== */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/45">
            <div>
              © 2026 Aditya. Designed and built by Aditya.
            </div>

            <div>
              <button
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-white/80 underline decoration-white/30 underline-offset-4 transition-colors cursor-pointer"
              >
                Privacy &amp; credits
              </button>
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          MODALS: PRIVACY & CREDITS + PHOTOGRAPHY SHOWCASE + CONTACT
         =================================================================== */}
      {privacyModalOpen && (
        <div
          onClick={() => setPrivacyModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#181715] border border-white/15 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold font-jakarta">Privacy &amp; Credits</h3>
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              Designed &amp; built by Aditya with Next.js, Tailwind CSS, Motion, and Lucide React.
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              This site respects your privacy: zero invasive trackers, zero third-party ad telemetry. All animations and audio switch synthesis run client-side.
            </p>
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs transition cursor-pointer hover:bg-neutral-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {photoModalOpen && (
        <div
          onClick={() => setPhotoModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#181715] border border-white/15 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold font-jakarta">Photography Archive</h3>
              <button
                onClick={() => setPhotoModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              Analog 35mm and medium-format architectural photography archive coming soon in an upcoming monograph release.
            </p>
            <button
              onClick={() => setPhotoModalOpen(false)}
              className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs transition cursor-pointer hover:bg-neutral-200"
            >
              Back to work
            </button>
          </div>
        </div>
      )}

      {contactModalOpen && (
        <div
          onClick={() => setContactModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[#181715] border border-white/15 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  ● Booking Open
                </span>
                <h3 className="text-2xl font-bold font-jakarta mt-0.5">Work with Aditya</h3>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-neutral-300 mb-5">
              Tell me about your project, timeline, and vision. I&apos;ll reply within 24 hours.
            </p>
            <div className="space-y-3 text-sm">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-white outline-none focus:border-white/40"
              />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-white outline-none focus:border-white/40"
              />
              <textarea
                placeholder="Tell me about your project..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-white outline-none focus:border-white/40 resize-none"
              />
            </div>
            <button
              onClick={() => setContactModalOpen(false)}
              className="mt-6 w-full py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Send Inquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
