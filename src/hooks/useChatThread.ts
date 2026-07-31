import { useState, useEffect, useCallback, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createThread, getThread, sendMessage } from "@/lib/chat.functions";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

const STORAGE_KEY = "selen_chat_thread";

function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

export function useWidgetChatThread() {
  const mounted = useIsMounted();
  const createThreadFn = useServerFn(createThread);
  const getThreadFn = useServerFn(getThread);
  const sendMessageFn = useServerFn(sendMessage);

  const [threadId, setThreadId] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("Design with AI");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const bootstrapped = useRef(false);

  const storeThread = useCallback((id: string, sec: string) => {
    setThreadId(id);
    setSecret(sec);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id, secret: sec }));
    }
  }, []);

  useEffect(() => {
    if (!mounted || bootstrapped.current) return;
    bootstrapped.current = true;

    const init = async () => {
      try {
        const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
        if (stored) {
          const parsed = JSON.parse(stored) as { id: string; secret: string };
          const data = await getThreadFn({ data: { threadId: parsed.id, secret: parsed.secret } });
          setThreadId(parsed.id);
          setSecret(parsed.secret);
          setTitle(data.thread.title ?? "Design with AI");
          setMessages(data.messages ?? []);
        } else {
          const thread = await createThreadFn({ data: { title: "Design with AI" } });
          storeThread(thread.id, thread.secret);
        }
      } catch (err) {
        console.error("Chat bootstrap error:", err);
        setError("Could not start chat.");
        setStatus("error");
        try {
          const thread = await createThreadFn({ data: { title: "Design with AI" } });
          storeThread(thread.id, thread.secret);
          setError(null);
          setStatus("idle");
        } catch (err2) {
          console.error("Chat recovery error:", err2);
        }
      }
    };

    init();
  }, [mounted, createThreadFn, getThreadFn, storeThread]);

  const handleSend = useCallback(
    async (content: string) => {
      if (!threadId || !secret || !content.trim()) return;
      const userMessage: ChatMessage = {
        id: `local-${Date.now()}`,
        role: "user",
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setStatus("loading");
      setError(null);

      try {
        const result = await sendMessageFn({ data: { threadId, secret, content: content.trim() } });
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}`,
          role: result.message.role,
          content: result.message.content,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== userMessage.id);
          return [...filtered, assistantMessage];
        });
        if (result.title) {
          setTitle(result.title);
        }
        setStatus("idle");
      } catch (err) {
        console.error("Send message error:", err);
        setStatus("error");
        setError("The assistant is unavailable. Please try again.");
      }
    },
    [threadId, secret, sendMessageFn],
  );

  return {
    threadId,
    secret,
    title,
    messages,
    status,
    error,
    sendMessage: handleSend,
    isReady: !!threadId && !!secret,
  };
}

export function usePageChatThread(initialThreadId: string) {
  const createThreadFn = useServerFn(createThread);
  const getThreadFn = useServerFn(getThread);
  const sendMessageFn = useServerFn(sendMessage);

  const [threadId, setThreadId] = useState<string | null>(initialThreadId);
  const [secret, setSecret] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("Design with AI");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  const storeThread = useCallback((id: string, sec: string) => {
    setThreadId(id);
    setSecret(sec);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id, secret: sec }));
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const load = async () => {
      try {
        const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
        const parsed = stored ? (JSON.parse(stored) as { id: string; secret: string }) : null;
        if (parsed && parsed.id === initialThreadId) {
          const data = await getThreadFn({ data: { threadId: parsed.id, secret: parsed.secret } });
          setSecret(parsed.secret);
          setTitle(data.thread.title ?? "Design with AI");
          setMessages(data.messages ?? []);
        } else {
          const data = await getThreadFn({ data: { threadId: initialThreadId } });
          setSecret("");
          setTitle(data.thread.title ?? "Design with AI");
          setMessages(data.messages ?? []);
        }
      } catch (err) {
        console.error("Page chat load error:", err);
        setError("Could not load this conversation.");
        setStatus("error");
      }
    };

    load();
  }, [initialThreadId, getThreadFn]);

  const handleSend = useCallback(
    async (content: string) => {
      if (!threadId || !content.trim()) return;
      const userMessage: ChatMessage = {
        id: `local-${Date.now()}`,
        role: "user",
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setStatus("loading");
      setError(null);

      try {
        const result = await sendMessageFn({ data: { threadId, secret: secret ?? undefined, content: content.trim() } });
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}`,
          role: result.message.role,
          content: result.message.content,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== userMessage.id);
          return [...filtered, assistantMessage];
        });
        if (result.title) {
          setTitle(result.title);
        }
        setStatus("idle");
      } catch (err) {
        console.error("Send message error:", err);
        setStatus("error");
        setError("The assistant is unavailable. Please try again.");
      }
    },
    [threadId, secret, sendMessageFn],
  );

  return {
    threadId,
    secret,
    title,
    messages,
    status,
    error,
    sendMessage: handleSend,
    isReady: !!threadId,
    createNewThread: async () => {
      const thread = await createThreadFn({ data: { title: "Design with AI" } });
      storeThread(thread.id, thread.secret);
      setMessages([]);
      setTitle("Design with AI");
      setError(null);
      return thread;
    },
  };
}
