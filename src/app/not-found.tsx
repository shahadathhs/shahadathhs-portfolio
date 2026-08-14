import Link from 'next/link';
import { FileQuestion, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <FileQuestion className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Return home
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <a
              href="https://github.com/shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Search className="w-4 h-4" />
              Find me on GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
