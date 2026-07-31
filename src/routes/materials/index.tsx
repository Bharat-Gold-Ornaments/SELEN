import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { materials } from "@/lib/materials";
import { SiteFooter } from "@/components/home/SiteFooter";

const TITLE = "Material Library — 925 Silver, Gold Plating & CZ Explained";
const DESCRIPTION =
  "Plain-language guides to 925 sterling silver, 20K gold plating, cubic zirconia, BIS hallmarking, tarnish and jewellery care from SELEN.";

export const Route = createFileRoute("/materials/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: materials.map((m) => ({
            "@type": "Question",
            name: m.question,
            acceptedAnswer: { "@type": "Answer", text: m.summary },
          })),
        }),
      },
    ],
  }),
  component: MaterialLibrary,
});

function MaterialLibrary() {
  return (
    <main className="bg-background">
      <section className="border-b border-border/50 bg-ivory px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-3xl">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
            Material Library
          </p>
          <h1 className="mt-8 font-heading text-4xl font-normal leading-[1.1] sm:text-6xl">
            Know what you&rsquo;re wearing.
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Every material we use, explained plainly — including how each one behaves
            after a year of real wear.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-px overflow-hidden rounded-sm bg-border/60 sm:grid-cols-2">
          {materials.map((m, i) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3) }}
              className="bg-background"
            >
              <Link
                to="/materials/$slug"
                params={{ slug: m.slug }}
                className="block h-full p-8 transition-colors hover:bg-ivory sm:p-10"
              >
                <h2 className="font-heading text-2xl font-normal">{m.term}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {m.short}
                </p>
                <span className="mt-6 inline-block text-[0.65rem] uppercase tracking-[0.3em] text-gold-deep">
                  Read
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
