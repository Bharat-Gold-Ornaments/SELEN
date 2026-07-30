import { useState } from "react";
import { motion } from "motion/react";

const STEPS = [
  { title: "Design", copy: "A sketch becomes a proportioned CAD model." },
  { title: "Wax", copy: "The model is grown in wax, checked for balance." },
  { title: "Casting", copy: "925 sterling silver is poured into the mould." },
  { title: "Stone Setting", copy: "Each CZ is seated and secured by hand." },
  { title: "Plating", copy: "A generous 20K gold layer is bonded to the core." },
  { title: "Finished Piece", copy: "Polished, hallmarked, and boxed for you." },
];

export function CraftsmanshipJourney() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          Section Four
        </p>
        <h2 className="mt-5 max-w-lg font-heading text-3xl font-normal leading-tight sm:text-5xl">
          Six hands, one piece.
        </h2>

        <div className="mt-14 overflow-x-auto pb-4">
          <ol className="flex min-w-max items-stretch gap-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="w-[210px] shrink-0">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group w-full text-left"
                >
                  <div className="relative h-px w-full bg-border">
                    <motion.div
                      className="absolute left-0 top-0 h-px bg-primary"
                      animate={{ width: i <= active ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute -top-[3px] left-0 block h-[7px] w-[7px] rounded-full"
                      animate={{
                        backgroundColor:
                          i <= active ? "var(--primary)" : "var(--border)",
                      }}
                    />
                  </div>
                  <p
                    className={`mt-5 font-heading text-lg transition-colors duration-500 ${
                      i === active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                  <motion.p
                    className="mt-2 pr-5 text-xs leading-relaxed text-muted-foreground"
                    animate={{ opacity: i === active ? 1 : 0.45 }}
                    transition={{ duration: 0.4 }}
                  >
                    {step.copy}
                  </motion.p>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
