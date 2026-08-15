import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const KEY = "selen-suggestion-invite-dismissed";
const WHATSAPP_NUMBER = "919403880777";
const MESSAGE = "Hi, I have an idea for a piece I'd love to see in the SELEN catalogue!";

export function SuggestionInvite() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(KEY)) return;
    const t = window.setTimeout(() => setOpen(true), 10000);
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
          className="fixed bottom-6 right-6 left-6 z-40 max-w-sm border border-border/60 bg-background shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] sm:left-auto"
          role="dialog"
          aria-label="Suggest a piece for the SELEN catalogue"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
          >
            <X className="h-4 w-4" strokeWidth={1.4} />
          </button>
          <div className="px-7 py-7">
            <p className="text-[0.58rem] uppercase tracking-[0.38em] text-muted-foreground">
              Have An Idea?
            </p>
            <h3 className="mt-4 max-w-[85%] font-heading text-xl font-normal leading-snug tracking-tight">
              Tell us what&rsquo;s missing.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              What would you love to see in the SELEN catalogue? Share your idea &mdash; the ones
              we make could win you a reward.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`}
                target="_blank"
                rel="noreferrer"
                onClick={dismiss}
                className="border-b border-foreground/40 pb-1 text-[0.745rem] uppercase tracking-[0.28em] transition-colors hover:border-foreground"
              >
                Suggest a Piece on WhatsApp
              </a>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
