export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavItem[] };
export type NavLink = { label: string; href?: string; groups?: NavGroup[] };

export const nav: NavLink[] = [
  {
    label: "Platform",
    groups: [
      {
        label: "Core Products",
        items: [
          { label: "War Room", href: "/war-room", description: "Real-time operations monitoring" },
          { label: "Evidence Receipts", href: "/evidence-receipts", description: "Cryptographic proof of value" },
          { label: "Verified Savings Ledger", href: "/verified-savings-ledger", description: "CFO-grade accounting" },
          { label: "Gen AI Agents", href: "/gen-ai-agents", description: "Governed AI deployment" },
        ],
      },
      {
        label: "Extended Capabilities",
        items: [
          { label: "Agentic Transformation", href: "/agentic-transformation", description: "12-month AI policy framework" },
          { label: "Agentic Policy", href: "/agentic-policy", description: "Governance controls" },
          { label: "Actuarial Benefits", href: "/actuarial-benefits", description: "Healthcare value verification" },
        ],
      },
    ],
  },
  {
    label: "Company",
    groups: [
      {
        label: "Learn",
        items: [
          { label: "Docs", href: "/docs" },
          { label: "Security", href: "/security-governance" },
        ],
      },
      {
        label: "Contact",
        items: [
          { label: "Talk to Us", href: "/contact" },
        ],
      },
    ],
  },
];

export const menuItems = [
  {
    label: "Platform",
    items: [
      { label: "War Room", href: "/war-room" },
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
