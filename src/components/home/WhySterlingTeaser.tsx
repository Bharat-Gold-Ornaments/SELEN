import { Link } from "@tanstack/react-router";
import { PLACEHOLDER } from "@/lib/placeholders";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

/** Homepage teaser leading into the dedicated /why-sterling-silver story. */
export function WhySterlingTeaser() {
  return (
    <section className="border-t border-border/50 bg-background px-6 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <SectionLabel>Why Sterling Silver?</SectionLabel>
          <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
            What&rsquo;s beneath the gold?
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Most gold jewellery hides brass. Ours hides silver — BIS hallmarked 925,
            precious all the way through, then finished in 20 Karat gold.
          </p>
          <Link
            to="/why-sterling-silver"
            className="mt-10 inline-block border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
          >
            Read the Story
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <img
            src={PLACEHOLDER.sterlingTeaser}
            alt="A gold plated sterling silver ring resting on ivory linen"
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
