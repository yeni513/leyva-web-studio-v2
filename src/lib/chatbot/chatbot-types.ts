import type { LucideIcon } from "lucide-react";

/** Visitor-facing language. The assistant mirrors whatever the user writes. */
export type Lang = "en" | "es";

export type ChatRole = "assistant" | "user";

export type PackageId =
  | "starter-landing"
  | "local-business"
  | "premium-business"
  | "ecommerce"
  | "restaurant"
  | "maintenance"
  | "seo-local"
  | "growth-bundle"
  | "custom-system";

export interface QuickReply {
  id: string;
  /** Already-localized label rendered on the pill. */
  label: string;
  /** Text injected as the user's message when the pill is tapped. */
  value: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: number;
  /** Package cards rendered beneath this (assistant) message. */
  packages?: PackageId[];
  /** Quick-reply pills rendered beneath this (assistant) message. */
  quickReplies?: QuickReply[];
  /** When true, render the "open lead form" CTA beneath this message. */
  offerLead?: boolean;
}

/**
 * Pure data describing a package. No React / icon imports so this file
 * is safe to import from the API route (server bundle stays lean — the
 * icon mapping lives client-side in PackageRecommendationCard).
 */
export interface PackageInfo {
  id: PackageId;
  name: Record<Lang, string>;
  tagline: Record<Lang, string>;
  bestFor: Record<Lang, string>;
  includes: Record<Lang, string[]>;
}

export interface LeadData {
  name: string;
  business: string;
  phone: string;
  email: string;
  businessType: string;
  service: string;
  budget: string;
  timeline: string;
  notes: string;
  language: Lang;
}

/** Shape returned by the mock-AI / chat API for a single turn. */
export interface ChatResponse {
  reply: string;
  lang: Lang;
  quickReplies?: QuickReply[];
  packages?: PackageId[];
  offerLead?: boolean;
  /** Partial fields used to prefill the lead form when it opens. */
  leadHints?: Partial<LeadData>;
}

export interface ChatApiRequest {
  messages: Array<Pick<ChatMessage, "role" | "text">>;
  lang?: Lang;
}

/** Client-only: maps each package to its display icon. */
export type PackageIconMap = Record<PackageId, LucideIcon>;
