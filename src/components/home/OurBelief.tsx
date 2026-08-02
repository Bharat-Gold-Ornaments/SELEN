import { Link } from "@tanstack/react-router";
import { PLACEHOLDER } from "@/lib/placeholders";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

export function OurBelief() {
  return (
    <section className="bg-champagne px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2 lg:gap-28">
        <Reveal>
          <img
            src={PLACEHOLDER.founder}
            alt="SELEN founder at the studio bench"
            loading="lazy"
            width={1200}
            height={1400}
            className="aspect-[4/5] w-full object-cover"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <SectionLabel>Our Belief</SectionLabel>
          <h2 className="mt-6 font-heading text-3xl font-normal leading-[1.15] tracking-tight sm:text-5xl">
            Fine jewellery should not wait for an occasion.
          </h2>
          <div className="mt-8 max-w-md space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              SELEN began with a simple frustration: the pieces we loved most were the ones we wore
              the least. Kept in boxes, saved for weddings, admired twice a year.
            </p>
            <p>
              So we built jewellery on a precious foundation — solid 925 sterling silver, a thick
              20K gold finish, stones set by hand — and then designed it quiet enough to wear on a
              Tuesday.
            </p>
            <p>Made to be worn, not stored.</p>
          </div>
          <Link
            to="/about"
            className="mt-10 inline-block border-b border-foreground/40 pb-1.5 text-[0.65rem] uppercase tracking-[0.32em] transition-colors hover:border-foreground"
          >
            Read our story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
