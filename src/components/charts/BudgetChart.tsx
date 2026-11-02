import React from 'react';
import { motion } from 'framer-motion';
import type { BudgetData } from '../../engine/types';
import { AfaStripeDivider, GoldStarsRow } from '../Icons';
import { OfficialStamp } from '../Stamp';

interface BudgetChartProps {
  budget: BudgetData;
}

const SLICE_STROKES = ['#1A1A1A', '#75AADB', '#C9A227', '#8C857B', '#C8C1B6'];

export const BudgetChart: React.FC<BudgetChartProps> = ({ budget }) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  let cumulativePct = 0;

  const { secanucas } = budget;

  return (
    <section className="planner-sheet" aria-labelledby="sec-budget-title">
      <div className="sheet-header">
        <GoldStarsRow count={3} size={13} />
        <span className="sheet-kicker">ANEXO VII — DISTRIBUCIÓN PATRIMONIAL</span>
        <h2 id="sec-budget-title" className="sheet-script-title">
          Presupuesto Oficial
        </h2>
        <AfaStripeDivider />
      </div>

      {budget.isModifiedByResolution && (
        <div className="sheet-stamp-banner">
          <OfficialStamp
            text="FORMATO MODIFICADO"
            subtext="PARTIDA EXTRA DE SECANUCAS"
            variant="celeste"
            rotate={-3}
          />
        </div>
      )}

      {/* Editorial Donut Ring */}
      <div className="budget-donut-layout">
        <div className="donut-svg-box">
          <svg width="160" height="160" viewBox="0 0 160 160" role="img" aria-label="Gráfico de presupuesto">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#EAE4DA"
              strokeWidth="16"
            />
            {budget.items.map((item, idx) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((cumulativePct / 100) * circumference);
              cumulativePct += item.percentage;

              return (
                <circle
                  key={item.id}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={SLICE_STROKES[idx % SLICE_STROKES.length]}
                  strokeWidth="16"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 80 80)"
                />
              );
            })}
            <circle cx="80" cy="80" r="41" fill="none" stroke="#1A1A1A" strokeWidth="0.7" />
            <text
              x="80"
              y="76"
              textAnchor="middle"
              fontFamily="Oswald, sans-serif"
              fontSize="19"
              fontWeight="700"
              fill="#1A1A1A"
            >
              {budget.items[0].percentage + budget.items[1].percentage}%
            </text>
            <text
              x="80"
              y="90"
              textAnchor="middle"
              fontFamily="Montserrat, sans-serif"
              fontSize="7"
              fontWeight="600"
              fill="#4A4A4A"
            >
              DRONES + SECANUCAS
            </text>
          </svg>
        </div>

        <div className="budget-ledger-list">
          {budget.items.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              className={`budget-ledger-item ${item.isPrimaryHighlight ? 'is-major' : ''}`}
            >
              <div className="ledger-top-line">
                <span
                  className="ledger-swatch"
                  style={{ backgroundColor: SLICE_STROKES[idx % SLICE_STROKES.length] }}
                />
                <span className="ledger-cat">{item.category}</span>
                <strong className="ledger-pct">{item.percentage}%</strong>
              </div>
              <p className="ledger-detail">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Absurd Secanucas Formula Audit Box */}
      <div className="secanucas-audit-box">
        <div className="audit-title">
          LIQUIDACIÓN TÉCNICA DE SECANUCAS HOMOLOGADOS
        </div>
        <div className="audit-rows">
          <div className="audit-row">
            <span>Solicitados originalmente por el usuario:</span>
            <strong>{secanucas.requestedByUser} u.</strong>
          </div>
          <div className="audit-row">
            <span>Multiplicador ×2 por Zona + Coeficiente Térmico SDE:</span>
            <strong>+{secanucas.perZoneFactor.toLocaleString('es-AR')} u.</strong>
          </div>
          <div className="audit-row">
            <span>Reserva obligatoria para Fecha Interzonal:</span>
            <strong>+{secanucas.interzonalReserve.toLocaleString('es-AR')} u.</strong>
          </div>
          <div className="audit-row">
            <span>Dotación exclusiva de Combi Oficial Polarizada:</span>
            <strong>+{secanucas.combiEscort.toLocaleString('es-AR')} u.</strong>
          </div>
          <div className="audit-row">
            <span>Cupo protocolar del Comité Ejecutivo:</span>
            <strong>+{secanucas.committeeQuota.toLocaleString('es-AR')} u.</strong>
          </div>
          {secanucas.emergencyAddition > 0 && (
            <div className="audit-row is-emergency">
              <span>Refuerzo por Resolución en Curso:</span>
              <strong>+{secanucas.emergencyAddition.toLocaleString('es-AR')} u.</strong>
            </div>
          )}
          <div className="audit-row is-total">
            <span>TOTAL DE SECANUCAS A ADQUIRIR:</span>
            <strong>{secanucas.totalHomologated.toLocaleString('es-AR')} UNIDADES</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
