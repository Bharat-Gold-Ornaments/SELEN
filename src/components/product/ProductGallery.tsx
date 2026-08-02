import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";

export type GalleryImage = { url: string; alt: string };

/**
 * Luxury editorial gallery: one large image at a time, hover-revealed arrows on
 * desktop, always-visible arrows plus swipe on touch, circular pagination, and a
 * fullscreen viewer with keyboard navigation and zoom.
 */
export function ProductGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = images.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, go]);

  if (count === 0) return null;
  const current = images[index];

  return (
    <div className="group/gallery">
      <div className="relative">
        <div className="relative overflow-hidden bg-ivory">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.url}
              src={current.url}
              alt={current.alt || title}
              loading={index === 0 ? "eager" : "lazy"}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              onClick={() => setLightbox(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/5] w-full cursor-zoom-in touch-pan-y select-none object-contain p-4 sm:p-10"
            />
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setLightbox(true)}
            aria-label="Open fullscreen gallery"
            className="absolute right-5 top-5 text-foreground/35 opacity-100 transition-opacity duration-500 hover:text-foreground lg:opacity-0 lg:group-hover/gallery:opacity-100"
          >
            <ZoomIn className="h-4 w-4" strokeWidth={1.1} />
          </button>
        </div>

        {count > 1 && (
          <>
            <GalleryArrow side="left" onClick={() => go(-1)} />
            <GalleryArrow side="right" onClick={() => go(1)} />
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          {images.map((image, i) => (
            <button
              key={image.url + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1} of ${count}`}
              aria-current={i === index}
              className="grid h-5 w-5 place-items-center"
            >
              <span
                className={`block rounded-full transition-all duration-500 ease-out ${
                  i === index
                    ? "h-[7px] w-[7px] bg-foreground/80"
                    : "h-[5px] w-[5px] bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightbox && (
              <Lightbox
                image={current}
                title={title}
                index={index}
                count={count}
                onClose={() => setLightbox(false)}
                onGo={go}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

function GalleryArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 p-4 text-foreground/45 opacity-100 transition-all duration-500 ease-out hover:text-foreground lg:opacity-0 lg:group-hover/gallery:opacity-100 ${
        side === "left" ? "left-1 sm:left-3" : "right-1 sm:right-3"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={1} />
    </button>
  );
}

function Lightbox({
  image,
  title,
  index,
  count,
  onClose,
  onGo,
}: {
  image: GalleryImage;
  title: string;
  index: number;
  count: number;
  onClose: () => void;
  onGo: (dir: number) => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      className="fixed inset-0 z-[100] flex flex-col bg-background"
    >
      <div className="flex items-center justify-between px-6 py-6 sm:px-10">
        <span className="text-[0.7rem] uppercase tracking-[0.34em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" strokeWidth={1.1} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-10 sm:px-16">
        <AnimatePresence mode="wait">
          <motion.img
            key={image.url}
            src={image.url}
            alt={image.alt || title}
            drag={zoomed ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) onGo(1);
              else if (info.offset.x > 60) onGo(-1);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => {
              const r = (e.target as HTMLImageElement).getBoundingClientRect();
              setOrigin(
                `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`
              );
              setZoomed((z) => !z);
            }}
            style={{ transformOrigin: origin }}
            className={`max-h-full max-w-full select-none object-contain transition-transform duration-700 ease-out ${
              zoomed ? "scale-[2.1] cursor-zoom-out" : "scale-100 cursor-zoom-in"
            }`}
          />
        </AnimatePresence>

        {count > 1 && !zoomed && (
          <>
            <button
              type="button"
              onClick={() => onGo(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-4 text-foreground/45 transition-colors hover:text-foreground sm:left-6"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1} />
            </button>
            <button
              type="button"
              onClick={() => onGo(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-4 text-foreground/45 transition-colors hover:text-foreground sm:right-6"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1} />
            </button>
          </>
        )}
      </div>

      <p className="pb-8 text-center text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground/70">
        Click image to zoom · Arrow keys to browse · Esc to close
      </p>
    </motion.div>
  );
}
