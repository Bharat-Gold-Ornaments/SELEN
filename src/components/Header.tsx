import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { NavDrawer } from "@/components/NavDrawer";
import logoUrl from "@/assets/selen-logo.png";

const linkClass =
  "text-[0.775rem] uppercase tracking-[0.28em] text-foreground/70 transition-colors hover:text-foreground";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid h-[72px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-10">
          <div className="flex min-w-0 items-center">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex items-center gap-3 text-foreground/70 transition-colors hover:text-foreground"
            >
              <Menu className="h-5 w-5 shrink-0" strokeWidth={1.2} />
              <span className="hidden text-[0.775rem] uppercase tracking-[0.28em] sm:inline">Menu</span>
            </button>
          </div>

          <Link to="/" className="flex items-center justify-center" aria-label="SELEN home">
            <img
              src={logoUrl}
              alt="SELEN"
              width={1500}
              height={780}
              className="h-9 w-auto sm:h-11"
            />
          </Link>

          <div className="flex min-w-0 items-center justify-end gap-6">
            <Link to="/shop" className={`${linkClass} hidden sm:inline`}>
              Shop
            </Link>
            <Link to="/contact" className={`${linkClass} hidden sm:inline`}>
              Contact
            </Link>
            <CartDrawer />
          </div>
        </div>
      </header>
      <NavDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
