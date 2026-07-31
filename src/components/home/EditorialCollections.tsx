import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ProductTile } from "@/components/ProductGrid";
import { groupByCategory } from "@/lib/categories";
import type { ProductEdge } from "@/lib/shopify.server";

export function EditorialCollections({ products }: { products: ProductEdge[] }) {
  const { groups, rest } = groupByCategory(products);
  const sections = [
    ...groups,
    ...(rest.length
      ? [{ category: { slug: "shop", label: "More from SELEN", line: "Pieces that don't sit in one category.", match: /./ }, items: rest }]
      : []),
  ];

  if (sections.length === 0) return null;

  return (
    <section
      id="collection"
      className="border-t border-border/50 bg-background py-20 sm:py-28"
      aria-label="Shop collections"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-heading text-3xl font-normal leading-tight sm:text-4xl">
          Shop the collection
        </h2>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          925 sterling silver, 20K gold plated, ready to ship.
        </p>

        {sections.map((section, i) => (
          <motion.div
            key={section.category.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.2) }}
            className="mt-16"
          >
            <div className="flex items-end justify-between gap-6 border-b border-border/60 pb-4">
              <div>
                <h3 className="font-heading text-2xl">{section.category.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{section.category.line}</p>
              </div>
              {section.category.slug === "shop" ? (
                <Link to="/shop" className="shrink-0 text-[0.65rem] uppercase tracking-[0.2em] underline-offset-4 hover:underline">
                  View all →
                </Link>
              ) : (
                <Link
                  to="/collections/$category"
                  params={{ category: section.category.slug }}
                  className="shrink-0 text-[0.65rem] uppercase tracking-[0.2em] underline-offset-4 hover:underline"
                >
                  View all →
                </Link>
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {section.items.map((p) => (
                <ProductTile key={p.id} product={p} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
