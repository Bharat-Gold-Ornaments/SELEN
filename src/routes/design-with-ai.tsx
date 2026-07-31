import { createFileRoute, redirect } from "@tanstack/react-router";
import { createThread } from "@/lib/chat.functions";

export const Route = createFileRoute("/design-with-ai")({
  loader: async () => {
    const thread = await createThread({ data: { title: "Design with AI" } });
    throw redirect({
      to: "/design-with-ai/$threadId",
      params: { threadId: thread.id },
    });
  },
});
