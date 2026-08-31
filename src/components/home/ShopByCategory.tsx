import { Link } from "@tanstack/react-router";
import { VISIBLE_CATEGORIES } from "@/lib/categories";
import { CATEGORY_IMAGES } from "@/lib/collections";
import { PLACEHOLDER } from "@/lib/placeholders";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

export function ShopByCategory() {
  return (
    <section className="bg-background px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="max-w-2xl">
          <SectionLabel>Shop by Category</SectionLabel>
          <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight text-balance sm:text-5xl">
            Find your piece.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mt-14 grid gap-x-6 gap-y-12 sm:mt-16 sm:gap-x-10 sm:gap-y-16"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
          >
            {VISIBLE_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/collections/$category"
                params={{ category: c.slug }}
                className="group flex flex-col items-center text-center"
              >
                <div className="aspect-square w-full overflow-hidden bg-ivory">
                  <img
                    src={CATEGORY_IMAGES[c.slug] ?? PLACEHOLDER.banner}
                    alt={c.label}
                    loading="lazy"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                  />
                </div>
                <h3 className="mt-7 font-heading text-2xl font-normal tracking-tight transition-colors group-hover:text-primary">
                  {c.label}
                </h3>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
