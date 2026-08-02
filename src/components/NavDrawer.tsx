import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";
import { EDITORIAL_COLLECTIONS } from "@/lib/collections";

const SHOP = ["earrings", "necklaces", "rings", "bracelets", "anklets"];

export function NavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-[70] flex h-full w-full max-w-[420px] flex-col overflow-y-auto bg-background px-8 pb-16 pt-7 sm:px-12"
            aria-label="Main menu"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-xl tracking-[0.3em]">SELEN</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" strokeWidth={1.2} />
              </button>
            </div>

            <nav className="mt-16 space-y-14">
              <Group label="Shop">
                {SHOP.map((slug) => (
                  <DrawerLink key={slug} to="/collections/$category" params={{ category: slug }} onClose={onClose}>
                    {slug.charAt(0).toUpperCase() + slug.slice(1)}
                  </DrawerLink>
                ))}
              </Group>

              <Group label="Collections">
                {EDITORIAL_COLLECTIONS.map((c) => (
                  <DrawerLink
                    key={c.slug}
                    to="/collections/$category"
                    params={{ category: c.slug }}
                    onClose={onClose}
                  >
                    {c.title}
                  </DrawerLink>
                ))}
              </Group>

              <Group label="About">
                <DrawerLink to="/about" onClose={onClose}>
                  Our Belief
                </DrawerLink>
                <DrawerLink to="/materials" onClose={onClose}>
                  Materials
                </DrawerLink>
                <DrawerLink to="/materials/$slug" params={{ slug: "jewellery-care" }} onClose={onClose}>
                  Care Guide
                </DrawerLink>
                <DrawerLink to="/visit" onClose={onClose}>
                  Visit Store
                </DrawerLink>
                <DrawerLink to="/contact" onClose={onClose}>
                  Contact
                </DrawerLink>
              </Group>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.725rem] uppercase tracking-[0.4em] text-muted-foreground">{label}</p>
      <ul className="mt-6 space-y-4">{children}</ul>
    </div>
  );
}

function DrawerLink({
  children,
  onClose,
  ...rest
}: {
  children: React.ReactNode;
  onClose: () => void;
} & Record<string, unknown>) {
  return (
    <li>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Link
        {...(rest as any)}
        onClick={onClose}
        className="font-heading text-2xl font-normal tracking-tight text-foreground/90 transition-colors hover:text-primary"
      >
        {children}
      </Link>
    </li>
  );
}
