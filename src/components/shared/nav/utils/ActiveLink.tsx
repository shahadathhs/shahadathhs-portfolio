import { motion } from 'motion/react';
import Link from 'next/link';
import React from 'react';

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  extraClasses?: string;
}

/**
 * Hash-only hrefs use a native <a> so the browser applies scroll-margin on the
 * target. Next.js <Link> for same-page #anchors can skip that offset.
 */
export function ActiveLink({
  href,
  children,
  isActive = false,
  extraClasses = '',
}: ActiveLinkProps) {
  const className = `relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
    isActive
      ? 'text-nav-accent'
      : 'text-nav-foreground hover:text-nav-foreground/80'
  } ${extraClasses}`;

  const indicator = isActive ? (
    <motion.div
      layoutId="nav-underline"
      className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-nav-accent/0 via-nav-accent to-nav-accent/0"
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    />
  ) : null;

  if (href.startsWith('#')) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <a href={href} onClick={handleClick} className={className}>
        {children}
        {indicator}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      {indicator}
    </Link>
  );
}
