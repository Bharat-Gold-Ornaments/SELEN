export interface MaterialEntry {
  slug: string;
  term: string;
  short: string;
  summary: string;
  question: string;
  sections: Array<{ heading: string; body: string[] }>;
  facts: Array<{ label: string; value: string }>;
}

export const materials: MaterialEntry[] = [
  {
    slug: "925-sterling-silver",
    term: "925 Sterling Silver",
    short: "The precious foundation beneath every SELEN piece.",
    summary:
      "925 sterling silver is 92.5% pure silver alloyed with 7.5% other metals for strength. It is a precious metal — not a plated base — which is why it can be polished, repaired and worn for decades.",
    question: "What is 925 sterling silver?",
    sections: [
      {
        heading: "Why 92.5 and not 100",
        body: [
          "Pure silver is too soft to hold a setting or a clasp. Adding 7.5% of harder metals gives sterling silver the strength to hold a stone securely and keep its shape through daily wear.",
          "The number 925 stamped inside a piece is a promise about what the metal is made of, all the way through — not just on the surface.",
        ],
      },
      {
        heading: "How to tell it apart from imitation",
        body: [
          "Imitation jewellery is usually brass or an alloy with a thin colour coating. Once that coating wears, a different metal appears underneath.",
          "Sterling silver behaves differently. It may darken slowly over time, but the metal beneath is unchanged — a polish returns it to its original shine.",
        ],
      },
    ],
    facts: [
      { label: "Purity", value: "92.5% fine silver" },
      { label: "Hallmark", value: "BIS certified, stamped 925" },
      { label: "Lifespan", value: "Decades, with care" },
    ],
  },
  {
    slug: "gold-plating",
    term: "20 Karat Gold Plating",
    short: "A whisper-thin layer of real gold over a precious core.",
    summary:
      "Gold plating is a microscopic layer of gold bonded to a base metal through electroplating. What matters is two things: the karat of the gold and what lies beneath it.",
    question: "What is 20 Karat gold plating?",
    sections: [
      {
        heading: "Karat is only half the story",
        body: [
          "20 Karat plating gives a warm, deep tone rather than the brassy yellow of lower-karat finishes. But plating is measured in microns — no plating, at any karat, is permanent.",
          "That is exactly why the base matters. When plating on brass fades, you see brass. When plating on 925 sterling silver softens, you see silver.",
        ],
      },
      {
        heading: "How to make plating last",
        body: [
          "Put jewellery on last, after perfume, lotion and hairspray. Take it off before swimming, showering and sleeping.",
          "Store pieces separately in a soft pouch so the plating is not abraded by other metal.",
        ],
      },
    ],
    facts: [
      { label: "Karat", value: "20 Karat gold" },
      { label: "Method", value: "Electroplated over 925 silver" },
      { label: "Base metal", value: "Never brass" },
    ],
  },
  {
    slug: "cubic-zirconia",
    term: "Cubic Zirconia (CZ)",
    short: "A hand-set stone chosen for clarity and cut, not cost.",
    summary:
      "Cubic zirconia is a lab-created stone with a brilliance close to diamond. The difference between a beautiful CZ and a dull one is entirely in the grade, the cut and how it is set.",
    question: "What is cubic zirconia?",
    sections: [
      {
        heading: "Grade and cut",
        body: [
          "CZ is graded on clarity and colour. A well-graded stone is colourless and free of cloudiness; a poor one looks glassy under daylight.",
          "Facet precision decides how light returns to the eye. SELEN stones are cut to a consistent facet pattern so a pair of earrings reads as a matched pair.",
        ],
      },
      {
        heading: "Set by hand",
        body: [
          "Each stone is seated and secured by a setter, not glued. A hand-set stone sits level, catches light evenly, and stays put.",
        ],
      },
    ],
    facts: [
      { label: "Origin", value: "Lab created" },
      { label: "Hardness", value: "8 to 8.5 on the Mohs scale" },
      { label: "Setting", value: "Hand set, never glued" },
    ],
  },
  {
    slug: "bis-hallmark",
    term: "BIS Hallmark",
    short: "An independent stamp that verifies what the metal actually is.",
    summary:
      "A BIS hallmark is issued by the Bureau of Indian Standards after independent assay. It certifies the purity of the silver — a claim tested by someone other than the brand making it.",
    question: "What does a BIS hallmark mean?",
    sections: [
      {
        heading: "Why third-party matters",
        body: [
          "Any brand can print 925 on a label. A hallmark means an accredited assay centre tested the metal and stamped the result.",
          "It is the simplest protection a buyer has against jewellery sold as silver that is not silver.",
        ],
      },
    ],
    facts: [
      { label: "Issued by", value: "Bureau of Indian Standards" },
      { label: "Verifies", value: "Metal purity" },
      { label: "Where to look", value: "Stamped on the piece" },
    ],
  },
  {
    slug: "tarnish",
    term: "Tarnish",
    short: "A surface reaction — not damage, and always reversible on silver.",
    summary:
      "Tarnish is a thin layer that forms when silver reacts with sulphur in the air. It sits on the surface. It does not consume the metal, and it lifts off with a polishing cloth.",
    question: "Why does silver tarnish, and is it a problem?",
    sections: [
      {
        heading: "Fading versus tarnishing",
        body: [
          "Fading is loss — a coating wearing away from a base metal that was never precious. Tarnishing is a reaction on a precious surface, and it reverses.",
          "This is the single clearest difference between fashion jewellery and jewellery built on sterling silver.",
        ],
      },
      {
        heading: "Slowing it down",
        body: [
          "Air, humidity and skin chemistry all accelerate tarnish. A sealed pouch and a dry drawer slow it dramatically.",
        ],
      },
    ],
    facts: [
      { label: "Cause", value: "Sulphur in air and skin" },
      { label: "Reversible", value: "Yes, with a polish cloth" },
      { label: "Harms the metal", value: "No" },
    ],
  },
  {
    slug: "jewellery-care",
    term: "Jewellery Care",
    short: "Five habits that keep gold-plated silver looking new.",
    summary:
      "Most jewellery does not wear out. It gets worn out — by chemicals, friction and storage. Care is a handful of small habits.",
    question: "How do I care for gold-plated silver jewellery?",
    sections: [
      {
        heading: "The five habits",
        body: [
          "Last on, first off: wear jewellery after perfume and remove it before you undress.",
          "Keep it dry: no showers, pools or sea water.",
          "Wipe after wearing with a soft dry cloth to lift skin oils.",
          "Store separately in a pouch, away from other metal.",
          "Polish gently and only when needed — over-polishing thins plating.",
        ],
      },
    ],
    facts: [
      { label: "Avoid", value: "Chlorine, perfume, ultrasonic cleaners" },
      { label: "Use", value: "Soft dry cloth" },
      { label: "Store", value: "Dry, sealed, separate" },
    ],
  },
  {
    slug: "silver-vs-imitation",
    term: "Silver vs Imitation",
    short: "The difference is not the look. It is what happens in year two.",
    summary:
      "Imitation jewellery and sterling silver jewellery can look identical on day one. They diverge entirely with time, because one has a precious foundation and the other does not.",
    question: "What is the difference between sterling silver and imitation jewellery?",
    sections: [
      {
        heading: "Day one",
        body: ["Both shine. Both photograph well. This is where most buying decisions are made."],
      },
      {
        heading: "Month six",
        body: [
          "Imitation pieces begin to show the base metal at edges and contact points. Silver-based pieces may soften in tone but reveal silver, not brass.",
        ],
      },
      {
        heading: "Year two",
        body: [
          "Imitation jewellery is usually discarded. A sterling silver piece can be polished, re-plated and worn again — which makes it far less expensive than it first appeared.",
        ],
      },
    ],
    facts: [
      { label: "Imitation base", value: "Brass or mixed alloy" },
      { label: "SELEN base", value: "BIS hallmarked 925 silver" },
      { label: "Repairable", value: "Only precious metal is" },
    ],
  },
];

export const getMaterial = (slug: string) => materials.find((m) => m.slug === slug);
