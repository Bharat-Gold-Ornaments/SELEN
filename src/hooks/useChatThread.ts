import { useState, useEffect, useCallback, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendMessage } from "@/lib/chat.functions";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

type StoredThread = {
  title: string;
  messages: ChatMessage[];
};

const CURRENT_THREAD_KEY = "selen_chat_current_id";
const threadDataKey = (id: string) => `selen_chat_data:${id}`;
const DEFAULT_TITLE = "Design with AI";

function loadThread(id: string): StoredThread | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(threadDataKey(id));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredThread;
  } catch {
    return null;
  }
}

function saveThread(id: string, thread: StoredThread) {
  if (typeof window === "undefined") return;
  localStorage.setItem(threadDataKey(id), JSON.stringify(thread));
}

function newThreadId() {
  return crypto.randomUUID();
}

function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

function useChatSession(initialThreadId: string | null) {
  const sendMessageFn = useServerFn(sendMessage);

  const [threadId, setThreadId] = useState<string | null>(initialThreadId);
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback((id: string) => {
    const stored = loadThread(id);
    setThreadId(id);
    setTitle(stored?.title ?? DEFAULT_TITLE);
    setMessages(stored?.messages ?? []);
  }, []);

  const handleSend = useCallback(
    async (content: string) => {
      if (!threadId || !content.trim()) return;
      const isFirstMessage = messages.length === 0;
      const history = messages.map((m) => ({ role: m.role, content: m.content }));

      const userMessage: ChatMessage = {
        id: `local-${Date.now()}`,
        role: "user",
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setStatus("loading");
      setError(null);

      try {
        const result = await sendMessageFn({ data: { threadId, content: content.trim(), history } });
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}`,
          role: result.message.role,
          content: result.message.content,
          createdAt: new Date().toISOString(),
        };
        const finalMessages = [...nextMessages, assistantMessage];
        const finalTitle = isFirstMessage && content.trim().length > 10 ? result.title : title;

        setMessages(finalMessages);
        setTitle(finalTitle);
        setStatus("idle");
        saveThread(threadId, { title: finalTitle, messages: finalMessages });
      } catch (err) {
        console.error("Send message error:", err);
        setStatus("error");
        setError("The assistant is unavailable. Please try again.");
        saveThread(threadId, { title, messages: nextMessages });
      }
    },
    [threadId, messages, title, sendMessageFn],
  );

  return { threadId, title, messages, status, error, handleSend, load };
}

export function useWidgetChatThread() {
  const mounted = useIsMounted();
  const session = useChatSession(null);
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (!mounted || bootstrapped.current) return;
    bootstrapped.current = true;

    const existingId = localStorage.getItem(CURRENT_THREAD_KEY);
    const id = existingId ?? newThreadId();
    if (!existingId) {
      localStorage.setItem(CURRENT_THREAD_KEY, id);
      saveThread(id, { title: DEFAULT_TITLE, messages: [] });
    }
    session.load(id);
  }, [mounted]);

  return {
    threadId: session.threadId,
    title: session.title,
    messages: session.messages,
    status: session.status,
    error: session.error,
    sendMessage: session.handleSend,
    isReady: !!session.threadId,
  };
}

export function usePageChatThread(initialThreadId: string) {
  const session = useChatSession(initialThreadId);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    session.load(initialThreadId);
    if (typeof window !== "undefined") {
      localStorage.setItem(CURRENT_THREAD_KEY, initialThreadId);
    }
  }, [initialThreadId]);

  return {
    threadId: session.threadId,
    title: session.title,
    messages: session.messages,
    status: session.status,
    error: session.error,
    sendMessage: session.handleSend,
    isReady: !!session.threadId,
    createNewThread: async () => {
      const id = newThreadId();
      saveThread(id, { title: DEFAULT_TITLE, messages: [] });
      if (typeof window !== "undefined") {
        localStorage.setItem(CURRENT_THREAD_KEY, id);
      }
      return { id };
    },
  };
}
