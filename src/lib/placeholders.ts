/**
 * Central registry of placeholder imagery.
 * Replace any file in `src/assets/placeholders/` with a real photograph of the
 * same aspect ratio and the whole site updates — no layout changes required.
 */
import hero from "@/assets/placeholders/hero.jpg";
import banner from "@/assets/placeholders/banner.jpg";
import founder from "@/assets/placeholders/founder.jpg";
import store from "@/assets/placeholders/store.jpg";
import lifestyle from "@/assets/placeholders/lifestyle.jpg";
import collection1 from "@/assets/placeholders/collection-1.jpg";
import collection2 from "@/assets/placeholders/collection-2.jpg";
import collection3 from "@/assets/placeholders/collection-3.jpg";
import collection4 from "@/assets/placeholders/collection-4.jpg";
import collection5 from "@/assets/placeholders/collection-5.jpg";
import collection6 from "@/assets/placeholders/collection-6.jpg";
import sterlingTeaser from "@/assets/placeholders/sterling-teaser.jpg";
import founders from "@/assets/placeholders/founders.jpg";

export const PLACEHOLDER = {
  hero,
  banner,
  founder,
  founders,
  sterlingTeaser,
  store,
  lifestyle,
  collection1,
  collection2,
  collection3,
  collection4,
  collection5,
  collection6,
} as const;


/** Editorial fallbacks used when a product has fewer than five photographs. */
export const EDITORIAL_FALLBACKS = [lifestyle, collection1, banner, collection5];
