import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify.functions";
import { Hero } from "@/components/home/Hero";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { EditorialCollections } from "@/components/home/EditorialCollections";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { VisitStore } from "@/components/home/VisitStore";
import { DesignWithAiTeaser } from "@/components/home/DesignWithAiTeaser";
import { StoreInvitation } from "@/components/home/StoreInvitation";
import { SiteFooter } from "@/components/home/SiteFooter";
import { CouponPopup } from "@/components/home/CouponPopup";

const TITLE = "SELEN — Gold Finish Sterling Silver Jewellery";
const DESCRIPTION =
  "925 sterling silver finished in 20 Karat gold. Editorial collections of everyday fine jewellery, made to be worn and not stored.";

const productsQuery = {
  queryKey: ["products"],
  queryFn: () => getProducts({ data: {} }),
};

// Distinct queryKey from productsQuery above — that one is the full, unfiltered
// catalog, shared and reused as-is by shop.tsx/collections.$category.tsx/
// product.$handle.tsx, so it can't be repointed at a filtered query without
// corrupting what those pages expect from the shared cache entry.
const featuredProductsQuery = {
  queryKey: ["products", "featured"],
  queryFn: () => getProducts({ data: { query: "tag:featured" } }),
};

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
    await Promise.all([
      context.queryClient.ensureQueryData(productsQuery),
      context.queryClient.ensureQueryData(featuredProductsQuery),
    ]);
  },
  component: Index,
});

function Index() {
  useSuspenseQuery(productsQuery);
  const { data: featuredProducts } = useSuspenseQuery(featuredProductsQuery);

  return (
    <main className="bg-background">
      <Hero />
      <ShopByCategory />
      <FeaturedProduct products={featuredProducts} />
      <EditorialCollections />
      <VisitStore />
      <DesignWithAiTeaser />
      <SiteFooter />
      <StoreInvitation />
      <CouponPopup />
    </main>
  );
}
