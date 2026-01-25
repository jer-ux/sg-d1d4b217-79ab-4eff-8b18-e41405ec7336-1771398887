export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavItem[] };
export type NavLink = { label: string; href?: string; groups?: NavGroup[] };

export const nav: NavLink[] = [
  { label: "War Room", href: "/war-room" },
  { label: "Value Ledger", href: "/verified-savings-ledger" },
  { label: "Arbitrage Events", href: "/arbitrage-events" },
  { label: "Proof Library", href: "/proof-library" },
  {
    label: "Platform",
    groups: [
      {
        label: "Trust Spine",
        items: [
          { label: "Evidence Receipts", href: "/platform/evidence", description: "Lineage, hashes, freshness, confidence" },
          { label: "DQ + Deterministic Replay", href: "/platform/dq", description: "Gates, drift, replay checks" },
          { label: "Incidents", href: "/platform/incidents", description: "Mismatch, staleness, failures" },
        ],
      },
      {
        label: "Ops & Catalog",
        items: [
          { label: "Connectors", href: "/platform/connectors", description: "Status, uptime, last seen, SLAs" },
          { label: "KPI Catalog", href: "/platform/kpis", description: "Definitions, owners, thresholds" },
          { label: "Admin", href: "/platform/admin", description: "Tenants, roles, policies" },
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

export type NavItem_Old = { label: string; href: string };
