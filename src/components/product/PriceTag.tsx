import { formatPrice, getDiscountPercent } from "@/lib/categories";

type Money = { amount: string; currencyCode: string };

/**
 * Renders a bare formatted price when there's no discount, or an offer price with a
 * struck-through original and a "-N%" badge when compareAtPrice reflects a real discount.
 * Inline (not block-level) so callers keep their own text-size classes on the wrapping element.
 */
export function PriceTag({
  price,
  compareAtPrice,
}: {
  price: Money;
  compareAtPrice?: Money | null;
}) {
  const discount = getDiscountPercent(price, compareAtPrice);

  if (!discount || !compareAtPrice) {
    return <>{formatPrice(price.amount, price.currencyCode)}</>;
  }

  return (
    <span className="inline-flex flex-wrap items-baseline gap-2">
      <span className="font-semibold text-foreground">
        {formatPrice(price.amount, price.currencyCode)}
      </span>
      <span className="text-muted-foreground/60 line-through">
        {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
      </span>
      <span className="rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-primary-foreground">
        -{discount}%
      </span>
    </span>
  );
}
