import { createFileRoute, Link } from "@tanstack/react-router";
import { PLACEHOLDER } from "@/lib/placeholders";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

const TITLE = "Visit the SELEN Boutique";
const DESCRIPTION =
  "Spend an unhurried hour with SELEN: try pieces on in natural light, meet the makers, and find the one you keep.";

export const Route = createFileRoute("/visit")({
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
  component: VisitPage,
});

function VisitPage() {
  return (
    <main className="bg-background">
      <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <img
          src={PLACEHOLDER.store}
          alt="The SELEN boutique interior"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/30" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-20">
          <h1 className="max-w-xl font-heading text-4xl font-normal leading-tight tracking-tight sm:text-6xl">
            Visit our store.
          </h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-2 lg:gap-28">
        <Reveal>
          <SectionLabel>The Experience</SectionLabel>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Our boutique is quiet by design. Pieces are shown in daylight, on a linen tray, one at a
            time. There is no rush and nothing to sign.
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Come to try on a piece you have been considering, to have an older one cleaned and
            replated, or simply to see how 20 Karat gold reads against your skin.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-block border-b border-foreground/40 pb-1.5 text-[0.775rem] uppercase tracking-[0.32em] transition-colors hover:border-foreground"
          >
            Book an appointment
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="space-y-10 border-t border-border/70 pt-10 text-sm">
            <div>
              <dt className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                Address
              </dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">
                Goa Trading
                <br />
                31st January Road
                <br />
                Panaji Goa India
                <br />
                403001
              </dd>
            </div>
            <div>
              <dt className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                Hours
              </dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">
                Tuesday — Sunday, 11:00 to 19:00
              </dd>
            </div>
            <div>
              <dt className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                Enquiries
              </dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">hello@selen.in</dd>
            </div>
          </dl>
        </Reveal>
      </div>
      <SiteFooter />
    </main>
  );
}
