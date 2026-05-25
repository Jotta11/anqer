"use client";

import { Circle, Square, Triangle } from "lucide-react";
import { site } from "@/content/site";

const iconMap = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
} as const;

export default function Hero() {
  const { hero } = site;
  return (
    <section
      id="top"
      data-hero
      className="relative min-h-screen w-full overflow-hidden bg-almost-black pt-32 md:pt-40"
    >
      {/* Orbits (placeholder estático — animação na Etapa 2) */}
      <div
        aria-hidden
        data-hero-orbits
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="relative aspect-square w-[140vw] max-w-none md:w-[120vw]"
          style={{ marginLeft: "var(--overflow-orbit)" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              data-hero-orbit
              data-orbit-index={i}
              className="absolute inset-0 rounded-full border border-white/[0.06]"
              style={{
                transform: `scale(${1 - i * 0.18})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Top meta bar (location / contact) */}
      <div className="container-fluid relative z-10 flex items-start justify-between text-xs">
        <div>
          <p className="eyebrow mb-1">{hero.location.label}</p>
          <p className="text-light-gray">{hero.location.value}</p>
        </div>
        <div className="text-right">
          <p className="eyebrow mb-1">{hero.contact.label}</p>
          <p className="text-light-gray">{hero.contact.value}</p>
        </div>
      </div>

      {/* Headline */}
      <div className="container-fluid relative z-10 mt-16 md:mt-24">
        <h1 className="text-balance" data-hero-headline>
          <span className="block">{hero.headline_line1}</span>
          <span className="block text-gray">{hero.headline_line2}</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-light-gray md:text-lg">
          {hero.subline}
        </p>
      </div>

      {/* Principles row (scramble labels — placeholder) */}
      <div className="container-fluid relative z-10 mt-20 flex flex-wrap items-center gap-6 pb-16 md:gap-12 md:pb-24">
        {hero.principles.map((p) => {
          const Icon = iconMap[p.icon as keyof typeof iconMap];
          return (
            <div
              key={p.label}
              data-hero-principle
              className="flex items-center gap-3"
            >
              <Icon className="h-4 w-4 text-blue" strokeWidth={1.5} />
              <span className="eyebrow text-white" data-scramble-text>
                {p.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
