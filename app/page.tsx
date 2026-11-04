'use client';

import React, { useState, useEffect, useRef } from 'react';
import AdityaIntroLoader from '@/components/AdityaIntroLoader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DoorsSection, { SERVICES, DoorsSectionHandle } from '@/components/DoorsSection';
import StoryTimeline from '@/components/StoryTimeline/StoryTimeline';
import FooterCTA from '@/components/FooterCTA';

export default function HomePage() {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const doorsSectionRef = useRef<DoorsSectionHandle>(null);

  // Sync hash with active service state for Navbar reflection
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const valid = SERVICES.find((s) => s.id === hash);
      if (valid) {
        setActiveServiceId(valid.id);
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

  const handleSelectService = (serviceId: string) => {
    setActiveServiceId(serviceId);
    doorsSectionRef.current?.openService(serviceId);
  };

  const handleBackHome = () => {
    doorsSectionRef.current?.backToDoors();
  };

  return (
    <main className="w-full min-h-screen bg-[#181715] relative">
      {/* Cinematic Intro Loading Screen */}
      <AdityaIntroLoader disableSessionStorage={true} />

      {/* Consistent Floating Glass Capsule Navbar across the entire experience */}
      <Navbar
        activeServiceId={activeServiceId}
        onSelectService={handleSelectService}
        onBackHome={handleBackHome}
      />

      {/* Hero section stays permanently rendered at top */}
      <HeroSection onSelectService={handleSelectService} />

      {/* Four gates section: permanently mounted, contains gate scene & service overlay */}
      <DoorsSection
        ref={doorsSectionRef}
        activeServiceId={activeServiceId}
        onActiveServiceChange={(id) => setActiveServiceId(id)}
      />

      {/* Story & Footer CTA stay permanently rendered below */}
      <StoryTimeline />
      <FooterCTA onSelectService={handleSelectService} />
    </main>
  );
}
