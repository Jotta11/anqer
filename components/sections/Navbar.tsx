"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import Logo from "@/components/ui/Logo";
import SecondaryButton from "@/components/ui/SecondaryButton";
import NavbarMotion from "@/components/motion/NavbarMotion";

export default function Navbar() {
  const scopeRef = useRef<HTMLElement>(null);
  return (
    <header
      data-navbar
      ref={scopeRef}
      className="fixed inset-x-0 top-0 z-50 w-full"
    >
      {/* Grupo centralizado de pills glass (layout Quantara) */}
      <div className="flex items-stretch justify-center gap-3 px-4 pt-4 md:pt-5">
        <a
          href="#hero"
          className="wrapper-navbar logo flex items-center rounded-full border border-white/[0.06] bg-black/40 px-5 py-2.5 backdrop-blur-md"
          aria-label="Anqer Technology — voltar ao topo"
        >
          <Logo variant="lockup" className="text-[1.05rem]" />
        </a>

        <nav
          aria-label="Navegação principal"
          className="wrapper-navbar menu hidden items-center gap-1 rounded-full border border-white/[0.06] bg-black/40 py-1.5 pl-4 pr-1.5 backdrop-blur-md md:flex"
        >
          {site.navbar.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link px-3 py-2 text-sm text-light-gray transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.navbar.cta.href}
            className="ml-3 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium leading-none text-black transition-colors duration-300 hover:bg-blue hover:text-white"
          >
            {site.navbar.cta.label}
          </a>
        </nav>

        <SecondaryButton
          label={site.navbar.cta.label}
          href={site.navbar.cta.href}
          className="md:hidden"
        />
      </div>
      <NavbarMotion scope={scopeRef} />
    </header>
  );
}
