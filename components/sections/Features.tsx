"use client";

import { Circle, Square, Triangle } from "lucide-react";
import { site } from "@/content/site";

const iconMap = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
} as const;

export default function Features() {
  const { features } = site;
  return (
    <section
      id="lab"
      data-features
      className="relative w-full overflow-hidden bg-almost-black-2 py-20 md:py-32"
    >
      <div className="container-fluid">
        <p className="eyebrow mb-6">{features.eyebrow}</p>
        <h2 className="max-w-5xl text-balance">{features.title}</h2>
      </div>

      {/* Tag marquee */}
      <div
        data-features-marquee
        className="relative mt-16 w-full overflow-hidden"
      >
        <div className="flex w-max gap-3 px-[2vw] py-4">
          {[...features.tags, ...features.tags].map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="flex-shrink-0 rounded-full border border-white/[0.08] bg-black-gray px-5 py-2 text-xs uppercase tracking-wide text-light-gray"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Pillars */}
      <div className="container-fluid mt-20 grid grid-cols-1 gap-8 md:mt-32 md:grid-cols-3">
        {features.pillars.map((p) => {
          const Icon = iconMap[p.icon as keyof typeof iconMap];
          return (
            <div
              key={p.label}
              data-feature-pillar
              className="flex flex-col gap-6 border-t border-white/[0.08] pt-8"
            >
              {/* Counter circle (0→100 — animação na Etapa 2) */}
              <div
                data-feature-counter
                className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/[0.08]"
              >
                <Icon className="h-6 w-6 text-blue" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="eyebrow text-blue">{p.label}</span>
                <h4 className="text-balance">{p.title}</h4>
                <p className="text-pretty text-base text-light-gray">
                  {p.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
