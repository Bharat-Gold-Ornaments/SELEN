export interface RingSizeEntry {
  size: string;
  innerDiameterMm: number;
  innerCircumferenceMm: number;
  /** International equivalents — intentionally left unset until verified. */
  us?: string;
  uk?: string;
  eu?: string;
}

/** SELEN Ring Size = Indian Ring Size. Physical mm measurements are the source of truth. */
export const RING_SIZES: RingSizeEntry[] = [
  { size: "6", innerDiameterMm: 14.7, innerCircumferenceMm: 46.1 },
  { size: "8", innerDiameterMm: 15.3, innerCircumferenceMm: 48.0 },
  { size: "10", innerDiameterMm: 15.9, innerCircumferenceMm: 50.0 },
  { size: "12", innerDiameterMm: 16.5, innerCircumferenceMm: 51.9 },
  { size: "14", innerDiameterMm: 17.3, innerCircumferenceMm: 54.4 },
  { size: "16", innerDiameterMm: 17.9, innerCircumferenceMm: 56.3 },
  { size: "18", innerDiameterMm: 18.5, innerCircumferenceMm: 58.3 },
  { size: "20", innerDiameterMm: 19.2, innerCircumferenceMm: 60.2 },
  { size: "22", innerDiameterMm: 19.8, innerCircumferenceMm: 62.1 },
  { size: "24", innerDiameterMm: 20.4, innerCircumferenceMm: 64.0 },
];

/** Shopify product option name that identifies a ring's size option (case-insensitive match). */
export const RING_SIZE_OPTION_NAME = "Size";

export function isRingSizeOption(optionName: string): boolean {
  return optionName.trim().toLowerCase() === RING_SIZE_OPTION_NAME.toLowerCase();
}

export function getRingSize(size: string): RingSizeEntry | undefined {
  return RING_SIZES.find((entry) => entry.size === size);
}

export function formatRingMeasurement(entry: RingSizeEntry): string {
  return `${entry.innerDiameterMm} mm inner diameter · ${entry.innerCircumferenceMm} mm inner circumference`;
}
