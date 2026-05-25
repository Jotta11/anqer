"use client";

import { site } from "@/content/site";

export default function Footer() {
  const { footer } = site;
  return (
    <footer
      data-footer
      className="relative w-full overflow-hidden bg-almost-black-2 pt-20 md:pt-32"
    >
      <div className="container-fluid grid grid-cols-2 gap-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <a href="#top" className="text-2xl font-medium tracking-tight">
            {footer.logo}
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h6 className="text-sm uppercase tracking-wide text-gray">
            {footer.columns.explore.title}
          </h6>
          <ul className="flex flex-col gap-2">
            {footer.columns.explore.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-light-gray transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h6 className="text-sm uppercase tracking-wide text-gray">
            {footer.columns.utilities.title}
          </h6>
          <ul className="flex flex-col gap-2">
            {footer.columns.utilities.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-light-gray transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h6 className="text-sm uppercase tracking-wide text-gray">
              {footer.columns.sayHello.title}
            </h6>
            <a
              href={`mailto:${footer.columns.sayHello.value}`}
              className="text-sm text-light-gray transition-colors hover:text-white"
            >
              {footer.columns.sayHello.value}
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="text-sm uppercase tracking-wide text-gray">
              {footer.columns.contact.title}
            </h6>
            <span className="text-sm text-light-gray">
              {footer.columns.contact.value}
            </span>
          </div>
        </div>
      </div>

      {/* Mega-logo (placeholder grande) */}
      <div
        data-footer-mega-logo
        aria-hidden
        className="container-fluid mt-16 pb-8 md:mt-24"
      >
        <div className="text-[20vw] font-medium leading-none tracking-tight text-white/[0.04]">
          {footer.logo}
        </div>
      </div>

      <div className="container-fluid border-t border-white/[0.06] py-6 text-xs text-gray">
        {footer.copyright}
      </div>
    </footer>
  );
}
