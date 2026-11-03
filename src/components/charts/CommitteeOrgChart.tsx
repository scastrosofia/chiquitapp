import React from 'react';
import { COPY } from '../../content/copy';
import type { CommitteeMemberNode } from '../../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../Icons';
import { OfficialStamp } from '../Stamp';

interface CommitteeOrgChartProps {
  committee: CommitteeMemberNode[];
}

export const CommitteeOrgChart: React.FC<CommitteeOrgChartProps> = ({
  committee,
}) => {
  const presidencia = committee.find((c) => c.tier === 'presidencia');
  const secretarias = committee.filter((c) => c.tier === 'secretaria');
  const subcomisiones = committee.filter((c) => c.tier === 'subcomision');

  return (
    <section className="planner-sheet" aria-labelledby="sec-org-title">
      <div className="sheet-header">
        <GoldStarsRow count={3} size={13} />
        <span className="sheet-kicker">{COPY.charts.committee.kicker}</span>
        <h2 id="sec-org-title" className="sheet-script-title">
          {COPY.charts.committee.title}
        </h2>
        <AfaStripeDivider />
      </div>

      <div className="org-hierarchy-wrapper">
        {presidencia && (
          <div className="org-node org-tier-presidencia">
            <div className="org-node-icon">
              <PlannerIcon name="selloOficial" size={24} />
            </div>
            <div className="org-role">{presidencia.role}</div>
            <div className="org-dept">{presidencia.department}</div>
            <span className="org-vote-pill">{presidencia.resolutionVote}</span>
          </div>
        )}

        {/* SVG Tree Connector */}
        <div className="org-tree-svg" aria-hidden="true">
          <svg width="240" height="28" viewBox="0 0 240 28" fill="none">
            <path
              d="M120 0 V14 M60 14 H180 M60 14 V28 M180 14 V28"
              stroke="#1A1A1A"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        <div className="org-two-cols">
          {secretarias.map((sec) => (
            <div key={sec.id} className="org-node org-tier-secretaria">
              <div className="org-role">{sec.role}</div>
              <div className="org-dept">{sec.department}</div>
              <span className="org-vote-pill">{sec.resolutionVote}</span>
            </div>
          ))}
        </div>

        {/* SVG Tree Connector 2 */}
        <div className="org-tree-svg" aria-hidden="true">
          <svg width="240" height="26" viewBox="0 0 240 26" fill="none">
            <path
              d="M60 0 V12 M180 0 V12 M35 12 H205 M120 12 V26"
              stroke="#75AADB"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        <div className="org-sub-stack">
          {subcomisiones.map((sub) => (
            <div key={sub.id} className="org-node org-tier-subcomision">
              <div className="org-sub-row">
                <div className="org-role">{sub.role}</div>
                <span className="org-vote-pill">{sub.resolutionVote}</span>
              </div>
              <div className="org-dept">{sub.department}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sheet-stamp-footer-center">
        <OfficialStamp
          text={COPY.charts.committee.stampUnanimous}
          subtext={COPY.charts.committee.stampUnanimousSub}
          variant="gold"
          rotate={-2}
        />
      </div>
    </section>
  );
};
