import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/categories";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";
import type { ShopifyProduct } from "@/lib/shopify.server";

export function StyledTogether({ products }: { products: ShopifyProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-background px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel>Styled Together</SectionLabel>
          <h2 className="mt-5 font-heading text-2xl font-normal tracking-tight sm:text-4xl">
            Pairs beautifully with
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:gap-x-10 lg:grid-cols-4">
          {products.map((p, i) => {
            const img = p.images.edges[0]?.node;
            const price = p.priceRange.minVariantPrice;
            return (
              <Reveal key={p.id} delay={i * 0.06}>
                <Link to="/product/$handle" params={{ handle: p.handle }} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-ivory">
                    {img && (
                      <img
                        src={`${img.url}?width=800`}
                        alt={img.altText ?? p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <p className="mt-5 font-heading text-lg tracking-tight">{p.title}</p>
                  <p className="mt-1.5 text-[0.8rem] text-muted-foreground">
                    {formatPrice(price.amount, price.currencyCode)}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
