import { createFileRoute } from "@tanstack/react-router";
import { LegalContact, LegalLayout, LegalList, LegalSection } from "@/components/legal/LegalLayout";

const TITLE = "Refund & Cancellation Policy — SELEN";
const DESCRIPTION =
  "SELEN's refund and cancellation policy: order cancellation, our 7-day exchange window, conditions for exchange, and how to request one.";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="16 July 2026">
      <p>
        This Refund and Cancellation Policy applies to all orders placed on selen.in, operated by
        Bharat Gold Ornaments Private Limited.
      </p>

      <LegalSection heading="1. Order Cancellation">
        <p>
          You may cancel your order free of charge at any time before it has been shipped, by
          contacting us at{" "}
          <a href="mailto:support@selen.in" className="text-foreground underline underline-offset-4">
            support@selen.in
          </a>{" "}
          or +91 94038 80777 with your order number. Once an order has been shipped, it can no
          longer be cancelled and the terms below apply instead.
        </p>
      </LegalSection>

      <LegalSection heading="2. Exchange Window">
        <p>
          We offer a 7-day exchange window from the date of delivery. If you are not satisfied
          with your purchase, you may request an exchange for a different item or store credit
          within 7 days of receiving your order. We do not offer cash refunds to the original
          payment method for change-of-mind returns.
        </p>
      </LegalSection>

      <LegalSection heading="3. Conditions for Exchange">
        <p>To be eligible for exchange, the item must be:</p>
        <LegalList
          items={[
            "Unused, unworn, and undamaged",
            "In its original packaging, with all tags, authenticity cards, and certificates intact",
            "Not a customized, engraved, or personalized item",
          ]}
        />
      </LegalSection>

      <LegalSection heading="4. Damaged, Defective, or Incorrect Items">
        <p>
          If you receive a damaged, defective, or incorrect item, please contact us within 48
          hours of delivery at{" "}
          <a href="mailto:support@selen.in" className="text-foreground underline underline-offset-4">
            support@selen.in
          </a>{" "}
          with your order number and photos of the item. We will arrange a free replacement or
          full exchange at no additional cost to you.
        </p>
      </LegalSection>

      <LegalSection heading="5. How to Request an Exchange">
        <p>
          Email{" "}
          <a href="mailto:support@selen.in" className="text-foreground underline underline-offset-4">
            support@selen.in
          </a>{" "}
          or call +91 94038 80777 / 0832-2222244 within 7 days of delivery with your order number
          and reason for exchange. Once approved, we will share instructions for returning the
          item. Please note return shipping costs for change-of-mind exchanges are borne by the
          customer, unless the item is damaged, defective, or incorrect.
        </p>
      </LegalSection>

      <LegalSection heading="6. Processing Time">
        <p>
          Once we receive and inspect the returned item, we will process your exchange or issue
          store credit within 5-7 business days. You will be notified by email once your exchange
          has been processed.
        </p>
      </LegalSection>

      <LegalSection heading="7. Contact Us">
        <LegalContact
          lines={[
            "Bharat Gold Ornaments Private Limited",
            "House No. 773/2, Sulabhat, Agassaim, St. Lourence, Tiswadi, North Goa – 403204, Goa, India",
            "Phone: +91 94038 80777 / 0832-2222244",
            <>
              Email:{" "}
              <a href="mailto:support@selen.in" className="underline underline-offset-4">
                support@selen.in
              </a>
            </>,
          ]}
        />
      </LegalSection>
    </LegalLayout>
  );
}
