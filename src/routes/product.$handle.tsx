import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductByHandle } from "@/lib/shopify.functions";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ShoppingBag } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify.functions";

export const Route = createFileRoute("/product/$handle")({
  head: () => ({
    meta: [
      { title: "Product — SELEN" },
      { name: "description", content: "Shop SELEN gold-plated silver jewellery." },
      { property: "og:title", content: "Product — SELEN" },
      { property: "og:description", content: "Shop SELEN gold-plated silver jewellery." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["product", params.handle],
      queryFn: () => getProductByHandle({ data: { handle: params.handle } }),
    });
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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </div>
    </main>
  );
}

function ProductGallery({ product }: { product: ShopifyProduct }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = product.images.edges;
  const selected = images[selectedIndex]?.node;

  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted">
        {selected ? (
          <img
            src={`${selected.url}?width=1200`}
            alt={selected.altText ?? product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`aspect-square overflow-hidden rounded-md border bg-muted ${
                idx === selectedIndex ? "border-primary ring-2 ring-primary" : "border-border"
              }`}
            >
              <img
                src={`${image.node.url}?width=200`}
                alt={image.node.altText ?? product.title}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductInfo({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? "");

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;

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
    <div className="flex flex-col">
      <h1 className="font-heading text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
        {product.title}
      </h1>
      <p className="mt-4 font-heading text-2xl font-medium text-primary">
        {price.currencyCode} {parseFloat(price.amount).toFixed(0)}
      </p>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
        {product.description.split("\n").map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {product.options.length > 0 && product.options.some((o) => o.values.length > 1) && (
        <div className="mt-8 space-y-4">
          {product.options.map((option) => (
            <div key={option.name}>
              <label className="mb-2 block text-sm font-medium">{option.name}</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
          className="w-full sm:w-auto"
          onClick={handleAddToCart}
          disabled={isLoading || !selectedVariant?.availableForSale}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to cart
            </>
          )}
        </Button>
        {!selectedVariant?.availableForSale && (
          <p className="mt-2 text-sm text-muted-foreground">This variant is currently unavailable.</p>
        )}
      </div>
    </div>
  );
}
