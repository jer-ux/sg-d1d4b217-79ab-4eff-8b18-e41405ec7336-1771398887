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
    label: "Board of Directors",
    href: "/board-of-directors",
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

export const siteConfig = {
  name: "SiriusB iQ Data Sciences Lab",
  description: "High-Velocity Decision Engine for Health Economics & Benefits Intelligence",
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/platform", label: "Platform" },
    { href: "/kincaid-iq", label: "Kincaid IQ" },
    { href: "/contract-intelligence", label: "Contract Intel" },
    { href: "/evidence-receipts", label: "Evidence" },
    { href: "/verified-savings-ledger", label: "Ledger" },
    { href: "/war-room", label: "War Room" },
    { href: "/executive-war-room", label: "Executive" },
    { href: "/agentic-workflow", label: "Agentic" },
  ],
  footerLinks: [
    { href: "/company", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/docs", label: "Docs" },
    { href: "/investor", label: "Investor" },
  ]
};