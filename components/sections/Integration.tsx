"use client";

import { useRef } from "react";
import {
  Circle,
  Square,
  Triangle,
  Hexagon,
  Diamond,
  Shield,
  Pentagon,
} from "lucide-react";
import { site } from "@/content/site";
import IntegrationMotion from "@/components/motion/IntegrationMotion";

const iconMap = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
  hexagon: Hexagon,
  diamond: Diamond,
  shield: Shield,
  pentagon: Pentagon,
} as const;

// Ordem do arco: v4 é o centro (z-2). Índices dos módulos → v1..v7.
const ARC_ORDER = [0, 1, 2, 3, 4, 5, 6];

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

            {/* Arc fan-out */}
            <div className="wrapper-icons-integration" aria-hidden>
              {ARC_ORDER.map((modIdx, i) => {
                const mod = integration.modules[modIdx];
                const Icon = iconMap[mod.icon as keyof typeof iconMap];
                return (
                  <div
                    key={mod.name}
                    className={`icon-integration v${i + 1}`}
                    aria-label={mod.name}
                  >
                    <div className="image-icon-integration">
                      <Icon strokeWidth={1.6} />
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
