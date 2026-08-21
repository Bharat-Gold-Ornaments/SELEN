import { Link } from "@tanstack/react-router";
import { EDITORIAL_COLLECTIONS } from "@/lib/collections";
import { MascotSeal } from "@/components/mascot/Mascot";
import { SelenPromise } from "@/components/home/SelenPromise";

const SHOP = ["earrings", "pendants", "necklaces", "rings", "bracelets", "anklets"];

export function SiteFooter() {
  return (
    <>
    <SelenPromise />
    <footer className="border-t border-border/50 bg-background px-6 pb-14 pt-24 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <p className="font-heading text-lg tracking-[0.42em]">SELEN</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              925 sterling silver, finished in 20 Karat gold. Made to be worn, not stored.
            </p>
          </div>

          <FooterColumn title="Shop">
            {SHOP.map((slug) => (
              <li key={slug}>
                <Link
                  to="/collections/$category"
                  params={{ category: slug }}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {slug.charAt(0).toUpperCase() + slug.slice(1)}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Collections">
            {EDITORIAL_COLLECTIONS.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/collections/$category"
                  params={{ category: c.slug }}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="About">
            <li>
              <Link
                to="/about"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Our Belief
              </Link>
            </li>
            <li>
              <Link
                to="/why-sterling-silver"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Why Sterling Silver
              </Link>
            </li>
            <li>
              <Link
                to="/materials"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Materials
              </Link>
            </li>
            <li>
              <Link
                to="/materials/$slug"
                params={{ slug: "jewellery-care" }}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Care Guide
              </Link>
            </li>
            <li>
              <Link
                to="/visit"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Visit Store
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/design-with-ai"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Design with AI
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Legal">
            <li>
              <Link
                to="/refund-policy"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Refund Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-border/50 pt-8 text-[0.725rem] uppercase tracking-[0.3em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <MascotSeal pose="wave" className="h-11 w-11" />
            <span>© {new Date().getFullYear()} SELEN</span>
          </div>
          <span>A BHARAT GOLD ORNAMENTS PVT LTD BRAND</span>
        </div>
      </div>
    </footer>
    </>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.58rem] uppercase tracking-[0.38em] text-muted-foreground/80">{title}</p>
      <ul className="mt-6 space-y-3">{children}</ul>
    </div>
  );
}
