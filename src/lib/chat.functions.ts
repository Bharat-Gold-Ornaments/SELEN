import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const N8N_WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL;

const CreateThreadInput = z.object({
  title: z.string().optional().default("New design chat"),
});

const ThreadAuthInput = z.object({
  threadId: z.string().uuid(),
  secret: z.string().uuid().optional(),
});

const SendMessageInput = z.object({
  threadId: z.string().uuid(),
  secret: z.string().uuid().optional(),
  content: z.string().min(1).max(4000),
});

async function getThreadWithAuth(threadId: string, secret?: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: thread, error } = await supabaseAdmin
    .from("threads")
    .select("id, title, secret, user_id, created_at, updated_at")
    .eq("id", threadId)
    .single();

  if (error || !thread) {
    throw new Error("Thread not found");
  }

  if (thread.secret !== secret) {
    throw new Error("Unauthorized");
  }

  return thread;
}

async function fetchMessages(threadId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: messages, error } = await supabaseAdmin
    .from("messages")
    .select("id, role, content, created_at")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages");
  }

  return messages ?? [];
}

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

  const data = await response.json();
  return data;
}

export const createThread = createServerFn({ method: "POST" })
  .validator((input) => CreateThreadInput.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: thread, error } = await supabaseAdmin
      .from("threads")
      .insert({
        title: data.title,
      })
      .select("id, secret, title, created_at")
      .single();

    if (error || !thread) {
      console.error("Error creating thread:", error);
      throw new Error("Failed to create thread");
    }

    return thread;
  });

export const getThread = createServerFn({ method: "POST" })
  .validator((input) => ThreadAuthInput.parse(input))
  .handler(async ({ data }) => {
    const thread = await getThreadWithAuth(data.threadId, data.secret);
    const messages = await fetchMessages(data.threadId);

    return {
      thread: {
        id: thread.id,
        title: thread.title,
        createdAt: thread.created_at,
        updatedAt: thread.updated_at,
      },
      messages,
    };
  });

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((input) => SendMessageInput.parse(input))
  .handler(async ({ data }) => {
    await getThreadWithAuth(data.threadId, data.secret);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error: insertError } = await supabaseAdmin.from("messages").insert({
      thread_id: data.threadId,
      role: "user",
      content: data.content,
    });

    if (insertError) {
      console.error("Error saving user message:", insertError);
      throw new Error("Failed to save message");
    }

    const messages = await fetchMessages(data.threadId);
    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    let n8nResponse: unknown;
    try {
      n8nResponse = await callN8nWebhook(data.threadId, history, data.content);
    } catch (error) {
      console.error("n8n error:", error);
      throw new Error("The design assistant is temporarily unavailable. Please try again.");
    }

    const replyText = extractReplyText(n8nResponse);
    const title = generateTitle(data.content);

    const [{ error: assistantInsertError }, { error: updateError }] = await Promise.all([
      supabaseAdmin.from("messages").insert({
        thread_id: data.threadId,
        role: "assistant",
        content: replyText,
      }),
      data.content.length > 10 && messages.length <= 2
        ? supabaseAdmin.from("threads").update({ title }).eq("id", data.threadId)
        : Promise.resolve({ error: null }),
    ]);

    if (assistantInsertError) {
      console.error("Error saving assistant message:", assistantInsertError);
      throw new Error("Failed to save assistant response");
    }
    if (updateError) {
      console.error("Error updating thread title:", updateError);
    }

    return {
      message: {
        role: "assistant" as const,
        content: replyText,
      },
      title,
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
