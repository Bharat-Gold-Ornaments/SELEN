import { Gem, Sparkles, HeartHandshake, Sun } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

const CARDS = [
  {
    icon: Gem,
    title: "925 Sterling Silver",
    body: "A solid, BIS hallmarked precious core — never brass, never plated base metal.",
  },
  {
    icon: Sparkles,
    title: "20K Gold Plating",
    body: "A generous layer of warm gold, applied by hand and polished to a soft shine.",
  },
  {
    icon: HeartHandshake,
    title: "Hypoallergenic",
    body: "Nickel-free and gentle, made for skin that is worn against all day.",
  },
  {
    icon: Sun,
    title: "Everyday Luxury",
    body: "Designed for mornings and dinners alike. Nothing to save for later.",
  },
];

export function WhySelen() {
  return (
    <section className="bg-background px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-3xl">
          <SectionLabel>Why SELEN</SectionLabel>
          <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight text-balance whitespace-nowrap sm:text-5xl">
            Quality you can feel before you see.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.07}>
              <div className="border-t border-border/70 pt-8">
                <card.icon className="h-5 w-5 text-primary" strokeWidth={1} />
                <h3 className="mt-6 font-heading text-xl font-normal tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
