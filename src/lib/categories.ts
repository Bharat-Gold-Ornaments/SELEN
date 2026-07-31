import type { ProductEdge, ShopifyProduct } from "@/lib/shopify.server";

export interface Category {
  slug: string;
  label: string;
  line: string;
  match: RegExp;
}

export const CATEGORIES: Category[] = [
  {
    slug: "earrings",
    label: "Earrings",
    line: "Studs, drops and hoops in 20K gold over 925 silver.",
    match: /earring|stud|hoop|jhumk|drop/i,
  },
  {
    slug: "pendants",
    label: "Pendants",
    line: "Everyday pendants that sit close to the skin.",
    match: /pendant/i,
  },
  {
    slug: "necklaces",
    label: "Necklaces",
    line: "Chains and chokers, finished by hand.",
    match: /necklace|chain|choker/i,
  },
  {
    slug: "rings",
    label: "Rings",
    line: "The most handled piece you will ever own.",
    match: /\brings?\b|\bbands?\b/i,
  },
  {
    slug: "bracelets",
    label: "Bracelets",
    line: "Movement, caught in silver.",
    match: /bracelet|bangle|kada|anklet/i,
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

function haystack(p: ShopifyProduct) {
  return `${p.productType ?? ""} ${p.title}`;
}

export function matchesCategory(product: ShopifyProduct, category: Category) {
  if (category.slug === "earrings") return /earring/i.test(haystack(product));
  return category.match.test(haystack(product));
}

export function filterByCategory(products: ProductEdge[], category: Category) {
  return products.map((e) => e.node).filter((p) => matchesCategory(p, category));
}

export function groupByCategory(products: ProductEdge[]) {
  const all = products.map((e) => e.node);
  const used = new Set<string>();
  const groups = CATEGORIES.map((c) => {
    const items = all.filter((p) => {
      if (used.has(p.id)) return false;
      const hit = matchesCategory(p, c);
      if (hit) used.add(p.id);
      return hit;
    });
    return { category: c, items };
  }).filter((g) => g.items.length > 0);

  const rest = all.filter((p) => !used.has(p.id));
  return { groups, rest };
}

export function formatPrice(amount: string, currencyCode: string) {
  const symbol = currencyCode === "INR" ? "₹" : `${currencyCode} `;
  return `${symbol}${Math.round(parseFloat(amount)).toLocaleString("en-IN")}`;
}
