import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/categories";

const base =
  "shrink-0 rounded-full border border-border/70 px-5 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition-colors hover:border-foreground";

export function CategoryNav() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      <Link to="/shop" className={base} activeProps={{ className: "border-foreground bg-foreground text-background" }}>
        All
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          to="/collections/$category"
          params={{ category: c.slug }}
          className={base}
          activeProps={{ className: "border-foreground bg-foreground text-background" }}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
