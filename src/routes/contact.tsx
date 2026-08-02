import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { PLACEHOLDER } from "@/lib/placeholders";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

const TITLE = "Contact SELEN — Appointments, Support & Our Store";
const DESCRIPTION =
  "Reach the SELEN team for appointments, care and repairs, or order support — or visit our boutique in Goa, open Tuesday to Sunday.";

const MAP_SRC =
  "https://www.google.com/maps?q=Panaji,%20Goa,%20India&output=embed";

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

const SOCIALS = [
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/919000000000" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/selen" },
  { icon: Mail, label: "Email", href: "mailto:hello@selen.in" },
];

function ContactPage() {
  return (
    <main className="bg-background">
      <section className="bg-ivory px-6 py-28 sm:px-10 sm:py-36">
        <Reveal className="mx-auto max-w-[1500px]">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-8 max-w-3xl font-heading text-4xl font-normal leading-[1.08] tracking-tight sm:text-6xl">
            We would love to hear from you.
          </h1>
        </Reveal>
      </section>

      <section className="border-t border-border/50 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionLabel>Address</SectionLabel>
            <p className="mt-6 font-heading text-2xl font-normal leading-snug tracking-tight">
              SELEN Boutique
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              18 Ourem Road
              <br />
              Panaji, Goa 403001
              <br />
              India
            </p>
            <p className="mt-8 text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
              Tuesday &ndash; Sunday · 11:00 &mdash; 19:00
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionLabel>Customer Support</SectionLabel>
            <dl className="mt-8 space-y-9 text-sm">
              <div>
                <dt className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                  Appointments
                </dt>
                <dd className="mt-3 leading-relaxed text-muted-foreground">
                  <a
                    href="mailto:hello@selen.in"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    hello@selen.in
                  </a>{" "}
                  — send a preferred day and time and we will hold the room for you.
                </dd>
              </div>
              <div>
                <dt className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                  Orders
                </dt>
                <dd className="mt-3 leading-relaxed text-muted-foreground">
                  <a
                    href="mailto:orders@selen.in"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    orders@selen.in
                  </a>{" "}
                  — deliveries, exchanges and gift notes.
                </dd>
              </div>
              <div>
                <dt className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                  Care &amp; Repairs
                </dt>
                <dd className="mt-3 leading-relaxed text-muted-foreground">
                  <a
                    href="mailto:care@selen.in"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    care@selen.in
                  </a>{" "}
                  — replating, resizing and cleaning for every SELEN piece.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 bg-ivory px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionLabel>Visit Us</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              A quiet room in Panaji.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Try pieces on in daylight, have something resized, or simply sit with a cup of
              tea while you decide.
            </p>
            <img
              src={PLACEHOLDER.store}
              alt="Inside the SELEN boutique in Goa"
              loading="lazy"
              className="mt-10 aspect-square w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <iframe
              title="Map to the SELEN boutique in Panaji, Goa"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-square w-full border border-border/60"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/50 px-6 py-24 sm:px-10 sm:py-32">
        <Reveal className="mx-auto max-w-[1500px]">
          <SectionLabel>Connect With Us</SectionLabel>
          <div className="mt-10 flex flex-wrap gap-x-14 gap-y-8">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 text-[0.745rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <s.icon className="h-4 w-4" strokeWidth={1.1} />
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
