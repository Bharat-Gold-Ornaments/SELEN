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
  .inputValidator((data) => z.object({ query: z.string().optional() }).parse(data))
  .handler(async ({ data }) => fetchProducts(data.query));

export const getProductByHandle = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ handle: z.string() }).parse(data))
  .handler(async ({ data }) => fetchProductByHandle(data.handle));

export const createCart = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ variantId: z.string(), quantity: z.number().int().positive() }).parse(data)
  )
  .handler(async ({ data }) => createShopifyCart({ variantId: data.variantId, quantity: data.quantity }));

export const addCartLine = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ cartId: z.string(), variantId: z.string(), quantity: z.number().int().positive() }).parse(data)
  )
  .handler(async ({ data }) => addLineToShopifyCart(data.cartId, data.variantId, data.quantity));

export const updateCartLine = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ cartId: z.string(), lineId: z.string(), quantity: z.number().int().nonnegative() }).parse(data)
  )
  .handler(async ({ data }) => updateShopifyCartLine(data.cartId, data.lineId, data.quantity));

export const removeCartLine = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ cartId: z.string(), lineId: z.string() }).parse(data))
  .handler(async ({ data }) => removeLineFromShopifyCart(data.cartId, data.lineId));

export const syncCart = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ cartId: z.string() }).parse(data))
  .handler(async ({ data }) => fetchCart(data.cartId));

export type CartItem = z.infer<typeof CartItemSchema>;
export type { ShopifyProduct };
