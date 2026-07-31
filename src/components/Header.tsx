import { Link } from "@tanstack/react-router";
import { CartDrawer } from "@/components/CartDrawer";

const linkClass =
  "text-muted-foreground transition-colors hover:text-foreground text-[0.7rem] uppercase tracking-[0.25em]";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-heading text-2xl font-semibold tracking-tight">
          SELEN
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          <Link to="/" hash="collection" className={linkClass}>
            Collections
          </Link>
          <Link to="/materials" className={linkClass}>
            Materials
          </Link>
          <Link to="/about" className={linkClass}>
            About
          </Link>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}
