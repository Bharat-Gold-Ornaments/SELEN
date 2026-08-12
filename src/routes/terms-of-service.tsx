import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalContact, LegalLayout, LegalSection } from "@/components/legal/LegalLayout";

const TITLE = "Terms of Service — SELEN";
const DESCRIPTION =
  "The terms and conditions governing your use of selen.in and any purchase made through the SELEN Site, operated by Bharat Gold Ornaments Private Limited.";

export const Route = createFileRoute("/terms-of-service")({
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
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="16 July 2026">
      <p>
        This website selen.in (the &ldquo;Site&rdquo;) is owned and operated by Bharat Gold
        Ornaments Private Limited (&ldquo;SELEN&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
        &ldquo;our&rdquo;), a company registered in Goa, India, with its registered office at
        House No. 773/2, Sulabhat, Agassaim, St. Lourence, Tiswadi, North Goa – 403204, Goa,
        India. By accessing or using the Site, placing an order, or otherwise using our Services,
        you agree to be bound by these Terms and Conditions (&ldquo;Terms&rdquo;). If you do not
        agree, please do not use the Site.
      </p>

      <LegalSection heading="1. Eligibility">
        <p>
          You must be at least 18 years old, or using the Site under the supervision of a parent
          or legal guardian, to place an order with us.
        </p>
      </LegalSection>

      <LegalSection heading="2. Products">
        <p>
          SELEN products are crafted using 925 sterling silver with 20 karat gold plating and
          cubic zirconia (CZ) or similar stones, unless otherwise stated on the product page. We
          make every effort to display product colours, finishes and dimensions accurately;
          however, actual appearance may vary slightly due to photography, lighting and screen
          settings, and minor variations are natural in handcrafted jewellery. Product
          descriptions, weights and measurements are approximate.
        </p>
      </LegalSection>

      <LegalSection heading="3. Pricing and Payment">
        <p>
          All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes
          unless stated otherwise. We reserve the right to change prices at any time without
          prior notice; the price applicable to your order is the price displayed at the time of
          checkout. Payment must be completed in full through the payment methods made available
          on the Site at checkout. Orders are confirmed only after successful payment
          authorisation.
        </p>
      </LegalSection>

      <LegalSection heading="4. Order Acceptance and Cancellation">
        <p>
          Receipt of an order confirmation does not constitute our acceptance of an order; we
          reserve the right to cancel or refuse any order at our discretion, including in cases
          of pricing errors, suspected fraud, or unavailability of stock, in which case any amount
          paid will be refunded in full. You may cancel an order free of charge at any time before
          it has been shipped by contacting us at the details below. Once an order has been
          shipped, our{" "}
          <Link to="/refund-policy" className="text-foreground underline underline-offset-4">
            Refund and Cancellation Policy
          </Link>{" "}
          applies.
        </p>
      </LegalSection>

      <LegalSection heading="5. Shipping and Delivery">
        <p>
          Estimated delivery timelines are provided at checkout and on product pages and are not
          guaranteed; they may be affected by courier delays, weather, or circumstances beyond
          our control. Risk of loss and title to products pass to you upon delivery to the
          shipping address provided by you.
        </p>
      </LegalSection>

      <LegalSection heading="6. Returns, Exchanges and Refunds">
        <p>
          Please refer to our{" "}
          <Link to="/refund-policy" className="text-foreground underline underline-offset-4">
            Refund and Cancellation Policy
          </Link>{" "}
          for full details on returns, exchanges and cancellations.
        </p>
      </LegalSection>

      <LegalSection heading="7. Intellectual Property">
        <p>
          All content on the Site, including but not limited to the SELEN name and logo, product
          designs, photographs, graphics and text, is the property of Bharat Gold Ornaments
          Private Limited or its licensors and is protected by applicable intellectual property
          laws. You may not reproduce, distribute, or create derivative works from any content on
          the Site without our prior written consent.
        </p>
      </LegalSection>

      <LegalSection heading="8. Prohibited Use">
        <p>
          You agree not to use the Site for any unlawful purpose, to attempt unauthorised access
          to our systems, to interfere with the operation of the Site, or to submit false or
          misleading information when placing an order.
        </p>
      </LegalSection>

      <LegalSection heading="9. Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, Bharat Gold Ornaments Private
          Limited shall not be liable for any indirect, incidental, or consequential damages
          arising from your use of the Site or products purchased through it. Our total liability
          for any claim arising out of your order shall not exceed the amount paid by you for the
          relevant product.
        </p>
      </LegalSection>

      <LegalSection heading="10. Grievance Redressal">
        <p>
          In accordance with the Information Technology Act, 2000 and the Consumer Protection
          (E-Commerce) Rules, 2020, any complaints or concerns regarding the Site or your order
          may be addressed to our grievance contact at the details below. We aim to acknowledge
          complaints promptly and resolve them within a reasonable timeframe.
        </p>
      </LegalSection>

      <LegalSection heading="11. Governing Law and Jurisdiction">
        <p>
          These Terms are governed by the laws of India. Any disputes arising out of or in
          connection with these Terms shall be subject to the exclusive jurisdiction of the
          courts located in Goa, India.
        </p>
      </LegalSection>

      <LegalSection heading="12. Changes to These Terms">
        <p>
          We may update these Terms from time to time. The updated version will be effective as
          soon as it is published on the Site, and your continued use of the Site after any
          changes constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection heading="13. Contact Us">
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
