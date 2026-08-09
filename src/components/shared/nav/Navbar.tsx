'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Logo from '../logo/Logo';
import { LargeNavLinks } from './utils/LargeNavLinks';
import { MobileNavDropdown } from './utils/MobileNavDropdown';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // * Listen for scroll events to update sticky behavior.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // * Update window width state.
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-[9999] w-full transition-all duration-500',
        scrolled
          ? 'py-3 border-b border-nav-border/30 backdrop-blur-xl bg-nav-background/60'
          : 'py-6 border-b border-nav-border/0 bg-transparent',
      )}
    >
      <div className="container mx-auto max-w-6xl px-2 lg:px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <div className="flex items-center">
            {/* Desktop Navigation: Large screen links */}
            {!isMobile && <LargeNavLinks />}

            {/* Mobile Navigation: Render dropdown for mobile devices */}
            {isMobile && <MobileNavDropdown />}
          </div>
        </div>
      </div>
    </nav>
  );
}
