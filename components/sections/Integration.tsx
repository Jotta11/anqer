"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { AnqerSymbol } from "@/components/ui/Logo";
import IntegrationMotion from "@/components/motion/IntegrationMotion";

// Símbolo da Anqer em variações de cor — v4 (centro, frente do baralho)
// fica com o laranja oficial da marca.
const SYMBOL_COLORS = [
  "#3B82F6", // v1 azul
  "#8B5CF6", // v2 roxo
  "#22C55E", // v3 verde
  "#F97316", // v4 laranja (marca)
  "#06B6D4", // v5 ciano
  "#EC4899", // v6 rosa
  "#EAB308", // v7 âmbar
];

/**
 * Integration — seção pinada (tracks integration, 600vh):
 * 7 tiles em arc fan-out (transforms exatos do spec Anim 19).
 * Conforme o scroll: linha vertical desce do tile central e o
 * título aparece com palavras em acento.
 */
export default function Integration() {
  const { integration } = site;
  const scopeRef = useRef<HTMLElement>(null);

  return (
    <section
      id="integration"
      ref={scopeRef}
      className="tracks integration"
    >
      <div className="wrapper-sections">
        <div className="wrapper-frame wrapper-padding">
          <div className="integration-scene">
            {/* Badge */}
            <div className="integration-badge">
              <span className="integration-badge-strong">
                {integration.eyebrow}
              </span>
              <span className="integration-badge-dim">
                {" "}
                --- {integration.status.replace("● ", "")}
              </span>
            </div>

            {/* Arc fan-out (baralho: todos partem de trás do tile central) */}
            <div className="wrapper-icons-integration" aria-hidden>
              {SYMBOL_COLORS.map((color, i) => {
                const mod = integration.modules[i];
                return (
                  <div
                    key={mod.name}
                    className={`icon-integration v${i + 1}`}
                    aria-label={mod.name}
                  >
                    <div className="image-icon-integration">
                      <AnqerSymbol color={color} />
                    </div>
                  </div>
                );
              })}
              {/* Linha vertical que desce do tile central */}
              <div className="integration-line" />
            </div>

            {/* Título (aparece no 2º estágio do pin) */}
            <div className="wrapper-title-integration">
              <h3 className="integration-title">
                Sistemas <span className="accent">conectados</span>.{" "}
                Inteligência <span className="accent">unificada</span>.
              </h3>
              <p className="integration-desc">{integration.description}</p>
            </div>
          </div>
        </div>
      </div>

      <IntegrationMotion scope={scopeRef} />
    </section>
  );
}
