import React, { useEffect, useState } from 'react';
import { soundEngine } from '../audio/soundEngine';
import { COPY } from '../content/copy';
import { GoldStarsRow } from './Icons';

interface TopBarProps {
  onGoHome: () => void;
  showHomeButton: boolean;
}

export const InstitutionalTopBar: React.FC<TopBarProps> = ({
  onGoHome,
  showHomeButton,
}) => {
  const [muted, setMuted] = useState<boolean>(() => soundEngine.isMuted());

  useEffect(() => {
    return soundEngine.subscribe(() => {
      setMuted(soundEngine.isMuted());
    });
  }, []);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.toggleMute();
  };

  return (
    <header className="institutional-topbar">
      <div className="topbar-inner">
        {showHomeButton ? (
          <button
            type="button"
            className="topbar-brand-btn"
            onClick={onGoHome}
            aria-label="Volver al inicio de ChiquiTap"
          >
            <span className="topbar-script">{COPY.common.brandName}</span>
            <GoldStarsRow count={1} size={11} />
          </button>
        ) : (
          <div className="topbar-bulletin">
            <span className="bulletin-dot" />
            <span>{COPY.common.topbarBulletin}</span>
          </div>
        )}

        <button
          type="button"
          className={`sound-toggle-btn ${muted ? 'is-muted' : 'is-active'}`}
          onClick={handleToggleSound}
          aria-pressed={!muted}
          aria-label={muted ? 'Activar sonido institucional' : 'Silenciar sonido'}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            {muted ? (
              <>
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            ) : (
              <>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            )}
          </svg>
          <span>{muted ? 'MUTE' : 'SONIDO'}</span>
        </button>
      </div>
    </header>
  );
};

export const FixedParodyFooter: React.FC = () => (
  <footer className="fixed-parody-footer" role="contentinfo">
    <p>{COPY.common.footerDisclaimer}</p>
  </footer>
);
