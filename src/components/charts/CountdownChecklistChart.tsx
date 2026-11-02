import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';
import type { CountdownMonthBlock } from '../../engine/types';
import { AfaStripeDivider, GoldStarsRow } from '../Icons';

interface CountdownChecklistChartProps {
  blocks: CountdownMonthBlock[];
}

export const CountdownChecklistChart: React.FC<CountdownChecklistChartProps> = ({
  blocks,
}) => {
  const [customChecks, setCustomChecks] = useState<Record<string, boolean>>({});

  const isChecked = (id: string, defaultVal: boolean): boolean => {
    return id in customChecks ? customChecks[id] : defaultVal;
  };

  const toggleCheck = (id: string, defaultVal: boolean) => {
    soundEngine.unlockFromGesture();
    soundEngine.playStamp();
    const current = isChecked(id, defaultVal);
    setCustomChecks((prev) => ({ ...prev, [id]: !current }));
  };

  return (
    <section className="planner-sheet" aria-labelledby="sec-countdown-title">
      <div className="sheet-header">
        <GoldStarsRow count={3} size={13} />
        <span className="sheet-kicker">ANEXO II — CUENTA REGRESIVA & CONTROL</span>
        <h2 id="sec-countdown-title" className="sheet-script-title">
          Countdown &amp; Checklist
        </h2>
        <AfaStripeDivider />
      </div>

      <div className="countdown-table-frame">
        {blocks.map((block) => (
          <div key={block.periodLabel} className="countdown-period-block">
            <div className="countdown-period-header">
              <span className="period-months">{block.periodLabel}</span>
              <span className="period-anexo-badge">{block.anexoCode}</span>
            </div>

            <ul className="countdown-task-list">
              {block.tasks.map((task) => {
                const checked = isChecked(task.id, task.checkedByDefault);
                return (
                  <li key={task.id} className="countdown-task-row">
                    <button
                      type="button"
                      className={`planner-checkbox-btn ${checked ? 'is-checked' : ''}`}
                      onClick={() => toggleCheck(task.id, task.checkedByDefault)}
                      aria-pressed={checked}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect
                          x="1.5"
                          y="1.5"
                          width="15"
                          height="15"
                          rx="1.5"
                          stroke="#1A1A1A"
                          strokeWidth="1.2"
                          fill={checked ? 'rgba(117, 170, 219, 0.16)' : '#FFFCF8'}
                        />
                        {checked && (
                          <path
                            d="M4.2 9.2l3.1 3.2 6.5-7"
                            stroke="#1A1A1A"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                      </svg>
                      <span
                        className={`task-label-text ${
                          task.isInstitutional ? 'is-institutional-task' : ''
                        }`}
                      >
                        {task.text}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
