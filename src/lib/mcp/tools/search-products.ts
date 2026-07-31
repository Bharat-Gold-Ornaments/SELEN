import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "search_products",
  title: "Search products",
  description:
    "Search the SELEN jewellery catalogue. Returns matching products with handle, title, type, price and image.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Free-text search, e.g. 'gold hoops' or 'pendant'. Omit to list the catalogue."),
    limit: z.number().int().min(1).max(50).optional().describe("Maximum products to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { fetchProducts } = await import("@/lib/shopify.server");
    const edges = await fetchProducts(query);
    const products = edges.slice(0, limit ?? 20).map(({ node }) => ({
      handle: node.handle,
      title: node.title,
      productType: node.productType,
      price: `${node.priceRange.minVariantPrice.currencyCode} ${node.priceRange.minVariantPrice.amount}`,
      image: node.images.edges[0]?.node.url ?? null,
      url: `https://selen.in/product/${node.handle}`,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify(products, null, 2) }],
      structuredContent: { products },
    };
  },
});
