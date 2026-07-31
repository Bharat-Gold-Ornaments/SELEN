import { auth, defineMcp } from "@lovable.dev/mcp-js";

import getProductTool from "./tools/get-product";
import listCategoriesTool from "./tools/list-categories";
import searchProductsTool from "./tools/search-products";

// The OAuth issuer must be the direct Supabase host; the project ref is the only
// value that survives publish unchanged and is inlined by Vite at build time.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "selen",
  title: "SELEN",
  version: "0.1.0",
  instructions:
    "Tools for SELEN, a gold-plated 925 sterling silver jewellery brand. Use `list_categories` to see the ranges, `search_products` to find pieces, and `get_product` for full details on one piece.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [searchProductsTool, getProductTool, listCategoriesTool],
});
