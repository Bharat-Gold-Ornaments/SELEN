import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { PLACEHOLDER } from "@/lib/placeholders";
import { MASCOT } from "@/lib/mascot";

const KEY = "selen-store-invite-dismissed";

export function StoreInvitation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(KEY)) return;
    const t = window.setTimeout(() => setOpen(true), 9000);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 right-6 z-40 max-w-sm border border-border/60 bg-background shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] sm:left-8 sm:right-auto"
          role="dialog"
          aria-label="Visit the SELEN boutique"
        >
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" strokeWidth={1.2} />
          </button>
          <div className="relative">
            <img
              src={PLACEHOLDER.store}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-32 w-full object-cover"
            />
            <img
              src={MASCOT.namaste}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute -bottom-2 right-4 h-24 w-24 object-contain object-top drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
            />
          </div>
          <div className="px-7 py-7">
            <p className="text-[0.58rem] uppercase tracking-[0.38em] text-muted-foreground">
              The Boutique
            </p>
            <h3 className="mt-4 max-w-[70%] font-heading text-xl font-normal leading-snug tracking-tight">
              Some things are better held.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Book a quiet hour with us, or simply drop by.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/contact"
                onClick={dismiss}
                className="border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
              >
                Book an Appointment
              </Link>
              <Link
                to="/visit"
                onClick={dismiss}
                className="border-b border-transparent pb-1 text-[0.745rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Visit Our Store
              </Link>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
