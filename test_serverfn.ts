import { getProductByHandle } from "./src/lib/shopify.functions";

async function test() {
  try {
    const product = await getProductByHandle({ data: { handle: "flora-22k-gold-plated-flower-drop-earrings" } });
    console.log("Product:", product ? product.title : "null");
  } catch (e) {
    console.error("Error:", e);
  }
}

test();
