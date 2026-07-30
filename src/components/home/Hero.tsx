import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex min-h-[82vh] max-w-5xl flex-col items-center justify-center px-6 py-28 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[0.7rem] uppercase tracking-[0.42em] text-muted-foreground"
        >
          BIS Hallmarked 925 Silver · 20K Gold Plated
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-heading text-4xl font-normal leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Beautiful on the outside.
          <span className="block italic text-primary">Precious on the inside.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Luxury shouldn&rsquo;t be reserved for special occasions. SELEN builds everyday
          jewellery on a precious foundation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <a
            href="#collection"
            className="rounded-full border border-primary/40 px-8 py-3 text-xs uppercase tracking-[0.24em] text-primary transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
          >
            Explore the collection
          </a>
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground/70">
            Scroll to look beneath the gold
          </span>
        </motion.div>
      </div>
    </section>
  );
}
