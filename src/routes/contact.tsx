import { createFileRoute } from "@tanstack/react-router";
import { PLACEHOLDER } from "@/lib/placeholders";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

const TITLE = "Contact SELEN — Appointments & Enquiries";
const DESCRIPTION =
  "Book a private appointment at the SELEN boutique, or write to us about a piece, a repair, or a commission.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 pb-28 pt-24 sm:px-10 sm:pt-32 lg:grid-cols-2 lg:gap-28">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-6 font-heading text-4xl font-normal leading-tight tracking-tight sm:text-5xl">
            We would love to hear from you.
          </h1>

          <dl className="mt-14 space-y-10 text-sm">
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.36em] text-muted-foreground">
                Appointments
              </dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">
                Write to{" "}
                <a href="mailto:hello@selen.in" className="text-foreground underline-offset-4 hover:underline">
                  hello@selen.in
                </a>{" "}
                with a preferred day and time, and we will hold the room for you.
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.36em] text-muted-foreground">
                Care & Repairs
              </dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">
                care@selen.in — replating, resizing and cleaning for every SELEN piece.
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.36em] text-muted-foreground">
                Studio Hours
              </dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">
                Tuesday to Sunday, 11:00 — 19:00
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <img
            src={PLACEHOLDER.lifestyle}
            alt="A SELEN bracelet worn in afternoon light"
            loading="lazy"
            width={1200}
            height={1500}
            className="aspect-[4/5] w-full object-cover"
          />
        </Reveal>
      </div>
      <SiteFooter />
    </main>
  );
}
