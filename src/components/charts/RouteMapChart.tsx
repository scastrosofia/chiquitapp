import React from 'react';
import type { RouteData } from '../../engine/types';
import { AfaStripeDivider, GoldStarsRow } from '../Icons';
import { OfficialStamp } from '../Stamp';

interface RouteMapChartProps {
  route: RouteData;
}

export const RouteMapChart: React.FC<RouteMapChartProps> = ({ route }) => {
  return (
    <section className="planner-sheet" aria-labelledby="sec-route-title">
      <div className="sheet-header">
        <GoldStarsRow count={3} size={13} />
        <span className="sheet-kicker">ANEXO VI — LOGÍSTICA FEDERAL OBLIGATORIA</span>
        <h2 id="sec-route-title" className="sheet-script-title">
          Mapa de Sede &amp; Traslado
        </h2>
        <AfaStripeDivider />
      </div>

      <div className="route-svg-frame">
        <svg
          viewBox="0 0 340 215"
          width="100%"
          className="route-illustration-svg"
          role="img"
          aria-label={`Ruta desde Tu Ciudad hasta ${route.destinationVenue}, Santiago del Estero`}
        >
          {/* Subtle decorative compass & meridian lines */}
          <line x1="20" y1="45" x2="320" y2="45" stroke="#1A1A1A" strokeOpacity="0.07" />
          <line x1="20" y1="110" x2="320" y2="110" stroke="#1A1A1A" strokeOpacity="0.07" />
          <line x1="20" y1="175" x2="320" y2="175" stroke="#1A1A1A" strokeOpacity="0.07" />

          {/* Compass rose top-left */}
          <g transform="translate(38, 36)" stroke="#1A1A1A" strokeWidth="1">
            <circle cx="0" cy="0" r="11" fill="#FFFCF8" />
            <path d="M0 -8 V8 M-8 0 H8" />
            <polygon points="0,-8 -2.5,-2 2.5,-2" fill="#C9A227" stroke="none" />
            <text
              x="0"
              y="-13"
              textAnchor="middle"
              fontSize="7"
              fontFamily="Montserrat, sans-serif"
              fill="#1A1A1A"
              stroke="none"
            >
              N
            </text>
          </g>

          {/* Dotted curved trajectory from bottom-right ("Tu Ciudad") to top-center ("Santiago del Estero") */}
          <path
            d="M 272 178 C 215 170, 195 125, 165 112 C 135 98, 128 66, 102 44"
            fill="none"
            stroke="#75AADB"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.35"
          />
          <path
            d="M 272 178 C 215 170, 195 125, 165 112 C 135 98, 128 66, 102 44"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Origin Marker (Crossed / Reprogrammed) */}
          <g transform="translate(272, 178)">
            <circle cx="0" cy="0" r="6.5" fill="#FFFCF8" stroke="#1A1A1A" strokeWidth="1.4" />
            <line x1="-4" y1="-4" x2="4" y2="4" stroke="#1A1A1A" strokeWidth="1.3" />
            <line x1="4" y1="-4" x2="-4" y2="4" stroke="#1A1A1A" strokeWidth="1.3" />
            <text
              x="-8"
              y="18"
              textAnchor="end"
              fontSize="8.5"
              fontWeight="600"
              fontFamily="Montserrat, sans-serif"
              fill="#1A1A1A"
            >
              TU CIUDAD (CANCELADA)
            </text>
          </g>

          {/* Midpoint Combi Oficial icon along the route */}
          <g transform="translate(154, 102)">
            <rect
              x="-16"
              y="-10"
              width="32"
              height="16"
              rx="3"
              fill="#FFFCF8"
              stroke="#1A1A1A"
              strokeWidth="1.2"
            />
            <rect x="-12" y="-7" width="8" height="5" fill="#1A1A1A" opacity="0.2" />
            <rect x="-2" y="-7" width="8" height="5" fill="#1A1A1A" opacity="0.2" />
            <line x1="-16" y1="2" x2="16" y2="2" stroke="#75AADB" strokeWidth="1.3" />
            <circle cx="-8" cy="6" r="2.6" fill="#1A1A1A" />
            <circle cx="8" cy="6" r="2.6" fill="#1A1A1A" />
            <text
              x="22"
              y="-1"
              fontSize="7.5"
              fontWeight="700"
              fontFamily="Oswald, sans-serif"
              fill="#1A1A1A"
            >
              COMBI OFICIAL EN RUTA
            </text>
            <text
              x="22"
              y="8"
              fontSize="6.8"
              fontFamily="Montserrat, sans-serif"
              fill="#4A4A4A"
            >
              (Acá se define todo)
            </text>
          </g>

          {/* Destination Stadium Marker — Santiago del Estero */}
          <g transform="translate(102, 44)">
            <circle
              cx="0"
              cy="0"
              r="14"
              fill="rgba(201, 162, 39, 0.16)"
              stroke="#C9A227"
              strokeWidth="1.2"
            />
            {/* Circular stadium roof silhouette */}
            <ellipse cx="0" cy="1" rx="9" ry="5.5" fill="#FFFCF8" stroke="#1A1A1A" strokeWidth="1.3" />
            <ellipse cx="0" cy="0" rx="5" ry="2.5" fill="none" stroke="#75AADB" strokeWidth="1" />
            <polygon
              points="0,-19 1.8,-14.5 6.6,-14.2 2.8,-11.2 4,-6.5 0,-9.1 -4,-6.5 -2.8,-11.2 -6.6,-14.2 -1.8,-14.5"
              fill="#C9A227"
            />
            <text
              x="19"
              y="-3"
              fontSize="9.5"
              fontWeight="700"
              fontFamily="Oswald, sans-serif"
              fill="#1A1A1A"
            >
              SANTIAGO DEL ESTERO
            </text>
            <text
              x="19"
              y="8"
              fontSize="7.5"
              fontWeight="600"
              fontFamily="Montserrat, sans-serif"
              fill="#1A1A1A"
            >
              ESTADIO ÚNICO MADRE DE CIUDADES
            </text>
          </g>
        </svg>
      </div>

      <div className="route-metrics-grid">
        <div className="route-metric-cell">
          <span className="metric-label">DISTANCIA HOMOLOGADA</span>
          <strong className="metric-value">{route.distanceKm} KM</strong>
        </div>
        <div className="route-metric-cell">
          <span className="metric-label">TIEMPO ESTIMADO</span>
          <strong className="metric-value is-highlight">NO IMPORTA</strong>
        </div>
      </div>

      <div className="route-stopover-note">
        <strong>ESCALA OBLIGATORIA:</strong> {route.combiStopover}
      </div>

      <div className="sheet-stamp-footer-right">
        <OfficialStamp
          text="SEDE CONFIRMADA"
          subtext="CANCHA NEUTRAL PERPETUA"
          variant="ink"
          rotate={-3}
        />
      </div>

      <p className="planner-legal-footnote">{route.decreeNote}</p>
    </section>
  );
};
