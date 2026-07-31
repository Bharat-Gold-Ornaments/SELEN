import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { usePageChatThread } from "@/hooks/useChatThread";

export const Route = createFileRoute("/design-with-ai/$threadId")({
  component: DesignWithAIPage,
  head: () => ({
    meta: [
      { title: "Design with AI — SELEN" },
      { name: "description", content: "Co-create your perfect piece of gold-plated silver jewellery with SELEN's AI design assistant." },
      { property: "og:title", content: "Design with AI — SELEN" },
      { property: "og:description", content: "Co-create your perfect piece of gold-plated silver jewellery with SELEN's AI design assistant." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function DesignWithAIPage() {
  const { threadId } = Route.useParams();
  const { title, messages, status, error, sendMessage, isReady, createNewThread } = usePageChatThread(threadId);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-background">
      <div className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to SELEN
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => createNewThread().then((t) => window.location.href = `/design-with-ai/${t.id}`)}
              className="h-8 gap-1.5 rounded-full text-xs uppercase tracking-wider"
            >
              <Plus className="h-3.5 w-3.5" />
              New chat
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 pb-6 sm:px-6">
        <div className="flex h-[calc(100vh-8.5rem)] flex-col overflow-hidden rounded-lg border border-border/60 shadow-sm">
          {isReady ? (
            <ChatInterface
              title={title}
              messages={messages}
              status={status}
              error={error}
              onSend={sendMessage}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <div className="h-8 w-8 animate-pulse rounded-full bg-gold/20" />
                <p className="text-sm">Opening your design studio...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
