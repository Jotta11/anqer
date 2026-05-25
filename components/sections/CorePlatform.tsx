"use client";

import { site } from "@/content/site";
import Card from "@/components/ui/Card";

export default function CorePlatform() {
  const { corePlatform } = site;
  return (
    <section
      id="product"
      data-core-platform
      className="relative w-full overflow-hidden bg-almost-black py-20 md:py-32"
    >
      <div className="container-fluid">
        <p className="eyebrow mb-6">{corePlatform.eyebrow}</p>
        <h2 className="max-w-5xl text-balance">
          <span className="block">{corePlatform.title_line1}</span>
          <span className="block text-gray">{corePlatform.title_line2}</span>
        </h2>
      </div>

      <div className="container-fluid mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-2">
        {corePlatform.items.map((item) => (
          <Card
            key={item.number}
            data-core-card
            className="flex flex-col gap-6"
          >
            {/* Header com número + label */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray">{item.number}</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-light-gray">
                {item.label}
              </span>
            </div>

            {/* Visual area (blocos isométricos + ícone 3D — placeholder) */}
            <div
              data-iso-block
              className="relative flex aspect-[16/10] w-full items-center justify-center rounded-xl bg-almost-black-2"
              style={{
                paddingTop: "var(--padding-top-wrap-block-product)",
              }}
            >
              <div
                data-iso-icon
                className="h-16 w-16 rounded-lg bg-blue/20 ring-1 ring-blue/40"
                style={{ padding: "var(--padding-icon-product)" }}
              />
            </div>

            {/* Texto */}
            <div className="flex flex-col gap-3">
              <h3 className="text-balance">{item.title}</h3>
              <p className="text-pretty text-base text-light-gray">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
