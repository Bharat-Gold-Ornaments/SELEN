import { useState } from "react";
import { motion } from "motion/react";

const STOPS = ["Day 1", "6 months", "1 year", "2 years"];

function Piece({
  luster,
  tone,
  label,
}: {
  luster: number;
  tone: "gold" | "plain";
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <motion.svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          animate={{ opacity: 0.35 + luster * 0.65 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <defs>
            <linearGradient id={`grad-${tone}`} x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="0%"
                stopColor={tone === "gold" ? "var(--gold-soft)" : "var(--silver-soft)"}
              />
              <stop
                offset="50%"
                stopColor={tone === "gold" ? "var(--gold)" : "var(--silver)"}
              />
              <stop
                offset="100%"
                stopColor={tone === "gold" ? "var(--gold-deep)" : "var(--silver-deep)"}
              />
            </linearGradient>
          </defs>
          <circle
            cx="75"
            cy="75"
            r="52"
            stroke={`url(#grad-${tone})`}
            strokeWidth="13"
            fill="none"
          />
          <motion.circle
            cx="56"
            cy="48"
            r="7"
            fill="var(--card)"
            animate={{ opacity: luster * 0.9 }}
            transition={{ duration: 0.4 }}
          />
        </motion.svg>
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{ opacity: luster * 0.5 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              tone === "gold"
                ? "radial-gradient(circle at 40% 35%, var(--gold-soft), transparent 62%)"
                : "radial-gradient(circle at 40% 35%, var(--silver-soft), transparent 62%)",
          }}
        />
      </div>
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
    </div>
  );
}

export function WearTimeline() {
  const [step, setStep] = useState(0);
  const t = step / (STOPS.length - 1);

  const selenLuster = 1 - t * 0.12;
  const fashionLuster = 1 - t * 0.85;

  return (
    <section className="border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          Section Two
        </p>
        <h2 className="mt-5 max-w-lg font-heading text-3xl font-normal leading-tight sm:text-5xl">
          Jewellery, over time.
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Move through the months and watch what a precious foundation preserves.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-10">
          <Piece luster={selenLuster} tone="gold" label="SELEN" />
          <Piece luster={fashionLuster} tone="plain" label="Fashion jewellery" />
        </div>

        <div className="mx-auto mt-16 max-w-xl">
          <input
            type="range"
            min={0}
            max={STOPS.length - 1}
            step={1}
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            aria-label="Time worn"
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
          />
          <div className="mt-4 flex justify-between">
            {STOPS.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => setStep(i)}
                className={`text-[0.65rem] uppercase tracking-[0.22em] transition-colors ${
                  i === step ? "text-primary" : "text-muted-foreground/70 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
