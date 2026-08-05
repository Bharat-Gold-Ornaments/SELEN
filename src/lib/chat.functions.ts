import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";


const SendMessageInput = z.object({
  threadId: z.string(),
  content: z.string().min(1).max(4000),
  history: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    }),
  ),
});

async function callN8nWebhook(threadId: string, history: { role: string; content: string }[], latestMessage: string) {
  // Read at call time: env is not populated at module scope on serverless hosts.
  const url = process.env['N8N_CHAT_WEBHOOK_URL'] ?? "";
  if (!url) {
    throw new Error("N8N chat webhook URL is not configured");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      threadId,
      latestMessage,
      messages: history,
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "Unknown error");
    console.error("n8n webhook error:", response.status, text);
    throw new Error(`n8n webhook returned ${response.status}: ${text}`);
  }

  let text: string;
  try {
    text = await response.text();
  } catch {
    text = "";
  }

  if (!text.trim()) {
    return { text: "I'm here to help you design something beautiful." };
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { text: text.trim() };
  }

  return data;
}

export type ChatItem = {
  name: string;
  price: string | null;
  photo: string | null;
  checkoutUrl: string | null;
};

export const sendMessage = createServerFn({ method: "POST" })
  .validator((input) => SendMessageInput.parse(input))
  .handler(async ({ data }) => {
    let n8nResponse: unknown;
    try {
      n8nResponse = await callN8nWebhook(data.threadId, data.history, data.content);
    } catch (error) {
      console.error("n8n error:", error);
      throw new Error("The design assistant is temporarily unavailable. Please try again.");
    }

    return {
      message: {
        role: "assistant" as const,
        content: extractReplyText(n8nResponse),
        items: extractItems(n8nResponse),
        quickReplies: extractQuickReplies(n8nResponse),
      },
      title: generateTitle(data.content),
    };
  });

function toTrimmedStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function extractItems(data: unknown): ChatItem[] {
  if (!data || typeof data !== "object") return [];
  const raw = (data as Record<string, unknown>).items;
  if (!Array.isArray(raw)) return [];

  return raw
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) => ({
      name: toTrimmedStringOrNull(item.name) ?? "Untitled piece",
      price: typeof item.price === "number" ? String(item.price) : toTrimmedStringOrNull(item.price),
      photo: toTrimmedStringOrNull(item.photo),
      checkoutUrl: toTrimmedStringOrNull(item.checkout_url) ?? toTrimmedStringOrNull(item.checkoutUrl),
    }))
    .filter((item) => item.photo !== null);
}

function extractQuickReplies(data: unknown): string[] {
  if (!data || typeof data !== "object") return [];
  const obj = data as Record<string, unknown>;
  const candidates = [obj.quick_replies, obj.suggestions, obj.buttons, obj.options];

  for (const candidate of candidates) {
    if (!Array.isArray(candidate)) continue;
    const strings = candidate.filter(
      (entry): entry is string => typeof entry === "string" && entry.trim().length > 0,
    );
    if (strings.length > 0) return strings.slice(0, 6);
  }
  return [];
}

function extractReplyText(data: unknown): string {
  if (typeof data === "string") {
    return data.trim() || "I'm here to help you design something beautiful.";
  }
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (typeof obj.text === "string") {
      return obj.text.trim() || "I'm here to help you design something beautiful.";
    }
    if (typeof obj.message === "string") {
      return obj.message.trim() || "I'm here to help you design something beautiful.";
    }
    if (typeof obj.reply === "string") {
      return obj.reply.trim() || "I'm here to help you design something beautiful.";
    }
    if (typeof obj.response === "string") {
      return obj.response.trim() || "I'm here to help you design something beautiful.";
    }
    if (obj.output && typeof obj.output === "string") {
      return obj.output.trim() || "I'm here to help you design something beautiful.";
    }
  }
  return "I'm here to help you design something beautiful.";
}

function generateTitle(firstMessage: string): string {
  const clean = firstMessage.trim().slice(0, 40);
  return clean.length < firstMessage.length ? `${clean}…` : clean || "New design chat";
}
