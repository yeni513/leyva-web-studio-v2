import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(236,139,42,0.35), transparent 60%), #070608",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="130"
          height="130"
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
            <radialGradient id="d" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fff4e0" />
              <stop offset="100%" stopColor="#ec8b2a" />
            </radialGradient>
          </defs>
          <circle
            cx="16"
            cy="16"
            r="12.5"
            stroke="url(#g)"
            strokeWidth="1.4"
            opacity="0.85"
          />
          <circle
            cx="16"
            cy="16"
            r="7.5"
            stroke="url(#g)"
            strokeWidth="1.2"
            opacity="0.55"
          />
          <circle cx="26.5" cy="9.5" r="2.6" fill="url(#d)" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
