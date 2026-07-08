import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import LenisProvider from "@/components/motion/LenisProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.url),
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: site.meta.url,
    siteName: site.meta.siteName,
    locale: site.meta.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} js-loading`}>
      <body className="bg-almost-black text-white antialiased">
        <LenisProvider>{children}</LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.meta.siteName,
              url: site.meta.url,
              description: site.meta.description,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Palmas",
                addressRegion: "TO",
                addressCountry: "BR",
              },
              email: site.hero.contact.value,
            }),
          }}
        />
      </body>
    </html>
  );
}
