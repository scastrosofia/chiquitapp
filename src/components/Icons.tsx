import React from 'react';
import type { IconName } from '../engine/types';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeColor?: string;
}

/**
 * Fine-line single-ink SVG illustrations inspired by editorial wedding planners
 * combined with institutional football symbolism.
 */
export const PlannerIcon: React.FC<IconProps> = ({
  name,
  size = 28,
  className = '',
  strokeColor = 'currentColor',
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: strokeColor,
    strokeWidth: 1.35,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  switch (name) {
    case 'anillos':
      return (
        <svg {...common}>
          <circle cx="12" cy="18.5" r="6.5" />
          <circle cx="20" cy="18.5" r="6.5" />
          <path d="M12 12l-2.2-3 2.2-2.2 2.2 2.2L12 12z" stroke="#C9A227" />
          <path d="M9.8 9h4.4" stroke="#C9A227" />
          <path d="M12 5V3.5M8.5 6L7.3 4.8M15.5 6l1.2-1.2" />
        </svg>
      );

    case 'camara':
      return (
        <svg {...common}>
          <rect x="4" y="9.5" width="24" height="16" rx="2.5" />
          <path d="M10.5 9.5l1.8-3h7.4l1.8 3" />
          <circle cx="16" cy="17.5" r="4.5" />
          <circle cx="23.5" cy="13" r="1" />
        </svg>
      );

    case 'copas':
      return (
        <svg {...common}>
          <path d="M9 5h6l-1.2 8.2a3.2 3.2 0 01-6.3 0L9 5z" />
          <path d="M10.6 16.2l-1.2 8.3M7 24.5h6" />
          <path d="M17 5h6l1.5 8.2a3.2 3.2 0 01-6.3 0L17 5z" />
          <path d="M21.4 16.2l1.2 8.3M19 24.5h6" />
          <path d="M16 3v2.5M14 4l1 1.5M18 4l-1 1.5" stroke="#C9A227" />
        </svg>
      );

    case 'torta':
      return (
        <svg {...common}>
          <rect x="5" y="19" width="22" height="7" rx="1.2" />
          <rect x="8.5" y="13" width="15" height="6" rx="1" />
          <path d="M5 22c2 1.4 4-1.4 6 0s4-1.4 6 0 4-1.4 6 0 2.5.8 4 0" />
          <path d="M13 13V9.5M16 13V8.5M19 13V9.5" />
          <path d="M13 7.2c.5-.8.5-1.5 0-2-.5.5-.5 1.2 0 2zM16 6.2c.5-.8.5-1.5 0-2-.5.5-.5 1.2 0 2zM19 7.2c.5-.8.5-1.5 0-2-.5.5-.5 1.2 0 2z" stroke="#C9A227" />
          <path d="M3 26h26" />
        </svg>
      );

    case 'globoEspejos':
      return (
        <svg {...common}>
          <line x1="16" y1="2.5" x2="16" y2="7.5" />
          <circle cx="16" cy="16.5" r="9" />
          <ellipse cx="16" cy="16.5" rx="4.2" ry="9" />
          <path d="M7.5 13.5h17M7.5 19.5h17M8.8 10.5h14.4M8.8 22.5h14.4" />
          <path d="M4.5 7.5v2M3.5 8.5h2M27.5 23.5v2M26.5 24.5h2" stroke="#C9A227" />
        </svg>
      );

    case 'fuegosArtificiales':
      return (
        <svg {...common}>
          <circle cx="16" cy="15" r="1.5" />
          <path d="M16 5v4.5M16 20.5V25M6 15h4.5M21.5 15H26" />
          <path d="M9 8l3.2 3.2M19.8 18.8L23 22M23 8l-3.2 3.2M12.2 18.8L9 22" />
          <path d="M16 2.5v1M27.5 15h1M4.5 15h-1M11 26.5l1-1.5M21 26.5l-1-1.5" stroke="#C9A227" />
        </svg>
      );

    case 'regalo':
      return (
        <svg {...common}>
          <rect x="5.5" y="13" width="21" height="14" rx="1.5" />
          <rect x="4" y="9" width="24" height="4" rx="1" />
          <line x1="16" y1="9" x2="16" y2="27" />
          <path d="M16 9c-2.5-4-6.5-3.8-6.5-1.2C9.5 9.5 13 9 16 9z" />
          <path d="M16 9c2.5-4 6.5-3.8 6.5-1.2C22.5 9.5 19 9 16 9z" />
        </svg>
      );

    case 'platoCubiertos':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="8" />
          <circle cx="16" cy="16" r="5" />
          <path d="M4.5 8v6.5a1.8 1.8 0 001.8 1.8v8.2M4.5 11.5h3.6M8.1 8v6.5a1.8 1.8 0 01-1.8 1.8" />
          <path d="M26.5 8v16.5M26.5 8c-2 1.5-2.2 5.5 0 7.2" />
        </svg>
      );

    case 'pelota':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" />
          <polygon points="16,11.2 20.5,14.4 18.8,19.6 13.2,19.6 11.5,14.4" />
          <path d="M16 5v6.2M20.5 14.4l5.8-2M18.8 19.6l3.8 4.8M13.2 19.6l-3.8 4.8M11.5 14.4l-5.8-2" />
        </svg>
      );

    case 'silbato':
      return (
        <svg {...common}>
          <path d="M6 13.5h11.5a6.5 6.5 0 110 13 6.5 6.5 0 01-6.2-8.5H6l-2-2.2 2-2.3z" />
          <circle cx="17.5" cy="20" r="2.3" />
          <circle cx="4.5" cy="11" r="1.5" />
          <path d="M15 6.5l1 2.5M19.5 6l-.5 2.6M23.5 8l-1.8 1.8" stroke="#75AADB" />
        </svg>
      );

    case 'trofeo':
      return (
        <svg {...common}>
          <path d="M9.5 5.5h13v6.5a6.5 6.5 0 01-13 0V5.5z" />
          <path d="M9.5 7.5H6a2.5 2.5 0 000 5h3.8M22.5 7.5H26a2.5 2.5 0 010 5h-3.8" />
          <path d="M16 18.5v5M11.5 23.5h9M9.5 26.5h13" />
          <polygon
            points="16,8.2 17,10.4 19.4,10.7 17.6,12.3 18.1,14.6 16,13.4 13.9,14.6 14.4,12.3 12.6,10.7 15,10.4"
            stroke="#C9A227"
          />
        </svg>
      );

    case 'estrella':
      return (
        <svg {...common}>
          <polygon
            points="16,4.2 19.4,11.4 27.3,12.4 21.5,17.9 23,25.8 16,22 9,25.8 10.5,17.9 4.7,12.4 12.6,11.4"
            stroke="#C9A227"
            fill="rgba(201, 162, 39, 0.14)"
          />
        </svg>
      );

    case 'dron':
      return (
        <svg {...common}>
          <rect x="12" y="13" width="8" height="5.5" rx="1.8" />
          <path d="M12 14L6.5 9.5M20 14l5.5-4.5M12 17.5L6.5 22M20 17.5l5.5 4.5" />
          <ellipse cx="6.5" cy="9" rx="3.5" ry="1.2" />
          <ellipse cx="25.5" cy="9" rx="3.5" ry="1.2" />
          <ellipse cx="6.5" cy="22.5" rx="3.5" ry="1.2" />
          <ellipse cx="25.5" cy="22.5" rx="3.5" ry="1.2" />
          <circle cx="16" cy="21.5" r="1.4" stroke="#C9A227" />
          <path d="M14 24.5l2 2.5 2-2.5" stroke="#75AADB" />
        </svg>
      );

    case 'tribuna':
      return (
        <svg {...common}>
          <path d="M4 24.5h24M6 20h20M8 15.5h16M10 11h12" />
          <path d="M4 24.5V21l6-10h12l6 10v3.5" />
          <line x1="16" y1="6" x2="16" y2="11" />
          <path d="M16 6l4.5 1.5L16 9" stroke="#75AADB" />
        </svg>
      );

    case 'selloOficial':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="10.5" />
          <circle cx="16" cy="16" r="7.5" strokeDasharray="2 2" />
          <path d="M11.5 16.2l2.8 2.8 6.2-6.2" />
        </svg>
      );

    case 'combi':
      return (
        <svg {...common}>
          <path d="M3.5 19.5V12a2.5 2.5 0 012.5-2.5h15.5c2.2 0 4 1.2 5 3.3l2 4.2v5H3.5v-2.5z" />
          <rect x="6" y="12" width="5.5" height="4.2" rx="0.6" fill="rgba(26,26,26,0.12)" />
          <rect x="13" y="12" width="5.5" height="4.2" rx="0.6" fill="rgba(26,26,26,0.12)" />
          <path d="M20.2 12h4.2l1.8 4.2h-6V12z" fill="rgba(26,26,26,0.12)" />
          <circle cx="9" cy="22.5" r="2.6" fill="#F7F3EE" />
          <circle cx="23" cy="22.5" r="2.6" fill="#F7F3EE" />
          <path d="M3.5 18h25" stroke="#75AADB" />
        </svg>
      );
  }
};

export const GoldStarsRow: React.FC<{ count?: number; size?: number }> = ({
  count = 3,
  size = 15,
}) => (
  <span className="gold-stars-row" aria-hidden="true">
    {Array.from({ length: count }).map((_, idx) => (
      <svg
        key={idx}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="#C9A227"
        stroke="#A48115"
        strokeWidth="1"
        style={{
          transform: count === 3 && idx === 1 ? 'translateY(-3px) scale(1.14)' : 'none',
        }}
      >
        <polygon points="12,2 15,8.8 22.4,9.6 16.8,14.5 18.4,21.8 12,18 5.6,21.8 7.2,14.5 1.6,9.6 9,8.8" />
      </svg>
    ))}
  </span>
);

export const AfaStripeDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`afa-stripe-divider ${className}`} role="separator" aria-hidden="true">
    <span className="stripe-celeste" />
    <span className="stripe-white" />
    <span className="stripe-celeste" />
  </div>
);
