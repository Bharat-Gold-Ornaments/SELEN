import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getColorGallery, getColorSwatch, type VariantForGallery } from "@/lib/colorOption";
import type { ShopifyProduct } from "@/lib/shopify.functions";

const WHATSAPP_NUMBER = "919403880777";

export function ColorSwatchSelector({
  colors,
  availableColors,
  selected,
  onSelect,
  productName,
  productUrl,
  variants,
  metafields,
}: {
  colors: string[];
  availableColors: Set<string>;
  selected: string | undefined;
  onSelect: (color: string) => void;
  productName: string;
  productUrl: string;
  variants: VariantForGallery[];
  metafields: ShopifyProduct["metafields"];
}) {
  return (
    <div className="flex flex-wrap gap-4" role="group" aria-label="Select color">
      {colors.map((color) => {
        const isAvailable = availableColors.has(color);
        const isSelected = color === selected;
        const swatch = getColorSwatch(color);
        const label = swatch?.label ?? color;

        const dot = (
          <span
            className={`block h-7 w-7 rounded-full border border-black/10 ${
              isAvailable ? "" : "opacity-40"
            }`}
            style={{ backgroundColor: swatch?.swatchHex ?? "#9ca3af" }}
          />
        );

        if (isAvailable) {
          return (
            <button
              key={color}
              type="button"
              aria-pressed={isSelected}
              aria-label={label}
              onClick={() => onSelect(color)}
              className="group flex flex-col items-center gap-1.5"
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
                  isSelected
                    ? "border-foreground"
                    : "border-transparent group-hover:border-foreground/30"
                }`}
              >
                {dot}
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </span>
            </button>
          );
        }

        const gallery = getColorGallery(metafields, variants, color);
        const message = `Hi! I'm interested in the ${productName} in ${label}. Please notify me when it's back in stock.\n${productUrl}`;
        const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        return (
          <Popover key={color}>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label={`${label} — coming soon`}
                className="flex flex-col items-center gap-1.5"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-transparent">
                  {dot}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/40">
                  {label}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 rounded-none p-4" sideOffset={10}>
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-foreground">
                {label} &mdash; Coming Soon
              </p>

              {gallery.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {gallery.slice(0, 3).map((image) => (
                    <img
                      key={image.url}
                      src={image.url}
                      alt={image.alt}
                      className="h-16 w-16 flex-1 object-cover"
                    />
                  ))}
                </div>
              )}

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                We&rsquo;ll let you know the moment it&rsquo;s back in stock.
              </p>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block w-full border border-foreground py-2.5 text-center text-[0.7rem] uppercase tracking-[0.28em] transition-colors hover:bg-foreground hover:text-background"
              >
                Notify Me on WhatsApp
              </a>
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
}
