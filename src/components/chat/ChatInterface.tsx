import { useRef, useEffect, useState } from "react";
import { Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatMessage } from "@/hooks/useChatThread";

interface ChatInterfaceProps {
  title: string;
  messages: ChatMessage[];
  status: "idle" | "loading" | "error";
  error: string | null;
  onSend: (content: string) => void;
  inputPlaceholder?: string;
  compact?: boolean;
}

export function ChatInterface({
  title,
  messages,
  status,
  error,
  onSend,
  inputPlaceholder = "Describe the piece you have in mind...",
  compact = false,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleSubmit = () => {
    if (!input.trim() || status === "loading") return;
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b border-border/60 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10">
            <Sparkles className="h-4 w-4 text-gold-deep" />
          </div>
          <div>
            <h2 className="font-heading text-sm font-medium tracking-tight">{title}</h2>
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              Design with AI
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 sm:px-6">
        <div className="space-y-4 py-4">
          {messages.length === 0 && (
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Tell me what you are looking for — a pendant for everyday wear, statement earrings,
                or a gift with a story. I will help you refine the idea.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Sparkles className="h-3 w-3 text-gold-deep" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground"
                }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-silver/30">
                  <User className="h-3 w-3 text-silver-deep" />
                </div>
              )}
            </div>
          ))}

          {status === "loading" && (
            <div className="flex items-start gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10">
                <Sparkles className="h-3 w-3 text-gold-deep" />
              </div>
              <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-border/60 p-3 sm:p-4">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder={inputPlaceholder}
            rows={1}
            className="min-h-0 resize-none rounded-full bg-muted/50 py-3 pl-4 pr-4 text-sm focus-visible:ring-gold"
          />
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || status === "loading"}
            size="icon"
            className="shrink-0 rounded-full bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <p className="mt-2 text-center text-[0.6rem] uppercase tracking-wider text-muted-foreground">
          Powered by KINMITRA · AI-assisted design
        </p>
      </div>
    </div>
  );
}
