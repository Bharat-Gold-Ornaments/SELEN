import { Link } from "@tanstack/react-router";
import { CATEGORIES, matchesCategory } from "@/lib/categories";
import type { ProductEdge } from "@/lib/shopify.server";

export function ShopStrip({ products }: { products: ProductEdge[] }) {
  const all = products.map((e) => e.node);
  const cards = CATEGORIES.map((c) => {
    const items = all.filter((p) => matchesCategory(p, c));
    return { c, cover: items[0]?.images.edges[0]?.node, count: items.length };
  }).filter((x) => x.count > 0);

  if (cards.length === 0) return null;

  return (
    <section className="border-b border-border/50 bg-background py-10" aria-label="Shop by category">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            Shop by category
          </p>
          <Link to="/shop" className="text-[0.65rem] uppercase tracking-[0.2em] underline-offset-4 hover:underline">
            All jewellery →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cards.slice(0, 4).map(({ c, cover, count }) => (
            <Link
              key={c.slug}
              to="/collections/$category"
              params={{ category: c.slug }}
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                {cover && (
                  <img
                    src={`${cover.url}?width=600`}
                    alt={c.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <p className="mt-3 text-sm">{c.label}</p>
              <p className="text-xs text-muted-foreground">{count} pieces</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
