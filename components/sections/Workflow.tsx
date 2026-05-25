"use client";

import { site } from "@/content/site";

export default function Workflow() {
  const { workflow } = site;
  return (
    <section
      id="workflow"
      data-workflow
      className="relative w-full overflow-hidden bg-almost-black py-20 md:py-32"
    >
      <div className="container-fluid">
        <p className="eyebrow mb-6">{workflow.eyebrow}</p>
        <h2 className="max-w-5xl text-balance">{workflow.title}</h2>
      </div>

      <div className="container-fluid relative mt-16 md:mt-24">
        {/* Linha tracejada conectora (placeholder, animação stroke-dashoffset na Etapa 2) */}
        <div
          aria-hidden
          data-workflow-connector
          className="absolute left-0 right-0 top-12 hidden h-px md:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.18) 50%, transparent 50%)",
            backgroundSize: "12px 1px",
            backgroundRepeat: "repeat-x",
          }}
        />

        <ol className="relative grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
          {workflow.steps.map((step) => (
            <li
              key={step.number}
              data-workflow-step
              className="relative flex flex-col gap-4"
            >
              {/* Bloco isométrico (placeholder) */}
              <div
                data-iso-block
                className="flex h-24 w-24 items-center justify-center rounded-xl bg-almost-black-2 ring-1 ring-white/[0.06]"
              >
                <span className="text-xl font-medium text-blue">
                  {step.number}
                </span>
              </div>
              <h4 className="text-balance">{step.title}</h4>
              <p className="text-pretty text-base text-light-gray">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
