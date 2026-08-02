import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/categories";
import { PLACEHOLDER } from "@/lib/placeholders";
import { MascotEmptyState } from "@/components/mascot/Mascot";
import type { ShopifyProduct } from "@/lib/shopify.server";

export function ProductGrid({ products }: { products: ShopifyProduct[] }) {
  if (products.length === 0) {
    return (
      <MascotEmptyState
        pose="shrug"
        title="Nothing Here Yet"
      >
        <Link
          to="/shop"
          className="border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
        >
          Browse All Jewellery →
        </Link>
      </MascotEmptyState>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-16 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-24">
      {products.map((p) => (
        <ProductTile key={p.id} product={p} />
      ))}
    </div>
  );
}

export function ProductTile({ product }: { product: ShopifyProduct }) {
  const img = product.images.edges[0]?.node;
  const hover = product.images.edges[1]?.node;
  const price = product.priceRange.minVariantPrice;

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.handle }}
      className="group block"
      data-product-card
    >
      <div className="relative aspect-square overflow-hidden bg-ivory">
        {img ? (
          <img
            src={`${img.url}?width=900`}
            alt={img.altText ?? product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-opacity duration-[900ms] ease-out group-hover:opacity-0"
          />
        ) : (
          <img src={PLACEHOLDER.collection1} alt="" className="h-full w-full object-cover" />
        )}
        <img
          src={hover ? `${hover.url}?width=900` : PLACEHOLDER.lifestyle}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[900ms] ease-out group-hover:opacity-100"
        />
      </div>
      <p className="mt-6 font-heading text-lg leading-snug tracking-tight">{product.title}</p>
      <p className="mt-1.5 text-[0.8rem] tracking-wide text-muted-foreground">
        {formatPrice(price.amount, price.currencyCode)}
      </p>
    </Link>
  );
}
