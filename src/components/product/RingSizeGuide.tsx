import { useIsMobile } from "@/hooks/use-mobile";
import { RING_SIZES, formatRingMeasurement } from "@/lib/ringSize";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function RingSizeGuide({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto rounded-none">
          <SheetHeader>
            <SheetTitle className="font-heading text-xl font-normal tracking-tight">
              Find Your Perfect Ring Size
            </SheetTitle>
            <SheetDescription className="sr-only">
              Methods to find your correct SELEN ring size.
            </SheetDescription>
          </SheetHeader>
          <GuideBody />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-none sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-normal tracking-tight">
            Find Your Perfect Ring Size
          </DialogTitle>
          <DialogDescription className="sr-only">
            Methods to find your correct SELEN ring size.
          </DialogDescription>
        </DialogHeader>
        <GuideBody />
      </DialogContent>
    </Dialog>
  );
}

function GuideBody() {
  return (
    <div className="space-y-10 pt-2">
      <p className="text-sm leading-relaxed text-muted-foreground">
        SELEN uses Indian ring sizes. Choosing the right one is easy &mdash; select the method that
        works best for you. Each size corresponds to a specific inner diameter and inner
        circumference in millimetres, making it easy to find your perfect fit.
      </p>

      <section>
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">Method 1</p>
        <h3 className="mt-2 font-heading text-lg font-normal tracking-tight">
          I Have a Ring That Fits
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Take a ring that fits the finger you want to wear your SELEN ring on. Measure the inside
          diameter straight across the centre of the ring, excluding the metal. Match your
          measurement to our chart below.
        </p>
        <RingMeasurementDiagram />
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Example: if your ring measures approximately{" "}
          <strong className="text-foreground">16.5 mm</strong> across the inside, choose{" "}
          <strong className="text-foreground">SELEN Size 12</strong>.
        </p>
      </section>

      <section>
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">Method 2</p>
        <h3 className="mt-2 font-heading text-lg font-normal tracking-tight">
          Measure Your Finger
        </h3>
        <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>1. Wrap a thin strip of paper or thread comfortably around the finger.</li>
          <li>2. Mark where the ends meet.</li>
          <li>3. Measure the length in millimetres.</li>
          <li>4. Match the measurement to the inner circumference in our size chart.</li>
        </ol>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
          For the most accurate result, measure your finger a few times and avoid measuring when
          your hands are unusually cold or warm. The fit should be comfortable, not tight.
        </p>
      </section>

      <section>
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
          SELEN / Indian Ring Sizes
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/70 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                <th className="py-2 font-normal">Size</th>
                <th className="py-2 font-normal text-right">Inner Diameter</th>
                <th className="py-2 font-normal text-right">Inner Circumference</th>
              </tr>
            </thead>
            <tbody>
              {RING_SIZES.map((entry) => (
                <tr key={entry.size} className="border-b border-border/40">
                  <td className="py-2">{entry.size}</td>
                  <td className="py-2 text-right text-muted-foreground">
                    {entry.innerDiameterMm} mm
                  </td>
                  <td className="py-2 text-right text-muted-foreground">
                    {entry.innerCircumferenceMm} mm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function RingMeasurementDiagram() {
  return (
    <div className="mt-5 flex items-start gap-8">
      <figure className="flex flex-col items-center gap-2">
        <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden="true">
          <circle
            cx="40"
            cy="40"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground/70"
          />
          <circle
            cx="40"
            cy="40"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground/70"
          />
          <line
            x1="22"
            y1="40"
            x2="58"
            y2="40"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-foreground"
            markerStart="url(#arrowStart)"
            markerEnd="url(#arrowEnd)"
          />
          <defs>
            <marker
              id="arrowStart"
              markerWidth="6"
              markerHeight="6"
              refX="3"
              refY="3"
              orient="auto"
            >
              <path
                d="M5,0 L1,3 L5,6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-foreground"
              />
            </marker>
            <marker id="arrowEnd" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path
                d="M1,0 L5,3 L1,6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-foreground"
              />
            </marker>
          </defs>
        </svg>
        <figcaption className="text-[0.65rem] uppercase tracking-[0.24em] text-foreground">
          Correct
        </figcaption>
        <p className="max-w-[9rem] text-center text-xs text-muted-foreground">
          Inside edge to inside edge
        </p>
      </figure>

      <figure className="flex flex-col items-center gap-2">
        <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden="true">
          <circle
            cx="40"
            cy="40"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground/30"
          />
          <circle
            cx="40"
            cy="40"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground/30"
          />
          <line
            x1="12"
            y1="40"
            x2="68"
            y2="40"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            className="text-muted-foreground"
            markerStart="url(#arrowStartMuted)"
            markerEnd="url(#arrowEndMuted)"
          />
          <defs>
            <marker
              id="arrowStartMuted"
              markerWidth="6"
              markerHeight="6"
              refX="3"
              refY="3"
              orient="auto"
            >
              <path
                d="M5,0 L1,3 L5,6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-muted-foreground"
              />
            </marker>
            <marker
              id="arrowEndMuted"
              markerWidth="6"
              markerHeight="6"
              refX="3"
              refY="3"
              orient="auto"
            >
              <path
                d="M1,0 L5,3 L1,6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-muted-foreground"
              />
            </marker>
          </defs>
        </svg>
        <figcaption className="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
          Incorrect
        </figcaption>
        <p className="max-w-[9rem] text-center text-xs text-muted-foreground">
          Outside edge to outside edge
        </p>
      </figure>
    </div>
  );
}
