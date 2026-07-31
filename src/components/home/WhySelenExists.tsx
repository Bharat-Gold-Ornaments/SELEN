import { motion } from "motion/react";

const beats = [
  "The plating faded.",
  "The colour changed.",
  "The shine disappeared.",
];

export function WhySelenExists() {
  return (
    <section
      id="why-selen"
      className="relative border-t border-border/50 bg-ivory py-28 sm:py-40"
      aria-label="Why SELEN exists"
    >
      <div className="mx-auto max-w-3xl px-6">

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, delay: 0.05 }}
          className="mt-6 font-heading text-3xl font-normal leading-[1.15] sm:text-5xl"
        >
          Why SELEN exists
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-12 max-w-xl text-lg leading-relaxed text-foreground/80 sm:text-xl"
        >
          Everyone has owned jewellery that looked beautiful.
          <br />
          Until it didn&rsquo;t.
        </motion.p>

        <div className="mt-14 space-y-6 border-l border-gold/40 pl-8">
          {beats.map((beat, i) => (
            <motion.p
              key={beat}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.18 }}
              className="font-heading text-2xl font-normal text-muted-foreground sm:text-3xl"
            >
              {beat}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-20 max-w-xl"
        >
          <p className="font-heading text-2xl leading-snug sm:text-4xl">
            We built SELEN differently.
          </p>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Not by making jewellery that looks more precious — by starting with metal
            that is. Every SELEN piece begins as BIS hallmarked 925 sterling silver, then
            receives its 20K gold finish. What you see may soften over years. What holds
            it together never stops being precious.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
