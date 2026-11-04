import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { COPY } from '../content/copy';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../components/Icons';

interface LoadingCommitteeScreenProps {
  onComplete: () => void;
}

const STATUS_STEPS = COPY.loading.steps;

export const LoadingCommitteeScreen: React.FC<LoadingCommitteeScreenProps> = ({
  onComplete,
}) => {
  const [stepIdx, setStepIdx] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const delays = [1600, 2100, 2100, 2400, 2200, 1500];
    if (stepIdx >= STATUS_STEPS.length - 1) {
      soundEngine.playStamp();
      const doneTimer = window.setTimeout(() => {
        onComplete();
      }, 1200);
      return () => window.clearTimeout(doneTimer);
    }

    const nextIdx = stepIdx + 1;
    const timer = window.setTimeout(() => {
      if (STATUS_STEPS[nextIdx]?.isBackward) {
        soundEngine.playWhistle();
      }
      setStepIdx(nextIdx);
    }, delays[stepIdx] ?? 600);

    return () => window.clearTimeout(timer);
  }, [stepIdx, onComplete]);

  const current = STATUS_STEPS[stepIdx] ?? STATUS_STEPS[0];

  return (
    <main className="screen-container loading-screen" aria-live="polite">
      <div className="loading-dossier-box">
        <GoldStarsRow count={3} size={15} />
        <span className="sheet-kicker">{COPY.loading.kicker}</span>

        <div className="loading-icon-pulse">
          <PlannerIcon name="estrella" size={42} strokeColor="#C9A227" />
        </div>

        <h1 className="loading-title">{COPY.loading.title}</h1>
        <AfaStripeDivider />

        <div className="fixture-progress-track is-large">
          <motion.div
            className={`fixture-progress-fill ${current.isBackward ? 'is-retroceso' : ''}`}
            initial={{ width: '6%' }}
            animate={{ width: `${current.pct}%` }}
            transition={
              prefersReduced
                ? { duration: 0.1 }
                : { type: 'spring', stiffness: 130, damping: 20 }
            }
          />
        </div>

        <div className="loading-pct-row">
          <span className="loading-pct-num">{current.pct}%</span>
          {current.isBackward && (
            <span className="loading-retro-badge">REESTRUCTURACIÓN EN CURSO</span>
          )}
        </div>

        <p className="loading-substatus">{current.msg}</p>
      </div>
    </main>
  );
};
