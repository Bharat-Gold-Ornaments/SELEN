import { Link } from "@tanstack/react-router";
import { Loader2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/categories";
import type { ShopifyProduct } from "@/lib/shopify.server";

export function ProductGrid({ products }: { products: ShopifyProduct[] }) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        New pieces are being finished right now. Check back shortly.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductTile key={p.id} product={p} />
      ))}
    </div>
  );
}

export function ProductTile({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = product.variants.edges[0]?.node;
  const img = product.images.edges[0]?.node;
  const hover = product.images.edges[1]?.node;

  const add = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.handle }}
      className="group block"
      data-product-card
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
        {img && (
          <img
            src={`${img.url}?width=800`}
            alt={img.altText ?? product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
        )}
        {hover && (
          <img
            src={`${hover.url}?width=800`}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        <button
          type="button"
          onClick={add}
          disabled={isLoading || !variant?.availableForSale}
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-sm bg-background/95 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 disabled:opacity-60"
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" />
              {variant?.availableForSale ? "Add to bag" : "Sold out"}
            </>
          )}
        </button>
      </div>
      <p className="mt-4 text-sm leading-snug">{product.title}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
      </p>
    </Link>
  );
}
