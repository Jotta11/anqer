"use client";

import { useRef } from "react";
import { TriangleAlert } from "lucide-react";
import { site } from "@/content/site";
import LabMotion from "@/components/motion/LabMotion";

// Posições determinísticas dos pontos do scatter (antes: dispersos / depois: na linha)
const SCATTER_BEFORE = [
  [12, 62], [20, 38], [27, 70], [33, 30], [40, 55], [46, 24], [52, 66],
  [58, 42], [64, 20], [70, 58], [76, 34], [82, 64], [88, 28], [24, 52],
  [36, 44], [61, 50], [74, 46], [85, 48], [16, 26], [48, 36],
];
const SCATTER_AFTER = SCATTER_BEFORE.map(([x], i) => [
  x,
  74 - x * 0.55 + (i % 3) * 3,
]);

/**
 * Lab — seção pinada (tracks lab, 800vh) espelhando o Quantara:
 * headline "De Manual [toggle] Inteligente" + 4 cards de dashboard que
 * se "atualizam" conforme o scroll (estado manual → inteligente).
 */
export default function Lab() {
  const { lab } = site.features;
  const scopeRef = useRef<HTMLElement>(null);

  return (
    <section id="lab" ref={scopeRef} className="tracks lab">
      <div className="wrapper-sections">
        <div className="wrapper-frame wrapper-padding">
          <div className="lab-scene">
            {/* Headline com toggle */}
            <div className="lab-headline" data-lab-headline>
              <span className="lab-word">{lab.headline.pre}</span>{" "}
              <span className="lab-word strong">{lab.headline.strong}</span>
              <span className="lab-toggle" aria-hidden>
                <span className="lab-toggle-knob" />
              </span>
              <span className="lab-word dim">{lab.headline.post}</span>
            </div>

            {/* Cards */}
            <div className="lab-cards">
              {/* 1 — Gargalo Detectado (donut) */}
              <article className="lab-card v1">
                <header className="lab-card-header">
                  <span className="lab-title-strong">
                    {lab.bottleneck.title_strong}
                  </span>{" "}
                  <span className="lab-title-dim">
                    {lab.bottleneck.title_dim}
                  </span>
                </header>
                <div className="lab-donut" aria-hidden>
                  <svg viewBox="0 0 100 100">
                    {[0, 1, 2, 3].map((s) => (
                      <circle
                        key={s}
                        className={`lab-donut-seg s${s}`}
                        cx="50"
                        cy="50"
                        r="34"
                        fill="none"
                        strokeWidth="16"
                        strokeDasharray="47 166.6"
                        transform={`rotate(${s * 90 + 4} 50 50)`}
                      />
                    ))}
                  </svg>
                </div>
                <footer className="lab-card-footer">
                  <TriangleAlert className="lab-footer-icon" aria-hidden />
                  <span className="lab-status-swap">
                    <span className="lab-status before">
                      {lab.bottleneck.before}
                    </span>
                    <span className="lab-status after">
                      {lab.bottleneck.after}
                    </span>
                  </span>
                </footer>
              </article>

              {/* 2 — Eficiência do Processo (%) */}
              <article className="lab-card v2">
                <header className="lab-card-header plain">
                  <span className="lab-title-strong">
                    {lab.efficiency.title_strong}
                  </span>{" "}
                  <span className="lab-title-dim">
                    {lab.efficiency.title_dim}
                  </span>
                </header>
                <div className="lab-eff-row">
                  <span className="lab-eff-number">{lab.efficiency.from}</span>
                  <span className="lab-eff-percent">%</span>
                  <span className="lab-chip neutral">{lab.efficiency.chip}</span>
                </div>
              </article>

              {/* 3 — Pipeline (status chips) */}
              <article className="lab-card v3">
                <ul className="lab-pipeline">
                  {lab.pipeline.rows.map((row, i) => (
                    <li key={row} className={`lab-pipeline-row r${i}`}>
                      <span className="lab-pipeline-name">{row}</span>
                      {i === 1 ? (
                        <span className="lab-chip-swap">
                          <span className="lab-chip failed">
                            {lab.pipeline.failed}
                          </span>
                          <span className="lab-chip success after">
                            {lab.pipeline.success}
                          </span>
                        </span>
                      ) : (
                        <span className="lab-chip success">
                          {lab.pipeline.success}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <footer className="lab-card-footer plain">
                  {lab.pipeline.footer}
                </footer>
              </article>

              {/* 4 — Dispersão (scatter) */}
              <article className="lab-card v4">
                <header className="lab-card-header center">
                  <span className="lab-title-dim lab-scatter-title">
                    {lab.scatter.title}
                  </span>
                </header>
                <div className="lab-scatter" aria-hidden>
                  <svg viewBox="0 0 100 80">
                    <g className="lab-scatter-grid" stroke="rgba(255,255,255,0.06)">
                      {[16, 32, 48, 64].map((y) => (
                        <line key={y} x1="4" y1={y} x2="96" y2={y} />
                      ))}
                    </g>
                    <g className="lab-scatter-before">
                      {SCATTER_BEFORE.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="1.6" />
                      ))}
                    </g>
                    <g className="lab-scatter-after">
                      <line
                        className="lab-trend"
                        x1="8"
                        y1="70"
                        x2="94"
                        y2="22"
                      />
                      {SCATTER_AFTER.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="1.6" />
                      ))}
                    </g>
                  </svg>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <LabMotion scope={scopeRef} />
    </section>
  );
}
