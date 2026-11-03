import React from 'react';
import { COPY } from '../../content/copy';
import type { StandingsData } from '../../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../Icons';
import { OfficialStamp } from '../Stamp';

interface StandingsPromediosChartProps {
  standings: StandingsData;
}

export const StandingsPromediosChart: React.FC<StandingsPromediosChartProps> = ({
  standings,
}) => {
  return (
    <section className="planner-sheet" aria-labelledby="sec-standings-title">
      <div className="sheet-header">
        <GoldStarsRow count={3} size={13} />
        <span className="sheet-kicker">{COPY.charts.ranking.kicker}</span>
        <h2 id="sec-standings-title" className="sheet-script-title">
          {COPY.charts.ranking.title}
        </h2>
        <AfaStripeDivider />
      </div>

      {/* Mid-event Prize Banner */}
      <div className="liga-mid-banner">
        <PlannerIcon name="trofeo" size={26} />
        <div>
          <span className="liga-kicker">
            {COPY.charts.ranking.midEventKicker}
          </span>
          <p>{standings.midEventChampionDeclaration}</p>
        </div>
      </div>

      <div className="standings-table-container">
        <table className="planner-standings-table">
          <thead>
            <tr>
              <th>{COPY.charts.ranking.thPos}</th>
              <th>{COPY.charts.ranking.thSector}</th>
              <th>{COPY.charts.ranking.thEvents}</th>
              <th>{COPY.charts.ranking.thPoints}</th>
              <th>{COPY.charts.ranking.thLevel}</th>
            </tr>
          </thead>
          <tbody>
            {standings.rows.map((row) => {
              const isRelegated = row.status === 'descenso_anulado';
              const isChamp = row.status === 'campeon_liga';
              return (
                <tr
                  key={row.pos}
                  className={`standing-row status-${row.status}`}
                >
                  <td className="col-pos">
                    {isChamp ? '★' : row.pos}
                  </td>
                  <td className="col-sector">
                    <span className={isRelegated ? 'crossed-relegation-text' : ''}>
                      {row.sectorName}
                    </span>
                    {row.badge && (
                      <span className="row-inline-badge">{row.badge}</span>
                    )}
                  </td>
                  <td className="col-num">{row.pj}</td>
                  <td className="col-num is-bold">{row.pts}</td>
                  <td className={`col-num ${isRelegated ? 'crossed-relegation-text' : ''}`}>
                    {row.promedio}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="relegation-stamp-overlay">
          <OfficialStamp
            text={COPY.charts.ranking.stampRelegationAnulada}
            subtext={COPY.charts.ranking.stampRelegationAnuladaSub}
            variant="alert"
            rotate={-5}
          />
        </div>
      </div>

      <p className="planner-legal-footnote">{standings.relegationFootnote}</p>
    </section>
  );
};
