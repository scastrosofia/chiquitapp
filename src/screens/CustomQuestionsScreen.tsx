import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { buildQuestionSequence } from '../content/questions';
import type { UserAnswers } from '../engine/types';
import { AfaStripeDivider, GoldStarsRow } from '../components/Icons';
import { OfficialStamp } from '../components/Stamp';

interface CustomQuestionsScreenProps {
  seed: number;
  onComplete: (answers: UserAnswers) => void;
  onBack: () => void;
}

type Choice = 'yes' | 'no';
type StepPhase =
  | 'idle'
  | 'forcing_opposite'
  | 'approved'
  | 'numeric_followup'
  | 'post_banner';

export const CustomQuestionsScreen: React.FC<CustomQuestionsScreenProps> = ({
  seed,
  onComplete,
  onBack,
}) => {
  const questions = useMemo(() => buildQuestionSequence(seed), [seed]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState<StepPhase>('idle');
  const [clickedChoice, setClickedChoice] = useState<Choice | null>(null);
  const [forcedChoice, setForcedChoice] = useState<Choice | null>(null);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [secanucasInput, setSecanucasInput] = useState<string>('2');
  const [recordedAnswers, setRecordedAnswers] = useState<Record<string, boolean>>({});
  const prefersReduced = useReducedMotion();
  const timersRef = useRef<number[]>([]);

  const currentQ = questions[currentIdx];
  const totalQ = questions.length;

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const advanceToNextQuestion = (
    updatedAnswers: Record<string, boolean>,
    secCount?: number
  ) => {
    clearTimers();
    if (currentIdx + 1 >= totalQ) {
      const parsed = Math.max(
        0,
        parseInt(secCount !== undefined ? String(secCount) : secanucasInput, 10) || 2
      );
      onComplete({
        secanucasRequested: parsed,
        answersById: updatedAnswers,
      });
    } else {
      setPhase('idle');
      setClickedChoice(null);
      setForcedChoice(null);
      setWarningMsg(null);
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const finalizeOppositeApproval = (targetChoice: Choice) => {
    if (!currentQ) return;
    soundEngine.playStamp();
    const updated = {
      ...recordedAnswers,
      [currentQ.id]: targetChoice === 'yes',
    };
    setRecordedAnswers(updated);
    setPhase('approved');

    if (currentQ.requiresNumericFollowup) {
      const t = window.setTimeout(
        () => {
          setPhase('numeric_followup');
        },
        prefersReduced ? 250 : 750
      );
      timersRef.current.push(t);
      return;
    }

    if (currentQ.postApprovalBanner) {
      const t = window.setTimeout(
        () => {
          setPhase('post_banner');
        },
        prefersReduced ? 250 : 650
      );
      timersRef.current.push(t);
      return;
    }

    const t = window.setTimeout(
      () => {
        advanceToNextQuestion(updated);
      },
      prefersReduced ? 450 : 980
    );
    timersRef.current.push(t);
  };

  /**
   * Core rule: whichever button the user clicks ('yes' or 'no'),
   * ChiquiTap ALWAYS rejects it and auto-selects the opposite option!
   */
  const handleUserClickChoice = (userChoice: Choice) => {
    if (phase !== 'idle' || !currentQ) return;
    const opposite: Choice = userChoice === 'yes' ? 'no' : 'yes';

    soundEngine.unlockFromGesture();
    soundEngine.playWhistle();

    setClickedChoice(userChoice);
    setForcedChoice(opposite);
    setWarningMsg(
      userChoice === 'no' ? currentQ.warningWhenNo : currentQ.warningWhenYes
    );
    setPhase('forcing_opposite');

    const t = window.setTimeout(
      () => {
        finalizeOppositeApproval(opposite);
      },
      prefersReduced ? 350 : 1080
    );
    timersRef.current.push(t);
  };

  const handleConfirmSecanucas = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.unlockFromGesture();
    soundEngine.playStamp();
    const parsed = Math.max(0, parseInt(secanucasInput, 10) || 2);
    advanceToNextQuestion(recordedAnswers, parsed);
  };

  const handleConfirmBanner = () => {
    soundEngine.unlockFromGesture();
    soundEngine.playStamp();
    advanceToNextQuestion(recordedAnswers);
  };

  if (!currentQ) return null;

  const progressPct = Math.round(((currentIdx + 1) / totalQ) * 100);
  const mechanic = currentQ.mechanic;

  // Animation for whichever button was clicked vs whichever opposite button is being forced
  const getButtonAnimate = (btnSide: Choice) => {
    if (phase === 'idle' || !clickedChoice || !forcedChoice) {
      return { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 };
    }

    // If this button is the OPPOSITE target being clicked by the Committee cursor
    if (btnSide === forcedChoice) {
      if (phase === 'forcing_opposite' && !prefersReduced) {
        return { scale: [1, 1.07, 0.94, 1.04], opacity: 1, x: 0, y: 0, rotate: 0 };
      }
      return { scale: 1.03, opacity: 1, x: 0, y: 0, rotate: 0 };
    }

    // Otherwise, this button is the one the user tried to click -> dodge / shrink / shake / morph!
    if (prefersReduced) {
      return { opacity: 0.45 };
    }

    const dir = btnSide === 'yes' ? -1 : 1; // Dodge left if 'yes' (left col), dodge right if 'no' (right col)
    switch (mechanic) {
      case 'dodge_and_cursor':
        return { x: dir * 42, y: 14, rotate: dir * 9, scale: 0.9 };
      case 'shrink_clicked':
        return { scale: 0.34, opacity: 0.38, y: 8 };
      case 'morph_opposite':
        return { rotate: [0, -6, 6, 0], scale: 0.96, opacity: 0.72 };
      case 'paredes_shock':
      case 'tribunal_disciplina':
      default:
        return { x: [-9, 9, -6, 6, -3, 0], opacity: 0.52 };
    }
  };

  const yesLabel =
    phase !== 'idle' && clickedChoice === 'yes' && mechanic === 'morph_opposite'
      ? 'No (De Oficio)'
      : 'Sí';

  const noLabel =
    phase !== 'idle' && clickedChoice === 'no' && mechanic === 'morph_opposite'
      ? 'Sí (De Oficio)'
      : 'No';

  // Cursor trajectory: starts over the user's clicked button, glides to the opposite button and clicks it
  const startLeft = clickedChoice === 'yes' ? '25%' : '74%';
  const targetLeft = forcedChoice === 'yes' ? '25%' : '74%';

  return (
    <main className="screen-container questions-screen">
      <div className="section-top-nav">
        <button type="button" className="text-back-btn" onClick={onBack}>
          ← Cambiar evento
        </button>
        <span className="mode-tag-pill">PLENARIO VINCULANTE</span>
      </div>

      {/* Fixture-style Progress Header */}
      <div className="fixture-progress-header">
        <div className="fixture-progress-labels">
          <span className="fixture-fecha-count">
            FECHA {currentIdx + 1} DE {totalQ}
          </span>
          <span className="fixture-zone-status">RONDA REGULAR</span>
        </div>
        <div className="fixture-progress-track">
          <motion.div
            className="fixture-progress-fill"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: prefersReduced ? 0 : 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          className="question-dossier-card"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -18 }}
          transition={{ duration: 0.24 }}
        >
          <div className="question-card-top">
            <GoldStarsRow count={3} size={13} />
            <span className="sheet-kicker">CONSULTA AL ORGANIZADOR</span>
            <AfaStripeDivider />
          </div>

          <h1 className="question-main-title">{currentQ.question}</h1>

          {currentQ.subtitle && (
            <p className="question-subtitle-note">{currentQ.subtitle}</p>
          )}

          {/* Warning / Tribunal / Paredes Alert */}
          {warningMsg && (
            <motion.div
              className={`no-warning-callout ${
                mechanic === 'paredes_shock' ? 'is-paredes-alert' : ''
              }`}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <strong>ATENCIÓN REGLAMENTARIA:</strong> {warningMsg}
            </motion.div>
          )}

          {/* Numeric Follow-up for Secanucas */}
          {phase === 'numeric_followup' && currentQ.requiresNumericFollowup ? (
            <form
              className="secanucas-followup-form"
              onSubmit={handleConfirmSecanucas}
            >
              <label htmlFor="secanucas-num-input" className="followup-label">
                {currentQ.requiresNumericFollowup.prompt}
              </label>
              <input
                id="secanucas-num-input"
                type="number"
                min={0}
                max={999}
                value={secanucasInput}
                onChange={(e) => setSecanucasInput(e.target.value)}
                className="planner-number-input"
                autoFocus
              />
              <p className="followup-hint">
                El Comité aplicará automáticamente el coeficiente ×2 por zona,
                reserva interzonal, dotación de Combi Oficial y cupo de
                autoridades.
              </p>
              <button
                type="submit"
                className="btn-primary-institutional full-width"
              >
                HOMOLOGAR Y CONTINUAR
              </button>
            </form>
          ) : phase === 'post_banner' && currentQ.postApprovalBanner ? (
            <div className="sde-confirmed-banner">
              <div className="sde-banner-kicker">
                RESOLUCIÓN DE LOCALÍA INMEDIATA
              </div>
              <p className="sde-banner-copy">{currentQ.postApprovalBanner}</p>
              <button
                type="button"
                className="btn-primary-institutional full-width"
                onClick={handleConfirmBanner}
              >
                ENTENDIDO, AVANZAR FECHA
              </button>
            </div>
          ) : (
            <div className="yes-no-arena">
              <motion.button
                type="button"
                className={`answer-choice-btn is-yes ${
                  forcedChoice === 'yes' &&
                  (phase === 'forcing_opposite' || phase === 'approved')
                    ? 'is-auto-pressed'
                    : ''
                } ${
                  phase !== 'idle' &&
                  clickedChoice === 'yes' &&
                  mechanic === 'morph_opposite'
                    ? 'is-morphed'
                    : ''
                }`}
                animate={getButtonAnimate('yes')}
                transition={{ duration: 0.42 }}
                onClick={() => handleUserClickChoice('yes')}
                disabled={phase !== 'idle'}
              >
                {yesLabel}
              </motion.button>

              <motion.button
                type="button"
                className={`answer-choice-btn is-no ${
                  forcedChoice === 'no' &&
                  (phase === 'forcing_opposite' || phase === 'approved')
                    ? 'is-auto-pressed'
                    : ''
                } ${
                  phase !== 'idle' &&
                  clickedChoice === 'no' &&
                  mechanic === 'morph_opposite'
                    ? 'is-morphed'
                    : ''
                }`}
                animate={getButtonAnimate('no')}
                transition={{ duration: 0.42 }}
                onClick={() => handleUserClickChoice('no')}
                disabled={phase !== 'idle'}
              >
                {noLabel}
              </motion.button>

              {/* Animated Committee Cursor gliding from clicked button to the opposite button and clicking it */}
              {phase === 'forcing_opposite' && forcedChoice && (
                <motion.div
                  className="committee-auto-cursor"
                  initial={
                    prefersReduced
                      ? { left: targetLeft, top: '52%', opacity: 1 }
                      : { left: startLeft, top: '68%', opacity: 0, scale: 1.1 }
                  }
                  animate={
                    prefersReduced
                      ? { left: targetLeft, top: '52%', opacity: 1 }
                      : {
                          left: [startLeft, targetLeft, targetLeft],
                          top: ['68%', '48%', '52%'],
                          opacity: [1, 1, 1],
                          scale: [1.08, 1, 0.84],
                        }
                  }
                  transition={{ duration: 0.82, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M5 3L22 12.5L14.2 15.2L18.5 23L15.2 24.6L10.9 16.8L5 21.5V3Z"
                      fill="#1A1A1A"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="cursor-tag">COMITÉ EJECUTIVO</span>
                </motion.div>
              )}
            </div>
          )}

          {/* Stamp overlay when Approved */}
          {(phase === 'approved' ||
            phase === 'numeric_followup' ||
            phase === 'post_banner') && (
            <div className="question-approved-stamp-row">
              <OfficialStamp
                text="APROBADO POR UNANIMIDAD"
                subtext={
                  forcedChoice === 'no'
                    ? 'SE COMPUTÓ: NO (POR EL COMITÉ)'
                    : 'SE COMPUTÓ: SÍ (POR EL COMITÉ)'
                }
                variant="celeste"
                rotate={-4}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};
