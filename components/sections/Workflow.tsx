"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import WorkflowMotion from "@/components/motion/WorkflowMotion";

/**
 * Workflow — pinned scroll section (1200vh), 2 colunas:
 *
 *   ESQUERDA (wrapper-workflows)               DIREITA (wrapper-workflows.v2)
 *   ┌──────────────────────────────┐           ┌─────────────────────┐
 *   │  [FLUXO > > > ETAPA [0X]]    │ (badge)   │     [iso v1]        │
 *   │                              │           │      [iso v2]       │
 *   │  │  01  Descoberta           │           │       [iso v3]      │
 *   │  │      lorem ipsum...       │           │        [iso v4]     │
 *   │  │                           │           │                     │
 *   │  │  (cycle pelos 4 steps)    │           │                     │
 *   │  │                           │           │                     │
 *   │  (image-line dashed)         │           │                     │
 *   └──────────────────────────────┘           └─────────────────────┘
 *
 * 4 states cyclam conforme o scroll. Cada state mostra um block-flow
 * (número + título + descrição) e ativa o block-image-workflow correspondente.
 */
export default function Workflow() {
  const { workflow } = site;
  const scopeRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={scopeRef}
      id="workflow"
      className="tracks workflow"
    >
      <div className="wrapper-sections">
        <div className="wrapper-frame">
          <div className="main-container w-container">
            <div className="wrapper-workflow">
              {/* Background image + overlay */}
              <div className="bg-workflow" aria-hidden>
                <div className="image-bg-workflow" />
                <div className="bg-overlay" />
              </div>

              {/* LEFT: badge + dashed line + 4 cycling step blocks */}
              <div className="wrapper-workflows">
                {/* Badge: FLUXO > > > ETAPA [01] */}
                <div className="block-title-flow">
                  <div className="badge">
                    <div className="scramble secondary">
                      {workflow.badge.left}
                    </div>
                    <div className="block-title-workflow-animation" aria-hidden>
                      <div className="text-secondary animated">&gt;</div>
                      <div className="text-secondary animated">&gt;</div>
                      <div className="text-secondary animated">&gt;</div>
                    </div>
                    <div className="scramble v1">{workflow.badge.right}</div>
                    <div className="scramble secondary badge-state">[01]</div>
                  </div>
                </div>

                {/* Dashed connector line */}
                <div className="image-line" aria-hidden />

                {/* 4 cycling step blocks — absolutamente posicionados,
                    todos no mesmo lugar. Cycle motion mostra um por vez. */}
                {workflow.steps.map((step, i) => (
                  <div key={step.number} className={`block-flow v${i + 1}`}>
                    <div className="block-flow-number">{step.number}</div>
                    <div className="block-content-flow">
                      <div className="medium-big-text color-gradient">
                        {step.title}
                      </div>
                      <div className="block-desc-content-flow">
                        <div className={`text-secondary animated-v${i + 1}`}>
                          {step.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT: 4 iso blocks stacked diagonally */}
              <div className="wrapper-workflows v2">
                <div className="block-card-workflow">
                  {[1, 2, 3, 4].map((v) => (
                    <div
                      key={v}
                      className={`block-image-workflow v${v}`}
                    >
                      <div className="block-image-workflow-base" aria-hidden />
                      <div
                        className={`icon-workflow v${v}`}
                        aria-hidden
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll trigger zones */}
      <div className="trigger-wrapper-v3" aria-hidden>
        <div className="trigger-workflow v1" />
        <div className="trigger-workflow v2" />
        <div className="trigger-workflow v3" />
        <div className="trigger-workflow v4" />
      </div>

      <WorkflowMotion scope={scopeRef} />
    </section>
  );
}
