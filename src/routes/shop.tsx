import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify.functions";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SuggestionInvite } from "@/components/shop/SuggestionInvite";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

const TITLE = "The Full Collection — SELEN";
const DESCRIPTION =
  "Every SELEN piece in one place: 925 sterling silver finished in 20 Karat gold, photographed and made for everyday wear.";

const productsQuery = {
  queryKey: ["products"],
  queryFn: () => getProducts({ data: {} }),
};

export const Route = createFileRoute("/shop")({
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
    await context.queryClient.ensureQueryData(productsQuery);
  },
  component: ShopPage,
});

function ShopPage() {
  const { data } = useSuspenseQuery(productsQuery);
  const products = data.map((e) => e.node);

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-[1600px] px-6 pb-28 pt-24 sm:px-10 sm:pb-36 sm:pt-32">
        <Reveal className="max-w-xl">
          <SectionLabel>The Collection</SectionLabel>
          <h1 className="mt-6 font-heading text-4xl font-normal leading-tight tracking-tight sm:text-6xl">
            Everything we make.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {products.length} pieces in 925 sterling silver, finished in 20 Karat gold.
          </p>
        </Reveal>

        <div className="mt-24">
          <ProductGrid products={products} />
        </div>
      </div>
      <SiteFooter />
      <SuggestionInvite />
    </main>
  );
}
