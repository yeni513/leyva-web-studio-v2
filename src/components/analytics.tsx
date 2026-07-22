import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Cloudflare Web Analytics beacon — free, cookieless, privacy-first.
 *
 * Renders nothing until NEXT_PUBLIC_CF_BEACON_TOKEN is set.
 * No token = no script, zero overhead.
 *
 * Alternative (zero code): for a Cloudflare-proxied site you can also
 * enable Web Analytics straight from the dashboard with automatic setup
 * and skip this beacon entirely.
 */
export function Analytics() {
  const token = site.analytics?.cfBeaconToken?.trim();
  if (!token) return null;

  return (
    <Script
      id="cf-web-analytics"
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
