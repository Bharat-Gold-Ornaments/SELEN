import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";
import { PLACEHOLDER } from "@/lib/placeholders";

const TITLE = "About SELEN — Beautiful on the Outside, Precious on the Inside";
const DESCRIPTION =
  "The story behind SELEN: a Goan family house making BIS hallmarked 925 sterling silver jewellery finished in 20 Karat gold, where tradition meets the technology of KinMitra, a Bharat Gold Ornaments Private Limited brand.";

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

const FOUNDERS = [
  {
    name: "Ganpat Sangodkar",
    role: "Tradition",
    body: "Four decades at the bench. He can tell the weight of a piece by holding it, and he refuses anything that does not sit right on the skin.",
  },
  {
    name: "Sagar Sangodkar",
    role: "Innovation",
    body: "He asked a simple question: why should fine jewellery be saved for one evening a year? SELEN is the answer, built with modern tools and old standards.",
  },
];

function About() {
  return (
    <main className="bg-background">
      <section className="flex min-h-[80vh] items-center bg-ivory px-6 sm:px-10">
        <Reveal className="mx-auto w-full max-w-[1500px] py-32">
          <SectionLabel>About SELEN</SectionLabel>
          <h1 className="mt-10 max-w-4xl font-heading text-4xl font-normal leading-[1.06] tracking-tight sm:text-7xl">
            Beautiful on the outside. Precious on the inside.
          </h1>
        </Reveal>
      </section>

      <Split
        eyebrow="Our Story"
        title="A family house in Goa."
        image={PLACEHOLDER.store}
        alt="The SELEN store in Goa"
      >
        <p>
          SELEN began in a small Goan workshop where one question kept repeating itself:
          why does jewellery that feels precious have to stay in a box?
        </p>
        <p>
          We started making pieces for ourselves first — light enough to forget you are
          wearing them, honest enough to last. Everything we sell today began that way.
        </p>
      </Split>

      <section className="border-t border-border/50 bg-ivory px-6 py-24 sm:px-10 sm:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>Our Belief</SectionLabel>
          <p className="mt-10 font-heading text-3xl font-normal leading-[1.25] tracking-tight sm:text-5xl">
            Fine jewellery should belong to ordinary days, not only to occasions.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-border/50 px-6 py-24 sm:px-10 sm:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <img
              src={PLACEHOLDER.founders}
              alt="Sagar and Ganpat Sangodkar in the SELEN workshop"
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:self-center">
            <SectionLabel>Meet the Founders</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Two generations, one bench.
            </h2>
            <div className="mt-12 space-y-10">
              {FOUNDERS.map((f) => (
                <div key={f.name} className="border-t border-border/70 pt-6">
                  <p className="text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
                    {f.role}
                  </p>
                  <h3 className="mt-4 font-heading text-xl font-normal tracking-tight">
                    {f.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Split
        eyebrow="Craftsmanship Meets Innovation"
        title="Technology in service of the hand."
        image={PLACEHOLDER.lifestyle}
        alt="A SELEN piece being finished by hand"
        tone="ivory"
        reverse
      >
        <p>
          KinMitra, a Bharat Gold Ornaments Private Limited brand, is the quiet part of SELEN — tools that let someone describe the piece
          they have in mind and watch it take shape before it is made.
        </p>
        <p>
          It does not replace the setter or the finisher. It shortens the distance between
          an idea and a person capable of making it.
        </p>
        <p>
          <Link
            to="/design-with-ai"
            className="text-foreground underline underline-offset-4"
          >
            Design with AI
          </Link>
        </p>
      </Split>

      <Split
        eyebrow="Why Sterling Silver"
        title="What's beneath the gold?"
        image={PLACEHOLDER.sterlingTeaser}
        alt="Gold plated sterling silver ring on ivory linen"
      >
        <p>
          Every piece starts with BIS hallmarked 925 sterling silver and is finished in
          premium 20 Karat gold. Precious all the way through — never brass, never plated base
          metal.
        </p>
        <p>
          <Link
            to="/why-sterling-silver"
            className="text-foreground underline underline-offset-4"
          >
            Read the full story
          </Link>
        </p>
      </Split>

      <Split
        eyebrow="Visit Our Store"
        title="Come and hold something."
        image={PLACEHOLDER.banner}
        alt="Inside the SELEN boutique"
        tone="ivory"
        reverse
      >
        <p>
          Our boutique in Goa is open Tuesday to Sunday, 11:00 &mdash; 19:00. Try pieces on,
          have something resized, or simply sit with a cup of tea.
        </p>
        <p>
          <Link to="/visit" className="text-foreground underline underline-offset-4">
            Find us on the map
          </Link>
        </p>
      </Split>

      <section className="border-t border-border/50 px-6 py-28 sm:px-10 sm:py-40">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-3xl font-normal leading-[1.25] tracking-tight sm:text-5xl">
            Wear it on a Tuesday.
          </p>
          <Link
            to="/shop"
            className="mt-12 inline-block border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
          >
            Browse All Jewellery &rarr;
          </Link>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}

function Split({
  eyebrow,
  title,
  image,
  alt,
  children,
  tone = "background",
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  children: React.ReactNode;
  tone?: "background" | "ivory";
  reverse?: boolean;
}) {
  return (
    <section
      className={`border-t border-border/50 px-6 py-24 sm:px-10 sm:py-36 ${
        tone === "ivory" ? "bg-ivory" : "bg-background"
      }`}
    >
      <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal className={reverse ? "lg:order-2" : undefined}>
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
        </Reveal>
        <Reveal delay={0.1} className={reverse ? "lg:order-1" : undefined}>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="mt-6 font-heading text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
