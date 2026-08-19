import { z } from "zod";

const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STORE_PERMANENT_DOMAIN = "s3iphy-ah.myshopify.com";

const storefrontUrl = () =>
  `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const getStorefrontToken = () => {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) throw new Error("Shopify Storefront access token is not configured");
  return token;
};

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
  metafields?: Array<{
    key: string;
    value: string;
    type: string;
  } | null>;
}

export interface ProductEdge {
  node: ShopifyProduct;
}

async function storefrontApiRequest<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(storefrontUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": getStorefrontToken(),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    throw new Error(
      "Shopify: Payment required. Storefront API access requires an active Shopify billing plan."
    );
  }

  if (!response.ok) {
    throw new Error(`Shopify Storefront API request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as T;
  return data;
}

const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
      metafields(identifiers: [
        { namespace: "custom", key: "short_description" }
        { namespace: "custom", key: "weight_display" }
        { namespace: "custom", key: "stone" }
        { namespace: "custom", key: "material" }
        { namespace: "custom", key: "width_cm" }
        { namespace: "custom", key: "length_cm" }
      ]) {
        key
        value
        type
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) {
      id
      totalQuantity
    }
  }
`;

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(userErrors: Array<{ field: string[] | null; message: string }>): boolean {
  return userErrors.some((e) =>
    e.message.toLowerCase().includes("cart not found") ||
    e.message.toLowerCase().includes("does not exist")
  );
}

export async function fetchProducts(query?: string): Promise<ProductEdge[]> {
  const data = (await storefrontApiRequest<{
    data: { products: { edges: ProductEdge[] } };
    errors?: Array<{ message: string }>;
  }>(GET_PRODUCTS_QUERY, { first: 50, query: query ?? null }));

  if (data.errors) {
    throw new Error(`Shopify error: ${data.errors.map((e) => e.message).join(", ")}`);
  }

  return data.data.products.edges;
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = (await storefrontApiRequest<{
    data: { product: ShopifyProduct | null };
    errors?: Array<{ message: string }>;
  }>(GET_PRODUCT_BY_HANDLE_QUERY, { handle }));

  if (data.errors) {
    throw new Error(`Shopify error: ${data.errors.map((e) => e.message).join(", ")}`);
  }

  return data.data.product;
}

export interface CartCreateResult {
  cartId: string;
  checkoutUrl: string;
  lineId: string;
}

export async function createShopifyCart({
  variantId,
  quantity,
}: {
  variantId: string;
  quantity: number;
}): Promise<CartCreateResult | null> {
  const data = await storefrontApiRequest<{
    data: {
      cartCreate: {
        cart: {
          id: string;
          checkoutUrl: string;
          lines: { edges: Array<{ node: { id: string; merchandise: { id: string } } }> };
        };
        userErrors: Array<{ field: string[] | null; message: string }>;
      };
    };
    errors?: Array<{ message: string }>;
  }>(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });

  const userErrors = data?.data?.cartCreate?.userErrors || [];
  if (userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${userErrors.map((e) => e.message).join(", ")}`);
  }

  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;

  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;

  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

export interface CartLineResult {
  success: boolean;
  lineId?: string;
  cartNotFound?: boolean;
}

export async function addLineToShopifyCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<CartLineResult> {
  const data = await storefrontApiRequest<{
    data: {
      cartLinesAdd: {
        cart: {
          id: string;
          lines: { edges: Array<{ node: { id: string; merchandise: { id: string } } }> };
        };
        userErrors: Array<{ field: string[] | null; message: string }>;
      };
    };
    errors?: Array<{ message: string }>;
  }>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  });

  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    throw new Error(`Add line failed: ${userErrors.map((e) => e.message).join(", ")}`);
  }

  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l) => l.node.merchandise.id === variantId);
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<{
    data: {
      cartLinesUpdate: {
        cart: { id: string };
        userErrors: Array<{ field: string[] | null; message: string }>;
      };
    };
    errors?: Array<{ message: string }>;
  }>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  const userErrors = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    throw new Error(`Update line failed: ${userErrors.map((e) => e.message).join(", ")}`);
  }
  return { success: true };
}

export async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<{
    data: {
      cartLinesRemove: {
        cart: { id: string };
        userErrors: Array<{ field: string[] | null; message: string }>;
      };
    };
    errors?: Array<{ message: string }>;
  }>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds: [lineId] });

  const userErrors = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    throw new Error(`Remove line failed: ${userErrors.map((e) => e.message).join(", ")}`);
  }
  return { success: true };
}

export async function fetchCart(cartId: string): Promise<{ totalQuantity: number } | null> {
  const data = await storefrontApiRequest<{
    data: { cart: { totalQuantity: number } | null };
    errors?: Array<{ message: string }>;
  }>(CART_QUERY, { id: cartId });

  return data?.data?.cart ?? null;
}

export const CartItemSchema = z.object({
  lineId: z.string().nullable(),
  product: z.any(),
  variantId: z.string(),
  variantTitle: z.string(),
  price: z.object({ amount: z.string(), currencyCode: z.string() }),
  quantity: z.number().int().positive(),
  selectedOptions: z.array(z.object({ name: z.string(), value: z.string() })),
});
