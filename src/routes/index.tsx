import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify.functions";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SELEN — Gold-Plated Silver Jewellery" },
      { name: "description", content: "Shop SELEN's curated collection of gold-plated silver jewellery." },
      { property: "og:title", content: "SELEN — Gold-Plated Silver Jewellery" },
      { property: "og:description", content: "Shop SELEN's curated collection of gold-plated silver jewellery." },
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
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Handcrafted in India
            </div>
            <h1 className="font-heading text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Fine gold-plated silver jewellery
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover the SELEN collection — delicate pendants, sculptural earrings, and timeless
              pieces made to be worn every day.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-medium sm:text-3xl">Collection</h2>
          <span className="text-sm text-muted-foreground">{products.length} pieces</span>
        </div>

        {products.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No products found.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell me what pieces you'd like to add to your SELEN store.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product.node} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
