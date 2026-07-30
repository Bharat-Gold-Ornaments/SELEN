import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  addLineToShopifyCart,
  createShopifyCart,
  fetchCart,
  fetchProductByHandle,
  fetchProducts,
  removeLineFromShopifyCart,
  updateShopifyCartLine,
  type CartItemSchema,
  type ShopifyProduct,
} from "./shopify.server";

export const getProducts = createServerFn({ method: "GET" })
  .validator(z.object({ query: z.string().optional() }))
  .handler(async ({ data }) => fetchProducts(data.query));

export const getProductByHandle = createServerFn({ method: "GET" })
  .validator(z.object({ handle: z.string() }))
  .handler(async ({ data }) => fetchProductByHandle(data.handle));

export const createCart = createServerFn({ method: "POST" })
  .validator(z.object({ variantId: z.string(), quantity: z.number().int().positive() }))
  .handler(async ({ data }) => createShopifyCart({ variantId: data.variantId, quantity: data.quantity }));

export const addCartLine = createServerFn({ method: "POST" })
  .validator(z.object({ cartId: z.string(), variantId: z.string(), quantity: z.number().int().positive() }))
  .handler(async ({ data }) => addLineToShopifyCart(data.cartId, data.variantId, data.quantity));

export const updateCartLine = createServerFn({ method: "POST" })
  .validator(z.object({ cartId: z.string(), lineId: z.string(), quantity: z.number().int().nonnegative() }))
  .handler(async ({ data }) => updateShopifyCartLine(data.cartId, data.lineId, data.quantity));

export const removeCartLine = createServerFn({ method: "POST" })
  .validator(z.object({ cartId: z.string(), lineId: z.string() }))
  .handler(async ({ data }) => removeLineFromShopifyCart(data.cartId, data.lineId));

export const syncCart = createServerFn({ method: "GET" })
  .validator(z.object({ cartId: z.string() }))
  .handler(async ({ data }) => fetchCart(data.cartId));

export type CartItem = z.infer<typeof CartItemSchema>;
export type { ShopifyProduct };
