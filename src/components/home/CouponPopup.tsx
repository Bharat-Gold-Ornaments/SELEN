import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, X } from "lucide-react";
import coupon from "@/assets/GANESHA26.png";

const KEY = "selen-coupon-dismissed";
const CODE = "GANESHA26";
const OPEN_DELAY_MS = 1400;

function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const el = document.createElement("textarea");
  el.value = text;
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.focus();
  el.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(el);
  }
  return Promise.resolve();
}

export function CouponPopup() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(KEY)) return;
    const t = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={dismiss}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Festive gift from SELEN — coupon code"
            className="relative flex max-h-[92vh] w-full max-w-[380px] flex-col overflow-y-auto border border-border/60 bg-background shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-foreground/15 bg-background/85 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
            >
              <X className="h-4 w-4" strokeWidth={1.4} />
            </button>

            <Link to="/shop" onClick={dismiss} className="block">
              <img
                src={coupon}
                alt="A festive gift from SELEN — ₹300 off on orders above ₹1,999 with code GANESHA26"
                className="aspect-square w-full object-cover"
              />
            </Link>

            <div className="flex flex-col gap-3 p-5 sm:p-6">
              <button
                type="button"
                onClick={handleCopy}
                className="flex w-full items-center justify-center gap-3 border border-foreground/30 px-5 py-3.5 text-[0.78rem] uppercase tracking-[0.28em] text-foreground transition-colors hover:border-foreground"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" strokeWidth={1.6} />
                      Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" strokeWidth={1.6} />
                      Copy Code {CODE}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <Link
                to="/shop"
                onClick={dismiss}
                className="text-center text-[0.7rem] uppercase tracking-[0.32em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Shop the Collection →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
