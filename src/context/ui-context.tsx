'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { playSound } from '@/lib/sound';
import { SECTIONS, type SectionId } from '@/constant/sections';

const PET_VISIBLE_KEY = 'pet-visible';
const PET_SELECTED_KEY = 'pet-selected';
const PET_LOOP_KEY = 'pet-loop';
const SECTION_KEY = 'active-section';
const PET_COUNT = 5;
const PET_LOOP_MS = 8000;

const isSectionId = (v: string | null | undefined): v is SectionId =>
  SECTIONS.some((s) => s.id === v);

const readSection = (): SectionId => {
  if (typeof window === 'undefined') return 'hero';
  try {
    const hash = window.location.hash.replace(/^#/, '');
    if (isSectionId(hash)) return hash;
    const stored = localStorage.getItem(SECTION_KEY);
    if (isSectionId(stored)) return stored;
  } catch {
    // ignore
  }
  return 'hero';
};

type UIContextValue = {
  activeSection: SectionId;
  navigate: (id: SectionId) => void;
  nextSection: () => void;
  prevSection: () => void;
  syncSectionFromScroll: () => void;
  terminalOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  petVisible: boolean;
  setPetVisible: (v: boolean) => void;
  petLoop: boolean;
  setPetLoop: (v: boolean) => void;
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
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const sectionHydrated = useRef(false);
  const sectionReady = useRef(true);
  const activeSectionRef = useRef<SectionId>('hero');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [petPanelOpen, setPetPanelOpen] = useState(false);
  const [petVisible, setPetVisibleState] = useState<boolean>(() =>
    readBool(PET_VISIBLE_KEY, true),
  );
  const [petLoop, setPetLoopState] = useState(true);
  const petLoopHydrated = useRef(false);
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

  useEffect(() => {
    if (!petLoopHydrated.current) {
      petLoopHydrated.current = true;
      const stored = readBool(PET_LOOP_KEY, true);
      if (stored !== petLoop) setPetLoopState(stored);
      return;
    }
    try {
      localStorage.setItem(PET_LOOP_KEY, petLoop ? '1' : '0');
    } catch {
      // ignore
    }
  }, [petLoop]);

  useEffect(() => {
    if (!petLoop) return;
    const id = window.setInterval(() => {
      setSelectedPetState((n) => (n + 1) % PET_COUNT);
    }, PET_LOOP_MS);
    return () => window.clearInterval(id);
  }, [petLoop, selectedPet]);

  useEffect(() => {
    if (!sectionHydrated.current) {
      sectionHydrated.current = true;
      const restored = readSection();
      if (restored !== activeSection) setActiveSection(restored);
      return;
    }
    try {
      localStorage.setItem(SECTION_KEY, activeSection);
    } catch {
      // ignore
    }
    const hash = activeSection === 'hero' ? '' : `#${activeSection}`;
    if (window.location.hash !== hash) {
      const url = `${window.location.pathname}${window.location.search}${hash}`;
      window.history.replaceState(null, '', url);
    }
  }, [activeSection]);

  // On load, line the target section up with the top of the viewport (the
  // browser's native anchor jump leaves it under the fixed dock's reach).
  useEffect(() => {
    if (!sectionReady.current) return;
    sectionReady.current = false;
    const id = window.location.hash.replace(/^#/, '');
    if (!isSectionId(id) || id === 'hero') return;
    requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
  }, []);

  // Scroll-spy: whichever section crosses the viewport's upper half becomes
  // active. Runs on every scroll from page.tsx; cheap — one pass over 8 ids.
  const syncSectionFromScroll = useCallback(() => {
    const mark = window.innerHeight * 0.5;
    let current: SectionId = 'hero';
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mark) current = id;
    }
    // Bottom of a short page can leave the last section short of the mark.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      current = SECTIONS[SECTIONS.length - 1].id;
    }
    if (current !== activeSectionRef.current) {
      activeSectionRef.current = current;
      setActiveSection(current);
      try {
        localStorage.setItem(SECTION_KEY, current);
      } catch {
        // ignore
      }
      const hash = current === 'hero' ? '' : `#${current}`;
      if (window.location.hash !== hash) {
        const url = `${window.location.pathname}${window.location.search}${hash}`;
        window.history.replaceState(null, '', url);
      }
    }
  }, []);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (isSectionId(hash)) setActiveSection(hash);
      else if (!hash) setActiveSection('hero');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((id: SectionId) => {
    playSound('click');
    // Overlays close so the target section reads clean.
    setTerminalOpen(false);
    setPetPanelOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

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
  const setPetLoop = useCallback((v: boolean) => {
    playSound('toggle');
    setPetLoopState(v);
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
        syncSectionFromScroll,
        terminalOpen,
        openTerminal,
        closeTerminal,
        petVisible,
        setPetVisible,
        petLoop,
        setPetLoop,
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
