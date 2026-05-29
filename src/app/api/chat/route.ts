import type { ChatApiRequest, ChatResponse } from "@/lib/chatbot/chatbot-types";
import { generateReply } from "@/lib/chatbot/chatbot-mock-ai";

// Chat is request-driven; never prerender.
export const dynamic = "force-dynamic";

/**
 * Chat endpoint.
 *
 * Today: returns a deterministic mock-AI reply built from the project's
 * knowledge base (src/lib/chatbot/chatbot-knowledge.ts). The client uses
 * the same `generateReply` as an offline fallback, so the widget works
 * even if this route is unreachable.
 *
 * Later: swap the mock for a real provider. Read the key from an env var
 * (e.g. OPENAI_API_KEY / ANTHROPIC_API_KEY) via the Cloudflare Worker
 * bindings, build the system prompt from chatbot-knowledge + SAFETY_RULES,
 * and return the same ChatResponse shape — the UI contract is unchanged.
 */
export async function POST(request: Request): Promise<Response> {
  let body: ChatApiRequest;
  try {
    body = (await request.json()) as ChatApiRequest;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body?.messages)) {
    return Response.json(
      { error: "messages[] is required" },
      { status: 400 },
    );
  }

  // Cap history size to keep payloads sane (anti-abuse).
  const messages = body.messages.slice(-30).map((m) => ({
    role: m.role === "user" ? ("user" as const) : ("assistant" as const),
    text: String(m.text ?? "").slice(0, 2000),
  }));

  const response: ChatResponse = generateReply({
    messages,
    lang: body.lang,
  });

  return Response.json(response);
}
