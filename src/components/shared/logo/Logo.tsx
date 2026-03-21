import { Terminal } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="group relative flex items-center gap-2.5 font-bold text-lg tracking-tight transition-all duration-300 hover:opacity-90 active:scale-95"
    >
      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-nav-accent/20 to-nav-accent/5 ring-1 ring-nav-accent/20 transition-all duration-500 group-hover:from-nav-accent/30 group-hover:to-nav-accent/10 group-hover:ring-nav-accent/40 shadow-sm">
        <Terminal className="h-4.5 w-4.5 text-nav-accent transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <span className="hidden sm:inline text-nav-foreground font-bold tracking-tight">
        shahadath<span className="text-nav-accent">hs</span>
      </span>
    </Link>
  );
}
