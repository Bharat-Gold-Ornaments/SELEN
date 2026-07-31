import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "list_categories",
  title: "List categories",
  description: "List the SELEN jewellery categories (rings, pendants, earrings, necklaces and more).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { CATEGORIES } = await import("@/lib/categories");
    const categories = CATEGORIES.map((c) => ({
      slug: c.slug,
      label: c.label,
      description: c.line,
      url: `https://selen.in/collections/${c.slug}`,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify(categories, null, 2) }],
      structuredContent: { categories },
    };
  },
});
