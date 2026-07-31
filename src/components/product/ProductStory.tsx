import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import type { ShopifyProduct } from "@/lib/shopify.server";

/* ─────────────────────────── The Details ─────────────────────────── */

const LAYERS = [
  {
    id: "gold",
    label: "20K Gold Plating",
    copy: "A whisper-thin layer of warm 20K gold, electroplated over precious metal — never over brass.",
    swatch: "bg-gold",
  },
  {
    id: "silver",
    label: "925 Sterling Silver",
    copy: "A solid BIS hallmarked core. 92.5% fine silver, all the way through.",
    swatch: "bg-silver",
  },
  {
    id: "stone",
    label: "Hand-set CZ",
    copy: "Well-graded cubic zirconia, seated by a setter rather than glued into place.",
    swatch: "bg-background ring-1 ring-inset ring-foreground/40",
  },
];

export function TheDetails({ product }: { product: ShopifyProduct }) {
  const [active, setActive] = useState(LAYERS[0].id);
  const image = product.images.edges[0]?.node;
  const current = LAYERS.find((l) => l.id === active)!;

  return (
    <Section eyebrow="The details" title="Three materials, in order.">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-sm bg-ivory">
          {image && (
            <motion.img
              src={`${image.url}?width=1200`}
              alt={image.altText ?? product.title}
              animate={{ scale: active === "stone" ? 1.18 : 1.02, rotate: active === "silver" ? -3 : 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-contain p-10"
            />
          )}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-80px_120px_-90px_rgba(0,0,0,0.35)]" />
        </div>

        <div>
          <ul className="space-y-px overflow-hidden rounded-sm bg-border/60">
            {LAYERS.map((layer) => (
              <li key={layer.id}>
                <button
                  onMouseEnter={() => setActive(layer.id)}
                  onFocus={() => setActive(layer.id)}
                  onClick={() => setActive(layer.id)}
                  className={`flex w-full items-center gap-4 px-6 py-6 text-left transition-colors ${
                    active === layer.id ? "bg-ivory" : "bg-background"
                  }`}
                >
                  <span className={`h-3 w-3 rounded-full ${layer.swatch}`} />
                  <span className="font-heading text-xl">{layer.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              {current.copy}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────── Dimensions ─────────────────────────── */

const SCALES = [
  { id: "hand", label: "In hand", size: 0.55 },
  { id: "ear", label: "On ear", size: 0.3 },
];

export function Dimensions({ product }: { product: ShopifyProduct }) {
  const [scale, setScale] = useState(SCALES[0]);
  const image = product.images.edges[0]?.node;

  return (
    <Section eyebrow="Dimensions" title="See it at real size." tone="ivory">
      <div className="flex flex-wrap gap-3">
        {SCALES.map((s) => (
          <button
            key={s.id}
            onClick={() => setScale(s)}
            className={`rounded-full border px-5 py-2 text-[0.65rem] uppercase tracking-[0.25em] transition-colors ${
              scale.id === s.id
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-12 flex h-[360px] items-center justify-center rounded-sm border border-border/60 bg-background">
        {image && (
          <motion.img
            src={`${image.url}?width=800`}
            alt={`${product.title} shown ${scale.label.toLowerCase()}`}
            animate={{ scale: scale.size }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[300px] object-contain"
          />
        )}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Shown relative to average proportions. Exact measurements are listed in the piece
        description.
      </p>
    </Section>
  );
}

/* ─────────────────────────── Material story ─────────────────────────── */

export function MaterialStory() {
  const [open, setOpen] = useState(false);

  return (
    <Section eyebrow="Material story" title="What's beneath the gold.">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative mx-auto flex h-[320px] w-full max-w-md flex-col items-center justify-center"
        aria-label="Open the cross-section"
      >
        <motion.div
          animate={{ y: open ? -74 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-10 w-56 rounded-t-full bg-gold"
        />
        <motion.div
          animate={{ scaleY: open ? 1 : 0.35, opacity: open ? 1 : 0.9 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-16 w-56 origin-center bg-silver"
        />
        <motion.div
          animate={{ y: open ? 74 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-10 w-56 rounded-b-full bg-gold"
        />
      </button>

      <div className="mt-4 text-center text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
        {open ? "Tap to close" : "Tap to open"}
      </div>

      <p className="mx-auto mt-10 max-w-md text-center font-heading text-2xl leading-snug">
        Beautiful on the outside. Precious on the inside.
      </p>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link to="/materials" className="underline underline-offset-4">
          Read the Material Library
        </Link>
      </p>
    </Section>
  );
}

/* ─────────────────────────── Artisans ─────────────────────────── */

export function MadeByArtisans() {
  const steps = [
    { title: "Cast", copy: "Molten silver poured, cooled, and cut from the tree by hand." },
    { title: "Set", copy: "Each stone seated individually, then checked under a loupe." },
    { title: "Finish", copy: "Filed, buffed and polished until the edges disappear." },
  ];

  return (
    <Section eyebrow="Made by artisans" title="Hands, not factories." tone="ivory">
      <div className="grid gap-px overflow-hidden rounded-sm bg-border/60 sm:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="bg-background p-8"
          >
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              0{i + 1}
            </p>
            <p className="mt-4 font-heading text-2xl">{s.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────── Style guide ─────────────────────────── */

const OCCASIONS = [
  { id: "everyday", label: "Everyday", copy: "Linen shirt, bare skin, hair down. Let the piece be the only detail." },
  { id: "work", label: "Work", copy: "Tailored shoulders and a low bun — the gold reads as intention, not decoration." },
  { id: "evening", label: "Evening", copy: "Deep neckline, swept-back hair, nothing else on the ear." },
  { id: "celebration", label: "Celebration", copy: "Silk, warm light and a second piece from the same family." },
];

export function StyleGuide() {
  const [active, setActive] = useState(OCCASIONS[0]);

  return (
    <Section eyebrow="Style guide" title="Wear this with…">
      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <ul className="space-y-2">
          {OCCASIONS.map((o) => (
            <li key={o.id}>
              <button
                onClick={() => setActive(o)}
                className={`w-full border-l-2 py-3 pl-5 text-left font-heading text-xl transition-colors ${
                  active.id === o.id
                    ? "border-gold text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
        <AnimatePresence mode="wait">
          <motion.p
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="max-w-lg self-center font-heading text-2xl leading-snug text-foreground/85 sm:text-3xl"
          >
            {active.copy}
          </motion.p>
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ─────────────────────────── Gifting ─────────────────────────── */

export function Gifting() {
  const [open, setOpen] = useState(false);

  return (
    <Section eyebrow="Gifting" title="It arrives ready." tone="ivory">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="relative mx-auto flex h-[340px] w-full max-w-sm cursor-pointer items-end justify-center"
      >
        <motion.div
          animate={{ rotateX: open ? -110 : 0, y: open ? -30 : 0 }}
          style={{ transformOrigin: "bottom center", transformPerspective: 800 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-[170px] z-20 h-24 w-64 rounded-sm bg-foreground/90"
        />
        <motion.div
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 20 }}
          transition={{ duration: 0.7, delay: open ? 0.25 : 0 }}
          className="absolute bottom-[120px] z-10 w-52 rounded-sm bg-background p-5 text-center shadow-lg"
        >
          <p className="font-heading text-base italic">
            &ldquo;Wear it often.&rdquo;
          </p>
        </motion.div>
        <div className="relative z-0 h-40 w-64 rounded-sm bg-foreground/80" />
      </div>
      <p className="mt-8 text-center text-sm leading-relaxed text-muted-foreground">
        Rigid box, luxury tissue, ribbon, and a handwritten note if you ask for one.
      </p>
    </Section>
  );
}

/* ─────────────────────────── Care ─────────────────────────── */

const CARE = [
  { title: "Last on, first off", copy: "Wear it after perfume and lotion. Take it off before you undress." },
  { title: "Keep it dry", copy: "No showers, pools or sea water. Water is what ages plating fastest." },
  { title: "Wipe after wearing", copy: "A soft dry cloth lifts skin oils before they settle." },
  { title: "Store separately", copy: "A pouch of its own, away from other metal." },
];

export function Care() {
  const [open, setOpen] = useState<string | null>(CARE[0].title);

  return (
    <Section eyebrow="Care" title="Four habits. That's all.">
      <ul className="divide-y divide-border/60 border-y border-border/60">
        {CARE.map((c) => (
          <li key={c.title}>
            <button
              onClick={() => setOpen(open === c.title ? null : c.title)}
              className="flex w-full items-center justify-between py-6 text-left"
            >
              <span className="font-heading text-xl">{c.title}</span>
              <span className="text-muted-foreground">{open === c.title ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {open === c.title && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden pb-6 text-base text-muted-foreground"
                >
                  {c.copy}
                </motion.p>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ─────────────────────────── Reviews ─────────────────────────── */

export function Reviews({ product }: { product: ShopifyProduct }) {
  const imgs = product.images.edges.slice(0, 3);
  const quotes = [
    { name: "Ananya, Bengaluru", copy: "Six months of daily wear and it still looks like the day it arrived." },
    { name: "Meher, Goa", copy: "I bought it for a wedding. I have not taken it off since." },
    { name: "Ritika, Mumbai", copy: "The weight is the giveaway. It feels like real jewellery, because it is." },
  ];

  return (
    <Section eyebrow="Worn by" title="From the people wearing it." tone="ivory">
      <div className="grid gap-8 sm:grid-cols-3">
        {quotes.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-background">
              {imgs[i % Math.max(imgs.length, 1)] && (
                <img
                  src={`${imgs[i % imgs.length].node.url}?width=700`}
                  alt={`${product.title} worn by a SELEN customer`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <figcaption className="mt-5">
              <p className="text-base leading-relaxed text-foreground/85">{q.copy}</p>
              <p className="mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                {q.name}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────── shared shell ─────────────────────────── */

function Section({
  eyebrow,
  title,
  children,
  tone = "background",
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tone?: "background" | "ivory";
}) {
  return (
    <section
      className={`border-t border-border/50 px-6 py-24 sm:py-32 ${
        tone === "ivory" ? "bg-ivory" : "bg-background"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-5 font-heading text-3xl font-normal leading-tight sm:text-4xl">
          {title}
        </h2>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
