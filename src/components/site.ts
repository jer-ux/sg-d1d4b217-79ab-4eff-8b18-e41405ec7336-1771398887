export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavItem[] };
export type NavLink = { label: string; href?: string; groups?: NavGroup[] };

export const nav: NavLink[] = [
  {
    label: "Platform",
    groups: [
      {
        label: "Core Platform",
        items: [
          { label: "Evidence receipts", href: "/platform/evidence", description: "Cryptographic proof for every value claim" },
          { label: "Data quality", href: "/platform/dq", description: "Automated DQ monitoring and remediation" },
          { label: "Incidents", href: "/platform/incidents", description: "Real-time issue tracking and resolution" },
          { label: "Connectors", href: "/platform/connectors", description: "Pre-built integrations for major platforms" },
        ],
      },
      {
        label: "Value Management",
        items: [
          { label: "War Room", href: "/war-room", description: "Real-time operational command center" },
          { label: "Verified Savings Ledger", href: "/ledger", description: "CFO-grade value tracking with evidence receipts" },
          { label: "KPIs", href: "/platform/kpis", description: "Real-time business metrics and analytics" },
          { label: "Admin", href: "/platform/admin", description: "User management and system configuration" },
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
