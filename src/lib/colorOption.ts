import type { ShopifyProduct } from "@/lib/shopify.functions";
import type { GalleryImage } from "@/components/product/ProductGallery";

export interface ColorSwatch {
  /** Canonical value — used as the display label regardless of how the Shopify value is spelled. */
  value: string;
  label: string;
  swatchHex: string;
  /** `custom.<key>` product metafield holding this color's curated full angle set. */
  galleryMetafieldKey: string;
  /** Alternate Shopify option-value spellings that should still match this color (lowercase). */
  aliases: string[];
}

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    value: "Yellow Gold",
    label: "Yellow Gold",
    swatchHex: "#D4AF37",
    galleryMetafieldKey: "gallery_yellow_gold",
    aliases: ["yellow gold", "yellow", "gold"],
  },
  {
    value: "Rose Gold",
    label: "Rose Gold",
    swatchHex: "#B76E79",
    galleryMetafieldKey: "gallery_rose_gold",
    aliases: ["rose gold", "rose"],
  },
  {
    value: "Silver",
    label: "Silver",
    swatchHex: "#C7C7CC",
    galleryMetafieldKey: "gallery_silver",
    aliases: ["silver", "white gold", "platinum"],
  },
];

/** Shopify product option names that identify the metal color option (case-insensitive match). */
const COLOR_OPTION_NAMES = ["color", "colour", "metal", "metal color", "metal colour"];

export function isColorOption(optionName: string): boolean {
  return COLOR_OPTION_NAMES.includes(optionName.trim().toLowerCase());
}

/** Matches a Shopify option value to a known color, tolerating spelling variations (e.g. "Yellow" vs "Yellow Gold"). */
export function getColorSwatch(value: string): ColorSwatch | undefined {
  const normalized = value.trim().toLowerCase();
  return COLOR_SWATCHES.find(
    (c) => c.value.toLowerCase() === normalized || c.aliases.includes(normalized),
  );
}

export interface VariantForGallery {
  selectedOptions: Array<{ name: string; value: string }>;
  image: { url: string; altText: string | null } | null;
}

/**
 * A color's angle set built from the de-duplicated `image` field across every variant that
 * shares this color (e.g. one photo per size). Only ever has more than one photo when a color
 * spans multiple variants — true for rings (color × size), but a single-axis product (color-only,
 * e.g. earrings) has exactly one variant per color, so this caps at one image there.
 */
export function getColorVariantGallery(
  variants: VariantForGallery[],
  colorValue: string,
): GalleryImage[] {
  const swatch = getColorSwatch(colorValue);
  const label = swatch?.label ?? colorValue;
  const seen = new Set<string>();
  const images: GalleryImage[] = [];

  for (const variant of variants) {
    const matchesColor = variant.selectedOptions.some(
      (o) => isColorOption(o.name) && o.value === colorValue,
    );
    if (!matchesColor || !variant.image || seen.has(variant.image.url)) continue;
    seen.add(variant.image.url);
    images.push({ url: `${variant.image.url}?width=1600`, alt: variant.image.altText ?? label });
  }

  return images;
}

type ProductMetafields = ShopifyProduct["metafields"];

/**
 * A color's curated angle set from its `custom.gallery_*` metafield — the only way to get more
 * than one photo per color on a single-axis product, since variant.image alone can't. Empty when
 * nothing's been uploaded to that metafield yet.
 */
export function getColorMetafieldGallery(
  metafields: ProductMetafields,
  colorValue: string,
): GalleryImage[] {
  const swatch = getColorSwatch(colorValue);
  if (!swatch || !metafields) return [];

  const metafield = metafields.find((m) => m?.key === swatch.galleryMetafieldKey);
  const edges = metafield?.references?.edges ?? [];

  return edges
    .map((edge) => edge.node.image)
    .filter((image): image is { url: string; altText: string | null } => !!image)
    .map((image) => ({ url: `${image.url}?width=1600`, alt: image.altText ?? swatch.label }));
}

/**
 * A color's full gallery: the curated metafield set takes priority when populated (needed for
 * single-axis products), falling back to the de-duplicated variant-image set (which already
 * covers multi-size products like rings for free), falling back to nothing — callers should then
 * use the product's flat image list.
 */
export function getColorGallery(
  metafields: ProductMetafields,
  variants: VariantForGallery[],
  colorValue: string,
): GalleryImage[] {
  const curated = getColorMetafieldGallery(metafields, colorValue);
  if (curated.length > 0) return curated;
  return getColorVariantGallery(variants, colorValue);
}
