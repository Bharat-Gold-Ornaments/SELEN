import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_product",
  title: "Get product",
  description:
    "Fetch full details for one SELEN product by its handle, including description, options, variants and prices.",
  inputSchema: {
    handle: z.string().trim().min(1).describe("The product handle, e.g. 'sunburst-drop-earrings'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ handle }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { fetchProductByHandle } = await import("@/lib/shopify.server");
    const product = await fetchProductByHandle(handle);
    if (!product) {
      return { content: [{ type: "text", text: `No product found for handle "${handle}"` }], isError: true };
    }

    const detail = {
      handle: product.handle,
      title: product.title,
      description: product.description,
      productType: product.productType,
      price: `${product.priceRange.minVariantPrice.currencyCode} ${product.priceRange.minVariantPrice.amount}`,
      images: product.images.edges.map((e) => e.node.url),
      options: product.options,
      variants: product.variants.edges.map(({ node }) => ({
        title: node.title,
        price: `${node.price.currencyCode} ${node.price.amount}`,
        availableForSale: node.availableForSale,
        selectedOptions: node.selectedOptions,
      })),
      url: `https://selen.in/product/${product.handle}`,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(detail, null, 2) }],
      structuredContent: { product: detail },
    };
  },
});
