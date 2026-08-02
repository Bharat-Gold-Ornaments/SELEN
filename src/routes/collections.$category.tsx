import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify.functions";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteFooter } from "@/components/home/SiteFooter";
import { resolveCollection } from "@/lib/collections";
import { Reveal } from "@/components/editorial/Reveal";

const productsQuery = {
  queryKey: ["products"],
  queryFn: () => getProducts({ data: {} }),
};

export const Route = createFileRoute("/collections/$category")({
  loader: async ({ context, params }) => {
    const collection = resolveCollection(params.category);
    if (!collection) throw notFound();
    await context.queryClient.ensureQueryData(productsQuery);
    return { title: collection.title, line: collection.line };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — SELEN" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — SELEN`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.line },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.line },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { category: slug } = Route.useParams();
  const collection = resolveCollection(slug)!;
  const { data } = useSuspenseQuery(productsQuery);
  const products = collection.filter(data.map((e) => e.node));

  return (
    <main className="bg-background">
      <section className="relative h-[62vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          width={1200}
          height={1500}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/30" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-20">
          <h1 className="font-heading text-4xl font-normal leading-tight tracking-tight sm:text-6xl">
            {collection.title}
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/75">
            {collection.line}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 sm:py-32">
        <Reveal>
          <ProductGrid products={products} />
        </Reveal>
        <div className="mt-24 text-center">
          <Link
            to="/shop"
            className="inline-block border-b border-foreground/40 pb-1.5 text-[0.65rem] uppercase tracking-[0.32em] transition-colors hover:border-foreground"
          >
            View everything
          </Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
