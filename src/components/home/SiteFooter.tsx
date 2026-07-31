import { Link } from "@tanstack/react-router";

type FooterLink = { label: string; to?: string; hash?: string; slug?: string };

const columns: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Explore",
    links: [
      { label: "Collections", to: "/", hash: "collection" },
      { label: "Design with AI", to: "/design-with-ai" },
      { label: "Material Library", to: "/materials" },
      { label: "About SELEN", to: "/about" },
    ],
  },
  {
    title: "Know your jewellery",
    links: [
      { label: "925 Sterling Silver", to: "/materials/$slug", slug: "925-sterling-silver" },
      { label: "20K Gold Plating", to: "/materials/$slug", slug: "gold-plating" },
      { label: "Jewellery Care", to: "/materials/$slug", slug: "jewellery-care" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-ivory py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-14 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-heading text-2xl tracking-wide">SELEN</p>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              BIS Hallmarked 925 sterling silver, finished in premium 20K gold plating.
              Beautiful on the outside. Precious on the inside.
            </p>
          </div>

          <div className="flex gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/80">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.slug ? (
                        <Link
                          to="/materials/$slug"
                          params={{ slug: link.slug }}
                          className="text-sm text-foreground/80 hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          to={link.to as "/" | "/materials" | "/about"}
                          hash={link.hash}
                          className="text-sm text-foreground/80 hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-16 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/80">
          &copy; {new Date().getFullYear()} SELEN · A KinMitra brand
        </p>
      </div>
    </footer>
  );
}
