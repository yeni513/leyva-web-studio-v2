import { ImageResponse } from "next/og";

export const alt =
  "Leyva Web Studio — Sitios web premium para negocios locales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph card rendered at build time and served at /opengraph-image.
 * Same image powers Twitter cards via the metadata config.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(60% 70% at 50% 25%, rgba(236,139,42,0.32), transparent 65%), radial-gradient(50% 60% at 85% 80%, rgba(168,80,12,0.30), transparent 60%), #070608",
          padding: 80,
          color: "#f4ecdf",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand mark row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <svg
            width="42"
            height="42"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#fdc97a" />
                <stop offset="60%" stopColor="#ec8b2a" />
                <stop offset="100%" stopColor="#a8500c" />
              </linearGradient>
            </defs>
            <circle
              cx="16"
              cy="16"
              r="12.5"
              stroke="url(#g)"
              strokeWidth="1.4"
              opacity="0.9"
            />
            <circle
              cx="16"
              cy="16"
              r="7.5"
              stroke="url(#g)"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <circle cx="26.5" cy="9.5" r="2.8" fill="#fdc97a" />
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              fontSize: 22,
              letterSpacing: "0.22em",
              fontWeight: 600,
            }}
          >
            <span style={{ color: "#fff4e0" }}>LEYVA</span>
            <span style={{ color: "rgba(236,139,42,0.7)" }}>·</span>
            <span
              style={{
                color: "rgba(244,236,223,0.7)",
                fontSize: 16,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
              }}
            >
              Web Studio
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            fontWeight: 700,
            fontSize: 78,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
          }}
        >
          <span style={{ color: "#f4ecdf" }}>Sitios web que hacen ver</span>
          <span
            style={{
              background:
                "linear-gradient(120deg, #fff4e0 0%, #fdc97a 35%, #ec8b2a 60%, #fff4e0 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            premium a tu negocio.
          </span>
        </div>

        {/* Footer info row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 36,
            paddingTop: 28,
            borderTop: "1px solid rgba(244,236,223,0.10)",
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "rgba(244,236,223,0.70)",
            }}
          >
            Restaurantes · Contratistas · Inmobiliarias · Servicios locales
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(236,139,42,0.45)",
              background: "rgba(236,139,42,0.10)",
              color: "#fdc97a",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Entrega 7–14 días →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
