/**
 * Shared SELEN Silver Exchange copy — kept in one place so the /silver-exchange page and any
 * other surface referencing the program never drift out of sync on wording.
 */

export const EXCHANGE_LEAD = "At SELEN, we believe your silver can have a new story.";

export const EXCHANGE_SUMMARY =
  "Bring eligible silver jewellery and silver articles to our SELEN store for purity testing and valuation. The approved exchange value can be adjusted toward the purchase of SELEN jewellery, subject to the terms of the program.";

export const HOW_IT_WORKS = [
  {
    title: "Bring Your Silver",
    body: "Bring eligible silver jewellery and silver articles to our SELEN store.",
  },
  {
    title: "Purity Testing",
    body: "The submitted article is examined and tested to determine its silver purity and eligible silver content.",
  },
  {
    title: "Valuation",
    body: "The exchange value is calculated based on the verified silver content, the applicable silver rate and SELEN's prevailing exchange terms on the date of valuation.",
  },
  {
    title: "Purchase SELEN Jewellery",
    body: "The approved exchange value is adjusted against the purchase of eligible SELEN jewellery.",
  },
  {
    title: "Accept the Valuation",
    body: "You'll be informed of the final valuation and applicable terms before completing the transaction.",
  },
];

export const ELIGIBLE_ARTICLES = [
  "Silver jewellery",
  "Silver coins",
  "Silver diyas",
  "Silver articles used for religious or ceremonial purposes",
  "Other silver-containing articles accepted by SELEN",
];

export const EXCHANGE_EXAMPLE = {
  exchange: "₹10,000",
  purchase: "₹15,000",
  balance: "₹5,000",
};

export const EXCHANGE_IMPORTANT_NOTE =
  "Purity tested. Valued based on verified silver content. Exchange value is redeemable toward an eligible SELEN jewellery purchase and is not payable in cash. Conditions apply.";

export type TermBlock = { p: string } | { list: string[] };

export interface TermSection {
  heading: string;
  blocks: TermBlock[];
}

export const EXCHANGE_TERMS: TermSection[] = [
  {
    heading: "1. How the Silver Exchange Program Works",
    blocks: [
      {
        p: "Customers may bring eligible silver jewellery and silver articles to our SELEN store. The submitted article will be examined and tested to determine its silver purity and eligible silver content. The exchange value will be calculated based on the verified silver content, applicable silver rate and SELEN's prevailing exchange terms on the date of valuation, and adjusted against the purchase of eligible SELEN jewellery. The customer will be informed of the final valuation and applicable terms before completing the transaction.",
      },
    ],
  },
  {
    heading: "2. Eligible Silver Articles",
    blocks: [
      { p: "Subject to inspection and acceptance by SELEN, eligible articles may include:" },
      { list: ELIGIBLE_ARTICLES },
      {
        p: "SELEN reserves the right to decline any article that cannot be satisfactorily tested, verified or valued.",
      },
    ],
  },
  {
    heading: "3. Purity Testing and Silver Content",
    blocks: [
      { p: "All articles submitted under the program are subject to purity testing." },
      {
        p: "The valuation will be based on the verified silver content of the article and not simply on its total weight.",
      },
      {
        p: "Where an article contains materials other than silver, such as gold, gemstones, diamonds, pearls, beads, lac, thread, enamel, glass, stones or other non-silver components, these may be excluded from the eligible silver weight.",
      },
      {
        p: "SELEN may use appropriate testing and weighing methods to determine the purity and eligible silver content of the submitted article.",
      },
    ],
  },
  {
    heading: "4. Basis of Valuation",
    blocks: [
      { p: "The exchange value will be determined based on:" },
      {
        list: [
          "Verified silver purity",
          "Eligible silver weight",
          "Applicable silver rate on the date of valuation",
          "SELEN's prevailing exchange terms",
        ],
      },
      { p: "The following are not included in the silver valuation:" },
      {
        list: [
          "Making or labour charges",
          "Wastage charges",
          "Taxes previously paid",
          "Gold plating or gold finish",
          "Gemstones or diamonds",
          "Pearls",
          "Other non-silver materials",
          "Sentimental or brand value of the article",
        ],
      },
      { p: "The final valuation communicated by SELEN will apply to that transaction." },
    ],
  },
  {
    heading: "5. Exchange Value Is Not a Cash Payment",
    blocks: [
      {
        p: "The Silver Exchange Program is intended to facilitate the purchase of SELEN jewellery.",
      },
      {
        p: "The approved exchange value cannot be exchanged for cash, transferred to another person, or redeemed independently for cash.",
      },
      {
        p: "The approved value will be adjusted against the purchase of eligible SELEN jewellery in accordance with the applicable terms of the program.",
      },
      {
        p: "If the value of the selected SELEN jewellery exceeds the approved exchange value, the customer will be required to pay the balance amount.",
      },
      {
        p: "If the approved exchange value exceeds the value of the selected SELEN jewellery, the excess amount will not be payable in cash.",
      },
    ],
  },
  {
    heading: "6. Purchase Adjustment",
    blocks: [
      {
        p: "The approved exchange value will be applied as an adjustment toward the purchase of eligible SELEN jewellery. For example:",
      },
      {
        list: [
          `Approved Silver Exchange Value: ${EXCHANGE_EXAMPLE.exchange}`,
          `Value of SELEN Jewellery Purchased: ${EXCHANGE_EXAMPLE.purchase}`,
          `Balance Payable: ${EXCHANGE_EXAMPLE.balance}`,
        ],
      },
      {
        p: "The exchange value cannot be transferred, exchanged for cash, or independently redeemed for cash.",
      },
    ],
  },
  {
    heading: "7. Applicable Silver Rate",
    blocks: [
      {
        p: "The silver rate used for valuation will be the applicable rate determined by SELEN on the date of valuation.",
      },
      { p: "Silver rates may change from time to time based on prevailing market conditions." },
      {
        p: "The applicable rate and resulting exchange value will be communicated to the customer before the transaction is completed.",
      },
    ],
  },
  {
    heading: "8. Customer Approval",
    blocks: [
      {
        p: "Before completing the transaction, SELEN will communicate the relevant valuation details, including:",
      },
      {
        list: [
          "Tested purity",
          "Eligible silver weight",
          "Applicable silver rate",
          "Exchange value",
          "Applicable deductions, if any",
          "Value of the SELEN jewellery being purchased",
          "Balance amount payable, if applicable",
        ],
      },
      { p: "The customer may choose whether or not to proceed after receiving the valuation." },
      {
        p: "Once the customer accepts the valuation and completes the transaction, the valuation will be considered final for that transaction.",
      },
    ],
  },
  {
    heading: "9. Ownership and Verification",
    blocks: [
      {
        p: "The customer submitting an article represents that they are the lawful owner of the silver article and have the legal right to offer it for exchange.",
      },
      {
        p: "SELEN may request reasonable information or documentation where required to verify ownership or comply with applicable laws and regulations.",
      },
      {
        p: "SELEN reserves the right to refuse a transaction where ownership, authenticity or lawful possession of the article cannot be satisfactorily established.",
      },
    ],
  },
  {
    heading: "10. Articles That May Be Rejected",
    blocks: [
      { p: "SELEN may reject any article or transaction where:" },
      {
        list: [
          "The article cannot be satisfactorily tested or verified.",
          "The silver content cannot be reasonably determined.",
          "The article contains substantial non-silver components that prevent reliable valuation.",
          "The article appears counterfeit, altered or tampered with.",
          "Ownership or lawful possession is uncertain.",
          "The transaction does not meet applicable legal or regulatory requirements.",
          "The article otherwise does not meet SELEN's eligibility criteria.",
        ],
      },
    ],
  },
  {
    heading: "11. Stones, Gemstones and Other Materials",
    blocks: [
      {
        p: "Where a submitted article contains stones, gemstones, diamonds, pearls, beads or other materials, these components will generally not form part of the silver valuation.",
      },
      { p: "The valuation will be based on the eligible and verified silver content." },
      {
        p: "Customers should not assume that the original purchase price of an article, including its stones, craftsmanship, making charges or other components, determines its exchange value.",
      },
    ],
  },
  {
    heading: "12. Gold-Plated or Gold-Finished Silver",
    blocks: [
      {
        p: "For silver articles having gold plating, gold finishing or other surface treatments, the valuation will be based on the eligible silver content.",
      },
      {
        p: "The value of the gold plating or gold finish will not be included in the silver exchange valuation.",
      },
    ],
  },
  {
    heading: "13. Taxes and Other Charges",
    blocks: [
      {
        p: "Any applicable taxes, duties, charges or other amounts arising from the purchase of SELEN jewellery will be handled in accordance with applicable law and the applicable transaction terms.",
      },
      {
        p: "The approved silver exchange value does not automatically include or offset taxes, charges or other amounts unless expressly stated at the time of purchase.",
      },
    ],
  },
  {
    heading: "14. Fraud and Misrepresentation",
    blocks: [
      {
        p: "SELEN reserves the right to refuse or cancel a transaction where there is evidence or reasonable suspicion of fraud, misrepresentation, counterfeit material, unlawful ownership or any attempt to misuse the program.",
      },
      { p: "Any action taken by SELEN in such circumstances will be subject to applicable law." },
    ],
  },
  {
    heading: "15. Changes to the Program",
    blocks: [
      {
        p: "SELEN reserves the right to modify, suspend or discontinue the Silver Exchange Program, including its eligibility criteria, valuation methodology, applicable rates, deductions and other terms.",
      },
      {
        p: "Any changes will apply prospectively and will not affect a transaction that has already been completed, except where required by applicable law.",
      },
    ],
  },
  {
    heading: "16. General Terms",
    blocks: [
      {
        p: "Participation in the SELEN Silver Exchange Program constitutes acceptance of these terms and conditions.",
      },
      {
        p: "These terms should be read together with any additional terms communicated at the time of the transaction.",
      },
      {
        p: "In case of any discrepancy between promotional communication and the detailed terms applicable to the transaction, the detailed transaction terms will prevail, subject to applicable law.",
      },
    ],
  },
];
