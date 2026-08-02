import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify.functions";
import { Hero } from "@/components/home/Hero";
import { EditorialCollections } from "@/components/home/EditorialCollections";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { WhySterlingTeaser } from "@/components/home/WhySterlingTeaser";
import { OurBelief } from "@/components/home/OurBelief";
import { VisitStore } from "@/components/home/VisitStore";
import { StoreInvitation } from "@/components/home/StoreInvitation";
import { SiteFooter } from "@/components/home/SiteFooter";

const TITLE = "SELEN — Gold Plated Sterling Silver Jewellery";
const DESCRIPTION =
  "925 sterling silver finished in 20 Karat gold. Editorial collections of everyday fine jewellery, made to be worn and not stored.";

const productsQuery = {
  queryKey: ["products"],
  queryFn: () => getProducts({ data: {} }),
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
    await context.queryClient.ensureQueryData(productsQuery);
  },
  component: Index,
});

function Index() {
  const { data: products } = useSuspenseQuery(productsQuery);

  return (
    <main className="bg-background">
      <Hero />
      <EditorialCollections />
      <FeaturedProduct products={products} />
      <WhySterlingTeaser />
      <OurBelief />
      <VisitStore />
      <SiteFooter />
      <StoreInvitation />
    </main>
  );
}
