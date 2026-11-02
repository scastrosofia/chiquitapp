import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { generateChiquiTapPlan } from '../engine/chiquitapEngine';
import type {
  EventType,
  MutationType,
  OrganizacionMode,
  RuleChangeResolution,
  UserAnswers,
} from '../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../components/Icons';
import { RuleChangeModal } from '../components/RuleChangeModal';
import { OfficialStamp } from '../components/Stamp';
import { BudgetChart } from '../components/charts/BudgetChart';
import { CommitteeOrgChart } from '../components/charts/CommitteeOrgChart';
import { CountdownChecklistChart } from '../components/charts/CountdownChecklistChart';
import { DroneShowCanvas } from '../components/charts/DroneShowCanvas';
import { EventTimelineChart } from '../components/charts/EventTimelineChart';
import { FixtureBracketChart } from '../components/charts/FixtureBracketChart';
import { RouteMapChart } from '../components/charts/RouteMapChart';
import { StandingsPromediosChart } from '../components/charts/StandingsPromediosChart';
import { ZonesDiagramChart } from '../components/charts/ZonesDiagramChart';

interface ResultsScreenProps {
  eventType: EventType;
  mode: OrganizacionMode;
  answers: UserAnswers;
  seed: number;
  formatNumber: number;
  onReDrawFormat: () => void;
  onStartOver: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  eventType,
  mode,
  answers,
  seed,
  formatNumber,
  onReDrawFormat,
  onStartOver,
}) => {
  const [appliedMutations, setAppliedMutations] = useState<MutationType[]>([]);
  const [activeModal, setActiveModal] = useState<RuleChangeResolution | null>(null);
  const shownResolutionIdsRef = useRef<Set<string>>(new Set());
  const prefersReduced = useReducedMotion();

  // Reset applied mutations when user clicks "Volver a sortear (nuevo formato)"
  useEffect(() => {
    setAppliedMutations([]);
    setActiveModal(null);
    shownResolutionIdsRef.current = new Set();
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, [seed, formatNumber, prefersReduced]);

  const plan = useMemo(
    () =>
      generateChiquiTapPlan({
        eventType,
        mode,
        answers,
        seed,
        formatNumber,
        appliedMutations,
      }),
    [eventType, mode, answers, seed, formatNumber, appliedMutations]
  );

  // Trigger 2-3 official rule-change popups as the user scrolls through the dossier
  useEffect(() => {
    const triggerResolutionAtIndex = (idx: number) => {
      const candidate = plan.scheduledResolutions[idx];
      if (!candidate) return;
      if (shownResolutionIdsRef.current.has(candidate.id)) return;
      shownResolutionIdsRef.current.add(candidate.id);
      soundEngine.playBombo();
      setActiveModal(candidate);
    };

    const handleScroll = () => {
      if (activeModal) return;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 100) return;

      const ratio = scrollTop / docHeight;
      if (ratio > 0.26 && shownResolutionIdsRef.current.size === 0) {
        triggerResolutionAtIndex(0);
      } else if (ratio > 0.62 && shownResolutionIdsRef.current.size === 1) {
        triggerResolutionAtIndex(1);
      }
    };

    const fallbackTimer = window.setTimeout(() => {
      if (shownResolutionIdsRef.current.size === 0) {
        triggerResolutionAtIndex(0);
      }
    }, 5500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [plan.scheduledResolutions, activeModal]);

  const handleAcceptResolution = (res: RuleChangeResolution) => {
    soundEngine.unlockFromGesture();
    soundEngine.playStamp();
    setAppliedMutations((prev) =>
      prev.includes(res.mutation) ? prev : [...prev, res.mutation]
    );
    setActiveModal(null);
  };

  const handleManualExtraResolution = () => {
    soundEngine.unlockFromGesture();
    const nextPending = plan.scheduledResolutions.find(
      (r) => !appliedMutations.includes(r.mutation)
    );
    if (nextPending) {
      shownResolutionIdsRef.current.add(nextPending.id);
      soundEngine.playBombo();
      setActiveModal(nextPending);
    }
  };

  const handleRedrawClick = () => {
    soundEngine.unlockFromGesture();
    soundEngine.playWhistle();
    onReDrawFormat();
  };

  const remainingResolutionsCount = plan.scheduledResolutions.filter(
    (r) => !appliedMutations.includes(r.mutation)
  ).length;

  return (
    <motion.main
      className="screen-container results-screen"
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Dossier Master Cover Card */}
      <header className="dossier-cover-sheet">
        <div className="dossier-top-badges">
          <span className="formato-gestion-badge">
            FORMATO N° {plan.formatNumber} DE LA GESTIÓN
          </span>
          <span className="expediente-mini-code">{plan.expedienteCode}</span>
        </div>

        <GoldStarsRow count={3} size={17} />

        <h1 className="dossier-script-main">{plan.eventDisplayName}</h1>
        <p className="dossier-hosts-sub">{plan.hostsScriptTitle}</p>

        <AfaStripeDivider />

        {/* Summary KPI Strip */}
        <div className="dossier-kpi-grid">
          <div className="kpi-cell">
            <span className="kpi-label">INVITADOS</span>
            <strong className="kpi-val">{plan.inflatedGuests}</strong>
            <span className="kpi-micro">(Base {plan.baseGuests} ampliada)</span>
          </div>
          <div className="kpi-cell">
            <span className="kpi-label">ESTRUCTURA</span>
            <strong className="kpi-val">2 ZONAS + ★</strong>
            <span className="kpi-micro">{plan.anexosCount} Anexos vigentes</span>
          </div>
          <div className="kpi-cell is-full-span">
            <span className="kpi-label">SEDE ÚNICA OBLIGATORIA</span>
            <strong className="kpi-val is-sde">{plan.venueOfficial}</strong>
          </div>
        </div>

        {/* Combi Centrality Executive Manifesto */}
        <div className="dossier-combi-callout">
          <div className="combi-callout-title">
            <PlannerIcon name="combi" size={24} />
            <span>PROTOCOLO DE COMBI OFICIAL (ART. 1° INCISO B)</span>
          </div>
          <p>{plan.combiManifesto}</p>
        </div>

        {/* Action Buttons: Re-draw Format & Pending Bulletin */}
        <div className="dossier-actions-row">
          <button
            type="button"
            className="btn-primary-institutional full-width"
            onClick={handleRedrawClick}
          >
            VOLVER A SORTEAR (NUEVO FORMATO)
          </button>

          <div className="dossier-secondary-actions">
            {remainingResolutionsCount > 0 && (
              <button
                type="button"
                className="btn-outline-planner"
                onClick={handleManualExtraResolution}
              >
                Emitir Resolución sobre la marcha ({remainingResolutionsCount})
              </button>
            )}
            <button
              type="button"
              className="btn-outline-planner"
              onClick={onStartOver}
            >
              Cambiar Evento
            </button>
          </div>
        </div>

        {appliedMutations.length > 0 && (
          <div className="cover-modifications-summary">
            <OfficialStamp
              text="FORMATO MODIFICADO"
              subtext={`${appliedMutations.length} RESOLUCIÓN(ES) APLICADA(S)`}
              variant="gold"
              rotate={-2}
            />
          </div>
        )}
      </header>

      {/* 1. Event Timeline */}
      <EventTimelineChart
        milestones={plan.timeline}
        hostsScriptTitle={plan.hostsScriptTitle}
        eventDateCaption={plan.eventDateCaption}
        isModified={appliedMutations.includes('reconfigurar_zonas')}
      />

      {/* 2. Countdown / Checklist */}
      <CountdownChecklistChart blocks={plan.countdown} />

      {/* 3. Diagrama de Zonas + Campeones del Mundo + Combi */}
      <ZonesDiagramChart
        zones={plan.zones}
        baseGuests={plan.baseGuests}
        inflatedGuests={plan.inflatedGuests}
        inflationJustification={plan.inflationJustification}
      />

      {/* 4. Fixture / Bracket -> External Tournament */}
      <FixtureBracketChart bracket={plan.bracket} />

      {/* 5. Tabla Anual y Promedios (con Descensos Anulados) */}
      <StandingsPromediosChart standings={plan.standings} />

      {/* 6. Mapa de Ruta a Santiago del Estero */}
      <RouteMapChart route={plan.route} />

      {/* 7. Presupuesto (Drones + Secanucas mayoría absoluta) */}
      <BudgetChart budget={plan.budget} />

      {/* 8. Organigrama del Comité Ejecutivo */}
      <CommitteeOrgChart committee={plan.committee} />

      {/* 9. Show de Drones en Canvas */}
      <DroneShowCanvas formations={plan.droneFormations} />

      {/* Bottom Re-draw Bar */}
      <div className="bottom-redraw-card">
        <p className="bottom-redraw-note">
          ¿El formato resultó demasiado claro? El Comité Ejecutivo puede sortear
          una nueva variante reglamentaria de inmediato.
        </p>
        <button
          type="button"
          className="btn-primary-institutional full-width"
          onClick={handleRedrawClick}
        >
          VOLVER A SORTEAR (FORMATO N° {plan.formatNumber + 1} DE LA GESTIÓN)
        </button>
      </div>

      {/* Official Rule-Change Resolution Modal */}
      <RuleChangeModal
        resolution={activeModal}
        onAcceptAndApply={handleAcceptResolution}
      />
    </motion.main>
  );
};
