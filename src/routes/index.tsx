import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify.functions";
import { ProductCard } from "@/components/ProductCard";
import { Hero } from "@/components/home/Hero";
import { BeneathTheGold } from "@/components/home/BeneathTheGold";
import { WearTimeline } from "@/components/home/WearTimeline";
import { MaterialExplorer } from "@/components/home/MaterialExplorer";
import { CraftsmanshipJourney } from "@/components/home/CraftsmanshipJourney";
import { AiPersonalization } from "@/components/home/AiPersonalization";
import { Testimonials } from "@/components/home/Testimonials";
import { SiteFooter } from "@/components/home/SiteFooter";

const TITLE = "SELEN — Everyday Jewellery on a Precious Foundation";
const DESCRIPTION =
  "BIS Hallmarked 925 sterling silver finished in premium 20K gold plating. Beautiful on the outside, precious on the inside.";

export const Route = createFileRoute("/")({
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
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["products"],
      queryFn: () => getProducts({ data: {} }),
    });
  },
  component: Index,
});

const productsQuery = {
  queryKey: ["products"],
  queryFn: () => getProducts({ data: {} }),
};

function Index() {
  const { data: products } = useSuspenseQuery(productsQuery);

  return (
    <main className="bg-background">
      <Hero />
      <BeneathTheGold />
      <WearTimeline />
      <MaterialExplorer />
      <CraftsmanshipJourney />
      <AiPersonalization />

      <section
        id="collection"
        className="border-t border-border/60 bg-background py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
            The collection
          </p>
          <h2 className="mt-5 max-w-lg font-heading text-3xl font-normal leading-tight sm:text-5xl">
            Pieces made to be lived in.
          </h2>

          {products.length === 0 ? (
            <div className="mt-14 rounded-xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product.node} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Testimonials />
      <SiteFooter />
    </main>
  );
}
