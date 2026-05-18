import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext configuration for Cloudflare Workers.
 *
 * Default config is enough for a fully static Next.js app like this one
 * (no ISR, no on-demand revalidation, no incremental cache). Add overrides
 * here only when introducing R2-backed cache, KV-backed cache, queues,
 * etc. Docs: https://opennext.js.org/cloudflare/config
 */
export default defineCloudflareConfig({});
