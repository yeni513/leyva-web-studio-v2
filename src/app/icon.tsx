import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Browser tab favicon — ember orbit with center dot.
 * Generated at build time by Next, served as /icon.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "#070608",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      >
        <svg
          width="22"
          height="22"
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
            strokeWidth="2"
          />
          <circle cx="26.5" cy="9.5" r="3" fill="#fdc97a" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
