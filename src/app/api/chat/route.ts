import { getCloudflareContext } from "@opennextjs/cloudflare";
import type {
  ChatApiRequest,
  ChatResponse,
  Lang,
} from "@/lib/chatbot/chatbot-types";
import { generateReply } from "@/lib/chatbot/chatbot-mock-ai";
import {
  PACKAGES,
  PRICING_NOTE,
  SAFETY_RULES,
  SERVICES,
  VALUE_PROP,
} from "@/lib/chatbot/chatbot-knowledge";

// Chat is request-driven; never prerender.
export const dynamic = "force-dynamic";

/**
 * Chat endpoint — real AI with a deterministic safety net.
 *
 * Strategy (keeps the whole UI working either way):
 *   1. Always run the keyword engine (`generateReply`). It produces the
 *      structured affordances the widget renders — package cards, quick
 *      replies, the lead-capture CTA, detected language, and a fallback
 *      reply.
 *   2. If an OpenAI key is configured, replace ONLY the `reply` text with
 *      a natural model response (same package cards / lead flow remain).
 *   3. On a missing key OR any OpenAI error/timeout, return the mock as-is.
 *
 * The key is read from the Cloudflare Worker binding first (production)
 * and falls back to process.env (local `next dev` via .env.local). It is
 * never sent to the client — only the final text is.
 */
export async function POST(request: Request): Promise<Response> {
  let body: ChatApiRequest;
  try {
    body = (await request.json()) as ChatApiRequest;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body?.messages)) {
    return Response.json({ error: "messages[] is required" }, { status: 400 });
  }

  // Cap history size to keep payloads sane (anti-abuse).
  const messages = body.messages.slice(-20).map((m) => ({
    role: m.role === "user" ? ("user" as const) : ("assistant" as const),
    text: String(m.text ?? "").slice(0, 2000),
  }));

  // Deterministic base: package cards, quick replies, lead CTA, language.
  const mock: ChatResponse = generateReply({ messages, lang: body.lang });

  const apiKey = getOpenAIKey();
  if (!apiKey) {
    // No key → pure mock assistant. The widget is fully functional.
    return Response.json(mock);
  }

  try {
    const aiText = await callOpenAI(messages, mock.lang, apiKey, getModel());
    // Keep all mock affordances, swap in the natural AI text.
    return Response.json({ ...mock, reply: aiText } satisfies ChatResponse);
  } catch (err) {
    console.error("[chat] OpenAI failed — falling back to mock:", err);
    return Response.json(mock);
  }
}

// ─── Config readers ─────────────────────────────────────────

function getOpenAIKey(): string | undefined {
  try {
    const { env } = getCloudflareContext();
    const k = (env as Record<string, string | undefined>).OPENAI_API_KEY;
    if (k) return k;
  } catch {
    /* not on the Cloudflare runtime (e.g. plain node) — fall through */
  }
  return process.env.OPENAI_API_KEY;
}

function getModel(): string {
  try {
    const { env } = getCloudflareContext();
    const m = (env as Record<string, string | undefined>).OPENAI_MODEL;
    if (m) return m;
  } catch {
    /* ignore */
  }
  return process.env.OPENAI_MODEL || "gpt-4o-mini";
}

// ─── OpenAI call ────────────────────────────────────────────

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function callOpenAI(
  history: Array<{ role: "user" | "assistant"; text: string }>,
  lang: Lang,
  apiKey: string,
  model: string,
): Promise<string> {
  const messages: OpenAIMessage[] = [
    { role: "system", content: buildSystemPrompt(lang) },
    ...history.map((m) => ({ role: m.role, content: m.text })),
  ];

  // Guard against a hung upstream — bail to the mock after 12s.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.6,
        max_tokens: 320,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("Empty OpenAI response");
    return text;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── System prompt (built from the knowledge base) ──────────

function buildSystemPrompt(lang: Lang): string {
  const services = SERVICES.en.map((s) => `- ${s}`).join("\n");
  const packages = PACKAGES.map(
    (p) => `- ${p.name.en}: ${p.tagline.en}`,
  ).join("\n");
  const safety = SAFETY_RULES.en.map((r) => `- ${r}`).join("\n");
  const langHint =
    lang === "es"
      ? "The visitor's current language appears to be Spanish — reply in Spanish unless they switch."
      : "The visitor's current language appears to be English — reply in English unless they switch.";

  return `You are the AI sales assistant for Leyva Web Studio, a premium web design and digital growth studio for local businesses.

VALUE PROPOSITION:
${VALUE_PROP.en}

LANGUAGE:
- Always reply in the SAME language as the user's most recent message (English or Spanish). ${langHint}

STYLE:
- Friendly, professional, confident, and sales-focused — never robotic or repetitive.
- Keep answers short and chat-sized: 2–4 sentences, not essays.
- Understand unusual or off-topic questions gracefully and steer back to how Leyva can help.
- When appropriate, end with ONE useful follow-up question.

SERVICES YOU CAN DISCUSS (never invent services beyond these):
${services}

PACKAGES YOU CAN RECOMMEND (recommend naturally based on the business + goal):
${packages}

HARD RULES:
${safety}
- For ads: the ad budget is paid separately by the client to Google/Meta; our fee covers management only.
- ${PRICING_NOTE.en}

GOAL:
- Understand the visitor's business type and main goal, then recommend the most relevant service or package naturally.
- When the visitor shows buying intent, warmly encourage them to leave their name, phone, email, business type, and what they need, so Alexander can review the project and prepare an exact quote.
- Never ask for sensitive data (SSN, bank info, passwords, documents).`;
}
