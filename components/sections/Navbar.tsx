"use client";

import { site } from "@/content/site";
import SecondaryButton from "@/components/ui/SecondaryButton";

export default function Navbar() {
  return (
    <header
      data-navbar
      className="fixed inset-x-0 top-0 z-50 w-full"
    >
      <div className="container-fluid flex items-center justify-between py-4 md:py-5">
        <a
          href="#hero"
          className="wrapper-navbar logo text-lg font-medium tracking-tight text-white"
          aria-label="Anqer — voltar ao topo"
        >
          {site.navbar.logo}
        </a>

        <nav
          aria-label="Navegação principal"
          className="wrapper-navbar menu hidden items-center gap-8 md:flex"
        >
          {site.navbar.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm text-light-gray transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <SecondaryButton
          label={site.navbar.cta.label}
          href={site.navbar.cta.href}
        />
      </div>
    </header>
  );
}
