import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        ink: {
          950: "#070608",
          900: "#0c0a0d",
          800: "#15111a",
        },
        amber: {
          50: "#fff8eb",
        },
        ember: {
          50: "#fff4e0",
          100: "#ffe2b5",
          200: "#fdc97a",
          300: "#f5ad4f",
          400: "#ec8b2a",
          500: "#d76a14",
          600: "#a8500c",
          700: "#7a3a08",
          800: "#4f2606",
          900: "#2a1403",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(236, 139, 42, 0.45)",
        "glow-sm": "0 0 30px -8px rgba(236, 139, 42, 0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 40px -12px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-ember":
          "radial-gradient(circle at 50% 30%, rgba(236,139,42,0.25), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "orbit-halo": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "orbit-breathe": {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.9)" },
          "50%": { opacity: "0.75", transform: "scale(1.08)" },
        },
        "orbit-shimmer": {
          "0%": { transform: "translateX(-110%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
        // Living-background aurora blobs — slow, compositor-only drift +
        // breathe (transform/opacity only, GPU-cheap). Three different
        // paths/durations so the field never looks like it loops.
        "aurora-a": {
          "0%, 100%": { transform: "translate3d(-4%, -2%, 0) scale(1)" },
          "50%": { transform: "translate3d(5%, 3%, 0) scale(1.15)" },
        },
        "aurora-b": {
          "0%, 100%": { transform: "translate3d(3%, 4%, 0) scale(1.08)" },
          "50%": { transform: "translate3d(-5%, -3%, 0) scale(0.95)" },
        },
        "aurora-c": {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0) scale(1)",
            opacity: "0.5",
          },
          "50%": {
            transform: "translate3d(4%, -4%, 0) scale(1.2)",
            opacity: "0.85",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.9s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        shine: "shine 6s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "orbit-halo": "orbit-halo 8s linear infinite",
        "orbit-breathe": "orbit-breathe 3.6s ease-in-out infinite",
        "orbit-shimmer": "orbit-shimmer 2.8s ease-out infinite",
        "aurora-a": "aurora-a 26s ease-in-out infinite",
        "aurora-b": "aurora-b 32s ease-in-out infinite",
        "aurora-c": "aurora-c 22s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
