import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify.functions";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryNav } from "@/components/CategoryNav";
import { SiteFooter } from "@/components/home/SiteFooter";
import { filterByCategory, getCategory } from "@/lib/categories";

const productsQuery = {
  queryKey: ["products"],
  queryFn: () => getProducts({ data: {} }),
};

export const Route = createFileRoute("/collections/$category")({
  loader: async ({ context, params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    await context.queryClient.ensureQueryData(productsQuery);
    return { label: category.label, line: category.line };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — SELEN" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.label} — SELEN`;
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
  component: CategoryPage,
});

function CategoryPage() {
  const { category: slug } = Route.useParams();
  const category = getCategory(slug)!;
  const { data } = useSuspenseQuery(productsQuery);
  const products = filterByCategory(data, category);

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <h1 className="font-heading text-3xl sm:text-4xl">{category.label}</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">{category.line}</p>
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
