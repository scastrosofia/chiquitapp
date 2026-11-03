import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { COPY } from '../content/copy';
import { buildQuestionSequence, type CustomQuestion } from '../content/questions';
import type { UserAnswers } from '../engine/types';
import { AfaStripeDivider, GoldStarsRow } from '../components/Icons';
import { OfficialStamp } from '../components/Stamp';

interface CustomQuestionsScreenProps {
  seed: number;
  onComplete: (answers: UserAnswers) => void;
  onBack: () => void;
}

type StepPhase =
  | 'idle'
  | 'forcing_yes'
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
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const [secanucasInput, setSecanucasInput] = useState<string>('2');
  const [recordedAnswers, setRecordedAnswers] = useState<Record<string, boolean>>({});
  const prefersReduced = useReducedMotion();
  const timersRef = useRef<number[]>([]);

  const currentQ: CustomQuestion | undefined = questions[currentIdx];
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
      setWarningMsg(null);
      setResponseMsg(null);
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const finalizeYesApproval = () => {
    if (!currentQ) return;
    soundEngine.playStamp();
    const updated = {
      ...recordedAnswers,
      [currentQ.id]: true,
    };
    setRecordedAnswers(updated);
    setPhase('approved');

    const responseText =
      typeof currentQ.responseAfterForcedYes === 'function'
        ? currentQ.responseAfterForcedYes(
            parseInt(secanucasInput, 10) || 2,
            (parseInt(secanucasInput, 10) || 2) * 2 * 280 + 1200 + 540 + 2000
          )
        : currentQ.responseAfterForcedYes;

    setResponseMsg(responseText);

    if (currentQ.numericFollowup) {
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
      prefersReduced ? 450 : 1300
    );
    timersRef.current.push(t);
  };

  const handleDirectYes = () => {
    if (phase !== 'idle' || !currentQ) return;
    soundEngine.unlockFromGesture();
    finalizeYesApproval();
  };

  const handleAttemptNo = () => {
    if (phase !== 'idle' || !currentQ) return;
    soundEngine.unlockFromGesture();
    soundEngine.playWhistle();

    setWarningMsg(currentQ.noWarning);
    setPhase('forcing_yes');

    const t = window.setTimeout(
      () => {
        finalizeYesApproval();
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
    const inflated = parsed * 2 * 280 + 1200 + 540 + 2000;
    setResponseMsg(`Pediste ${parsed}. Te asignamos ${inflated.toLocaleString('es-AR')}.`);
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

  // Animation for the "No" button dodging / shaking / shrinking when clicked
  const getNoButtonAnimate = () => {
    if (phase === 'idle') {
      return { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 };
    }
    if (prefersReduced) {
      return { opacity: 0.4 };
    }
    switch (mechanic) {
      case 'dodge_and_cursor':
        return { x: 44, y: 14, rotate: 9, scale: 0.88 };
      case 'shrink_clicked':
        return { scale: 0.32, opacity: 0.38, y: 8 };
      case 'morph_opposite':
        return { rotate: [0, -6, 6, 0], scale: 1.02 };
      case 'paredes_shock':
      case 'tribunal_disciplina':
      default:
        return { x: [-9, 9, -6, 6, -3, 0], opacity: 0.52 };
    }
  };

  const noLabel =
    phase !== 'idle' && mechanic === 'morph_opposite' ? 'Sí (De Oficio)' : COPY.questions.noBtn;

  return (
    <main className="screen-container questions-screen">
      <div className="section-top-nav">
        <button type="button" className="text-back-btn" onClick={onBack}>
          {COPY.questions.backBtn}
        </button>
        <span className="mode-tag-pill">{COPY.questions.modeTag}</span>
      </div>

      {/* Progress Header */}
      <div className="fixture-progress-header">
        <div className="fixture-progress-labels">
          <span className="fixture-fecha-count">
            {COPY.questions.progressLabel(currentIdx + 1, totalQ)}
          </span>
          <span className="fixture-zone-status">{COPY.questions.statusLabel}</span>
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
            <span className="sheet-kicker">{COPY.questions.cardKicker}</span>
            <AfaStripeDivider />
          </div>

          <h1 className="question-main-title">{currentQ.question}</h1>

          {currentQ.subtitle && (
            <p className="question-subtitle-note">{currentQ.subtitle}</p>
          )}

          {/* Warning banner when No is clicked */}
          {warningMsg && (
            <motion.div
              className={`no-warning-callout ${
                mechanic === 'paredes_shock' ? 'is-paredes-alert' : ''
              }`}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <strong>DECISIÓN DEL COMITÉ:</strong> {warningMsg}
            </motion.div>
          )}

          {/* Response text after approval */}
          {responseMsg && (
            <motion.div
              className="no-warning-callout is-paredes-alert"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <strong>RESOLUCIÓN:</strong> {responseMsg}
            </motion.div>
          )}

          {/* Numeric Follow-up for Secanucas */}
          {phase === 'numeric_followup' && currentQ.numericFollowup ? (
            <form
              className="secanucas-followup-form"
              onSubmit={handleConfirmSecanucas}
            >
              <label htmlFor="secanucas-num-input" className="followup-label">
                {currentQ.numericFollowup.prompt}
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
              <p className="followup-hint">{COPY.questions.secanucasForm.hint}</p>
              <button
                type="submit"
                className="btn-primary-institutional full-width"
              >
                {COPY.questions.secanucasForm.submitBtn}
              </button>
            </form>
          ) : phase === 'post_banner' && currentQ.postApprovalBanner ? (
            <div className="sde-confirmed-banner">
              <div className="sde-banner-kicker">
                {COPY.questions.sdeBannerKicker}
              </div>
              <p className="sde-banner-copy">{currentQ.postApprovalBanner}</p>
              <button
                type="button"
                className="btn-primary-institutional full-width"
                onClick={handleConfirmBanner}
              >
                {COPY.questions.sdeBannerBtn}
              </button>
            </div>
          ) : (
            <div className="yes-no-arena">
              <motion.button
                type="button"
                className={`answer-choice-btn is-yes ${
                  phase === 'forcing_yes' || phase === 'approved'
                    ? 'is-auto-pressed'
                    : ''
                }`}
                animate={
                  phase === 'forcing_yes' && !prefersReduced
                    ? { scale: [1, 1.07, 0.94, 1.04] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.65 }}
                onClick={handleDirectYes}
                disabled={phase !== 'idle'}
              >
                {COPY.questions.yesBtn}
              </motion.button>

              <motion.button
                type="button"
                className={`answer-choice-btn is-no ${
                  phase !== 'idle' && mechanic === 'morph_opposite'
                    ? 'is-morphed'
                    : ''
                }`}
                animate={getNoButtonAnimate()}
                transition={{ duration: 0.38 }}
                onClick={handleAttemptNo}
                disabled={phase !== 'idle'}
              >
                {noLabel}
              </motion.button>

              {/* Animated Committee Cursor gliding from No to Sí */}
              {phase === 'forcing_yes' && (
                <motion.div
                  className="committee-auto-cursor"
                  initial={
                    prefersReduced
                      ? { left: '25%', top: '52%', opacity: 1 }
                      : { left: '74%', top: '68%', opacity: 0, scale: 1.1 }
                  }
                  animate={
                    prefersReduced
                      ? { left: '25%', top: '52%', opacity: 1 }
                      : {
                          left: ['74%', '25%', '25%'],
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
                  <span className="cursor-tag">{COPY.questions.cursorTag}</span>
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
                text={COPY.questions.approvedStampText}
                subtext={COPY.questions.approvedStampSubtext}
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
