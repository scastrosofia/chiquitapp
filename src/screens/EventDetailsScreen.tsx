import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { COPY } from '../content/copy';
import type { EventType, OrganizacionMode } from '../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../components/Icons';

interface EventDetailsScreenProps {
  eventType: EventType;
  mode: OrganizacionMode;
  onConfirmDetails: (details: { hosts: string; baseGuests: number }) => void;
  onBack: () => void;
}

export const EventDetailsScreen: React.FC<EventDetailsScreenProps> = ({
  eventType,
  mode,
  onConfirmDetails,
  onBack,
}) => {
  const prefersReduced = useReducedMotion();
  const labels = COPY.eventDetails.labels[eventType];

  const [hosts, setHosts] = useState('');
  const [guests, setGuests] = useState<number>(labels.defaultGuests);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.unlockFromGesture();
    soundEngine.playStamp();

    const finalHosts = hosts.trim() || labels.hostsPlaceholder.replace('Ej: ', '');
    const finalGuests = Math.max(2, guests || labels.defaultGuests);

    onConfirmDetails({
      hosts: finalHosts,
      baseGuests: finalGuests,
    });
  };

  const getEventIcon = () => {
    switch (eventType) {
      case 'casamiento':
        return 'anillos';
      case 'cumpleanos':
        return 'torta';
      case 'cena':
        return 'platoCubiertos';
    }
  };

  return (
    <motion.main
      className="screen-container event-details-screen"
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="section-top-nav">
        <button type="button" className="text-back-btn" onClick={onBack}>
          {COPY.eventDetails.backBtn}
        </button>
        <span className="mode-tag-pill">
          {mode === 'simple' ? COPY.eventSelect.modeSimpleTag : COPY.eventSelect.modeCustomTag}
        </span>
      </div>

      <div className="event-details-card">
        <div className="select-header-block" style={{ marginBottom: '14px' }}>
          <GoldStarsRow count={3} size={14} />
          <span className="sheet-kicker">{COPY.eventDetails.kicker}</span>
          <div style={{ margin: '8px 0 4px', display: 'flex', justifyContent: 'center' }}>
            <PlannerIcon name={getEventIcon()} size={36} />
          </div>
          <h1 className="select-script-heading">{COPY.eventDetails.heading}</h1>
          <p className="details-card-sub" style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', margin: '4px 0 10px' }}>
            {COPY.eventDetails.subtitle}
          </p>
          <AfaStripeDivider />
        </div>

        <form onSubmit={handleSubmit} className="event-details-form">
          {/* A. Nombre de los protagonistas */}
          <div className="details-input-group">
            <label htmlFor="hosts-input" className="details-field-label">
              {labels.hostsQuestion}
            </label>
            <input
              id="hosts-input"
              type="text"
              className="planner-text-input"
              value={hosts}
              onChange={(e) => setHosts(e.target.value)}
              placeholder={labels.hostsPlaceholder}
              autoFocus
            />
            <p className="details-field-hint">{labels.hostsHint}</p>
          </div>

          {/* B. Cantidad de invitados */}
          <div className="details-input-group">
            <label htmlFor="guests-input" className="details-field-label">
              {labels.guestsQuestion}
            </label>
            <input
              id="guests-input"
              type="number"
              min={2}
              max={5000}
              className="planner-number-input"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value, 10) || 0)}
            />
            <p className="details-field-hint">{COPY.eventDetails.guestsBureaucraticNote}</p>
          </div>

          <button type="submit" className="btn-primary-institutional full-width" style={{ marginTop: '12px' }}>
            {mode === 'simple' ? COPY.eventDetails.btnContinueSimple : COPY.eventDetails.btnContinueCustom}
          </button>
        </form>
      </div>
    </motion.main>
  );
};
