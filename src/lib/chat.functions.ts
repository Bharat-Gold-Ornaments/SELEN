import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const N8N_WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL;

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
  const url = N8N_WEBHOOK_URL ?? "";
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
      },
      title: generateTitle(data.content),
    };
  });

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
