import { useState } from "react";
import { motion } from "motion/react";

type LayerKey = "gold" | "silver" | "stone";

const LAYERS: {
  key: LayerKey;
  title: string;
  copy: string;
}[] = [
  {
    key: "gold",
    title: "Premium 20K Gold Plating",
    copy: "A warm, thick micron finish that holds its colour through everyday wear.",
  },
  {
    key: "silver",
    title: "925 Sterling Silver",
    copy: "A solid, BIS hallmarked precious core — hypoallergenic and built to last.",
  },
  {
    key: "stone",
    title: "Hand-set CZ Stone",
    copy: "Each stone placed and secured by hand, then checked under magnification.",
  },
];

export function MaterialExplorer() {
  const [active, setActive] = useState<LayerKey | null>(null);

  const offset = (key: LayerKey) => {
    if (!active) return 0;
    if (key === "gold") return -46;
    if (key === "stone") return 46;
    return 0;
  };

  const dim = (key: LayerKey) => (active && active !== key ? 0.28 : 1);

  return (
    <section className="border-t border-border/60 bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          Section Three
        </p>
        <h2 className="mt-5 max-w-lg font-heading text-3xl font-normal leading-tight sm:text-5xl">
          An exploded view.
        </h2>

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2">
          <div className="relative mx-auto flex h-[320px] w-[260px] items-center justify-center">
            {LAYERS.map((layer) => (
              <motion.div
                key={layer.key}
                animate={{ y: offset(layer.key), opacity: dim(layer.key) }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute"
                aria-hidden
              >
                {layer.key === "gold" && (
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      stroke="var(--gold)"
                      strokeWidth="14"
                      opacity="0.9"
                    />
                  </svg>
                )}
                {layer.key === "silver" && (
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="70" stroke="var(--silver)" strokeWidth="9" />
                  </svg>
                )}
                {layer.key === "stone" && (
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                    <path
                      d="M100 72 L118 96 L100 128 L82 96 Z"
                      fill="var(--silver-soft)"
                      stroke="var(--silver-deep)"
                      strokeWidth="1.2"
                    />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>

          <ul className="space-y-3">
            {LAYERS.map((layer) => (
              <li key={layer.key}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(layer.key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(layer.key)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(active === layer.key ? null : layer.key)}
                  aria-pressed={active === layer.key}
                  className={`w-full rounded-xl border px-6 py-5 text-left transition-colors duration-500 ${
                    active === layer.key
                      ? "border-primary/40 bg-card"
                      : "border-border/70 bg-transparent"
                  }`}
                >
                  <p className="font-heading text-lg">{layer.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {layer.copy}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
