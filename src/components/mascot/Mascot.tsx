import { MASCOT, type MascotPose } from "@/lib/mascot";
import { cn } from "@/lib/utils";

/**
 * Small embossed seal treatment — desaturated and low contrast so the mascot
 * reads as a quiet mark rather than an illustration.
 */
export function MascotSeal({ className, pose = "wave" }: { className?: string; pose?: MascotPose }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-ivory/70 ring-1 ring-border/60",
        className
      )}
    >
      <img
        src={MASCOT[pose]}
        alt=""
        loading="lazy"
        className="h-[115%] w-[115%] object-cover object-top opacity-45 mix-blend-multiply saturate-[0.35]"
      />
    </span>
  );
}

/** Minimal, premium empty-state block used for cart, wishlist, search and 404. */
export function MascotEmptyState({
  pose,
  eyebrow,
  title,
  body,
  children,
  className,
}: {
  pose: MascotPose;
  eyebrow?: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-sm px-6 py-12 text-center", className)}>
      <img
        src={MASCOT[pose]}
        alt=""
        aria-hidden
        loading="lazy"
        className="mx-auto h-32 w-32 object-contain object-top opacity-80 sm:h-40 sm:w-40"
      />
      {eyebrow && (
        <p className="mt-7 text-[0.58rem] uppercase tracking-[0.38em] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 font-heading text-2xl font-normal leading-snug tracking-tight">{title}</h2>
      {body && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>}
      {children && <div className="mt-8 flex flex-wrap justify-center gap-5">{children}</div>}
    </div>
  );
}
