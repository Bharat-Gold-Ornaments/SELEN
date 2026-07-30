import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "motion/react";

function Label({
  progress,
  at,
  title,
  detail,
  align = "left",
}: {
  progress: MotionValue<number>;
  at: number;
  title: string;
  detail: string;
  align?: "left" | "right";
}) {
  const [shown, setShown] = useState(false);
  useMotionValueEvent(progress, "change", (v) => {
    const next = v >= at;
    setShown((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.div
      animate={{ opacity: shown ? 1 : 0, x: shown ? 0 : align === "left" ? -18 : 18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={align === "left" ? "text-left" : "text-right"}
    >
      <p className="font-heading text-base sm:text-lg">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
    </motion.div>
  );
}


export function BeneathTheGold() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    (window as unknown as { __p?: number }).__p = v;
  });

  // Phase 1: rotation. Phase 2: slice. Phase 3: separation + labels.
  const rotate = useTransform(scrollYProgress, [0, 0.35], [0, 180]);
  const ringOpacity = useTransform(scrollYProgress, (v) =>
    v < 0.28 ? 1 : Math.max(0, 1 - (v - 0.28) / 0.1),
  );
  const ringScale = useTransform(scrollYProgress, (v) =>
    v < 0.28 ? 1 : Math.max(0.92, 1 - (v - 0.28) * 0.8),
  );
  const sectionOpacity = useTransform(scrollYProgress, [0.4, 0.48], [0, 1]);
  const goldTop = useTransform(scrollYProgress, [0.46, 0.68], [0, -56]);
  const goldBottom = useTransform(scrollYProgress, [0.46, 0.68], [0, 56]);
  const coreScale = useTransform(scrollYProgress, [0.46, 0.68], [1, 1.02]);
  const hallmarkOpacity = useTransform(scrollYProgress, [0.76, 0.88], [0, 1]);
  const closingOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);
  const closingY = useTransform(scrollYProgress, [0.88, 1], [16, 0]);

  return (
    <section ref={ref} className="relative h-[420vh] bg-ivory" aria-label="What's beneath the gold">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          Section One
        </p>
        <h2 className="mt-5 max-w-xl text-center font-heading text-3xl font-normal leading-tight sm:text-5xl">
          What&rsquo;s beneath the gold?
        </h2>

        <div className="relative mt-10 flex h-[320px] w-full max-w-3xl items-center justify-center sm:mt-14">
          {/* Rotating ring */}
          <motion.div
            style={{ rotateY: rotate, opacity: ringOpacity, scale: ringScale }}
            className="absolute"
            aria-hidden
          >
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
              <defs>
                <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--gold-soft)" />
                  <stop offset="45%" stopColor="var(--gold)" />
                  <stop offset="100%" stopColor="var(--gold-deep)" />
                </linearGradient>
              </defs>
              <circle cx="110" cy="110" r="78" stroke="url(#goldRing)" strokeWidth="20" />
              <circle cx="110" cy="110" r="90" stroke="var(--gold-soft)" strokeWidth="0.75" opacity="0.6" />
            </svg>
          </motion.div>

          {/* Cross-section */}
          <motion.div
            style={{ opacity: sectionOpacity }}
            className="absolute flex w-full max-w-2xl items-center justify-center"
          >
            <div className="grid w-full grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
              <div className="hidden sm:block">
                <Label
                  progress={scrollYProgress}
                  range={[0.5, 0.62]}
                  title="Premium 20K Gold Plating"
                  detail="A rich, warm finish applied thickly enough to stay beautiful through daily wear."
                  align="right"
                />
              </div>

              <div className="relative mx-auto flex h-[200px] w-[230px] flex-col items-center justify-center">
                <motion.div
                  style={{ y: goldTop }}
                  className="h-[10px] w-full rounded-full bg-[linear-gradient(90deg,var(--gold-soft),var(--gold),var(--gold-deep))]"
                />
                <motion.div
                  style={{ scaleY: coreScale }}
                  className="my-2 h-[54px] w-full rounded-md bg-[linear-gradient(90deg,var(--silver-soft),var(--silver),var(--silver-deep))]"
                />
                <motion.div
                  style={{ y: goldBottom }}
                  className="h-[10px] w-full rounded-full bg-[linear-gradient(90deg,var(--gold-soft),var(--gold),var(--gold-deep))]"
                />

                <motion.div
                  style={{ opacity: hallmarkOpacity }}
                  className="absolute -bottom-16 flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5"
                >
                  <span className="text-[0.6rem] uppercase tracking-[0.28em] text-primary">
                    BIS Hallmarked
                  </span>
                </motion.div>
              </div>

              <div className="hidden sm:block">
                <Label
                  progress={scrollYProgress}
                  range={[0.62, 0.74]}
                  title="Certified 925 Sterling Silver"
                  detail="A solid precious core — the reason the piece keeps its worth and comfort."
                  align="left"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          style={{ opacity: closingOpacity, y: closingY }}
          className="mt-16 text-center font-heading text-xl italic sm:text-3xl"
        >
          Beautiful on the outside. Precious on the inside.
        </motion.p>
      </div>
    </section>
  );
}
