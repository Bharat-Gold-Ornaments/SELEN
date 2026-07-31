import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Maximize2, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { useWidgetChatThread } from "@/hooks/useChatThread";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { threadId, title, messages, status, error, sendMessage, isReady } = useWidgetChatThread();

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-foreground text-background shadow-lg hover:bg-foreground/90"
            aria-label="Open design assistant"
          >
            {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[92vw] max-w-md p-0 sm:w-[420px]"
          aria-describedby="chat-widget-description"
        >
          <SheetTitle className="sr-only">Design with AI</SheetTitle>
          <SheetDescription id="chat-widget-description" className="sr-only">
            Chat with SELEN's AI assistant to design a custom jewellery piece.
          </SheetDescription>
          <div className="flex h-full flex-col">
            <div className="absolute right-12 top-4 z-10">
              {isReady && threadId && (
                <Link
                  to="/design-with-ai/$threadId"
                  params={{ threadId }}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Open full chat page"
                >
                  <Maximize2 className="h-4 w-4" />
                </Link>
              )}
            </div>
            <ChatInterface
              title={title}
              messages={messages}
              status={status}
              error={error}
              onSend={sendMessage}
              compact
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
