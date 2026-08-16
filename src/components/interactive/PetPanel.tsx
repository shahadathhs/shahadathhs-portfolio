'use client';

import { Eye, EyeOff, Move, Repeat, X } from 'lucide-react';
import { useUI } from '@/context/ui-context';
import { PetSprite, PET_NAMES } from './PetSprite';
import { Button } from '@/components/ui/button';

export default function PetPanel() {
  const {
    petPanelOpen,
    closePetPanel,
    petVisible,
    setPetVisible,
    petLoop,
    setPetLoop,
    selectedPet,
    setSelectedPet,
  } = useUI();

  if (!petPanelOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={closePetPanel}
    >
      <div
        role="dialog"
        aria-label="Pet settings"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-lg border bg-background p-6 shadow-lg"
      >
        <button
          type="button"
          onClick={closePetPanel}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-semibold">Companion</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a pet, loop through them, and drag it anywhere on your screen.
        </p>

        <div className="mt-5">
          <div className="mb-2 text-sm font-medium">Choose a pet</div>
          <div className="grid grid-cols-5 gap-2">
            {PET_NAMES.map((name, i) => (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedPet(i)}
                aria-label={name}
                title={name}
                className={`flex cursor-pointer flex-col items-center gap-1 rounded-md border p-2 transition-colors ${
                  selectedPet === i
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <PetSprite kind={i} className="h-7 w-7" />
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                  {name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button
          type="button"
          variant={petLoop ? 'default' : 'outline'}
          onClick={() => setPetLoop(!petLoop)}
          className="mt-6 w-full cursor-pointer"
        >
          <Repeat className="h-4 w-4" />
          {petLoop ? 'Looping pets' : 'Loop pets'}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => setPetVisible(!petVisible)}
          className="mt-2 w-full cursor-pointer"
        >
          {petVisible ? (
            <>
              <EyeOff className="h-4 w-4" />
              Hide pet
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Show pet
            </>
          )}
        </Button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Move className="h-3 w-3" />
          Drag the pet anywhere on your screen
        </div>
      </div>
    </div>
  );
}
