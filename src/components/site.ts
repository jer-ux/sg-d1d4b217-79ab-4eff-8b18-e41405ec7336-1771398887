export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavItem[] };
export type NavLink = { label: string; href?: string; groups?: NavGroup[] };

export const nav: NavLink[] = [
  {
    label: "Platform",
    href: "/platform",
  },
  {
    label: "Company",
    href: "/company",
  },
  {
    label: "Investor Access",
    href: "/capital-markets",
  },
];

export const menuItems = [
  {
    label: "Platform",
    items: [
      { label: "War Room", href: "/war-room-product" },
      { label: "Executive War Room", href: "/executive-war-room" },
      { label: "Verified Savings Ledger", href: "/verified-savings-ledger" },
      { label: "Evidence Receipts", href: "/evidence-receipts" },
      { label: "Arbitrage Events", href: "/arbitrage-events" },
      { label: "Proof Library", href: "/proof-library" },
      { label: "Agentic Policy", href: "/agentic-policy" },
    ],
  },
];

export type NavItem_Old = { label: string; href: string };