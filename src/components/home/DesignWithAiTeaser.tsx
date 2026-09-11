import { Link } from "@tanstack/react-router";
import { PLACEHOLDER } from "@/lib/placeholders";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

/** Homepage teaser leading into the /design-with-ai experience. */
export function DesignWithAiTeaser() {
  return (
    <section className="border-t border-border/50 bg-background px-6 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-[1500px] items-start gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal className="lg:pt-6">
          <SectionLabel>Design With KinMitra AI</SectionLabel>
          <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
            Describe it. Watch it take shape.
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tell us the piece you have in mind — a chain, a stone, a feeling — and see it sketched
            before it&rsquo;s made.
          </p>
          <Link
            to="/design-with-ai"
            className="mt-10 inline-block border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
          >
            Start Designing &rarr;
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center lg:justify-end">
          <img
            src={PLACEHOLDER.kinmitra}
            alt="KinMitra AI design assistant chat, recommending pearl pendant necklace designs"
            loading="lazy"
            width={583}
            height={1125}
            className="w-full max-w-[280px] object-contain"
          />
        </Reveal>
      </div>
    </section>
  );
}
