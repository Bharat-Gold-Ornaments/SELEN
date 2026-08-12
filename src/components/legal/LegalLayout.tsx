import type { ReactNode } from "react";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Reveal, SectionLabel } from "@/components/editorial/Reveal";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-background">
      <section className="bg-ivory px-6 py-28 sm:px-10 sm:py-36">
        <Reveal className="mx-auto max-w-3xl">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="mt-8 font-heading text-4xl font-normal leading-[1.08] tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-[0.725rem] uppercase tracking-[0.36em] text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </Reveal>
      </section>

      <section className="border-t border-border/50 px-6 py-20 sm:px-10 sm:py-28">
        <Reveal className="mx-auto max-w-3xl space-y-14 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {children}
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading?: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-border/60 pt-10 first:border-t-0 first:pt-0">
      {heading && (
        <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground">
          {heading}
        </h2>
      )}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalContact({
  lines,
}: {
  lines: ReactNode[];
}) {
  return (
    <p className="not-italic text-foreground">
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </p>
  );
}
