'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DoorsSection, { SERVICES, DedicatedServicePage } from '@/components/DoorsSection';
import StoryTimeline from '@/components/StoryTimeline/StoryTimeline';
import FooterCTA from '@/components/FooterCTA';

export default function HomePage() {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const valid = SERVICES.find((s) => s.id === hash);
      if (valid) {
        setActiveServiceId(valid.id);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setActiveServiceId(null);
      }
    };

    handleHash();
    window.addEventListener('popstate', handleHash);
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('popstate', handleHash);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const handleOpenService = (serviceId: string) => {
    setActiveServiceId(serviceId);
    try {
      window.history.pushState({ serviceId }, '', `#${serviceId}`);
    } catch {
      // Ignore in restricted environments
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToDoors = () => {
    setActiveServiceId(null);
    try {
      window.history.pushState({}, '', window.location.pathname);
    } catch {
      // Ignore in restricted environments
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      const el = document.getElementById('doors');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const activeService = SERVICES.find((s) => s.id === activeServiceId);

  return (
    <main className="w-full min-h-screen bg-[#181715] relative">
      {/* Consistent Floating Glass Capsule Navbar on all sections and pages */}
      <Navbar
        activeServiceId={activeServiceId}
        onSelectService={handleOpenService}
        onBackHome={handleBackToDoors}
      />

      {activeService ? (
        <DedicatedServicePage
          service={activeService}
          onBack={handleBackToDoors}
          onSelectOtherService={(newServiceId) => handleOpenService(newServiceId)}
        />
      ) : (
        <>
          <HeroSection onSelectService={handleOpenService} />
          <DoorsSection onServiceOpened={handleOpenService} />
          <StoryTimeline />
          <FooterCTA onSelectService={handleOpenService} />
        </>
      )}
    </main>
  );
}
