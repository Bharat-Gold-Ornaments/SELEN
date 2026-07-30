const QUOTES = [
  {
    quote:
      "Six months of daily wear and it still looks like the day it arrived. That never happened with my old pieces.",
    name: "Ananya R.",
    city: "Bengaluru",
  },
  {
    quote:
      "I gifted the pendant to my sister. Knowing it's hallmarked silver made it feel like a real gift, not a trinket.",
    name: "Meher S.",
    city: "Mumbai",
  },
  {
    quote:
      "My skin reacts to almost everything. These I wear to work, to the gym, to sleep.",
    name: "Ritika P.",
    city: "Pune",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
          Worn every day
        </p>
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.name}>
              <blockquote className="font-heading text-lg leading-relaxed">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[0.65rem] uppercase tracking-[0.26em] text-muted-foreground">
                {q.name} · {q.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
