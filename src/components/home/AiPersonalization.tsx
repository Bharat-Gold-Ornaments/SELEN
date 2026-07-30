import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const PHRASE = "Earrings inspired by lotus petals, for my mother.";
const STAGES = ["Prompt", "Sketch", "CAD", "Finished piece"];

export function AiPersonalization() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [typed, setTyped] = useState("");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(PHRASE.slice(0, i));
      if (i >= PHRASE.length) window.clearInterval(id);
    }, 42);
    return () => window.clearInterval(id);
  }, [inView]);

  useEffect(() => {
    if (typed.length < PHRASE.length) return;
    const id = window.setInterval(() => {
      setStage((s) => (s < STAGES.length - 1 ? s + 1 : s));
    }, 1100);
    return () => window.clearInterval(id);
  }, [typed]);

  return (
    <section
      ref={ref}
      className="border-t border-border/60 bg-ivory py-24 sm:py-32"
      aria-label="AI personalisation"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          Section Five
        </p>
        <h2 className="mt-5 max-w-xl font-heading text-3xl font-normal leading-tight sm:text-5xl">
          Jewellery that begins with your story.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Soon, SELEN pieces will be co-created — described in your own words, drawn, modelled,
          and cast in the same precious foundation.
        </p>

        <div className="mt-14 rounded-2xl border border-border/70 bg-card p-6 sm:p-10">
          <div className="rounded-xl border border-border/70 px-5 py-4 font-body text-sm">
            <span className="text-muted-foreground">{typed}</span>
            <motion.span
              className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-primary"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>

          <ol className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STAGES.map((s, i) => (
              <li key={s} className="flex flex-col items-center gap-4 text-center">
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full border"
                  animate={{
                    opacity: i <= stage ? 1 : 0.25,
                    borderColor: i <= stage ? "var(--primary)" : "var(--border)",
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <motion.path
                      d="M22 8c5 5 8 9 8 14a8 8 0 1 1-16 0c0-5 3-9 8-14Z"
                      stroke={i <= stage ? "var(--gold-deep)" : "var(--border)"}
                      strokeWidth="1.2"
                      fill={i >= 3 ? "var(--gold-soft)" : "none"}
                    />
                  </svg>
                </motion.div>
                <span className="text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
