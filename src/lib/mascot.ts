/**
 * SELEN mascot — a secondary brand signature only.
 * Approved placements: footer seal, store invitation popup, empty states (cart,
 * wishlist, no results, search, 404) and the Design with AI surface.
 * Never in nav, hero, product cards, product gallery or repeating patterns.
 */
import wave from "@/assets/mascot/mascot-wave.png";
import namaste from "@/assets/mascot/mascot-namaste.png";
import bag from "@/assets/mascot/mascot-bag.png";
import gift from "@/assets/mascot/mascot-gift.png";
import think from "@/assets/mascot/mascot-think.png";
import welcome from "@/assets/mascot/mascot-welcome.png";
import heart from "@/assets/mascot/mascot-heart.png";
import search from "@/assets/mascot/mascot-search.png";
import map from "@/assets/mascot/mascot-map.png";
import shrug from "@/assets/mascot/mascot-shrug.png";
import sketch from "@/assets/mascot/mascot-sketch.png";

export const MASCOT = {
  wave,
  namaste,
  bag,
  gift,
  think,
  welcome,
  heart,
  search,
  map,
  shrug,
  sketch,
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
