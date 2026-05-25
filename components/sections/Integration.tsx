"use client";

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

const iconMap = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
  hexagon: Hexagon,
  diamond: Diamond,
  shield: Shield,
  pentagon: Pentagon,
} as const;

export default function Integration() {
  const { integration } = site;
  return (
    <section
      id="integration"
      data-integration
      className="relative w-full overflow-hidden bg-almost-black py-20 md:py-32"
    >
      <div className="container-fluid">
        <div className="mb-6 flex items-center gap-4">
          <p className="eyebrow">{integration.eyebrow}</p>
          <span className="text-xs uppercase tracking-wide text-blue">
            {integration.status}
          </span>
        </div>
        <h2 className="max-w-5xl text-balance">{integration.title}</h2>
        <p className="mt-6 max-w-2xl text-pretty text-base text-light-gray md:text-lg">
          {integration.description}
        </p>
      </div>

      {/* Arc fan-out de ícones (animação na Etapa 2) */}
      <div
        data-integration-arc
        className="container-fluid relative mt-20 flex h-[40vw] min-h-[300px] max-h-[520px] items-end justify-center md:mt-28"
      >
        {integration.modules.map((mod, i) => {
          const Icon = iconMap[mod.icon as keyof typeof iconMap];
          const total = integration.modules.length;
          const angle = -75 + (150 / (total - 1)) * i; // -75° → +75°
          return (
            <div
              key={mod.name}
              data-integration-module
              data-module-index={i}
              className="absolute bottom-0 origin-bottom"
              style={{
                transform: `rotate(${angle}deg) translateY(-30vw)`,
              }}
            >
              <div
                className="flex flex-col items-center gap-2"
                style={{ transform: `rotate(${-angle}deg)` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-black-gray">
                  <Icon className="h-6 w-6 text-blue" strokeWidth={1.5} />
                </div>
                <span className="text-xs uppercase tracking-wide text-light-gray">
                  {mod.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
