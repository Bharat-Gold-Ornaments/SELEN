import { Link } from "@tanstack/react-router";
import { PLACEHOLDER } from "@/lib/placeholders";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

export function VisitStore() {
  return (
    <section id="visit" className="bg-background">
      <Reveal>
        <div className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
          <img
            src={PLACEHOLDER.store}
            alt="Inside the SELEN boutique"
            loading="lazy"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/30" />
          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col items-start justify-end px-6 pb-16 sm:px-10 sm:pb-24">
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
                className="border border-foreground/30 bg-background/80 px-8 py-3.5 text-[0.745rem] uppercase tracking-[0.3em] transition-colors hover:bg-foreground hover:text-background"
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
        </div>
      </Reveal>
    </section>
  );
}
