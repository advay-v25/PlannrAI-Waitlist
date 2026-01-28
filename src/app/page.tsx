'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import CoreLoopSection from '@/components/CoreLoopSection';
import WhoSection from '@/components/WhoSection';
import AISection from '@/components/AISection';
import MVPSection from '@/components/MVPSection';
import PrivacySection from '@/components/PrivacySection';
import WaitlistSection from '@/components/WaitlistSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Cursor glow effect
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Cursor Glow Effect */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow hidden md:block"
        style={{ opacity: 0 }}
      />

      <Navbar />

      {/* Screen 1: Hero */}
      <Hero />

      {/* Screen 2: The Problem */}
      <ProblemSection />

      {/* Screen 3: What PlannrAI Does */}
      <WhatWeDoSection />

      {/* Screen 4: Core Loop */}
      <CoreLoopSection />

      {/* Screen 5: Who It's For */}
      <WhoSection />

      {/* Screen 6: AI Approach */}
      <AISection />

      {/* Screen 7: MVP Features */}
      <MVPSection />

      {/* Screen 8: Privacy & Trust */}
      <PrivacySection />

      {/* Screen 9: Waitlist Form */}
      <WaitlistSection />

      {/* Screen 10: Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </main>
  );
}
