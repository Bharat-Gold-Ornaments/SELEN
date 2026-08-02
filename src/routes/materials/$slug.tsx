import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getMaterial, materials, type MaterialEntry } from "@/lib/materials";
import { SiteFooter } from "@/components/home/SiteFooter";

export const Route = createFileRoute("/materials/$slug")({
  loader: ({ params }) => {
    const material = getMaterial(params.slug);
    if (!material) throw notFound();
    return material;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.term} — SELEN Material Library`
      : "Material — SELEN";
    const description = loaderData?.summary.slice(0, 155) ?? "SELEN Material Library.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: MaterialPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-heading text-3xl">Not in the library yet</h1>
      <Link to="/materials" className="mt-6 inline-block underline underline-offset-4">
        Back to Material Library
      </Link>
    </div>
  ),
});

function MaterialPage() {
  const material = Route.useLoaderData() as MaterialEntry;
  const others = materials.filter((m) => m.slug !== material.slug).slice(0, 3);

  return (
    <main className="bg-background">
      <article>
        <header className="border-b border-border/50 bg-ivory px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/materials"
              className="text-[0.775rem] uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground"
            >
              Material Library
            </Link>
            <h1 className="mt-8 font-heading text-4xl font-normal leading-[1.1] sm:text-5xl">
              {material.term}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {material.summary}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-20">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-border/60 sm:grid-cols-3">
            {material.facts.map((f) => (
              <div key={f.label} className="bg-background p-6">
                <dt className="text-[0.725rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="mt-3 font-heading text-lg">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 space-y-14">
            {material.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-heading text-2xl font-normal">{s.heading}</h2>
                <div className="mt-5 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 border-t border-border/60 pt-10">
            <p className="text-[0.775rem] uppercase tracking-[0.4em] text-muted-foreground">
              Keep reading
            </p>
            <ul className="mt-6 space-y-3">
              {others.map((m) => (
                <li key={m.slug}>
                  <Link
                    to="/materials/$slug"
                    params={{ slug: m.slug }}
                    className="font-heading text-xl hover:text-gold-deep"
                  >
                    {m.term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
