import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { COPY } from '../content/copy';
import { EVENT_CONTENT } from '../content/events';
import type { EventType, OrganizacionMode } from '../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../components/Icons';

interface EventSelectScreenProps {
  mode: OrganizacionMode;
  onSelectEvent: (eventType: EventType) => void;
  onBack: () => void;
}

const EVENT_ORDER: EventType[] = ['casamiento', 'cumpleanos', 'cena'];

export const EventSelectScreen: React.FC<EventSelectScreenProps> = ({
  mode,
  onSelectEvent,
  onBack,
}) => {
  const prefersReduced = useReducedMotion();

  const handleChooseEvent = (type: EventType) => {
    soundEngine.unlockFromGesture();
    soundEngine.playStamp();
    onSelectEvent(type);
  };

  return (
    <motion.main
      className="screen-container event-select-screen"
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="section-top-nav">
        <button type="button" className="text-back-btn" onClick={onBack}>
          {COPY.eventSelect.backBtn}
        </button>
        <span className="mode-tag-pill">
          {mode === 'simple' ? COPY.eventSelect.modeSimpleTag : COPY.eventSelect.modeCustomTag}
        </span>
      </div>

      <div className="select-header-block">
        <GoldStarsRow count={3} size={14} />
        <span className="sheet-kicker">{COPY.eventSelect.kicker}</span>
        <h1 className="select-script-heading">{COPY.eventSelect.heading}</h1>
        <AfaStripeDivider />
      </div>

      <div className="event-cards-stack">
        {EVENT_ORDER.map((type, idx) => {
          const item = EVENT_CONTENT[type];
          return (
            <motion.button
              key={type}
              type="button"
              className="event-choice-card"
              onClick={() => handleChooseEvent(type)}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReduced ? 0 : idx * 0.07 }}
            >
              <div className="event-card-illustration">
                <PlannerIcon name={item.cardIcon} size={38} />
              </div>
              <div className="event-card-body">
                <span className="event-card-cat">
                  {COPY.eventSelect.cards[type].categoryTag}
                </span>
                <h2 className="event-card-title">{item.cardTitle}</h2>
                <p className="event-card-desc">{item.cardSubtitle}</p>
              </div>
              <span className="event-card-chevron" aria-hidden="true">
                →
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.main>
  );
};
