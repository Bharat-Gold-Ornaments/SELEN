import { Link } from "@tanstack/react-router";
import { EDITORIAL_COLLECTIONS } from "@/lib/collections";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

export function EditorialCollections() {
  return (
    <section id="collections" className="bg-background px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="max-w-xl">
          <SectionLabel>The Collections</SectionLabel>
          <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
            Chosen for a mood, not a category.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-x-10 gap-y-20 sm:mt-28 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-28">
          {EDITORIAL_COLLECTIONS.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <Link
                to="/collections/$category"
                params={{ category: c.slug }}
                className="group block"
              >
                <div className="overflow-hidden bg-ivory">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    width={1200}
                    height={1500}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-7 font-heading text-2xl font-normal tracking-tight">{c.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {c.line}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
