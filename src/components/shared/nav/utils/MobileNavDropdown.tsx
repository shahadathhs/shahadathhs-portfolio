import { ActiveLink } from './ActiveLink';
import { navLinks } from '@/constant/navigationLinks';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export const MobileNavDropdown = () => {
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-nav-foreground hover:text-nav-accent hover:bg-nav-accent/10"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="z-[10000] w-72 border-nav-border/30 bg-nav-background"
      >
        <SheetHeader className="mb-8 flex flex-row items-center justify-between space-y-0 border-b border-nav-border/20 pb-6">
          <h2 className="text-nav-foreground font-bold text-lg">Navigation</h2>
        </SheetHeader>
        <nav className="flex flex-col space-y-1">
          {navLinks.map((link) => (
            <div key={link.link} onClick={handleItemClick}>
              <ActiveLink
                href={link.link}
                extraClasses="text-base block px-3 py-3 rounded-md hover:bg-nav-accent/5 w-full"
              >
                {link.title}
              </ActiveLink>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
