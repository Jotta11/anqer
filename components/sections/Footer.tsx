"use client";

import { site } from "@/content/site";
import { AnqerSymbol } from "@/components/ui/Logo";

/**
 * Footer claro (reveal) — fixo atrás do conteúdo; o CTA escuro sobe e o
 * revela (padrão Quantara). O spacer em fluxo garante o scroll extra.
 */
export default function Footer() {
  const { footer } = site;
  return (
    <>
      <div className="footer-spacer" aria-hidden />
      <footer data-footer className="wrapper-footer anchor">
        <div className="footer-inner">
          <div className="footer-columns">
            <div className="footer-col">
              <h6 className="footer-col-title">
                {footer.columns.explore.title}
              </h6>
              <ul>
                {footer.columns.explore.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h6 className="footer-col-title">
                {footer.columns.utilities.title}
              </h6>
              <ul>
                {footer.columns.utilities.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col right">
              <div className="footer-contact-block">
                <h6 className="footer-col-title">
                  {footer.columns.sayHello.title}
                </h6>
                <a
                  className="footer-contact-value"
                  href={`mailto:${footer.columns.sayHello.value}`}
                >
                  {footer.columns.sayHello.value}
                </a>
              </div>
              <div className="footer-contact-block">
                <h6 className="footer-col-title">
                  {footer.columns.contact.title}
                </h6>
                <span className="footer-contact-value">
                  {footer.columns.contact.value}
                </span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-mega-logo" aria-label="Anqer Technology">
              <AnqerSymbol className="footer-mega-symbol" />
              <span className="footer-mega-wordmark">Anqer</span>
            </div>
            <div className="footer-copyright">{footer.copyright}</div>
          </div>
        </div>
      </footer>
    </>
  );
}
