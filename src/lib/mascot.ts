/**
 * SELEN mascot — a secondary brand signature only.
 * Approved placements: footer seal, store invitation popup, empty states (cart,
 * wishlist, no results, 404). Never in nav, hero, product or collection surfaces.
 */
import wave from "@/assets/mascot/mascot-wave.png.asset.json";
import namaste from "@/assets/mascot/mascot-namaste.png.asset.json";
import bag from "@/assets/mascot/mascot-bag.png.asset.json";
import gift from "@/assets/mascot/mascot-gift.png.asset.json";
import think from "@/assets/mascot/mascot-think.png.asset.json";
import welcome from "@/assets/mascot/mascot-welcome.png.asset.json";

export const MASCOT = {
  wave: wave.url,
  namaste: namaste.url,
  bag: bag.url,
  gift: gift.url,
  think: think.url,
  welcome: welcome.url,
} as const;

export type MascotPose = keyof typeof MASCOT;
