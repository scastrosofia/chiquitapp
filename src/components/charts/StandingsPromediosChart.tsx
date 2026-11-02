import React from 'react';
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
        <span className="sheet-kicker">ANEXO V — COEFICIENTE TRIENAL DE ASISTENCIA</span>
        <h2 id="sec-standings-title" className="sheet-script-title">
          Tabla Anual y Promedios
        </h2>
        <AfaStripeDivider />
      </div>

      {/* Mid-event Liga Champion Callout */}
      <div className="liga-mid-banner">
        <PlannerIcon name="trofeo" size={26} />
        <div>
          <span className="liga-kicker">
            TÍTULO CREADO Y ENTREGADO CON EL EVENTO EN CURSO:
          </span>
          <p>{standings.midEventChampionDeclaration}</p>
        </div>
      </div>

      <div className="standings-table-container">
        <table className="planner-standings-table">
          <thead>
            <tr>
              <th>#</th>
              <th>SECTOR / INVITADOS</th>
              <th>PJ</th>
              <th>PTS</th>
              <th>PROM.</th>
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
            text="DESCENSOS ANULADOS"
            subtext="POR ESTA ÚNICA VEZ"
            variant="alert"
            rotate={-5}
          />
        </div>
      </div>

      <p className="planner-legal-footnote">{standings.relegationFootnote}</p>
    </section>
  );
};
