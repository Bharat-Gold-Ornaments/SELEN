import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Gem, HeartHandshake, Recycle, ShieldCheck, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";
import { PLACEHOLDER } from "@/lib/placeholders";
import ringCutaway from "@/assets/ring-cutaway.jpg";

const TITLE = "Why Sterling Silver — What's Beneath the Gold | SELEN";
const DESCRIPTION =
  "Inside every SELEN piece: BIS hallmarked 925 sterling silver finished in 20K gold. Why a precious core outlasts brass, and what that means for your skin and your money.";

export const Route = createFileRoute("/why-sterling-silver")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhySterlingSilver,
});

const BENEFITS = [
  {
    icon: BadgeCheck,
    title: "Certified 925 Silver",
    body: "92.5% fine silver, verified independently rather than claimed by us.",
  },
  {
    icon: Sparkles,
    title: "Premium 20K Gold",
    body: "A generous plating layer — warmer, deeper and far more durable than a flash coat.",
  },
  {
    icon: Gem,
    title: "Precious Throughout",
    body: "The metal under the gold is valuable in its own right. Nothing hollow, nothing hidden.",
  },
  {
    icon: HeartHandshake,
    title: "Kind to Skin",
    body: "Nickel-conscious and hypoallergenic, made for skin that wears it all day.",
  },
  {
    icon: ShieldCheck,
    title: "BIS Hallmarked",
    body: "Every piece carries an official mark you can check for yourself.",
  },
  {
    icon: Recycle,
    title: "A Second Life",
    body: "Silver can be cleaned, replated, resized and repaired. Brass simply wears out.",
  },
];

const LAYERS = [
  { label: "20K Gold Plating", detail: "The warmth you see — hand polished, generously applied." },
  { label: "925 Sterling Silver", detail: "The precious core — hallmarked, solid, repairable." },
  { label: "Hand Finishing", detail: "Edges smoothed and stones seated by a person, not a press." },
];

function WhySterlingSilver() {
  return (
    <main className="bg-background">
      <section className="bg-ivory px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="max-w-3xl">
            <SectionLabel>Why Sterling Silver</SectionLabel>
            <h1 className="mt-8 font-heading text-4xl font-normal leading-[1.08] tracking-tight sm:text-6xl">
              What&rsquo;s beneath the gold?
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Almost all gold-toned fashion jewellery is brass underneath. It looks the same
              on day one. It does not look the same on day two hundred.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <img
              src={ringCutaway}
              alt="Cross-section of a SELEN ring showing 20K gold plating over a 925 sterling silver core"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>Inside a SELEN piece</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Three layers, in order.
            </h2>
            <ol className="mt-12 space-y-10">
              {LAYERS.map((layer, i) => (
                <li key={layer.label} className="border-t border-border/70 pt-6">
                  <p className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-heading text-xl font-normal tracking-tight">
                    {layer.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {layer.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 bg-ivory px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="max-w-3xl">
            <SectionLabel>The difference</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
              Seven reasons it matters.
            </h2>
          </Reveal>
          <div className="mt-20 grid gap-x-14 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="border-t border-border/70 pt-8">
                  <b.icon className="h-5 w-5 text-primary" strokeWidth={1} />
                  <h3 className="mt-6 font-heading text-xl font-normal tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="border-t border-border/70 pt-8">
                <p className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                  And finally
                </p>
                <h3 className="mt-6 font-heading text-xl font-normal tracking-tight">
                  Value that stays
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Silver holds worth. What you buy is an object, not an impression of one.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 px-6 py-24 sm:px-10 sm:py-36">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <img
              src={PLACEHOLDER.lifestyle}
              alt="A SELEN piece worn in daylight"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
              Beautiful on the outside. Precious on the inside.
            </h2>
            <div className="mt-10 flex flex-wrap gap-8">
              <Link
                to="/shop"
                className="border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
              >
                Browse All Jewellery &rarr;
              </Link>
              <Link
                to="/materials"
                className="border-b border-transparent pb-1 text-[0.745rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Material Library
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
