import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductByHandle, getProducts } from "@/lib/shopify.functions";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Info, Loader2 } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify.functions";
import { SiteFooter } from "@/components/home/SiteFooter";
import { StyledTogether } from "@/components/product/StyledTogether";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPhotoNote } from "@/components/product/ProductPhotoNote";
import { RingSizeSelector } from "@/components/product/RingSizeSelector";
import { ColorSwatchSelector } from "@/components/product/ColorSwatchSelector";
import { SuggestionInvite } from "@/components/shop/SuggestionInvite";
import { Reveal } from "@/components/editorial/Reveal";
import { PriceTag } from "@/components/product/PriceTag";
import { isRingSizeOption, RING_SIZE_DISPLAY_RANGE } from "@/lib/ringSize";
import { getColorGallery, isColorOption } from "@/lib/colorOption";
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
    const description = `${name} in BIS hallmarked 925 sterling silver with a 20 Karat gold finish. Made to be worn every day.`;
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
      <SuggestionInvite />
    </main>
  );
}

function ProductView({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaultVariant = variants.find((v) => v.availableForSale) ?? variants[0];
    return Object.fromEntries(
      (defaultVariant?.selectedOptions ?? []).map((o) => [o.name, o.value]),
    );
  });

  const selectedVariant = variants.find((v) =>
    v.selectedOptions.every((o) => selectedOptions[o.name] === o.value),
  );
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const compareAtPrice =
    selectedVariant?.compareAtPrice ?? product.compareAtPriceRange?.minVariantPrice;

  const flatGallery = product.images.edges.map((e) => ({
    url: `${e.node.url}?width=1600`,
    alt: e.node.altText ?? product.title,
  }));

  const colorOptionName = product.options.find((o) => isColorOption(o.name))?.name;
  const selectedColor = colorOptionName ? selectedOptions[colorOptionName] : undefined;
  /**
   * The gallery preview tracks whichever color was last clicked, not just the purchasable
   * selection — so an out-of-stock swatch still shows its own photos even though it can't
   * become the actual selectedOptions value.
   */
  const [previewColor, setPreviewColor] = useState<string | undefined>(selectedColor);
  const galleryColor = previewColor ?? selectedColor;
  const colorGallery = galleryColor
    ? getColorGallery(product.metafields, variants, galleryColor)
    : [];
  const gallery = colorGallery.length > 0 ? colorGallery : flatGallery;

  const intro = parseDescription(product.description);
  // The selected size's own weight (e.g. a ring's "Size 12" vs "Size 14")
  // overrides the static product-level "Weight" spec when present — falls
  // back to that product-wide value for anything without per-size data yet
  // (non-ring products, or a size nobody entered a weight for).
  const specs = buildProductSpecs(product.metafields ?? []).map((spec) =>
    spec.label === "Weight" && selectedVariant?.variantWeight?.value
      ? { ...spec, value: selectedVariant.variantWeight.value }
      : spec,
  );
  const productUrl = `https://selen.in/product/${product.handle}`;

  /**
   * Color ranks above Size: it's the primary choice, so its availability is never narrowed by
   * whatever size happens to be selected (a color out of stock in one size but not another must
   * still show as pickable). Size, being dependent, is narrowed by the currently selected color.
   */
  const optionRank = (name: string) => (isColorOption(name) ? 0 : isRingSizeOption(name) ? 1 : 2);

  /** Values available for one option, given whatever is currently selected on *earlier-ranked* axes. */
  const availableValuesForOption = (optionName: string) => {
    const rank = optionRank(optionName);
    return new Set(
      variants
        .filter((v) => v.availableForSale)
        .filter((v) =>
          v.selectedOptions.every((o) => {
            if (o.name === optionName || optionRank(o.name) > rank) return true;
            return selectedOptions[o.name] === o.value;
          }),
        )
        .map((v) => v.selectedOptions.find((o) => o.name === optionName)?.value)
        .filter((v): v is string => !!v),
    );
  };

  /**
   * Picking a value on one axis can strand the current pick on another axis (e.g. choosing
   * Rose Gold when size 14 only exists in Yellow Gold). When that happens, clear the other
   * choosable options rather than silently keeping a now-invalid combination selected.
   */
  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions((prev) => {
      const attempted = { ...prev, [optionName]: value };
      const hasAvailableMatch = variants.some(
        (v) => v.availableForSale && v.selectedOptions.every((o) => attempted[o.name] === o.value),
      );
      if (hasAvailableMatch) return attempted;

      const cleared = { ...attempted };
      for (const opt of product.options) {
        if (opt.name !== optionName && opt.values.length > 1) delete cleared[opt.name];
      }
      return cleared;
    });
  };

  const handleColorSelect = (optionName: string, color: string) => {
    handleOptionSelect(optionName, color);
    setPreviewColor(color);
  };

  const visibleOptions = product.options
    .filter((o) => isRingSizeOption(o.name) || isColorOption(o.name) || o.values.length > 1)
    .sort((a, b) => optionRank(a.name) - optionRank(b.name));
  const allOptionsChosen = visibleOptions.every((o) => !!selectedOptions[o.name]);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      image: selectedVariant.image,
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
            <ProductPhotoNote productTitle={product.title} />
          </Reveal>
        </div>

        <div>
          <div className="lg:sticky lg:top-28">
            <p className="text-[0.725rem] uppercase tracking-[0.4em] text-muted-foreground">
              925 Silver · 20 Karat Gold Finish
            </p>
            <h1 className="mt-6 font-heading text-3xl font-normal leading-[1.1] tracking-tight sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-5 flex items-center gap-1.5 text-sm tracking-wide text-muted-foreground">
              <PriceTag price={price} compareAtPrice={compareAtPrice} />
              <GstNote />
            </p>

            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">{intro}</p>

            {visibleOptions.length > 0 && (
              <div className="mt-10 space-y-6">
                {visibleOptions.map((option) => {
                  if (isColorOption(option.name)) {
                    return (
                      <div key={option.name}>
                        <label className="mb-2 block text-[0.725rem] uppercase tracking-[0.3em] text-muted-foreground">
                          Color
                        </label>
                        <ColorSwatchSelector
                          colors={option.values}
                          availableColors={availableValuesForOption(option.name)}
                          selected={selectedOptions[option.name]}
                          previewColor={previewColor}
                          onSelect={(color) => handleColorSelect(option.name, color)}
                          onPreview={setPreviewColor}
                          productName={product.title}
                          productUrl={productUrl}
                          variants={variants}
                          metafields={product.metafields}
                        />
                      </div>
                    );
                  }

                  if (isRingSizeOption(option.name)) {
                    return (
                      <div key={option.name} className="mt-2">
                        <label className="mb-2 block text-[0.725rem] uppercase tracking-[0.3em] text-muted-foreground">
                          Size
                        </label>
                        <RingSizeSelector
                          sizes={RING_SIZE_DISPLAY_RANGE}
                          availableSizes={availableValuesForOption(option.name)}
                          selected={selectedOptions[option.name]}
                          onSelect={(size) => handleOptionSelect(option.name, size)}
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={option.name}>
                      <label className="mb-2 block text-[0.725rem] uppercase tracking-[0.3em] text-muted-foreground">
                        {option.name}
                      </label>
                      <select
                        className="w-full border border-input bg-background px-3 py-3 text-sm"
                        onChange={(e) => handleOptionSelect(option.name, e.target.value)}
                        value={selectedOptions[option.name] ?? ""}
                      >
                        {option.values.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
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
                {allOptionsChosen
                  ? "This option is currently unavailable."
                  : "Select all options to continue."}
              </p>
            )}

            <Accordion type="single" collapsible className="mt-14 border-t border-border/70">
              <Panel value="materials" title="Materials">
                <p>
                  A solid core of BIS hallmarked 925 sterling silver, finished with a generous layer
                  of 20 Karat gold. Stones, where present, are hand-set cubic zirconia.
                </p>
              </Panel>
              <Panel value="specifications" title="Product Specifications">
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
                  <p>Specifications for this piece will be added soon.</p>
                )}
              </Panel>
              <Panel value="shipping" title="Shipping & Returns">
                <p>
                  Complimentary insured shipping across India, dispatched within two working days.
                  We offer a 7-day exchange window from the date of delivery for items that are
                  unworn and in their original packaging; we do not offer cash refunds for
                  change-of-mind returns. See our{" "}
                  <Link
                    to="/refund-policy"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Refund & Cancellation Policy
                  </Link>{" "}
                  for full details.
                </p>
              </Panel>
              <Panel value="care" title="Jewellery Care">
                <p>
                  Last on, first off. Keep away from perfume and water, wipe with the enclosed cloth
                  after wear, and store in its pouch. Complimentary refinishing is offered at our
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

function GstNote() {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="GST information"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="text-muted-foreground/70 transition-colors hover:text-foreground"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full z-10 mt-2 w-max max-w-[13rem] -translate-x-1/2 rounded-sm bg-foreground px-2.5 py-1.5 text-[0.7rem] leading-snug text-background shadow-sm"
        >
          Price is inclusive of GST.
        </span>
      )}
    </span>
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

function parseDescription(description: string): string {
  const rest = description.replace(/\s+/g, " ").trim();

  const firstLabel = SPEC_LABELS.map((l) => rest.indexOf(`${l}:`))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];

  return firstLabel !== undefined && firstLabel > 0 ? rest.slice(0, firstLabel).trim() : rest;
}

type ProductMetafield = { key: string; value: string; type: string } | null;

const DIMENSION_UNIT_LABELS: Record<string, string> = {
  MILLIMETERS: "mm",
  CENTIMETERS: "cm",
  METERS: "m",
  INCHES: "in",
  FEET: "ft",
  YARDS: "yd",
};

function formatMetafieldValue(metafield: NonNullable<ProductMetafield>): string | undefined {
  if (metafield.type !== "dimension") return metafield.value || undefined;
  try {
    const { value, unit } = JSON.parse(metafield.value) as { value: number; unit: string };
    return `${value} ${DIMENSION_UNIT_LABELS[unit] ?? unit.toLowerCase()}`;
  } catch {
    return undefined;
  }
}

const SPEC_FIELDS = [
  { key: "short_description", label: "Description" },
  { key: "weight_display", label: "Weight" },
  { key: "stone", label: "Stone" },
  { key: "material", label: "Material" },
  { key: "width_cm", label: "Width" },
  { key: "length_cm", label: "Length" },
];

function buildProductSpecs(
  metafields: ProductMetafield[],
): Array<{ label: string; value: string }> {
  return SPEC_FIELDS.flatMap(({ key, label }) => {
    const metafield = metafields.find((m) => m?.key === key);
    if (!metafield) return [];
    const value = formatMetafieldValue(metafield);
    return value ? [{ label, value }] : [];
  });
}
