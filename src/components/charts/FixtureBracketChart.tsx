import React from 'react';
import { motion } from 'framer-motion';
import type { BracketData } from '../../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../Icons';
import { OfficialStamp } from '../Stamp';

interface FixtureBracketChartProps {
  bracket: BracketData;
}

export const FixtureBracketChart: React.FC<FixtureBracketChartProps> = ({
  bracket,
}) => {
  return (
    <section className="planner-sheet" aria-labelledby="sec-bracket-title">
      <div className="sheet-header">
        <GoldStarsRow count={3} size={13} />
        <span className="sheet-kicker">ANEXO IV — CUADRO ELIMINATORIO Y DERIVACIÓN</span>
        <h2 id="sec-bracket-title" className="sheet-script-title">
          Fixture &amp; Playoffs
        </h2>
        <AfaStripeDivider />
      </div>

      {bracket.isModifiedByResolution && (
        <div className="sheet-stamp-banner">
          <OfficialStamp
            text="FORMATO MODIFICADO"
            subtext="NUEVA SUPERCOPA AGREGADA"
            variant="gold"
            rotate={3}
          />
        </div>
      )}

      <div className="scroll-hint-bar" aria-hidden="true">
        <span>← DESLIZÁ EL CUADRO DE LLAVES →</span>
      </div>

      {/* Contained horizontal scroll container — never overflows main viewport */}
      <div className="bracket-scroll-viewport">
        <div className="bracket-canvas-grid">
          {/* Column 1: Octavos / Primera Ronda */}
          <div className="bracket-col">
            <div className="bracket-col-header">INSTANCIA PRELIMINAR</div>
            <div className="bracket-matches-stack">
              {bracket.octavos.map((m) => (
                <div
                  key={m.id}
                  className={`bracket-match-card ${m.isVipOrBye ? 'is-bye-match' : ''}`}
                >
                  <span className="match-code">{m.stageCode}</span>
                  <div className="match-slot">{m.slotA}</div>
                  <div className="match-vs-line">VS</div>
                  <div className="match-slot">{m.slotB}</div>
                  <div className="match-footnote">{m.conditionNote}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SVG Connector 1 */}
          <div className="bracket-svg-connector" aria-hidden="true">
            <svg width="36" height="320" viewBox="0 0 36 320" fill="none">
              <path
                d="M0 45 H18 V110 H36 M0 125 H18 M0 200 H18 V255 H36 M0 280 H18"
                stroke="#1A1A1A"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Column 2: Semifinales (En Combi + Pase Directo ★) */}
          <div className="bracket-col">
            <div className="bracket-col-header">SEMIFINALES EN COMBI</div>
            <div className="bracket-matches-stack is-centered">
              {bracket.semifinales.map((s) => (
                <div key={s.id} className="bracket-match-card is-semi-card">
                  <span className="match-code">{s.stageCode}</span>
                  <div className="match-slot">{s.slotA}</div>
                  <div className="match-vs-line">VS</div>
                  <div className="match-slot is-highlighted-slot">{s.slotB}</div>
                  <div className="match-footnote">{s.conditionNote}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SVG Connector 2 */}
          <div className="bracket-svg-connector" aria-hidden="true">
            <svg width="36" height="320" viewBox="0 0 36 320" fill="none">
              <path
                d="M0 110 H18 V165 H36 M0 245 H18 V165"
                stroke="#1A1A1A"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Column 3: Final del Evento (No consagra campeón) */}
          <div className="bracket-col">
            <div className="bracket-col-header">FINAL SIMBÓLICA</div>
            <div className="bracket-matches-stack is-centered">
              <div className="bracket-match-card is-final-simbolica">
                <span className="match-code">{bracket.finalDelEvento.title}</span>
                <div className="match-slot">{bracket.finalDelEvento.contenderA}</div>
                <div className="match-vs-line">VS</div>
                <div className="match-slot is-highlighted-slot">
                  {bracket.finalDelEvento.contenderB}
                </div>
                <p className="final-warning-note">
                  {bracket.finalDelEvento.resolutionNote}
                </p>
              </div>
            </div>
          </div>

          {/* SVG Exit Arrow into External Tournament */}
          <div className="bracket-svg-connector" aria-hidden="true">
            <svg width="46" height="320" viewBox="0 0 46 320" fill="none">
              <path
                d="M0 165 H40 M33 158 L41 165 L33 172"
                stroke="#C9A227"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="22"
                y="148"
                textAnchor="middle"
                fontSize="8"
                fontFamily="Oswald, sans-serif"
                fill="#1A1A1A"
              >
                DERIVA A
              </text>
            </svg>
          </div>

          {/* Column 4: External Tournament where the REAL champion is decided */}
          <div className="bracket-col is-external-col">
            <div className="bracket-col-header is-gold-header">
              TORNEO EXTERNO DEFINITORIO
            </div>
            <div className="bracket-matches-stack is-centered">
              <motion.div layout className="external-cup-box">
                <div className="external-cup-top">
                  <PlannerIcon name="trofeo" size={26} />
                  <GoldStarsRow count={3} size={11} />
                </div>
                <h3 className="external-cup-title">
                  {bracket.externalTournament.cupName}
                </h3>
                <p className="external-cup-sub">
                  {bracket.externalTournament.cupSubtitle}
                </p>
                <ul className="external-cup-list">
                  {bracket.externalTournament.participants.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="external-cup-venue">
                  SEDE: {bracket.externalTournament.venue}
                </div>

                {bracket.externalTournament.extraInstance && (
                  <div className="extra-supercopa-alert">
                    {bracket.externalTournament.extraInstance}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
