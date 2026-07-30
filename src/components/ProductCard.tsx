import { Link } from "@tanstack/react-router";
import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify.functions";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const firstVariant = product.variants.edges[0]?.node;
  const firstImage = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });
  };

  const imageUrl = firstImage ? `${firstImage.url}?width=600` : null;

  return (
    <Link to="/product/$handle" params={{ handle: product.handle }} className="group block" data-product-card>
      <article className="bg-card text-card-foreground flex flex-col overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={firstImage?.altText ?? product.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-heading text-lg leading-snug">{product.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="font-heading text-lg font-medium">
              {price.currencyCode} {parseFloat(price.amount).toFixed(0)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant?.availableForSale}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}
