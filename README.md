# SELEN — Gilded Silver Studio

Shopping website for the SELEN brand: gold-plated 925 sterling silver jewellery.

Built with [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router), styled with Tailwind CSS, and backed by the Shopify Storefront API for products and cart/checkout.

## Development

```sh
npm i
npm run dev
```

Copy `.env` and fill in:

- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — a Shopify Storefront API access token for the `s3iphy-ah.myshopify.com` store (see [src/lib/shopify.server.ts](src/lib/shopify.server.ts)).
- `N8N_CHAT_WEBHOOK_URL` — the n8n webhook URL that powers the "Design with AI" chat widget (see [src/lib/chat.functions.ts](src/lib/chat.functions.ts)).

## Build

```sh
npm run build
npm run preview
```

## Deploy

The build targets Vercel via nitro's `vercel` preset (configured in [vite.config.ts](vite.config.ts)). Connect the repository to a Vercel project and set the environment variables above in the project settings.
