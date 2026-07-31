import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify.functions";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteFooter } from "@/components/home/SiteFooter";
import { CategoryNav } from "@/components/CategoryNav";

const TITLE = "Shop All Jewellery — SELEN";
const DESCRIPTION =
  "Browse every SELEN piece: BIS hallmarked 925 sterling silver finished in premium 20K gold plating.";

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
      <div className="mx-auto max-w-7xl px-6 py-14">
        <h1 className="font-heading text-3xl sm:text-4xl">All jewellery</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          925 sterling silver, 20K gold plated. {products.length} pieces in stock.
        </p>
        <div className="mt-8">
          <CategoryNav />
        </div>
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
