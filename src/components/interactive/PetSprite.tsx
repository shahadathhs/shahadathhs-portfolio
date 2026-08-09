export const PET_NAMES = ['Cat', 'Dog', 'Robot', 'Duck', 'Ghost'] as const;

const EYE = '#10131a';
const ACCENT = 'var(--accent)';

export function PetSprite({
  kind,
  className = '',
}: {
  kind: number;
  className?: string;
}) {
  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 64 64',
    className,
  };

  switch (kind) {
    case 1: // Dog
      return (
        <svg {...svgProps}>
          <ellipse cx="12" cy="34" rx="6.5" ry="13" fill="currentColor" />
          <ellipse cx="52" cy="34" rx="6.5" ry="13" fill="currentColor" />
          <circle cx="32" cy="33" r="19" fill="currentColor" />
          <circle cx="25" cy="30" r="2.8" fill={EYE} />
          <circle cx="39" cy="30" r="2.8" fill={EYE} />
          <ellipse cx="32" cy="41" rx="5" ry="3.5" fill={ACCENT} />
        </svg>
      );
    case 2: // Robot
      return (
        <svg {...svgProps}>
          <line
            x1="32"
            y1="14"
            x2="32"
            y2="7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="32" cy="6" r="3" fill={ACCENT} />
          <rect
            x="13"
            y="14"
            width="38"
            height="36"
            rx="9"
            fill="currentColor"
          />
          <rect x="21" y="25" width="7" height="7" rx="1.5" fill={EYE} />
          <rect x="36" y="25" width="7" height="7" rx="1.5" fill={EYE} />
          <line
            x1="23"
            y1="41"
            x2="41"
            y2="41"
            stroke={EYE}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 3: // Duck
      return (
        <svg {...svgProps}>
          <ellipse cx="30" cy="44" rx="18" ry="12" fill="currentColor" />
          <circle cx="36" cy="24" r="13" fill="currentColor" />
          <path d="M47 21 L61 25 L47 29 Z" fill={ACCENT} />
          <circle cx="40" cy="22" r="2.4" fill={EYE} />
        </svg>
      );
    case 4: // Ghost
      return (
        <svg {...svgProps}>
          <path
            d="M14 30 A18 18 0 0 1 50 30 L50 50 L44 46 L38 50 L32 46 L26 50 L20 46 L14 50 Z"
            fill="currentColor"
          />
          <circle cx="25" cy="29" r="3" fill={EYE} />
          <circle cx="39" cy="29" r="3" fill={EYE} />
        </svg>
      );
    case 0: // Cat
    default:
      return (
        <svg {...svgProps}>
          <path d="M12 26 L17 7 L29 21 Z" fill="currentColor" />
          <path d="M52 26 L47 7 L35 21 Z" fill="currentColor" />
          <circle cx="32" cy="36" r="20" fill="currentColor" />
          <circle cx="25" cy="34" r="2.8" fill={EYE} />
          <circle cx="39" cy="34" r="2.8" fill={EYE} />
          <path d="M30 43 L34 43 L32 46 Z" fill={ACCENT} />
          <path
            d="M10 40 L23 41 M10 45 L23 44 M54 40 L41 41 M54 45 L41 44"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
