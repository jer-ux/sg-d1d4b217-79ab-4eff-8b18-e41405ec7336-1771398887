export type NavLink = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

export type NavSection = {
  title: string;
  links: NavLink[];
};

export type NavDropdown = {
  label: string;
  sections: NavSection[];
  featured?: NavLink[];
};

export const primaryCtas: NavLink[] = [
  { label: "Request demo", href: "/contact", description: "Fast path to a scoped plan." },
  { label: "Investor access", href: "/capital-markets", description: "Capital markets overview." },
];

export const megaNav: NavDropdown[] = [
  {
    label: "Platform",
    sections: [
      {
        title: "Core",
        links: [
          {
            label: "Kincaid IQ Platform",
            href: "/platform",
            description: "Evidence receipts, value ledger, and controls-first decision systems.",
          },
          {
            label: "Verified Savings Ledger",
            href: "/verified-savings-ledger",
            description: "Identified → Approved → Realized → At-risk with auditable proof.",
            badge: "Proof",
          },
          {
            label: "Security & Governance",
            href: "/security-governance",
            description: "Controls, audit trail, access discipline, and evidence standards.",
          },
        ],
      },
      {
        title: "Proof Outputs",
        links: [
          {
            label: "Case Studies",
            href: "/case-studies",
            description: "Decision-grade narratives with proof patterns (no hype).",
          },
          {
            label: "Contact",
            href: "/contact",
            description: "Request demo, diligence sprint, or investor access.",
          },
        ],
      },
    ],
    featured: [
      {
        label: "Make value provable",
        href: "/verified-savings-ledger",
        description: "Stop arguing. Start reconciling.",
        badge: "CFO-grade",
      },
    ],
  },

  {
    label: "Practices",
    sections: [
      {
        title: "Marketplaces",
        links: [
          {
            label: "Marketplace Practice (Hub)",
            href: "/marketplace",
            description: "Build once. Distribute through marketplace motions.",
          },
          {
            label: "Snowflake Marketplace",
            href: "/marketplace/snowflake",
            description: "Snowflake-native delivery patterns for decision systems.",
          },
          {
            label: "Databricks Marketplace",
            href: "/marketplace/databricks",
            description: "Lakehouse + governed agent pipelines and packaging.",
          },
          {
            label: "ServiceNow Practice",
            href: "/marketplace/servicenow",
            description: "Workflow + approvals: Find → Assign → Prove → Close.",
          },
        ],
      },
      {
        title: "Transformation",
        links: [
          {
            label: "AI Agentic Transformation",
            href: "/agentic-transformation",
            description: "Analyze ops + sales, deploy governed agents, measure outcomes.",
            badge: "12-month",
          },
          {
            label: "12-Month Adoption Policy",
            href: "/agentic-policy",
            description: "Governed rollout plan designed for CFO/board scrutiny.",
          },
        ],
      },
      {
        title: "Actuarial",
        links: [
          {
            label: "Actuarial Benefits Consulting",
            href: "/actuarial-benefits",
            description: "PBM/Rx intelligence, compliance, benchmarking, verified savings.",
          },
        ],
      },
    ],
    featured: [
      {
        label: "Marketplace-native delivery",
        href: "/marketplace",
        description: "High trust. Low delivery drag. Higher gross margin.",
        badge: "GTM",
      },
    ],
  },

  {
    label: "Audiences",
    sections: [
      {
        title: "Capital",
        links: [
          {
            label: "Capital Markets & Investors",
            href: "/capital-markets",
            description: "Underwrite value with evidence packs and realization discipline.",
          },
          {
            label: "M&A / VC / PE Diligence",
            href: "/ma-vc-pe",
            description: "Find leakage. Prove it. Underwrite it. Track realization.",
            badge: "Diligence",
          },
        ],
      },
      {
        title: "Owners",
        links: [
          {
            label: "Family Offices",
            href: "/family-offices",
            description: "Oversight-grade reporting and governance for complex holdings.",
          },
        ],
      },
    ],
    featured: [
      {
        label: "Diligence Proof Packs",
        href: "/ma-vc-pe",
        description: "Receipts + methodology + reconciliation outputs.",
        badge: "Proof",
      },
    ],
  },

  {
    label: "Company",
    sections: [
      {
        title: "About",
        links: [
          {
            label: "Company",
            href: "/company",
            description: "Built for boards. Run by operators. Proof-first philosophy.",
          },
          {
            label: "Contact",
            href: "/contact",
            description: "Start a scoped conversation.",
          },
        ],
      },
      {
        title: "Proof",
        links: [
          {
            label: "Case Studies",
            href: "/case-studies",
            description: "Evidence-led narratives and outcomes.",
          },
          {
            label: "Security & Governance",
            href: "/security-governance",
            description: "Controls-first posture for enterprise decision systems.",
          },
        ],
      },
    ],
  },
];

export const proofBar = [
  "Evidence Receipts",
  "CFO-Grade Value Ledger",
  "Controls Monitoring",
  "Marketplace Delivery",
];