/**
 * SELEN mascot — a secondary brand signature only.
 * Approved placements: footer seal, store invitation popup, empty states (cart,
 * wishlist, no results, search, 404) and the Design with AI surface.
 * Never in nav, hero, product cards, product gallery or repeating patterns.
 */
import wave from "@/assets/mascot/mascot-wave.png.asset.json";
import namaste from "@/assets/mascot/mascot-namaste.png.asset.json";
import bag from "@/assets/mascot/mascot-bag.png.asset.json";
import gift from "@/assets/mascot/mascot-gift.png.asset.json";
import think from "@/assets/mascot/mascot-think.png.asset.json";
import welcome from "@/assets/mascot/mascot-welcome.png.asset.json";
import heart from "@/assets/mascot/mascot-heart.png.asset.json";
import search from "@/assets/mascot/mascot-search.png.asset.json";
import map from "@/assets/mascot/mascot-map.png.asset.json";
import shrug from "@/assets/mascot/mascot-shrug.png.asset.json";
import sketch from "@/assets/mascot/mascot-sketch.png.asset.json";

export const MASCOT = {
  wave: wave.url,
  namaste: namaste.url,
  bag: bag.url,
  gift: gift.url,
  think: think.url,
  welcome: welcome.url,
  heart: heart.url,
  search: search.url,
  map: map.url,
  shrug: shrug.url,
  sketch: sketch.url,
} as const;

export type MascotPose = keyof typeof MASCOT;

/** Canonical expression for each empty / moment-of-pause surface. */
export const MASCOT_MOMENT = {
  emptyCart: "bag",
  wishlist: "heart",
  noProducts: "shrug",
  search: "search",
  notFound: "map",
  thankYou: "gift",
  visitStore: "wave",
  designWithAi: "sketch",
} as const satisfies Record<string, MascotPose>;
