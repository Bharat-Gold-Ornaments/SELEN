import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const WHATSAPP_NUMBER = "919403880777";

export function ProductPhotoNote({ productTitle }: { productTitle: string }) {
  const message = `Hi, I'd like to see more photos of ${productTitle}.`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mt-4 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <Info className="h-3.5 w-3.5" strokeWidth={1.2} />
          Images are AI-generated
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-none sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-normal tracking-tight">
            Product Note
          </DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-relaxed">
            Images are AI-generated and may vary slightly from the actual product.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Want more photos before you order? Tap below — we&rsquo;ll send them straight to your
          WhatsApp.
        </p>
        <Button
          asChild
          className="mt-2 w-full rounded-none py-6 text-[0.775rem] uppercase tracking-[0.3em]"
        >
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            Request Photos on WhatsApp
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
