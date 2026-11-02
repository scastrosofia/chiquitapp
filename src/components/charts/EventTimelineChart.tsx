import React from 'react';
import { motion } from 'framer-motion';
import type { TimelineMilestone } from '../../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../Icons';
import { OfficialStamp } from '../Stamp';

interface EventTimelineChartProps {
  milestones: TimelineMilestone[];
  hostsScriptTitle: string;
  eventDateCaption: string;
  isModified: boolean;
}

/**
 * Editorial Wedding-Planner Horizontal Event Timeline.
 * Groups milestones in rows of 3 connected by a crisp horizontal SVG track
 * with icon above, bold hour, and small uppercase description below.
 */
export const EventTimelineChart: React.FC<EventTimelineChartProps> = ({
  milestones,
  hostsScriptTitle,
  eventDateCaption,
  isModified,
}) => {
  // Chunk into rows of 3 so every row renders a clean horizontal line on 375-430px mobile
  const rows: TimelineMilestone[][] = [];
  for (let i = 0; i < milestones.length; i += 3) {
    rows.push(milestones.slice(i, i + 3));
  }

  return (
    <section className="planner-sheet" aria-labelledby="sec-timeline-title">
      <div className="sheet-header">
        <GoldStarsRow count={3} size={13} />
        <span className="sheet-kicker">ANEXO I — CRONOGRAMA HOMOLOGADO</span>
        <h2 id="sec-timeline-title" className="sheet-script-title">
          Cronograma del Evento
        </h2>
        <AfaStripeDivider />
      </div>

      {isModified && (
        <div className="sheet-stamp-banner">
          <OfficialStamp
            text="FORMATO MODIFICADO"
            subtext="HORARIOS SUJETOS A COMBI"
            variant="gold"
            rotate={-3}
          />
        </div>
      )}

      <div className="timeline-serpentine-wrapper">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="timeline-row-block">
            <div className="timeline-horizontal-track-container">
              {/* Horizontal SVG connector line with endpoints */}
              <svg
                className="timeline-row-svg-line"
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="28"
                  y1="8"
                  x2="272"
                  y2="8"
                  stroke="#1A1A1A"
                  strokeWidth="1.1"
                />
                <line
                  x1="28"
                  y1="11"
                  x2="272"
                  y2="11"
                  stroke="#75AADB"
                  strokeWidth="0.9"
                />
              </svg>

              <div
                className="timeline-nodes-grid"
                style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
              >
                {row.map((ms) => (
                  <motion.div
                    layout
                    key={ms.id}
                    className={`timeline-node-item ${
                      ms.highlightType ? `is-${ms.highlightType}` : ''
                    }`}
                  >
                    <div className="timeline-icon-wrap">
                      <PlannerIcon
                        name={ms.icon}
                        size={26}
                        strokeColor={
                          ms.highlightType === 'vip_campeones' ? '#A48115' : '#1A1A1A'
                        }
                      />
                    </div>
                    <div className="timeline-dot-marker" aria-hidden="true" />
                    <div className="timeline-hour">{ms.time}</div>
                    <div className="timeline-node-title">{ms.title}</div>
                    <p className="timeline-node-desc">{ms.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {rowIdx < rows.length - 1 && (
              <div className="timeline-row-connector" aria-hidden="true">
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
                  <path
                    d="M12 1v17M7 14l5 5 5-5"
                    stroke="#75AADB"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="timeline-signature-footer">
        <div className="signature-divider-ornament" aria-hidden="true">
          <span />
          <GoldStarsRow count={1} size={13} />
          <span />
        </div>
        <div className="signature-script-names">{hostsScriptTitle}</div>
        <div className="signature-date-caps">{eventDateCaption}</div>
      </div>
    </section>
  );
};
