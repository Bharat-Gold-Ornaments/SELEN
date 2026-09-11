import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PLACEHOLDER } from "@/lib/placeholders";
import {
  CARE_STEPS,
  JEWELLERY_CARE_BODY,
  WARRANTY_COURIER_NOTE,
  WARRANTY_COVERAGE,
  WARRANTY_PROCESS,
  WARRANTY_INTRO,
  WARRANTY_TERMS,
} from "@/lib/selenCare";

const TITLE = "SELEN Care — Made to Be Worn, Made to Be Cared For";
const DESCRIPTION =
  "SELEN Care is our promise to stand behind every piece: a 6-month finish warranty, simple everyday care guidance, and a team ready to help.";

export const Route = createFileRoute("/selen-care")({
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
  component: SelenCare,
});

function SelenCare() {
  return (
    <main className="bg-background">
      <section className="bg-ivory px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="max-w-2xl">
            <SectionLabel>SELEN Care</SectionLabel>
            <h1 className="mt-8 font-heading text-4xl font-normal leading-[1.08] tracking-tight sm:text-6xl">
              Made to be worn.
              <br />
              Made to be cared for.
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Your jewellery is designed to become part of your everyday moments. And we&rsquo;re
              here to care for it along the way.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionLabel>Our Promise</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
              6-Month Finish Warranty
            </h2>
            <div className="mt-8 max-w-md space-y-5 text-base leading-relaxed text-muted-foreground">
              <p className="text-foreground">{WARRANTY_INTRO}</p>
              <p>{WARRANTY_COVERAGE}</p>
              <p>{WARRANTY_PROCESS}</p>
              <p className="text-sm text-muted-foreground/80">{WARRANTY_COURIER_NOTE}</p>
            </div>
            <a
              href="#warranty-terms"
              className="mt-10 inline-block border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
            >
              Read Warranty Terms &rarr;
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={PLACEHOLDER.lifestyle}
              alt="A SELEN piece worn as part of everyday life"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 bg-ivory px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="max-w-2xl">
            <SectionLabel>Care For Your SELEN</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
              A few simple habits help keep your jewellery beautiful.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-14 gap-y-14 sm:grid-cols-2">
            {CARE_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="border-t border-border/70 pt-6">
                  <p className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-heading text-xl font-normal tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.24}>
            <p className="mt-16 max-w-md text-sm leading-relaxed text-muted-foreground/80">
              {JEWELLERY_CARE_BODY}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 px-6 py-24 text-center sm:px-10 sm:py-32">
        <Reveal className="mx-auto max-w-xl">
          <SectionLabel>We&rsquo;re Here</SectionLabel>
          <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
            Need help with your jewellery?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            If your SELEN piece needs attention, we&rsquo;re here to help.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-block border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
          >
            Contact SELEN Care &rarr;
          </Link>
        </Reveal>
      </section>

      <section
        id="warranty-terms"
        className="scroll-mt-28 border-t border-border/50 bg-ivory px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionLabel>Full Terms</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              SELEN 6-Month Finish Warranty
            </h2>
            <p className="mt-3 text-[0.725rem] uppercase tracking-[0.32em] text-muted-foreground">
              Terms &amp; Conditions
            </p>
            <Accordion type="single" collapsible className="mt-12 border-t border-border/70">
              <AccordionItem value="terms" className="border-b border-border/70">
                <AccordionTrigger className="py-5 text-[0.745rem] uppercase tracking-[0.28em] hover:no-underline">
                  View Warranty Terms &amp; Conditions
                </AccordionTrigger>
                <AccordionContent className="pb-8 text-sm leading-relaxed text-muted-foreground">
                  <ol className="space-y-4">
                    {WARRANTY_TERMS.map((term, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="shrink-0 tabular-nums text-muted-foreground/70">
                          {i + 1}.
                        </span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
