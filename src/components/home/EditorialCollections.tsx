import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ProductEdge, ShopifyProduct } from "@/lib/shopify.server";

const GROUPS: Array<{ key: string; title: string; line: string; match: RegExp }> = [
  {
    key: "earrings",
    title: "Earrings",
    line: "The piece you notice on someone before you notice anything else.",
    match: /earring|stud|hoop|jhumk|drop/i,
  },
  {
    key: "necklaces",
    title: "Necklaces",
    line: "Worn against skin, every day, for years.",
    match: /necklace|pendant|chain|choker/i,
  },
  {
    key: "rings",
    title: "Rings",
    line: "The most handled object you will ever own.",
    match: /ring/i,
  },
  {
    key: "bracelets",
    title: "Bracelets",
    line: "Movement, caught in silver.",
    match: /bracelet|bangle|kada|anklet/i,
  },
];

function priceOf(product: ShopifyProduct) {
  const p = product.priceRange.minVariantPrice;
  return `${p.currencyCode === "INR" ? "₹" : p.currencyCode + " "}${Math.round(
    parseFloat(p.amount),
  ).toLocaleString("en-IN")}`;
}

export function EditorialCollections({ products }: { products: ProductEdge[] }) {
  const all = products.map((p) => p.node);
  const used = new Set<string>();

  const groups = GROUPS.map((g) => {
    const items = all.filter((p) => {
      if (used.has(p.id)) return false;
      const hit = g.match.test(p.title) || g.match.test(p.description ?? "");
      if (hit) used.add(p.id);
      return hit;
    });
    return { ...g, items };
  }).filter((g) => g.items.length > 0);

  const rest = all.filter((p) => !used.has(p.id));
  if (rest.length > 0) {
    groups.push({
      key: "signature",
      title: "The Signature Edit",
      line: "Pieces that don't sit in a category.",
      match: /./,
      items: rest,
    });
  }

  if (groups.length === 0) return null;

  return (
    <section
      id="collection"
      className="border-t border-border/50 bg-background py-24 sm:py-32"
      aria-label="Collections"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          Chapter Four
        </p>
        <h2 className="mt-6 max-w-lg font-heading text-3xl font-normal leading-tight sm:text-5xl">
          Now that you know what&rsquo;s inside.
        </h2>
      </div>

      <div className="mt-16 space-y-6 px-6">
        {groups.map((group, i) => (
          <CollectionRow key={group.key} index={i} title={group.title} line={group.line} items={group.items} />
        ))}
      </div>
    </section>
  );
}

function CollectionRow({
  title,
  line,
  items,
  index,
}: {
  title: string;
  line: string;
  items: ShopifyProduct[];
  index: number;
}) {
  const cover = items.find((p) => p.images.edges.length > 0)?.images.edges[0]?.node;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: Math.min(index * 0.06, 0.24) }}
      className="group relative mx-auto max-w-6xl overflow-hidden rounded-sm bg-muted"
    >
      <div className="relative h-[68vh] min-h-[420px] w-full">
        {cover ? (
          <img
            src={`${cover.url}?width=1600`}
            alt={cover.altText ?? title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-silver-soft" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
          <p className="font-heading text-3xl text-background sm:text-5xl">{title}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/75">{line}</p>

          <div className="mt-8 translate-y-6 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {items.slice(0, 6).map((product) => {
                const img = product.images.edges[0]?.node;
                return (
                  <Link
                    key={product.id}
                    to="/product/$handle"
                    params={{ handle: product.handle }}
                    className="w-36 shrink-0"
                  >
                    <div className="aspect-square overflow-hidden rounded-sm bg-background/90">
                      {img && (
                        <img
                          src={`${img.url}?width=400`}
                          alt={img.altText ?? product.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <p className="mt-2 truncate text-xs text-background">{product.title}</p>
                    <p className="text-xs text-background/70">{priceOf(product)}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
