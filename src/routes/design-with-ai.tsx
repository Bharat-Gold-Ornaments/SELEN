import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/design-with-ai")({
  component: DesignWithAILayout,
});

function DesignWithAILayout() {
  return <Outlet />;
}
