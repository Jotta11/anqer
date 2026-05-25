"use client";

import { site } from "@/content/site";
import MainButton from "@/components/ui/MainButton";

export default function FinalCTA() {
  const { finalCta } = site;
  return (
    <section
      id="contact"
      data-final-cta
      className="relative w-full overflow-hidden bg-almost-black py-32 md:py-48"
    >
      <div className="container-fluid flex flex-col items-center text-center">
        <p className="eyebrow mb-6">{finalCta.eyebrow}</p>
        <h1 className="max-w-5xl text-balance" data-final-cta-headline>
          {finalCta.title}
        </h1>
        <div className="mt-12">
          <MainButton
            label={finalCta.cta.label}
            href={finalCta.cta.href}
            data-magnetic-button
          />
        </div>
      </div>
    </section>
  );
}
