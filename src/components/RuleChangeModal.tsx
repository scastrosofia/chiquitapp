import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { RuleChangeResolution } from '../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from './Icons';
import { OfficialStamp } from './Stamp';

interface RuleChangeModalProps {
  resolution: RuleChangeResolution | null;
  onAcceptAndApply: (res: RuleChangeResolution) => void;
}

export const RuleChangeModal: React.FC<RuleChangeModalProps> = ({
  resolution,
  onAcceptAndApply,
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {resolution && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0.05 : 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resolution-modal-title"
        >
          <motion.div
            className="resolution-modal-card"
            initial={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 0, y: 28, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.97 }
            }
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <div className="modal-top-seal">
              <GoldStarsRow count={3} size={14} />
              <span className="modal-boletin-kicker">{resolution.boletinHeader}</span>
            </div>

            <AfaStripeDivider />

            <div className="modal-icon-badge">
              <PlannerIcon name="selloOficial" size={32} />
            </div>

            <h3 id="resolution-modal-title" className="modal-title-condensed">
              {resolution.title}
            </h3>

            <p className="modal-body-text">{resolution.body}</p>

            <div className="modal-impact-box">
              <span className="impact-kicker">IMPACTO REGLAMENTARIO INMEDIATO:</span>
              <p>{resolution.impactSummary}</p>
            </div>

            <div className="modal-stamp-row">
              <OfficialStamp
                text="RESOLUCIÓN OFICIAL"
                subtext="COMITÉ EJECUTIVO EN COMBI"
                variant="celeste"
                rotate={-4}
              />
            </div>

            <button
              type="button"
              className="btn-primary-institutional full-width"
              onClick={() => onAcceptAndApply(resolution)}
            >
              ACATAR Y REORDENAR FORMATO
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
