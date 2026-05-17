import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} · ${site.brandSub} — Sitios web premium para negocios locales`,
    template: `%s · ${site.brand} ${site.brandSub}`,
  },
  description: site.description,
  keywords: [
    "diseño web premium",
    "desarrollo web Ohio",
    "páginas web para negocios locales",
    "sitios web para restaurantes",
    "páginas web para contratistas",
    "páginas web para inmobiliarias",
    "web design Ohio",
    "Hispanic small business websites",
    "Next.js",
    "estudio web",
  ],
  openGraph: {
    type: "website",
    locale: "es_US",
    url: site.url,
    title: `${site.brand} ${site.brandSub} — Sitios web premium`,
    description: site.description,
    siteName: `${site.brand} ${site.brandSub}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} ${site.brandSub}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070608",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-ink-950 text-ember-50/90 font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
