import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../components/Icons';

interface LoadingCommitteeScreenProps {
  onComplete: () => void;
}

const STATUS_STEPS = [
  { pct: 22, msg: 'Consultando al Comité Ejecutivo…' },
  { pct: 54, msg: 'Dividiendo invitados en Zona A y Zona B…' },
  { pct: 79, msg: 'Sorteando cruces interzonales en la Combi Oficial…' },
  {
    pct: 38,
    msg: 'Contraorden del Comité: se amplía el padrón y se recalculan los promedios…',
    isBackward: true,
  },
  { pct: 74, msg: 'Reprogramando sede a Santiago del Estero y cargando drones…' },
  { pct: 100, msg: 'Formato homologado por unanimidad.' },
];

export const LoadingCommitteeScreen: React.FC<LoadingCommitteeScreenProps> = ({
  onComplete,
}) => {
  const [stepIdx, setStepIdx] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const delays = [520, 620, 680, 820, 650, 480];
    if (stepIdx >= STATUS_STEPS.length - 1) {
      soundEngine.playStamp();
      const doneTimer = window.setTimeout(() => {
        onComplete();
      }, 420);
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
        <span className="sheet-kicker">PROCESAMIENTO INSTITUCIONAL</span>

        <div className="loading-icon-pulse">
          <PlannerIcon name="combi" size={42} />
        </div>

        <h1 className="loading-title">Consultando al Comité Ejecutivo…</h1>
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
