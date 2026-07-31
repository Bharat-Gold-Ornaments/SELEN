import { Link } from "@tanstack/react-router";
import { CartDrawer } from "@/components/CartDrawer";
import { CATEGORIES } from "@/lib/categories";

const linkClass =
  "text-muted-foreground transition-colors hover:text-foreground text-[0.7rem] uppercase tracking-[0.25em]";

const PRIMARY = ["rings", "pendants", "earrings", "necklaces"];

export function Header() {
  const primary = PRIMARY.map((slug) => CATEGORIES.find((c) => c.slug === slug)!).filter(Boolean);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-heading text-2xl font-semibold tracking-tight">
          SELEN
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {primary.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$category"
              params={{ category: c.slug }}
              className={linkClass}
              activeProps={{ className: "text-foreground" }}
            >
              {c.label}
            </Link>
          ))}
          <div className="group relative">
            <Link to="/shop" className={linkClass}>
              More
            </Link>
            <div className="invisible absolute right-0 top-full w-48 pt-4 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-sm border border-border/60 bg-background p-3 shadow-lg">
                <Link to="/shop" className="block px-3 py-2 text-xs hover:bg-muted">
                  All jewellery
                </Link>
                <Link
                  to="/collections/$category"
                  params={{ category: "bracelets" }}
                  className="block px-3 py-2 text-xs hover:bg-muted"
                >
                  Bracelets
                </Link>
                <Link to="/materials" className="block px-3 py-2 text-xs hover:bg-muted">
                  Materials
                </Link>
                <Link to="/about" className="block px-3 py-2 text-xs hover:bg-muted">
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/shop" className={`${linkClass} md:hidden`}>
            Shop
          </Link>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
