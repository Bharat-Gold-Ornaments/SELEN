import { Link } from "@tanstack/react-router";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

export function VisitStore() {
  return (
    <section id="visit" className="relative overflow-hidden bg-background">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-20 select-none font-heading text-[22rem] italic leading-none text-gold/20 sm:-right-6 sm:-top-28 sm:text-[30rem]"
      >
        S
      </span>
      <Reveal>
        <div className="relative mx-auto max-w-[1600px] px-6 py-28 sm:px-10 sm:py-40">
          <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
            <div>
              <SectionLabel>Visit Us</SectionLabel>
              <h2 className="mt-5 max-w-xl font-heading text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
                See it in the light it was made for.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/75">
                Try pieces on, meet the makers, and take your time. Appointments welcome.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="border border-foreground/30 bg-background px-8 py-3.5 text-[0.745rem] uppercase tracking-[0.3em] transition-colors hover:bg-foreground hover:text-background"
                >
                  Book an Appointment
                </Link>
                <Link
                  to="/visit"
                  className="border border-foreground/20 px-8 py-3.5 text-[0.745rem] uppercase tracking-[0.3em] transition-colors hover:border-foreground/60"
                >
                  Visit Our Store
                </Link>
              </div>
            </div>

            <dl className="space-y-10 border-t border-foreground/15 pt-10 text-sm lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <div>
                <dt className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                  Address
                </dt>
                <dd className="mt-3 leading-relaxed text-foreground/80">
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
                <dd className="mt-3 leading-relaxed text-foreground/80">
                  Tuesday — Sunday, 11:00 to 19:00
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
