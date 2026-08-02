import { Gem, Sparkles, Hammer, Infinity as InfinityIcon } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

const PROMISES = [
  {
    icon: Gem,
    title: "925 Sterling Silver",
    body: "A BIS hallmarked precious core in every single piece.",
  },
  {
    icon: Sparkles,
    title: "20 Karat Gold Plating",
    body: "A generous layer of warm gold, polished by hand.",
  },
  {
    icon: Hammer,
    title: "Thoughtful Craftsmanship",
    body: "Cast, set and finished by people, not machines alone.",
  },
  {
    icon: InfinityIcon,
    title: "Designed to Last",
    body: "Made to be worn daily, cleaned, replated and kept.",
  },
];

/** Quiet reassurance band shown site-wide, directly above the footer. */
export function SelenPromise() {
  return (
    <section className="border-t border-border/50 bg-ivory px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel>The SELEN Promise</SectionLabel>
        </Reveal>
        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <p.icon className="h-5 w-5 text-primary" strokeWidth={1} />
              <h3 className="mt-6 font-heading text-xl font-normal tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
