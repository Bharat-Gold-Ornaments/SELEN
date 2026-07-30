import { Link } from "@tanstack/react-router";
import { CartDrawer } from "@/components/CartDrawer";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-heading text-2xl font-semibold tracking-tight">
          SELEN
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium sm:flex">
          <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
          <a
            href="https://s3iphy-ah.myshopify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Store admin
          </a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}
