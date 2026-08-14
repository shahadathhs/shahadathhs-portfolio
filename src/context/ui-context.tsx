'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { playSound } from '@/lib/sound';
import { SECTIONS, type SectionId } from '@/constant/sections';

const PET_VISIBLE_KEY = 'pet-visible';
const PET_SELECTED_KEY = 'pet-selected';
const PET_COUNT = 5;

type UIContextValue = {
  activeSection: SectionId;
  navigate: (id: SectionId) => void;
  nextSection: () => void;
  prevSection: () => void;
  terminalOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  petVisible: boolean;
  setPetVisible: (v: boolean) => void;
  selectedPet: number;
  setSelectedPet: (n: number) => void;
  petPanelOpen: boolean;
  openPetPanel: () => void;
  closePetPanel: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

// Read on the client during the first render (lazy initial state) so the
// persisted value is correct immediately, with no flash on reload.
const readBool = (key: string, fallback: boolean): boolean => {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v === '1';
  } catch {
    return fallback;
  }
};

export function UIProvider({ children }: { children: ReactNode }) {
  // Always start the deck on the hero for a predictable first impression.
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [petPanelOpen, setPetPanelOpen] = useState(false);
  const [petVisible, setPetVisibleState] = useState<boolean>(() =>
    readBool(PET_VISIBLE_KEY, true),
  );
  const [selectedPet, setSelectedPetState] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const n = Number(localStorage.getItem(PET_SELECTED_KEY));
      return Number.isInteger(n) && n >= 0 && n < PET_COUNT ? n : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PET_VISIBLE_KEY, petVisible ? '1' : '0');
    } catch {
      // ignore
    }
  }, [petVisible]);

  useEffect(() => {
    try {
      localStorage.setItem(PET_SELECTED_KEY, String(selectedPet));
    } catch {
      // ignore
    }
  }, [selectedPet]);

  const navigate = useCallback(
    (id: SectionId) => {
      if (id === activeSection) return;
      playSound('click');
      // Section changes close overlays so the new slide reads clean.
      setTerminalOpen(false);
      setPetPanelOpen(false);
      setActiveSection(id);
    },
    [activeSection],
  );

  const step = useCallback(
    (delta: number) => {
      const idx = SECTIONS.findIndex((s) => s.id === activeSection);
      const next = Math.max(0, Math.min(SECTIONS.length - 1, idx + delta));
      navigate(SECTIONS[next].id);
    },
    [activeSection, navigate],
  );

  const nextSection = useCallback(() => step(1), [step]);
  const prevSection = useCallback(() => step(-1), [step]);

  const openTerminal = useCallback(() => {
    playSound('open');
    setTerminalOpen(true);
  }, []);
  const closeTerminal = useCallback(() => {
    playSound('close');
    setTerminalOpen(false);
  }, []);
  const openPetPanel = useCallback(() => {
    playSound('open');
    setPetPanelOpen(true);
  }, []);
  const closePetPanel = useCallback(() => {
    playSound('close');
    setPetPanelOpen(false);
  }, []);
  const setPetVisible = useCallback((v: boolean) => {
    playSound('toggle');
    setPetVisibleState(v);
  }, []);
  const setSelectedPet = useCallback((n: number) => {
    playSound('click');
    setSelectedPetState(Math.max(0, Math.min(PET_COUNT - 1, n)));
  }, []);

  return (
    <UIContext.Provider
      value={{
        activeSection,
        navigate,
        nextSection,
        prevSection,
        terminalOpen,
        openTerminal,
        closeTerminal,
        petVisible,
        setPetVisible,
        selectedPet,
        setSelectedPet,
        petPanelOpen,
        openPetPanel,
        closePetPanel,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within a UIProvider');
  return ctx;
}
