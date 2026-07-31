import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify.functions";
import { Hero } from "@/components/home/Hero";
import { BeneathTheGold } from "@/components/home/BeneathTheGold";
import { MaterialExplorer } from "@/components/home/MaterialExplorer";
import { WhySelenExists } from "@/components/home/WhySelenExists";
import { EditorialCollections } from "@/components/home/EditorialCollections";
import { CraftsmanshipJourney } from "@/components/home/CraftsmanshipJourney";
import { AiPersonalization } from "@/components/home/AiPersonalization";
import { Testimonials } from "@/components/home/Testimonials";
import { SiteFooter } from "@/components/home/SiteFooter";

const TITLE = "SELEN";
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
      <MaterialExplorer />
      <WhySelenExists />
      <EditorialCollections products={products} />
      <CraftsmanshipJourney />
      <AiPersonalization />
      <Testimonials />
      <SiteFooter />
    </main>
  );
}
