import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/structured-data";
import { Analytics } from "@/components/analytics";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { UltimateChatbot } from "@/components/chatbot/UltimateChatbot";
import { LivingBackground } from "@/components/visuals/LivingBackground";
import { LanguageProvider } from "@/lib/i18n";

// Body — Inter variable, every weight available via `font-sans`.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display — Fraunces variable serif with optical sizing. Used by every
// section heading + gradient-text headline. The opsz axis lets the same
// face look sharp at 14px (eyebrow) and at 80px (hero h1).
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

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
    <html
      lang="es-US"
      className={`dark ${inter.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen text-ember-50/90 font-sans antialiased overflow-x-hidden">
        {/* Page-wide living aurora behind all content. */}
        <LivingBackground />
        {/* Keyboard / screen-reader skip link — hidden until focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-ember-300 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950 focus:shadow-glow"
        >
          Saltar al contenido
        </a>
        <StructuredData />
        <Analytics />
        <LanguageProvider>
          {children}
          <FloatingWhatsApp />
          <UltimateChatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
