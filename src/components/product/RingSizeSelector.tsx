import { useState } from "react";
import { formatRingMeasurement, getRingSize } from "@/lib/ringSize";
import { RingSizeGuide } from "@/components/product/RingSizeGuide";

export function RingSizeSelector({
  sizes,
  availableSizes,
  selected,
  onSelect,
}: {
  sizes: string[];
  availableSizes: Set<string>;
  selected: string | undefined;
  onSelect: (size: string) => void;
}) {
  const [guideOpen, setGuideOpen] = useState(false);
  const selectedEntry = selected ? getRingSize(selected) : undefined;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Select ring size">
        {sizes.map((size) => {
          const isAvailable = availableSizes.has(size);
          const isSelected = size === selected;
          return (
            <button
              key={size}
              type="button"
              aria-pressed={isSelected}
              disabled={!isAvailable}
              onClick={() => onSelect(size)}
              className={`h-11 min-w-[2.75rem] border px-3 text-sm transition-colors ${
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : isAvailable
                    ? "border-input text-foreground hover:border-foreground"
                    : "cursor-not-allowed border-border/50 text-muted-foreground/40 line-through"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {selectedEntry ? (
          <>
            <span className="text-foreground">Size {selectedEntry.size}</span> &mdash;{" "}
            {formatRingMeasurement(selectedEntry)}
          </>
        ) : (
          "Select a size to see the measurement."
        )}
      </p>

      <button
        type="button"
        onClick={() => setGuideOpen(true)}
        className="mt-3 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        Not sure about your size? Find Your Ring Size &rarr;
      </button>

      <RingSizeGuide open={guideOpen} onOpenChange={setGuideOpen} />
    </div>
  );
}
