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
    <section className="bg-ivory px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <SectionLabel>Featured</SectionLabel>
        </Reveal>

        <Reveal delay={0.05} className="mt-14">
          <div className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[720px] overflow-hidden bg-background sm:aspect-[5/4]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={product.id}
                  src={image ? `${image.url}?width=1400` : undefined}
                  alt={image?.altText ?? product.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-contain p-10 sm:p-16"
                />
              </AnimatePresence>
            </div>

            <button
              onClick={() => go(-1)}
              aria-label="Previous product"
              className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-foreground/50 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next product"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-foreground/50 transition-colors hover:text-foreground"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1} />
            </button>
          </div>

          <div className="mt-10 flex justify-center gap-2.5">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`Show ${item.title}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-foreground/70" : "bg-foreground/20"
                }`}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/product/$handle"
              params={{ handle: product.handle }}
              className="font-heading text-2xl font-normal tracking-tight transition-colors hover:text-primary sm:text-3xl"
            >
              {product.title}
            </Link>
            <p className="mt-3 text-sm tracking-wide text-muted-foreground">
              {formatPrice(price.amount, price.currencyCode)}
            </p>
            <Link
              to="/product/$handle"
              params={{ handle: product.handle }}
              className="mt-8 inline-block border-b border-foreground/40 pb-1.5 text-[0.65rem] uppercase tracking-[0.32em] transition-colors hover:border-foreground"
            >
              View Piece
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
