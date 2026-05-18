import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Wires up Cloudflare bindings (KV, R2, D1, env vars, etc.) to `next dev`
// via getCloudflareContext(). No-op in production.
// Docs: https://opennext.js.org/cloudflare/get-started
initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
