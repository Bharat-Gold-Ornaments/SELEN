import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Award, ShieldCheck, Sparkles, Heart, Gem, Leaf, Check, X } from "lucide-react";

const trust = [
  { icon: Award, label: "Real Precious Metal" },
  { icon: ShieldCheck, label: "BIS Hallmarked" },
  { icon: Sparkles, label: "20K Gold Plating" },
  { icon: Heart, label: "Everyday Wear" },
];

const pillars = [
  { icon: Gem, title: "Real Precious Metal", copy: "Silver with worth beyond its beauty." },
  { icon: Sparkles, title: "Beauty That Lasts", copy: "A stronger base holds gold longer." },
  { icon: Leaf, title: "Comfortable for You", copy: "Kind to skin, made for daily wear." },
  { icon: ShieldCheck, title: "Certified to Trust", copy: "Every piece is BIS hallmarked." },
];

const others = [
  "Thin plating over brass",
  "Wears off with time",
  "Can irritate skin",
  "No metal value",
];

const selen = [
  "20K gold over 925 silver",
  "Built to last",
  "Kind to sensitive skin",
  "Retains precious value",
];

function Rule() {
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <span className="h-px w-16 bg-gold/50" />
      <span className="rotate-45 text-[0.5rem] text-gold-deep">◆</span>
      <span className="h-px w-16 bg-gold/50" />
    </div>
  );
}

export function BeneathTheGold() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const cut = useTransform(scrollYProgress, [0.1, 0.55], [0, 1]);
  const goldShift = useTransform(cut, [0, 1], [0, -26]);
  const coreOpacity = useTransform(cut, [0.15, 0.6], [0, 1]);
  const labelTop = useTransform(cut, [0.2, 0.6], [0, 1]);
  const labelBottom = useTransform(cut, [0.45, 0.85], [0, 1]);

  return (
    <section className="bg-ivory" aria-label="What's beneath the gold">
      {/* Act 1 — sticky cinematic reveal */}
      <div ref={ref} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-deep">
                Why 925 sterling silver?
              </p>
              <h2 className="mt-6 font-heading text-4xl font-normal leading-[1.05] sm:text-6xl">
                What&rsquo;s Beneath
                <br />
                the Gold?
              </h2>
              <div className="mt-8">
                <Rule />
              </div>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
                Gold-plated jewellery all looks alike. The difference is the metal underneath.
              </p>

              <ul className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {trust.map(({ icon: Icon, label }) => (
                  <li key={label} className="text-center sm:text-left">
                    <Icon className="mx-auto h-5 w-5 text-gold-deep sm:mx-0" strokeWidth={1.2} />
                    <p className="mt-3 text-[0.7rem] leading-snug text-muted-foreground">{label}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cross-section visual */}
            <div className="relative mx-auto flex h-[340px] w-full max-w-md items-center justify-center">
              <motion.div style={{ rotate }} className="relative h-[220px] w-[260px]" aria-hidden>
                <motion.div
                  style={{ y: goldShift }}
                  className="absolute inset-x-0 top-[46px] h-[26px] rounded-full bg-[linear-gradient(90deg,var(--gold-soft),var(--gold),var(--gold-deep))] shadow-[0_10px_30px_-12px_var(--gold-deep)]"
                />
                <motion.div
                  style={{ opacity: coreOpacity }}
                  className="absolute inset-x-0 top-[92px] h-[54px] rounded-md bg-[linear-gradient(90deg,var(--silver-soft),var(--silver),var(--silver-deep))]"
                />
                <motion.div
                  style={{ y: useTransform(goldShift, (v) => -v) }}
                  className="absolute inset-x-0 top-[158px] h-[26px] rounded-full bg-[linear-gradient(90deg,var(--gold-soft),var(--gold),var(--gold-deep))] shadow-[0_10px_30px_-12px_var(--gold-deep)]"
                />
              </motion.div>

              <motion.div
                style={{ opacity: labelTop }}
                className="absolute left-0 top-4 max-w-[150px]"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-gold-deep">
                  20K Gold Plating
                </p>
                <p className="mt-1 text-xs text-muted-foreground">A premium layer of lasting shine.</p>
              </motion.div>

              <motion.div
                style={{ opacity: labelBottom }}
                className="absolute bottom-4 right-0 max-w-[160px] text-right"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-silver-deep">
                  925 Sterling Silver
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  A precious core, BIS hallmarked.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Act 2 — pillars */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, copy }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-background px-7 py-10 text-center"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/40">
                <Icon className="h-5 w-5 text-gold-deep" strokeWidth={1.2} />
              </span>
              <p className="mt-5 font-heading text-lg">{title}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Act 3 — comparison */}
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-center text-[0.6rem] uppercase tracking-[0.35em] text-gold-deep">
          The difference you can&rsquo;t see, but can feel
        </p>

        <div className="mt-12 grid items-start gap-10 sm:grid-cols-[1fr_auto_1fr]">
          <div>
            <p className="text-center font-heading text-xl">Most Fashion Jewellery</p>
            <div className="mt-5 h-16 rounded-sm bg-[linear-gradient(180deg,var(--gold)_0_10%,oklch(0.55_0.07_75)_10%_100%)]" />
            <ul className="mt-6 space-y-3">
              {others.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" strokeWidth={1.5} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto flex h-14 w-14 items-center justify-center self-center rounded-full border border-gold/50 text-xs uppercase tracking-widest text-gold-deep">
            vs
          </div>

          <div>
            <p className="text-center font-heading text-xl">SELEN Jewellery</p>
            <div className="mt-5 h-16 rounded-sm bg-[linear-gradient(180deg,var(--gold)_0_10%,var(--silver-soft)_10%_100%)]" />
            <ul className="mt-6 space-y-3">
              {selen.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Act 4 — closing */}
      <div className="border-t border-border/60 px-6 py-24 text-center">
        <p className="font-heading text-3xl leading-tight sm:text-5xl">
          Beautiful on the outside.
        </p>
        <p className="mt-2 font-heading text-3xl italic leading-tight text-gold-deep sm:text-5xl">
          Precious on the inside.
        </p>
        <div className="mt-8 flex justify-center">
          <Rule />
        </div>
        <a
          href="#collection"
          className="mt-10 inline-flex items-center gap-3 rounded-sm bg-foreground px-8 py-4 text-[0.65rem] uppercase tracking-[0.3em] text-background transition-opacity hover:opacity-90"
        >
          Explore the collection →
        </a>
      </div>
    </section>
  );
}
