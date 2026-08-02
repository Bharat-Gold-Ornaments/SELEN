import { PLACEHOLDER } from "@/lib/placeholders";
import { CATEGORIES, matchesCategory } from "@/lib/categories";
import type { ShopifyProduct } from "@/lib/shopify.server";

export interface EditorialCollection {
  slug: string;
  title: string;
  line: string;
  note: string;
  image: string;
  /** Category slugs used to curate the edit. Empty = every piece. */
  categories: string[];
}

export const EDITORIAL_COLLECTIONS: EditorialCollection[] = [
  {
    slug: "everyday-luxury",
    title: "Everyday Luxury",
    line: "Pieces made to be lived in.",
    note: "Quiet weight, warm shine, nothing precious about wearing it daily.",
    image: PLACEHOLDER.collection1,
    categories: [],
  },
  {
    slug: "golden-moments",
    title: "Golden Moments",
    line: "For the evenings you remember.",
    note: "Softly lit gold that catches the room without asking for it.",
    image: PLACEHOLDER.collection2,
    categories: ["rings", "bracelets"],
  },
  {
    slug: "celestial-dreams",
    title: "Celestial Dreams",
    line: "Moons, stars, quiet wonder.",
    note: "Delicate silhouettes drawn from the night sky.",
    image: PLACEHOLDER.collection3,
    categories: ["pendants", "necklaces"],
  },
  {
    slug: "quiet-elegance",
    title: "Quiet Elegance",
    line: "Restraint, worn well.",
    note: "The smallest pieces in the house, and the most considered.",
    image: PLACEHOLDER.collection4,
    categories: ["earrings"],
  },
  {
    slug: "modern-classics",
    title: "Modern Classics",
    line: "Shapes that outlive seasons.",
    note: "Forms we return to, refined until nothing is left to remove.",
    image: PLACEHOLDER.collection5,
    categories: ["necklaces", "rings"],
  },
  {
    slug: "made-for-gifting",
    title: "Made for Gifting",
    line: "Wrapped, ribboned, remembered.",
    note: "Each piece arrives in ivory board and satin, ready to be given.",
    image: PLACEHOLDER.collection6,
    categories: ["pendants", "earrings"],
  },
];

const CATEGORY_IMAGES: Record<string, string> = {
  earrings: PLACEHOLDER.collection4,
  necklaces: PLACEHOLDER.collection3,
  pendants: PLACEHOLDER.collection3,
  rings: PLACEHOLDER.collection1,
  bracelets: PLACEHOLDER.lifestyle,
  anklets: PLACEHOLDER.lifestyle,
};

export interface ResolvedCollection {
  slug: string;
  title: string;
  line: string;
  image: string;
  filter: (products: ShopifyProduct[]) => ShopifyProduct[];
}

export function resolveCollection(slug: string): ResolvedCollection | undefined {
  const editorial = EDITORIAL_COLLECTIONS.find((c) => c.slug === slug);
  if (editorial) {
    const cats = CATEGORIES.filter((c) => editorial.categories.includes(c.slug));
    return {
      slug,
      title: editorial.title,
      line: editorial.note,
      image: editorial.image,
      filter: (products) =>
        cats.length === 0
          ? products
          : products.filter((p) => cats.some((c) => matchesCategory(p, c))),
    };
  }

  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return undefined;
  return {
    slug,
    title: category.label,
    line: category.line,
    image: CATEGORY_IMAGES[slug] ?? PLACEHOLDER.banner,
    filter: (products) => products.filter((p) => matchesCategory(p, category)),
  };
}
