import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-6 max-w-md text-center px-4">
        {/* Animated logo/avatar */}
        <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-spin-slow" />
          <span className="text-3xl font-bold text-primary">SH</span>
        </div>

        {/* Loading text with animation */}
        <h2 className="text-2xl font-bold animate-pulse">
          Loading Portfolio...
        </h2>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2.5 mb-2 overflow-hidden">
          <div className="bg-primary h-2.5 rounded-full animate-progress"></div>
        </div>

        {/* Random loading messages */}
        <p className="text-muted-foreground">
          {
            [
              'Fetching my latest projects...',
              'Loading my skills and experiences...',
              'Preparing my portfolio content...',
              'Just a moment while everything loads...',
              'Gathering my backend expertise...',
            ][Math.floor(Math.random() * 5)]
          }
        </p>

        {/* Spinner */}
        <Loader2 className="w-6 h-6 text-primary animate-spin mt-2" />
      </div>
    </div>
  );
}
