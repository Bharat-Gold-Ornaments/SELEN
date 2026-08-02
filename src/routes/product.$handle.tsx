import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductByHandle, getProducts } from "@/lib/shopify.functions";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Loader2 } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify.functions";
import { SiteFooter } from "@/components/home/SiteFooter";
import { StyledTogether } from "@/components/product/StyledTogether";
import { ProductGallery } from "@/components/product/ProductGallery";
import { Reveal } from "@/components/editorial/Reveal";
import { EDITORIAL_FALLBACKS } from "@/lib/placeholders";
import { formatPrice } from "@/lib/categories";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const productsQuery = {
  queryKey: ["products"],
  queryFn: () => getProducts({ data: {} }),
};

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ params, context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ["product", params.handle],
        queryFn: () => getProductByHandle({ data: { handle: params.handle } }),
      }),
      context.queryClient.ensureQueryData(productsQuery),
    ]);
  },
  head: ({ params }) => {
    const name = params.handle
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const title = `${name} — SELEN`;
    const description = `${name} in BIS hallmarked 925 sterling silver with 20 Karat gold plating. Made to be worn every day.`;
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
    <div className="mx-auto max-w-3xl px-6 py-40 text-center">
      <h1 className="font-heading text-3xl font-normal">Piece not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This piece isn&rsquo;t part of the SELEN collection.
      </p>
    </div>
  ),
});

function ProductDetail() {
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery({
    queryKey: ["product", handle],
    queryFn: () => getProductByHandle({ data: { handle } }),
  });
  const { data: all } = useSuspenseQuery(productsQuery);

  if (!product) return null;

  const related = all
    .map((e) => e.node)
    .filter((p) => p.handle !== product.handle)
    .slice(0, 4);

  return (
    <main className="bg-background">
      <ProductView product={product} />
      <StyledTogether products={related} />
      <SiteFooter />
    </main>
  );
}

function ProductView({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? "");

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;

  /** Hero, lifestyle, detail, alternate angle, dimensions — topped up with editorial placeholders. */
  const shopifyImages = product.images.edges.map((e) => ({
    url: `${e.node.url}?width=1600`,
    alt: e.node.altText ?? product.title,
  }));
  const gallery = [
    ...shopifyImages,
    ...EDITORIAL_FALLBACKS.map((url) => ({ url, alt: "" })),
  ].slice(0, 5);

  const { intro, specs } = parseDescription(product.description);

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

  return (
    <section className="mx-auto max-w-[1600px] px-6 pt-10 sm:px-10 sm:pt-16">
      <div className="grid gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <ProductGallery images={gallery} title={product.title} />
          </Reveal>
        </div>

        <div>
          <div className="lg:sticky lg:top-28">
            <p className="text-[0.725rem] uppercase tracking-[0.4em] text-muted-foreground">
              925 Silver · 20 Karat Gold Plated
            </p>
            <h1 className="mt-6 font-heading text-3xl font-normal leading-[1.1] tracking-tight sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-5 text-sm tracking-wide text-muted-foreground">
              {formatPrice(price.amount, price.currencyCode)}
            </p>

            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">{intro}</p>

            {product.options.length > 0 && product.options.some((o) => o.values.length > 1) && (
              <div className="mt-10 space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="mb-2 block text-[0.725rem] uppercase tracking-[0.3em] text-muted-foreground">
                      {option.name}
                    </label>
                    <select
                      className="w-full border border-input bg-background px-3 py-3 text-sm"
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

            <Button
              size="lg"
              className="mt-10 w-full rounded-none py-6 text-[0.775rem] uppercase tracking-[0.3em]"
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to bag"}
            </Button>
            {!selectedVariant?.availableForSale && (
              <p className="mt-3 text-xs text-muted-foreground">
                This option is currently unavailable.
              </p>
            )}

            <Accordion type="single" collapsible className="mt-14 border-t border-border/70">
              <Panel value="materials" title="Materials">
                <p>
                  A solid core of BIS hallmarked 925 sterling silver, finished with a generous layer
                  of 20 Karat gold. Stones, where present, are hand-set cubic zirconia.
                </p>
              </Panel>
              <Panel value="dimensions" title="Dimensions">
                {specs.length > 0 ? (
                  <dl className="space-y-2">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between gap-6">
                        <dt className="text-muted-foreground">{spec.label}</dt>
                        <dd className="text-right">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p>Full measurements are shown in the dimensions illustration in the gallery.</p>
                )}
              </Panel>
              <Panel value="shipping" title="Shipping & Returns">
                <p>
                  Complimentary insured shipping across India, dispatched within two working days.
                  Returns accepted within 14 days, unworn and in the original box.
                </p>
              </Panel>
              <Panel value="care" title="Jewellery Care">
                <p>
                  Last on, first off. Keep away from perfume and water, wipe with the enclosed cloth
                  after wear, and store in its pouch. Complimentary replating is offered at our
                  boutique.
                </p>
              </Panel>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  value,
  title,
  children,
}: {
  value: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={value} className="border-b border-border/70">
      <AccordionTrigger className="py-5 text-[0.745rem] uppercase tracking-[0.28em] hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

const SPEC_LABELS = ["Material", "Stone", "Weight", "Dimensions", "SKU", "Finish", "Closure"];

function parseDescription(description: string) {
  const rest = description.replace(/\s+/g, " ").trim();
  const specs: Array<{ label: string; value: string }> = [];

  const firstLabel = SPEC_LABELS.map((l) => rest.indexOf(`${l}:`))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];

  let intro = rest;
  if (firstLabel !== undefined && firstLabel > 0) {
    intro = rest.slice(0, firstLabel).trim();
    const tail = rest.slice(firstLabel);
    const parts = tail.split(new RegExp(`(?=(?:${SPEC_LABELS.join("|")}):)`));
    for (const part of parts) {
      const match = part.match(/^([A-Za-z ]+):\s*(.+)$/);
      if (match) specs.push({ label: match[1].trim(), value: match[2].trim() });
    }
  }

  return { intro, specs };
}
