import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} · ${site.brandSub} — Sitios web a la medida para negocios locales`,
    template: `%s · ${site.brand} ${site.brandSub}`,
  },
  description: site.description,
  applicationName: `${site.brand} ${site.brandSub}`,
  authors: [{ name: site.brand }],
  creator: site.brand,
  publisher: site.brand,
  keywords: [
    "diseño web",
    "desarrollo web Ohio",
    "páginas web para negocios locales",
    "sitios web para restaurantes",
    "páginas web para contratistas",
    "páginas web para inmobiliarias",
    "web design Ohio",
    "Hispanic small business websites",
    "Next.js",
    "estudio web",
    "diseño cinematográfico",
  ],
  openGraph: {
    type: "website",
    locale: "es_US",
    alternateLocale: ["es_MX", "en_US"],
    url: site.url,
    title: `${site.brand} ${site.brandSub} — Sitios web a la medida`,
    description: site.description,
    siteName: `${site.brand} ${site.brandSub}`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.brand} ${site.brandSub} — Sitios web premium para negocios locales`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} ${site.brandSub}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070608" },
    { media: "(prefers-color-scheme: light)", color: "#070608" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-US" className="dark">
      <body className="min-h-screen bg-ink-950 text-ember-50/90 font-sans antialiased overflow-x-hidden">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
