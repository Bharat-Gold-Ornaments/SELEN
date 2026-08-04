import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/design-with-ai/")({
  loader: async () => {
    throw redirect({
      to: "/design-with-ai/$threadId",
      params: { threadId: crypto.randomUUID() },
    });
  },
});
