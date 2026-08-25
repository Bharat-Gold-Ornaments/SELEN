import type { ShopifyProduct } from "@/lib/shopify.functions";
import type { GalleryImage } from "@/components/product/ProductGallery";

export interface ColorSwatch {
  /** Canonical value — used as the display label regardless of how the Shopify value is spelled. */
  value: string;
  label: string;
  swatchHex: string;
  /** `custom.<key>` product metafield holding this color's full angle set. */
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

type ProductMetafields = ShopifyProduct["metafields"];

/**
 * Full angle set for a color, sourced from its `custom.gallery_*` metafield.
 * Empty when no renders have been uploaded for that color yet.
 */
export function getColorGallery(metafields: ProductMetafields, colorValue: string): GalleryImage[] {
  const swatch = getColorSwatch(colorValue);
  if (!swatch || !metafields) return [];

  const metafield = metafields.find((m) => m?.key === swatch.galleryMetafieldKey);
  const edges = metafield?.references?.edges ?? [];

  return edges
    .map((edge) => edge.node.image)
    .filter((image): image is { url: string; altText: string | null } => !!image)
    .map((image) => ({ url: `${image.url}?width=1600`, alt: image.altText ?? swatch.label }));
}
