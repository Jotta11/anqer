"use client";

import { site } from "@/content/site";

export default function Ecosystem() {
  const { ecosystem } = site;
  return (
    <section
      id="ecosystem"
      data-ecosystem
      className="relative w-full overflow-hidden bg-almost-black-2 py-20 md:py-32"
    >
      <div className="container-fluid">
        <p className="eyebrow mb-6">{ecosystem.eyebrow}</p>
        <h2 className="max-w-4xl text-balance">{ecosystem.title}</h2>
      </div>

      {/* Marquee placeholder (animação loop infinito na Etapa 2) */}
      <div
        data-ecosystem-marquee
        className="relative mt-16 w-full overflow-hidden md:mt-24"
      >
        <div className="flex w-max gap-16 px-[2vw] py-6">
          {[...ecosystem.logos, ...ecosystem.logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex h-16 w-40 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-black-gray text-sm text-gray"
              aria-label={logo.name}
            >
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
