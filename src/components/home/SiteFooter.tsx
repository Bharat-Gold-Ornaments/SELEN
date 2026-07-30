export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-ivory py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-heading text-2xl tracking-wide">SELEN</p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
            BIS Hallmarked 925 sterling silver, finished in premium 20K gold plating.
            Everyday jewellery on a precious foundation.
          </p>
        </div>
        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/80">
          &copy; {new Date().getFullYear()} SELEN · A KinMitra brand
        </p>
      </div>
    </footer>
  );
}
