import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import type { OrganizacionMode } from '../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../components/Icons';

interface LandingScreenProps {
  onSelectMode: (mode: OrganizacionMode) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onSelectMode }) => {
  const prefersReduced = useReducedMotion();

  const handleChoose = (mode: OrganizacionMode) => {
    soundEngine.unlockFromGesture();
    soundEngine.playStamp();
    onSelectMode(mode);
  };

  return (
    <motion.main
      className="screen-container landing-screen"
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="hero-dossier-card">
        <div className="hero-stars-wrap">
          <GoldStarsRow count={3} size={18} />
        </div>

        <span className="hero-kicker">
          SISTEMA INTEGRAL DE PLANIFICACIÓN HOMOLOGADA
        </span>

        <h1 className="hero-wordmark">
          ChiquiTap
          <span className="hero-wordmark-star" aria-hidden="true">
            ★
          </span>
        </h1>

        <AfaStripeDivider className="hero-stripe" />

        <p className="hero-subtitle">
          Organizamos tu evento como se organiza el fútbol argentino.
        </p>

        <div className="hero-ornament-icons" aria-hidden="true">
          <PlannerIcon name="anillos" size={22} />
          <PlannerIcon name="trofeo" size={22} />
          <PlannerIcon name="combi" size={24} />
          <PlannerIcon name="torta" size={22} />
          <PlannerIcon name="dron" size={22} />
        </div>

        <div className="landing-cta-stack">
          <button
            type="button"
            className="landing-mode-btn is-primary"
            onClick={() => handleChoose('simple')}
          >
            <span className="mode-btn-title">Organización Simple</span>
            <span className="mode-btn-sub">rápida</span>
          </button>

          <button
            type="button"
            className="landing-mode-btn is-secondary"
            onClick={() => handleChoose('personalizada')}
          >
            <span className="mode-btn-title">Organización Personalizada</span>
            <span className="mode-btn-sub">consulta vinculante fecha a fecha</span>
          </button>
        </div>

        <div className="hero-seal-caption">
          <span>RESOLUCIÓN VIGENTE N° 2026/CE — SEDE ÚNICA HABILITADA</span>
        </div>
      </div>
    </motion.main>
  );
};
