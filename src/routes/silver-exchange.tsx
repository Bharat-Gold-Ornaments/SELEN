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
  EXCHANGE_EXAMPLE,
  EXCHANGE_IMPORTANT_NOTE,
  EXCHANGE_LEAD,
  EXCHANGE_SUMMARY,
  EXCHANGE_TERMS,
  ELIGIBLE_ARTICLES,
  HOW_IT_WORKS,
  type TermBlock,
} from "@/lib/silverExchangePolicy";

const TITLE = "Silver Exchange — SELEN";
const DESCRIPTION =
  "SELEN's Silver Exchange Program: bring eligible silver jewellery and articles in for purity testing and valuation, and adjust the approved value toward your next SELEN piece.";

export const Route = createFileRoute("/silver-exchange")({
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
  component: SilverExchange,
});

function SilverExchange() {
  return (
    <main className="bg-background">
      <section className="bg-ivory px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="max-w-2xl">
            <SectionLabel>Silver Exchange</SectionLabel>
            <h1 className="mt-8 font-heading text-4xl font-normal leading-[1.08] tracking-tight sm:text-6xl">
              Your silver can have a new story.
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {EXCHANGE_LEAD} Bring in eligible silver, and let its value carry forward into your
              next SELEN piece.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-[1500px] items-start gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Five simple steps.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {EXCHANGE_SUMMARY}
            </p>
            <Link
              to="/silver-exchange"
              hash="exchange-terms"
              className="mt-10 inline-block border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
            >
              Read Exchange Terms &rarr;
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="space-y-8">
              {HOW_IT_WORKS.map((step, i) => (
                <li key={step.title} className="border-t border-border/70 pt-6">
                  <p className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-heading text-xl font-normal tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 bg-ivory px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-[1500px] items-start gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionLabel>Eligible Articles</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              What you can bring in.
            </h2>
            <ul className="mt-8 max-w-md space-y-3 text-base leading-relaxed text-muted-foreground">
              {ELIGIBLE_ARTICLES.map((item) => (
                <li key={item} className="border-t border-border/60 pt-3 first:border-t-0 first:pt-0">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground/80">
              Every article is subject to inspection, testing and acceptance by SELEN.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <img
              src={PLACEHOLDER.sterlingTeaser}
              alt="Silver jewellery ready for purity testing and valuation at SELEN"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="max-w-2xl">
            <SectionLabel>An Example</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              The value carries forward.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              The approved exchange value is adjusted against the SELEN piece you choose — not
              paid out in cash.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-14 grid max-w-2xl grid-cols-1 gap-x-10 gap-y-8 border-t border-border/70 pt-10 sm:grid-cols-3">
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Approved Exchange Value
                </dt>
                <dd className="mt-3 font-heading text-2xl font-normal tracking-tight">
                  {EXCHANGE_EXAMPLE.exchange}
                </dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
                  SELEN Jewellery Purchased
                </dt>
                <dd className="mt-3 font-heading text-2xl font-normal tracking-tight">
                  {EXCHANGE_EXAMPLE.purchase}
                </dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Balance Payable
                </dt>
                <dd className="mt-3 font-heading text-2xl font-normal tracking-tight">
                  {EXCHANGE_EXAMPLE.balance}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 px-6 py-24 text-center sm:px-10 sm:py-32">
        <Reveal className="mx-auto max-w-xl">
          <SectionLabel>Ready When You Are</SectionLabel>
          <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
            Bring your silver in for a valuation.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Visit our boutique with the article you'd like assessed, or reach out to plan your
            visit.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            <Link
              to="/visit"
              className="border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
            >
              Visit Store &rarr;
            </Link>
            <Link
              to="/contact"
              className="border-b border-transparent pb-1 text-[0.745rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>

      <section
        id="exchange-terms"
        className="scroll-mt-28 border-t border-border/50 bg-ivory px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionLabel>Full Terms</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              SELEN Silver Exchange Program
            </h2>
            <p className="mt-3 text-[0.725rem] uppercase tracking-[0.32em] text-muted-foreground">
              Terms &amp; Conditions
            </p>
            <Accordion type="single" collapsible className="mt-12 border-t border-border/70">
              <AccordionItem value="terms" className="border-b border-border/70">
                <AccordionTrigger className="py-5 text-[0.745rem] uppercase tracking-[0.28em] hover:no-underline">
                  View Exchange Terms &amp; Conditions
                </AccordionTrigger>
                <AccordionContent className="pb-8 text-sm leading-relaxed text-muted-foreground">
                  <div className="space-y-8">
                    {EXCHANGE_TERMS.map((section) => (
                      <div key={section.heading}>
                        <h3 className="font-heading text-lg font-normal tracking-tight text-foreground">
                          {section.heading}
                        </h3>
                        <div className="mt-3 space-y-3">
                          {section.blocks.map((block, i) => (
                            <TermBlockView key={i} block={block} />
                          ))}
                        </div>
                      </div>
                    ))}
                    <p className="border-t border-border/60 pt-6 text-xs italic text-muted-foreground/80">
                      {EXCHANGE_IMPORTANT_NOTE}
                    </p>
                  </div>
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

function TermBlockView({ block }: { block: TermBlock }) {
  if ("list" in block) {
    return (
      <ul className="list-disc space-y-2 pl-5">
        {block.list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{block.p}</p>;
}
