import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import "./studio.css";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/structured-data";
import { LazyChatbot } from "@/components/chatbot/LazyChatbot";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} ${site.brandSub} — Diseño Web Premium en Cleveland, OH · Web Design Cleveland`,
    template: `%s · ${site.brand} ${site.brandSub}`,
  },
  description: site.description,
  applicationName: `${site.brand} ${site.brandSub}`,
  authors: [{ name: site.brand }],
  creator: site.brand,
  publisher: site.brand,
  keywords: [
    // English — Cleveland local intent
    "web design Cleveland",
    "web designer Cleveland Ohio",
    "website design for small business Cleveland",
    "affordable web design Cleveland",
    "local SEO Cleveland",
    "web design for restaurants Cleveland",
    "web design for contractors Cleveland",
    "business websites in Cleveland",
    "Spanish web designer Cleveland",
    "AI chatbot for business",
    "Google Business Profile optimization Cleveland",
    // Spanish — intención local
    "diseño web en Cleveland",
    "páginas web para negocios en Cleveland",
    "diseño web para restaurantes",
    "páginas web para contratistas",
    "SEO local Cleveland Ohio",
    "estudio web Cleveland",
  ],
  openGraph: {
    type: "website",
    locale: "es_US",
    alternateLocale: ["es_MX", "en_US"],
    url: site.url,
    title: `${site.brand} ${site.brandSub} — Diseño Web Premium en Cleveland, OH`,
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
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bitcount+Grid+Single:wght@100..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Zalando+Sans+SemiExpanded:ital,wght@0,200..900;1,200..900&display=swap"
        />
        <StructuredData />
        {children}
        <LazyChatbot />
      </body>
    </html>
  );
}
