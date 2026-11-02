import React from 'react';
import { motion } from 'framer-motion';
import type { ZonesData } from '../../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../Icons';
import { OfficialStamp } from '../Stamp';

interface ZonesDiagramChartProps {
  zones: ZonesData;
  baseGuests: number;
  inflatedGuests: number;
  inflationJustification: string;
}

/**
 * Renders an editorial seating-dot matrix representing hundreds of guests per Zone.
 */
const GuestDotsMatrix: React.FC<{ count: number; accent: 'ink' | 'celeste' }> = ({
  count,
  accent,
}) => {
  // Cap visual dots at 64 so it stays crisp and legible while representing the full count
  const visualDots = Math.min(64, Math.max(15, Math.round(count / 8)));
  const cols = 8;
  const rows = Math.ceil(visualDots / cols);
  const svgHeight = rows * 11 + 8;

  return (
    <div className="guest-dots-box">
      <svg
        width="100%"
        height={svgHeight}
        viewBox={`0 0 120 ${svgHeight}`}
        aria-label={`${count} invitados asignados`}
      >
        {Array.from({ length: visualDots }).map((_, idx) => {
          const r = Math.floor(idx / cols);
          const c = idx % cols;
          const cx = 11 + c * 14;
          const cy = 9 + r * 11;
          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r="2.6"
              fill={
                idx % 5 === 0 && accent === 'celeste'
                  ? '#75AADB'
                  : '#1A1A1A'
              }
              opacity={0.82}
            />
          );
        })}
      </svg>
      <span className="dots-caption">
        {count} INVITADOS ({visualDots < count ? `escala 1:${Math.round(count / visualDots)}` : 'escala 1:1'})
      </span>
    </div>
  );
};

export const ZonesDiagramChart: React.FC<ZonesDiagramChartProps> = ({
  zones,
  baseGuests,
  inflatedGuests,
  inflationJustification,
}) => {
  return (
    <section className="planner-sheet" aria-labelledby="sec-zones-title">
      <div className="sheet-header">
        <GoldStarsRow count={3} size={13} />
        <span className="sheet-kicker">ANEXO III — DISTRIBUCIÓN DE LOCALÍAS Y SECTORES</span>
        <h2 id="sec-zones-title" className="sheet-script-title">
          Diagrama de Zonas
        </h2>
        <p className="sheet-phase-subtitle">{zones.phaseTitle}</p>
        <AfaStripeDivider />
      </div>

      {zones.isModifiedByResolution && (
        <div className="sheet-stamp-banner">
          <OfficialStamp
            text="FORMATO MODIFICADO"
            subtext="ZONAS RECONFIGURADAS EN VIVO"
            variant="celeste"
            rotate={-4}
          />
          {zones.modificationNote && (
            <p className="modification-inline-note">{zones.modificationNote}</p>
          )}
        </div>
      )}

      {/* Inflation Banner */}
      <div className="inflation-banner">
        <div className="inflation-numbers">
          <span className="old-count">{baseGuests}</span>
          <span className="arrow-sep">→</span>
          <span className="new-count">{inflatedGuests} INVITADOS</span>
        </div>
        <p className="inflation-text">{inflationJustification}</p>
      </div>

      {/* Zona Campeones del Mundo VIP Box */}
      <motion.div layout className="campeones-vip-card">
        <div className="vip-star-header">
          <PlannerIcon name="estrella" size={24} />
          <div>
            <div className="vip-title">{zones.campeonesDelMundo.title}</div>
            <div className="vip-table-tag">{zones.campeonesDelMundo.tableName}</div>
          </div>
          <PlannerIcon name="estrella" size={24} />
        </div>
        <div className="vip-names-pills">
          {zones.campeonesDelMundo.guests.map((guest) => (
            <span key={guest} className="vip-guest-pill">
              ★ {guest}
            </span>
          ))}
        </div>
        <p className="vip-privilege-copy">{zones.campeonesDelMundo.privilegeText}</p>
      </motion.div>

      {/* Two Columns: Zona A & Zona B */}
      <div className="two-zones-grid">
        {[zones.zoneA, zones.zoneB].map((z) => (
          <motion.div
            layout
            key={z.code}
            className={`zone-column-card zone-${z.code.toLowerCase()}`}
          >
            <div className="zone-badge-top">GRUPO REGLAMENTARIO {z.code}</div>
            <h3 className="zone-title-condensed">{z.name}</h3>
            <p className="zone-sub-italic">{z.subtitle}</p>

            <GuestDotsMatrix
              count={z.participantsCount}
              accent={z.code === 'A' ? 'ink' : 'celeste'}
            />

            <div className="zone-table-count">{z.tablesLabel}</div>

            <ul className="zone-subgroups-list">
              {z.subgroups.map((sg) => (
                <li key={sg}>{sg}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Combi Oficial (Where everything important happens) */}
      <motion.div layout className="combi-sector-card">
        <div className="combi-header-row">
          <PlannerIcon name="combi" size={30} />
          <div>
            <h3 className="combi-card-title">{zones.combiOficial.title}</h3>
            <span className="combi-spec">{zones.combiOficial.vehicleSpec}</span>
          </div>
        </div>
        <ul className="combi-events-list">
          {zones.combiOficial.decisiveEvents.map((ev) => (
            <li key={ev}>{ev}</li>
          ))}
        </ul>
      </motion.div>

      {/* Amigos del Organizador */}
      <div className="amigos-vip-strip">
        <div className="amigos-strip-top">
          <span>{zones.amigosDelOrganizador.title}</span>
          <span className="amigos-pill">{zones.amigosDelOrganizador.guestsCount} CUPOS</span>
        </div>
        <p>{zones.amigosDelOrganizador.privilegeText}</p>
      </div>

      {/* Fecha de Clásicos & Interzonal */}
      <div className="special-fechas-stack">
        <div className="special-fecha-box">
          <span className="fecha-tag">{zones.fechaClasicos.label}</span>
          <p>{zones.fechaClasicos.matchup}</p>
        </div>
        <div className="special-fecha-box is-interzonal">
          <span className="fecha-tag">{zones.fechaInterzonal.label}</span>
          <p>{zones.fechaInterzonal.matchup}</p>
        </div>
      </div>
    </section>
  );
};
