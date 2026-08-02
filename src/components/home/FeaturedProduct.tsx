import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/categories";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";
import type { ProductEdge } from "@/lib/shopify.server";

export function FeaturedProduct({ products }: { products: ProductEdge[] }) {
  const items = products.slice(0, 5).map((e) => e.node);
  const [index, setIndex] = useState(0);
  if (items.length === 0) return null;

  const product = items[index];
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <section className="w-full bg-ivory">
      <div className="grid w-full lg:min-h-[86vh] lg:grid-cols-[1.35fr_1fr]">
        {/* Full-bleed imagery */}
        <div className="relative overflow-hidden bg-background">
          <AnimatePresence mode="wait">
            <motion.img
              key={product.id}
              src={image ? `${image.url}?width=1800` : undefined}
              alt={image?.altText ?? product.title}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/5] w-full object-contain p-10 sm:aspect-[5/4] sm:p-20 lg:absolute lg:inset-0 lg:h-full lg:aspect-auto"
            />
          </AnimatePresence>

          <button
            onClick={() => go(-1)}
            aria-label="Previous product"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-foreground/40 transition-colors hover:text-foreground sm:left-8"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next product"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-foreground/40 transition-colors hover:text-foreground sm:right-8"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={1} />
          </button>
        </div>

        {/* Editorial detail column */}
        <div className="flex flex-col justify-center px-6 py-20 sm:px-14 sm:py-28 lg:px-20">
          <Reveal>
            <SectionLabel>Featured</SectionLabel>
            <p className="mt-8 text-[0.775rem] uppercase tracking-[0.3em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>

            <Link
              to="/product/$handle"
              params={{ handle: product.handle }}
              className="mt-5 block font-heading text-3xl font-normal leading-[1.1] tracking-tight transition-colors hover:text-primary sm:text-5xl"
            >
              {product.title}
            </Link>

            <p className="mt-5 text-base tracking-wide text-muted-foreground">
              {formatPrice(price.amount, price.currencyCode)}
            </p>

            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              925 sterling silver, finished in 20 Karat gold. Made to be worn every day, not saved for
              later.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link
                to="/product/$handle"
                params={{ handle: product.handle }}
                className="inline-block border-b border-foreground/40 pb-1.5 text-[0.775rem] uppercase tracking-[0.32em] transition-colors hover:border-foreground"
              >
                View Piece
              </Link>
              <Link
                to="/shop"
                className="inline-block border-b border-transparent pb-1.5 text-[0.775rem] uppercase tracking-[0.32em] text-muted-foreground transition-colors hover:text-foreground"
              >
                All Pieces
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap gap-3">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${item.title}`}
                  className={`h-px w-12 transition-colors ${
                    i === index ? "bg-foreground/70" : "bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
