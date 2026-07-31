import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteFooter } from "@/components/home/SiteFooter";

const TITLE = "About SELEN — Luxury Begins Beneath the Surface";
const DESCRIPTION =
  "The story behind SELEN: BIS hallmarked 925 sterling silver, 20K gold plating, Goan light, and the makers who finish every piece by hand.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function Chapter({
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
      className={`border-t border-border/50 py-24 sm:py-32 ${
        tone === "ivory" ? "bg-ivory" : "bg-background"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl px-6"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-6 font-heading text-3xl font-normal leading-tight sm:text-4xl">
          {title}
        </h2>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {children}
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <main className="bg-background">
      <section className="flex min-h-[78vh] items-center bg-ivory px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="mx-auto max-w-3xl py-28"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
            The Foundation
          </p>
          <h1 className="mt-8 font-heading text-4xl font-normal leading-[1.1] sm:text-6xl">
            Luxury begins beneath the surface.
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            SELEN was built on a single conviction: what a piece is made of matters more
            than what it looks like on the first day.
          </p>
        </motion.div>
      </section>

      <Chapter eyebrow="The metal" title="Why silver?">
        <p>
          Silver is one of the few metals that behaves honestly. It does not pretend. It
          can be melted, shaped, polished, repaired and worn again — because it is
          precious all the way through, not only on the surface.
        </p>
        <p>
          Over time silver reacts gently with the air around it and darkens. That is not
          damage. A cloth returns it. Imitation metal has no such second life: when its
          coating goes, so does the piece.
        </p>
        <p>
          We use BIS hallmarked 925 sterling silver — 92.5% fine silver, verified
          independently rather than claimed by us.
        </p>
      </Chapter>

      <Chapter eyebrow="The place" title="Goa" tone="ivory">
        <p>
          SELEN is shaped by Goan light — the warm, low sun that makes gold look softer
          and silver look alive. Salt air, slow afternoons, an ocean that changes colour
          four times a day.
        </p>
        <p>
          It is why our finishes lean warm rather than brash, and why our pieces are
          designed to be worn with bare skin and simple clothes rather than saved for one
          evening a year.
        </p>
      </Chapter>

      <Chapter eyebrow="The people" title="Our makers">
        <p>
          Hands, not factories. Every SELEN piece passes through a caster, a stone setter
          and a finisher — three people who each know what a good piece feels like before
          they know what it looks like.
        </p>
        <p>
          Stones are seated by hand. Edges are smoothed by hand. The final polish is done
          by someone who will notice if it is not right.
        </p>
      </Chapter>

      <Chapter eyebrow="The promise" title="Our standards" tone="ivory">
        <p>
          BIS hallmarked 925 sterling silver core. Premium 20K gold plating. Hand-set,
          well-graded CZ. Nickel-conscious finishing.
        </p>
        <p>
          We publish what each material is and how it behaves over time — including the
          parts that are not flattering. You can read all of it in our{" "}
          <Link to="/materials" className="text-foreground underline underline-offset-4">
            Material Library
          </Link>
          .
        </p>
      </Chapter>

      <Chapter eyebrow="KinMitra" title="Technology in service of the hand">
        <p>
          KinMitra is the quiet part of SELEN — the tools that help someone describe the
          piece they have in mind and see it take shape before it is made.
        </p>
        <p>
          It does not replace the setter or the finisher. It shortens the distance between
          an idea and a person capable of making it.
        </p>
      </Chapter>

      <SiteFooter />
    </main>
  );
}
