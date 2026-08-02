import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PLACEHOLDER } from "@/lib/placeholders";

export function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <img
        src={PLACEHOLDER.hero}
        alt="Gold-plated sterling silver chain resting on ivory silk"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/25" />

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-28">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-heading text-[2.4rem] font-normal leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Beautiful on the outside.
          <span className="block italic">Precious on the inside.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-sm text-sm leading-relaxed text-foreground/70"
        >
          925 sterling silver, finished in 20K gold.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-10"
        >
          <Link
            to="/shop"
            className="inline-block border-b border-foreground/40 pb-1.5 text-[0.775rem] uppercase tracking-[0.32em] transition-colors hover:border-foreground"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
