import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "motion/react";
import { getProductByHandle } from "@/lib/shopify.functions";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Loader2 } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify.functions";
import { SiteFooter } from "@/components/home/SiteFooter";
import {
  Care,
  Dimensions,
  Gifting,
  MadeByArtisans,
  MaterialStory,
  Reviews,
  StyleGuide,
  TheDetails,
} from "@/components/product/ProductStory";

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["product", params.handle],
      queryFn: () => getProductByHandle({ data: { handle: params.handle } }),
    });
  },
  head: ({ params }) => {
    const name = params.handle
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const title = `${name} — SELEN`;
    const description = `${name} in BIS hallmarked 925 sterling silver with premium 20K gold plating. Beautiful on the outside, precious on the inside.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-medium">Product not found</h1>
      <p className="mt-2 text-muted-foreground">This piece isn't in the SELEN collection.</p>
    </div>
  ),
});

function ProductDetail() {
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery({
    queryKey: ["product", handle],
    queryFn: () => getProductByHandle({ data: { handle } }),
  });

  if (!product) return null;

  return (
    <main className="bg-background">
      <ProductHero product={product} />
      <TheDetails product={product} />
      <Dimensions product={product} />
      <MaterialStory />
      <MadeByArtisans />
      <StyleGuide />
      <Gifting />
      <Care />
      <Reviews product={product} />
      <SiteFooter />
    </main>
  );
}

function ProductHero({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? "");
  const [imageIndex, setImageIndex] = useState(0);

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const images = product.images.edges;
  const hero = images[imageIndex]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });
  };

  const formatted = `${price.currencyCode === "INR" ? "₹" : price.currencyCode + " "}${Math.round(
    parseFloat(price.amount),
  ).toLocaleString("en-IN")}`;

  return (
    <section className="bg-background px-6 pb-20 pt-14 sm:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex aspect-square items-center justify-center rounded-sm bg-ivory"
          >
            {hero ? (
              <img
                src={`${hero.url}?width=1400`}
                alt={hero.altText ?? product.title}
                className="max-h-[78%] max-w-[78%] object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.16)]"
              />
            ) : (
              <span className="text-muted-foreground">No image</span>
            )}
          </motion.div>

          {images.length > 1 && (
            <div className="mt-5 flex gap-3">
              {images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`h-16 w-16 overflow-hidden rounded-sm border bg-ivory transition-opacity ${
                    idx === imageIndex ? "border-foreground" : "border-transparent opacity-60"
                  }`}
                >
                  <img
                    src={`${image.node.url}?width=200`}
                    alt={image.node.altText ?? product.title}
                    className="h-full w-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
            925 Silver · 20K Gold Plated
          </p>
          <h1 className="mt-6 font-heading text-4xl font-normal leading-[1.1] sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-6 font-heading text-2xl text-foreground/80">{formatted}</p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
            {product.description
              .split("\n")
              .filter(Boolean)
              .slice(0, 3)
              .map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
          </div>

          {product.options.length > 0 &&
            product.options.some((o) => o.values.length > 1) && (
              <div className="mt-8 space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="mb-2 block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                      {option.name}
                    </label>
                    <select
                      className="w-full rounded-sm border border-input bg-background px-3 py-3 text-sm"
                      onChange={(e) => setSelectedVariantId(e.target.value)}
                      value={selectedVariantId}
                    >
                      {variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.selectedOptions.find((o) => o.name === option.name)?.value ??
                            variant.title}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

          <div className="mt-10">
            <Button
              size="lg"
              className="w-full rounded-none py-6 text-[0.7rem] uppercase tracking-[0.3em] sm:w-auto sm:px-12"
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to bag"}
            </Button>
            {!selectedVariant?.availableForSale && (
              <p className="mt-3 text-sm text-muted-foreground">
                This variant is currently unavailable.
              </p>
            )}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            BIS hallmarked 925 sterling silver core · premium 20K gold plating · hand-set CZ
          </p>
        </motion.div>
      </div>
    </section>
  );
}
