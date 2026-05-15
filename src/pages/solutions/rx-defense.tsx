import React, { useState } from "react";
import Head from "next/head";
import { 
  ShieldAlert, 
  AlertTriangle, 
  DollarSign, 
  AlertCircle,
  ArrowRight,
  Lock,
  CheckCircle2,
  FileText,
  TrendingUp,
  Target,
  ChevronDown,
  ChevronUp,
  Calculator,
  Users,
  Building,
  Activity,
  Award
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const provisions = [
  {
    id: 1,
    title: "Fiduciary Loyalty Commitment",
    score: 1.5,
    savings: "$174K",
    status: "RED FLAG",
    statusColor: "text-rose-500",
    bgStatusColor: "bg-rose-500",
    met: "0 of 2 requirements met",
    why: "CAA 2026 §3101 requires PBM transparency and fiduciary alignment for group health plans. A fiduciary loyalty commitment is the foundational protection for all other contract provisions.",
    financial: "Without explicit fiduciary acceptance, the PBM can legally act in its own economic interest — routing volume to owned pharmacies, retaining undisclosed revenue, and making formulary decisions for profit. Plans facing regulatory audit under CAA 2026 without this clause carry significant legal exposure.",
    fiduciary: "ERISA §404 creates personal liability for plan fiduciaries who fail to monitor the PBM. A contractual fiduciary commitment shifts this burden and creates a private right of action.",
    issues: [
      {
        title: "PBM does not explicitly accept fiduciary status in writing.",
        found: "Explicit fiduciary status and compliance with ERISA fiduciary duty standards are missing.",
        exploits: [
          "Without a fiduciary loyalty clause, the PBM's contractual obligation is to itself — not the plan. This means every formulary decision, network design choice, and vendor routing decision can legally be made to maximize the PBM's own economic interest, even when a cheaper option exists for the plan.",
          "PBMs exploit this absence by routing volume to their own owned pharmacies, retaining undisclosed manufacturer payments, favoring brand drugs with high rebate revenue over cheaper generics that would cost the plan less, and blocking plan access to claims data needed to discover these practices.",
          "When the DOL or a plan participant's attorney asks 'how did you protect the plan's economic interest?', the absence of a fiduciary clause means the plan fiduciary has no contractual answer — creating personal liability for the HR Director, CFO, and any named plan administrator."
        ],
        impact: "Fiduciary misalignment allows the PBM to legally capture an estimated 3–8% of total drug spend in undisclosed revenue. For a $3M drug spend plan, this represents $90,000–$240,000 per year in value diverted from the plan to the PBM — all contractually permissible without a fiduciary clause.",
        redFlags: [
          "\"PBM acts as an independent contractor and not as a fiduciary of the Plan\"",
          "\"Nothing in this Agreement shall create a fiduciary relationship between PBM and Plan\"",
          "\"PBM provides services in its capacity as a vendor, not as a fiduciary\""
        ],
        fix: "Add: \"PBM acknowledges it is acting as a functional fiduciary of the Plan within the meaning of ERISA §3(21) with respect to all formulary management, network design, and pricing decisions. PBM shall at all times act in the sole interest of Plan participants and beneficiaries and shall not place its own economic interests above those of the Plan.\""
      },
      {
        title: "Conflicts of interest are not disclosed.",
        found: "Annual certifications and written conflict disclosures are not included.",
        exploits: [
          "Without a fiduciary loyalty clause, the PBM's contractual obligation is to itself — not the plan. This means every formulary decision, network design choice, and vendor routing decision can legally be made to maximize the PBM's own economic interest."
        ],
        impact: "Fiduciary misalignment allows the PBM to legally capture an estimated 3–8% of total drug spend in undisclosed revenue.",
        redFlags: [
          "\"PBM acts as an independent contractor and not as a fiduciary of the Plan\""
        ],
        fix: "Add: \"PBM explicitly agrees to fiduciary status, acts solely in participants' interest, and complies with ERISA fiduciary standards.\""
      }
    ]
  },
  {
    id: 2,
    title: "Pass-Through Pharmacy Costs",
    score: 4.0,
    savings: "$960K",
    status: "CONCERN",
    statusColor: "text-orange-400",
    bgStatusColor: "bg-orange-400",
    met: "1 of 2 requirements met",
    why: "Spread pricing was banned in Medicaid by CMS in 2020. Self-funded ERISA plans must contractually prohibit it. Pass-through pricing means the plan pays exactly what the pharmacy is paid — no more.",
    financial: "Spread pricing is the practice of billing the plan more than the PBM pays the pharmacy, pocketing the difference. For a plan with $3M in annual drug spend, spread pricing commonly adds 5–15% in hidden margin — $150K to $450K per year — with no clinical benefit.",
    fiduciary: "The Consolidated Appropriations Act (CAA 2022 §204) requires pass-through pricing for Medicaid managed care. ERISA fiduciaries in self-funded plans face similar expectations. Spread pricing in a negotiated contract is a primary driver of inflated pharmacy spend.",
    issues: [
      {
        title: "MAC pricing list transparency is not mentioned.",
        found: "MAC pricing access and appeals processes are not defined.",
        exploits: [
          "Spread pricing is the most straightforward form of PBM profit extraction. The PBM reimburses the pharmacy $4.80 for a generic metformin, then bills the plan $8.20 for the same fill — pocketing the $3.40 'spread' as undisclosed margin.",
          "PBMs use Maximum Allowable Cost (MAC) lists as the mechanism for spread pricing. The MAC list itself is proprietary and not shared with the plan, making it impossible to detect without contractual transparency rights.",
          "In 2020, CMS banned spread pricing in Medicaid managed care, citing documented overcharges averaging 9.1% of generic drug cost. Self-funded ERISA plans have no such federal protection."
        ],
        impact: "For a plan with 500 members and $3M in annual drug spend, generic drugs typically represent 35–40% of spend but 88% of fill volume. At an average spread of $3–8 per generic fill and 15,000 generic fills/year, annual spread pricing cost ranges from $45,000 to $120,000.",
        redFlags: [
          "\"PBM pricing is based on its MAC list, which is proprietary and subject to change\"",
          "\"Plan shall pay PBM the amounts set forth in the pricing schedule attached hereto\"",
          "\"PBM's ingredient cost reimbursement rates are confidential information\""
        ],
        fix: "Add: \"PBM shall implement pass-through pricing for all pharmacy claims. The amount billed to the Plan for each claim shall not exceed the amount paid by PBM to the dispensing pharmacy for that claim. PBM shall provide Plan with access to the MAC list and pharmacy reimbursement rates upon request. Any retention of the difference between amounts billed to Plan and amounts paid to pharmacies constitutes a prohibited transaction under ERISA §406.\""
      }
    ]
  },
  {
    id: 3,
    title: "Rebate & Manufacturer Revenue",
    score: 3.0,
    savings: "$583K",
    status: "CONCERN",
    statusColor: "text-orange-400",
    bgStatusColor: "bg-orange-400",
    met: "1 of 2 requirements met",
    why: "Manufacturer rebates are paid to PBMs as a percentage of drug list price (WAC). 100% pass-through contracts eliminate PBM incentives to favor high-list-price drugs. All forms of manufacturer revenue — not just rebates — must be captured.",
    financial: "Most PBMs retain a portion of manufacturer rebates in 'pooled' arrangements — averaging the rebate across all clients rather than passing through each client's earned amount. For a mid-size plan, the gap between pooled and actual rebates can be $75K–$300K/year. Admin fees, grants, data fees, and other manufacturer payments are rarely disclosed or remitted.",
    fiduciary: "The DOL Field Assistance Bulletin 2021-02 confirmed that failing to capture all manufacturer revenue is a breach of fiduciary duty. Rebates are often 20–40% of gross drug cost on brand medications.",
    issues: [
      {
        title: "Manufacturer revenue disclosures lack depth.",
        found: "Administrative fees and grants are not sufficiently disclosed or committed to the plan.",
        exploits: [
          "Manufacturer rebates are not just one pool of money — they are a complex ecosystem of payments including per-unit rebates, market share bonuses, performance bonuses, administrative fees, data fees, and 'educational grants.'",
          "The most common exploitation technique is 'pooled rebate' arrangements, where the PBM averages rebates across its entire book of business rather than allocating the actual rebates earned by this plan's members.",
          "Beyond rebates, PBMs receive manufacturer payments they categorize as 'administrative fees,' 'data license fees,' 'pharmacy services fees,' and 'clinical programs support.' These are never rebates under the contract language."
        ],
        impact: "Specialty and brand drugs average 30–50% of drug spend for a mid-size plan. Manufacturer rebates on these drugs average 18–35% of list price (WAC). A pooled arrangement that captures only 65% of earned rebates leaves $131,250/year on the table. Non-rebate manufacturer payments add another estimated $40,000–$80,000 in unrecaptured revenue.",
        redFlags: [
          "\"Rebates\" means the amounts received by PBM from manufacturers pursuant to formulary positioning agreements, net of PBM's administrative costs",
          "\"PBM shall pass through a portion of manufacturer rebates consistent with PBM's pooled rebate methodology\"",
          "\"PBM retains administrative fees, data fees, and other non-rebate manufacturer payments as compensation for services\""
        ],
        fix: "Add: \"PBM shall pass through 100% of all Manufacturer Revenue earned in connection with the Plan's claims to the Plan, not later than 90 days after the close of each calendar quarter. Manufacturer Revenue means all cash, credits, and other forms of compensation received by PBM from any pharmaceutical manufacturer in connection with Plan claims.\""
      }
    ]
  },
  {
    id: 4,
    title: "Data Ownership & Access",
    score: 2.5,
    savings: "$78K",
    status: "RED FLAG",
    statusColor: "text-rose-500",
    bgStatusColor: "bg-rose-500",
    met: "0 of 2 requirements met",
    why: "Claims data is among the most valuable assets of a self-funded plan. Ownership, access, portability, and restrictions on commercial use are distinct rights that must each be explicitly negotiated.",
    financial: "PBMs routinely sell de-identified claims data to pharmaceutical companies, hedge funds, and health analytics firms. A self-funded plan's data has commercial value estimated at $15–$50 per member per year. Preventing PBM monetization preserves this value for the plan.",
    fiduciary: "Real-time data access enables fraud detection, specialty drug management, and clinical intervention — generating additional savings through early identification of high-cost claimants.",
    issues: [
      {
        title: "Plan ownership of member and claims data is not established.",
        found: "No provision granting the plan full ownership or portability of data.",
        exploits: [
          "Your plan's claims data is one of the most commercially valuable assets you own. Every prescription filled by a plan member contains diagnosis codes, drug names, dosages, prescribers, and patient identifiers.",
          "PBMs typically insert language stating that de-identified data is their proprietary asset and can be used for 'PBM's business purposes.'",
          "Beyond commercialization, lack of data access prevents the plan from conducting independent audits, benchmarking drug costs, identifying high-risk members for care management, or switching PBMs at contract end."
        ],
        impact: "Commercial value of pharmaceutical claims data is estimated at $15–$50 per member per year for de-identified datasets, and significantly more for linked or longitudinal data. For a 500-member plan, this represents $7,500–$25,000/year in value that the PBM captures from your members' data.",
        redFlags: [
          "\"De-identified claims data is proprietary to PBM and may be used for PBM's business purposes\"",
          "\"Plan data will be provided in PBM's standard format upon written request within 30 business days\"",
          "\"PBM shall provide plan performance reports as mutually agreed upon by the parties\""
        ],
        fix: "Add: \"All claims data, including identifiable and de-identified data, generated in connection with Plan is and remains the exclusive property of Plan. PBM shall not sell, license, share, or otherwise transfer Plan data to any third party without Plan's prior written consent.\""
      }
    ]
  },
  {
    id: 5,
    title: "Audit Rights & Extrapolation",
    score: 3.5,
    savings: "$339K",
    status: "CONCERN",
    statusColor: "text-orange-400",
    bgStatusColor: "bg-orange-400",
    met: "1 of 2 requirements met",
    why: "Audit rights are the enforcement mechanism for all financial provisions. An audit clause without retroactive lookback, extrapolation rights, and enforceability is effectively worthless.",
    financial: "Industry data shows that PBM audits with full extrapolation rights recover an average of $45–$180 per member per audit cycle. For a 500-life plan, a proper 36-month audit with extrapolation could recover $22,500–$90,000 in overcharges. Without extrapolation, systemic overcharges across thousands of claims are unrecoverable.",
    fiduciary: "Audit rights are only valuable if the scope, lookback period, methodology, and enforceability are all contractually defined. A limited audit clause without extrapolation provides false security.",
    issues: [
      {
        title: "Audit timeline and scope definitions missing.",
        found: "No specifications on audit timeframe or access protocols.",
        exploits: [
          "Most PBM contracts contain audit rights clauses that look protective but are specifically designed to prevent meaningful recovery. Typical restrictions include: limiting audits to a 12-month lookback period, prohibiting statistical extrapolation, requiring 90+ days notice, and capping recoveries at nominal amounts.",
          "The most damaging restriction is the prohibition on extrapolation. Without extrapolation rights, the plan can only recover the exact amount for each claim individually documented — a process so expensive and time-consuming that most overcharges go unrecovered.",
          "PBMs also insert audit scope limitations that exclude the most valuable areas for recovery: MAC list pricing, manufacturer payments, proprietary pricing schedules, and specialty drug reimbursement are commonly excluded from audit scope."
        ],
        impact: "Industry data shows that PBM audits with full extrapolation rights recover an average of $45–$180 per member per audit cycle. For a 500-member plan, a fully-scoped 36-month audit with extrapolation could recover $22,500–$90,000 in overpayments that without extrapolation would require claim-by-claim documentation costing more than the recovery.",
        redFlags: [
          "\"Audits shall be limited to a 12-month period preceding the audit request\"",
          "\"Statistical sampling and extrapolation methodologies are not permitted\"",
          "\"Plan must provide 90 days prior written notice before conducting any audit\"",
          "\"Audit scope shall not include PBM's proprietary pricing methodologies or MAC schedules\""
        ],
        fix: "Add: \"Plan shall have the right to audit PBM's books, records, and systems related to Plan's account at any time, with 15 days prior written notice. Audits shall cover a 36-month lookback period. Plan's auditor may use statistical sampling with extrapolation to quantify systemic discrepancies. Any overpayments identified shall be refunded to Plan within 30 days, with interest at 8% per annum from the date of overpayment.\""
      }
    ]
  },
  {
    id: 6,
    title: "Pharmacy Ownership & Neutrality",
    score: 4.0,
    savings: "$192K",
    status: "CONCERN",
    statusColor: "text-orange-400",
    bgStatusColor: "bg-orange-400",
    met: "1 of 2 requirements met",
    why: "PBMs that own specialty pharmacies — including Optum Rx, Express Scripts, and CVS Caremark — have documented conflicts of interest in specialty drug dispensing.",
    financial: "PBMs that own specialty pharmacies earn additional margin when they direct members to their own dispensing operations. Specialty drugs represent ~50% of drug spend for many plans. Even a 5% differential in specialty drug cost on $1M of specialty spend = $50,000 per year in excess cost.",
    fiduciary: "Specialty pharmacy is the fastest-growing segment of pharmacy spend. Contractual neutrality requirements and independent oversight are essential to prevent PBM conflict of interest in this space.",
    issues: [
      {
        title: "No anti-steering protections are mentioned.",
        found: "Ensure neutrality in the use of owned or affiliated pharmacies.",
        exploits: [
          "The three largest PBMs each own specialty pharmacy operations. When a member needs a specialty drug, the PBM has a direct financial incentive to dispense through its own pharmacy rather than an independent pharmacy that may be cheaper.",
          "The excess cost of owned-specialty vs. independent-specialty dispensing averages 8–15% per claim. But the real danger is in pricing opacity: when the PBM is both the price-setter and the dispenser, there is no market check on specialty drug cost.",
          "Beyond pricing, owned specialty pharmacies create conflict of interest in clinical management. The PBM's specialty pharmacy has an incentive to maximize refills, minimize therapeutic alternatives, and resist biosimilar substitution — all of which increase the plan's drug spend while increasing the PBM's revenue."
        ],
        impact: "Specialty drugs represent approximately 50% of drug spend for most mid-size plans despite accounting for only 1–2% of prescription volume. For a plan with $1.5M in specialty spend, an 8–15% excess cost due to owned-pharmacy steering represents $120,000–$225,000 per year.",
        redFlags: [
          "\"Specialty drugs must be dispensed by PBM's designated specialty pharmacy or an approved specialty pharmacy network\"",
          "\"Members may use any specialty pharmacy in PBM's specialty network, subject to applicable cost-sharing\"",
          "\"PBM's specialty pharmacy is the preferred dispenser for specialty medications\""
        ],
        fix: "Add: \"PBM shall not mandate or prefer its affiliated or owned specialty pharmacies over independent specialty pharmacies. Plan shall retain the right to designate any accredited specialty pharmacy as the preferred or exclusive specialty pharmacy for Plan members.\""
      }
    ]
  },
  {
    id: 7,
    title: "Carve-Out & Vendor Rights",
    score: 2.0,
    savings: "$410K",
    status: "RED FLAG",
    statusColor: "text-rose-500",
    bgStatusColor: "bg-rose-500",
    met: "0 of 1 requirements met",
    why: "Carve-out rights preserve plan optionality. Without them, the PBM contractually locks the plan into a single vendor for specialty drugs — preventing competition and benchmarking.",
    financial: "Plans that can carve out specialty drugs to independent dispensers typically save 10–25% on specialty spend. Without contractual carve-out rights, the PBM can contractually block the plan from using lower-cost alternatives. For a plan with $500K in specialty spend, this represents $50K–$125K per year.",
    fiduciary: "The ability to benchmark and carve out is the single most powerful leverage tool in PBM negotiations. Contracts that restrict this right permanently disadvantage the plan.",
    issues: [
      {
        title: "No carve-out rights for specialty drugs are mentioned.",
        found: "Include plan rights to reassess and carve out specialty drug management.",
        exploits: [
          "Specialty drug carve-out means the plan can direct specialty prescription claims to a different vendor than the PBM — typically an independent specialty pharmacy, a GPO, or a direct manufacturer program.",
          "PBMs insert anti-carve-out clauses because specialty pharmacy is their fastest-growing profit center. Common anti-carve-out tactics include: (1) tying specialty carve-out to termination clauses that require 180+ days notice, (2) requiring minimum annual specialty volume commitments that make carve-out economically infeasible, (3) reducing rebate pass-through rates if specialty is carved out.",
          "The practical result: even when the plan has nominal carve-out rights, the economic structure makes them impossible to exercise. This is contractual lock-in disguised as flexibility."
        ],
        impact: "Independent specialty pharmacy programs and direct manufacturer arrangements routinely save 12–28% vs. PBM-bundled specialty pricing. For a plan with $1.5M in specialty spend, this represents $180,000–$420,000 in annual savings opportunity. Even conservative access to biosimilar-first specialty programs saves an additional 5–15% on applicable high-cost biologics.",
        redFlags: [
          "\"Specialty carve-out requires 180 days prior written notice and is subject to PBM approval\"",
          "\"Rebate pass-through rates shall be reduced by 40% if Plan elects to carve out specialty pharmacy\"",
          "\"Plan must maintain minimum annual specialty claim volume of $X to access specialty pricing\""
        ],
        fix: "Add: \"Plan retains the unconditional right to carve out specialty pharmacy dispensing to any accredited specialty pharmacy or program of Plan's choice, exercisable upon 30 days written notice, without penalty, reduction in rebate pass-through, or reduction in any other contracted benefit. PBM shall cooperate with any designated specialty pharmacy to ensure seamless claims processing, clinical coordination, and data sharing.\""
      }
    ]
  },
  {
    id: 8,
    title: "Lowest Net Cost & Clinical Integrity",
    score: 3.0,
    savings: "$583K",
    status: "CONCERN",
    statusColor: "text-orange-400",
    bgStatusColor: "bg-orange-400",
    met: "0 of 2 requirements met",
    why: "The 'lowest net cost' standard — net of rebates and all other manufacturer payments — is the gold standard for formulary management. It ensures clinical decisions are made on evidence, not economics.",
    financial: "When PBMs are not obligated to dispense the lowest net cost option at point of sale, they may dispense brand drugs with high rebates while collecting plan cost-sharing based on higher AWP prices — generating revenue while costing the plan more. Formulary optimization and biosimilar substitution can reduce brand drug spend by 8–20%.",
    fiduciary: "Clinical integrity means formulary decisions are made on evidence-based criteria, not economic incentives. Without this contractual commitment, PBMs can legally favor high-margin drugs.",
    issues: [
      {
        title: "PBM obligations to provide lowest cost drugs are vague.",
        found: "Clarify expectations for cost minimization at the point of sale.",
        exploits: [
          "Without a 'lowest net cost' formulary management requirement, the PBM can legally prefer drugs on its formulary based on manufacturer payments rather than clinical efficacy or cost to the plan.",
          "Biosimilar substitution is the most glaring current example. Brand biologics have lost patent protection and biosimilar alternatives are available at 30–80% discounts. PBMs that own specialty pharmacies and receive large brand manufacturer rebates have actively resisted biosimilar substitution.",
          "Step therapy protocols, prior authorization criteria, and formulary tier placement are all tools the PBM can use to advantage high-rebate drugs. Without clinical integrity requirements, the PBM's formulary is a revenue-maximization tool masquerading as clinical management."
        ],
        impact: "The gap between highest-rebate formulary management and lowest-net-cost formulary management averages 6–14% of total drug spend. For a $3M drug spend plan, this is $180,000–$420,000/year. Biosimilar conversion alone saves $25,000–$150,000/year for plans with 5–20 Humira users, at identical clinical outcomes.",
        redFlags: [
          "\"PBM shall maintain clinically appropriate formulary and utilization management protocols\"",
          "\"Formulary composition is determined by PBM's pharmacy and therapeutics committee in its sole discretion\"",
          "\"PBM shall consider clinical evidence and cost-effectiveness in formulary management decisions\""
        ],
        fix: "Add: \"PBM shall manage the Plan's formulary on a lowest net cost basis, defined as the lowest total cost to the Plan net of all manufacturer payments associated with each drug. For any drug with one or more biosimilar equivalents approved by FDA as interchangeable, PBM shall place biosimilars in the lowest cost tier and shall apply step therapy protocols favoring biosimilar initiation over brand biologic initiation, unless medically contraindicated for a specific member.\""
      }
    ]
  },
  {
    id: 9,
    title: "Termination & Clean Exit",
    score: 2.5,
    savings: "$154K",
    status: "RED FLAG",
    statusColor: "text-rose-500",
    bgStatusColor: "bg-rose-500",
    met: "1 of 2 requirements met",
    why: "Termination rights determine whether all other contract protections are real or theoretical. A plan that cannot exit cannot enforce its rights. Termination notice, data return, and exit penalty clauses must be plan-favorable.",
    financial: "Long notice periods (90–180 days) and termination fees lock plans into unfavorable arrangements, preventing timely corrective action after identifying overcharges or underperformance. Plans that cannot exit quickly pay an estimated $1,200–$4,500 per member per year in excess costs during the lock-in period.",
    fiduciary: "A clean exit clause is the enforcement mechanism for all other contract provisions. Without it, the plan has no practical remedy for PBM noncompliance during the contract term.",
    issues: [
      {
        title: "No explicit prohibition on exit penalties.",
        found: "Potential punitive fees for termination require exclusion to protect the plan.",
        exploits: [
          "A termination clause determines whether your plan can actually escape a bad PBM contract. PBMs insert long notice periods (90–180 days), high termination fees, data withholding provisions, and 'cure period' requirements that make early termination practically impossible.",
          "Termination fees are often disguised as 'wind-down costs,' 'implementation fee amortization,' or 'technology migration costs.' These fees are rarely disclosed at contract signing and can run to $50,000–$250,000 for a mid-size plan — effectively making it economically impossible to switch PBMs even when switching would save far more.",
          "Data withholding is the most insidious termination tactic. Many contracts allow the PBM to delay delivering historical claims data for 30–90 days after termination. Without this data, the plan cannot onboard a new PBM efficiently, cannot conduct a retroactive audit of the exiting PBM, and cannot provide continuity of care documentation."
        ],
        impact: "A 180-day termination notice requirement vs. a 30-day requirement means a plan that discovers systematic PBM overcharging in January continues paying the PBM for 6 additional months before transitioning. If the overcharge rate is $30,000/month, the extra 5 months of notice costs $150,000. Termination fees on top of this ($50,000–$250,000) make the practical cost of switching from a bad PBM contract $200,000–$400,000 in sunk costs.",
        redFlags: [
          "\"Either party may terminate this Agreement upon 180 days prior written notice\"",
          "\"Upon termination, Plan shall pay PBM's reasonable wind-down costs, including technology migration and implementation amortization\"",
          "\"PBM shall deliver historical claims data within 90 days of the effective date of termination\""
        ],
        fix: "Add: \"Either party may terminate this Agreement without cause upon 30 days prior written notice, or for cause (including material breach, loss of license, or insolvency) immediately upon written notice. Upon termination: (i) no termination or wind-down fees shall be payable by Plan; (ii) PBM shall deliver complete claims data to Plan's designee within 5 business days; (iii) PBM shall cooperate fully with Plan's successor PBM. This Agreement contains no minimum volume commitments or lock-in provisions.\""
      }
    ]
  },
  {
    id: 10,
    title: "Administrative Fee Verification",
    score: 4.5,
    savings: "$119K",
    status: "CONCERN",
    statusColor: "text-orange-400",
    bgStatusColor: "bg-orange-400",
    met: "0 of 2 requirements met",
    why: "Administrative fees should be itemized, benchmarked, and subject to performance guarantees with at-risk dollars. PMPM fees, claim fees, specialty fees, and clinical program fees all require transparency.",
    financial: "Administrative fees vary enormously — from $1.50 to $8.00 PMPM for identical services. Without fee benchmarking rights and performance guarantees, plans cannot verify market competitiveness. SLA-backed performance guarantees with financial penalties create alignment between PBM compensation and plan outcomes.",
    fiduciary: "Performance guarantees without financial consequences are marketing — not enforceable obligations. Guarantees should be backed by at-risk dollars equal to 5–10% of total PBM compensation.",
    issues: [
      {
        title: "Hidden fees are not explicitly prohibited.",
        found: "Include a no-hidden-fees clause and detailed itemized fee schedule.",
        exploits: [
          "Administrative fee structures are among the most opaque elements of PBM contracts. Plans are quoted a headline PMPM rate, but the actual administrative cost is composed of many separate line items — claim processing fees, specialty fees, clinical program fees, prior authorization fees, formulary management fees, reporting fees — that are never fully itemized at contract signing.",
          "Performance guarantees are the most commonly abused element of PBM contracts. PBMs offer guarantees that sound meaningful — 'generic dispensing rate above 85%,' '90-day refill rates above 78%' — but are structured with loopholes that prevent recovery.",
          "The absence of benchmarking rights means the plan cannot determine whether its administrative fees are competitive. PBM administrative fees vary by 200–400% for identical service levels across different clients."
        ],
        impact: "Administrative fee overcharges for a 500-member plan average $80,000–$180,000/year when benchmarked against market rates. Performance guarantees with 2–5% at-risk vs. 10–15% at-risk represent an accountability gap of $20,000–$40,000/year in unenforceable commitments.",
        redFlags: [
          "\"Administrative fees are set forth in Exhibit A and are subject to annual adjustment at PBM's discretion\"",
          "\"Performance guarantees are subject to a 90-day cure period before any penalty applies\"",
          "\"Total performance guarantee at-risk amount shall not exceed 3% of annual administrative fees\""
        ],
        fix: "Add: \"PBM shall provide Plan with an itemized fee schedule disclosing all components of administrative compensation. Plan shall have the right to benchmark administrative fees against market rates annually and to negotiate adjustments if fees exceed the 60th percentile of market rates for comparable plans. Performance guarantees shall have no less than 10% of total annual PBM compensation at risk, measured quarterly, self-cure periods shall not exceed 30 days, and shall be based on independently verifiable data.\""
      }
    ]
  }
];

export default function RxDefenseReport() {
  const [activeTab, setActiveTab] = useState("summary");

  // ROI Calculator State
  const [calcLives, setCalcLives] = useState<number>(1000);
  const [calcSpend, setCalcSpend] = useState<number>(12000000);
  
  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const estimatedSavingsMin = calcSpend * 0.12;
  const estimatedSavingsMax = calcSpend * 0.18;
  const auditFee = calcLives < 700 ? 15000 : calcLives < 2000 ? 50000 : 200000;
  const roiMultiple = Math.floor(estimatedSavingsMin / auditFee);

  const faqs = [
    {
      q: "How does the 48-hour analysis work?",
      a: "Once we receive your fully executed PBM agreement and a 90-day de-identified claims file via our SOC 2 compliant portal, our algorithmic engine extracts all clauses and runs deterministic financial modeling. Within 48 hours, you receive a fiduciary-grade report identifying exact dollar-value leaks."
    },
    {
      q: "What if you don't find any savings?",
      a: "We offer a 3:1 Guarantee: If we identify less than three times your engagement fee in recoverable leakage, the analysis is completely free. To date, we have never had to invoke this clause."
    },
    {
      q: "Is this going to disrupt our current broker relationship?",
      a: "No. We operate purely as an independent auditor and technology layer. Many brokers actually bring us in to help their clients because our forensic findings give them the leverage they need at the renewal table."
    },
    {
      q: "Are you going to try and sell us a new PBM?",
      a: "No. We do not sell pharmacy benefits, we take zero broker commissions, and we have no carrier relationships. Our only fiduciary duty is to the plan."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-rose-500/30 relative pb-24">
      <Head>
        <title>RX Defense IQ | Fiduciary Analysis Report</title>
      </Head>

      <SiteHeader />

      <main className="max-w-5xl mx-auto px-6 py-12 pt-24">
        {/* Report Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-slate-500 mb-2 uppercase">
              Kincaid IQ &middot; RX Defense IQ&trade;
            </div>
            <h2 className="text-sm md:text-base text-slate-400">Fiduciary-Grade PBM Contract Intelligence</h2>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <div className="text-sm text-slate-400">March 25, 2026</div>
            <div className="text-[10px] md:text-xs font-mono tracking-wider text-slate-500 mt-1 uppercase">
              Account: SHRACK-7742
            </div>
          </div>
        </header>

        {/* Title Section */}
        <div className="mb-12">
          <div className="text-xs font-bold tracking-[0.15em] text-slate-500 mb-4 uppercase">
            PBM Contract Fiduciary Analysis Report
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">
            TrueRx
          </h1>
          <p className="text-lg text-slate-400 font-mono text-sm">
            Boone County - TrueRx PSA 2026 Fully Executed.pdf
          </p>
        </div>

        {/* Strategic Marketing Framework - Five Operational Pillars */}
        <section className="mb-24 border-t border-white/10 pt-16">
          <div className="text-xs font-bold tracking-[0.25em] text-purple-500 mb-6 uppercase text-center">
            Strategic Marketing Framework
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight">
            Rx Defense Contract X-Ray™
          </h2>

          {/* Pillar I: Strategic Insight */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center text-2xl font-black text-purple-400">
                I
              </div>
              <h3 className="text-3xl font-bold text-white">Strategic Insight</h3>
            </div>
            
            <div className="bg-gradient-to-br from-purple-950/40 to-blue-950/40 border border-purple-500/30 rounded-2xl p-8 mb-8">
              <div className="text-sm font-bold tracking-wider text-purple-400 mb-4 uppercase">Category Statement</div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Financial Defense Infrastructure for the Self-Insured Employer
              </h4>
              <p className="text-slate-300 text-lg leading-relaxed">
                Not analytics. Not consulting. Not another broker dashboard. The first independent audit of your second-largest expense.
              </p>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-xl p-8 mb-6">
              <h5 className="text-sm font-bold tracking-wider text-cyan-400 mb-4 uppercase">The Asymmetric Insight</h5>
              <p className="text-slate-300 leading-relaxed mb-6">
                Every other major line item on your P&L is audited by an independent party. Your auditors are not your accountants. Your tax counsel is not the IRS. Your insurance broker is not your underwriter. Healthcare is the only line where the vendor writes the contract, audits the contract, and reports performance against the contract — and you accept it because no independent alternative has ever existed. Until now.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-bold tracking-wider text-emerald-400 mb-4 uppercase">Master Headlines</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0a0a0a] border border-emerald-500/20 rounded-lg p-5 hover:border-emerald-500/40 transition-colors">
                  <p className="text-white font-semibold">Your PBM contract leaks. We prove it in 48 hours.</p>
                </div>
                <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-lg p-5 hover:border-cyan-500/40 transition-colors">
                  <p className="text-white font-semibold">You manage every other line item to the basis point. Why is healthcare the exception?</p>
                </div>
                <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-lg p-5 hover:border-purple-500/40 transition-colors">
                  <p className="text-white font-semibold">Built by an actuary and a software engineer. Sold by neither a broker nor a carrier.</p>
                </div>
                <div className="bg-[#0a0a0a] border border-blue-500/20 rounded-lg p-5 hover:border-blue-500/40 transition-colors">
                  <p className="text-white font-semibold">Your second-largest expense is the only one you cannot audit. We built the X-ray.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar II: System Architecture */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center text-2xl font-black text-cyan-400">
                II
              </div>
              <h3 className="text-3xl font-bold text-white">System Architecture</h3>
            </div>

            <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 rounded-2xl p-8 mb-8">
              <h4 className="text-xl font-bold text-white mb-4">What the X-Ray Actually Does</h4>
              <p className="text-slate-300 leading-relaxed mb-6">
                Rx Defense deconstructs every PBM agreement across 10 structural provisions — Brand Effective Rate guarantees, spread pricing, rebate reclassification, specialty exclusivity, audit restrictions, formulary control, market check enforceability, termination and run-out, administrative fee bundling, and data ownership.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Each provision is cross-validated against your Form 5500, your 90-day de-identified claims file (EDI 837/835), and a proprietary benchmark database refined by every prior engagement. The output is not a probability. It is not an estimate. <span className="text-emerald-400 font-semibold">It is a deterministic, dollar-quantified, ERISA-defensible evidence chain</span> — clause by clause, claim by claim, NDC by NDC. Court-admissible. Renewal-grade. Fiduciary-ready.
              </p>
            </div>

            <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-8 mb-8">
              <h5 className="text-sm font-bold tracking-wider text-cyan-400 mb-4 uppercase">Technical Credibility</h5>
              <p className="text-slate-300 text-lg leading-relaxed">
                Most healthcare analytics platforms infer. Rx Defense proves. Statistical inference produces ranges; deterministic forensic computation produces dollar amounts with named clauses and named claims behind them. That is the difference between an insight and a finding. <span className="text-white font-semibold">Brokers offer insights. Rx Defense delivers findings.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-lg p-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">10</div>
                <div className="text-sm text-slate-400">Structural Provisions Analyzed</div>
              </div>
              <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-lg p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">48hrs</div>
                <div className="text-sm text-slate-400">Time to First Report</div>
              </div>
              <div className="bg-[#0a0a0a] border border-emerald-500/20 rounded-lg p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
                <div className="text-sm text-slate-400">ERISA-Defensible Evidence</div>
              </div>
            </div>
          </div>

          {/* Pillar III: Proof Points */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 flex items-center justify-center text-2xl font-black text-emerald-400">
                III
              </div>
              <h3 className="text-3xl font-bold text-white">Proof Points</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111] border border-emerald-500/20 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle2 className="text-emerald-400 shrink-0 mt-1" size={24} />
                  <div>
                    <h5 className="text-white font-bold mb-2">Independent & Conflict-Free</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      No broker commissions. No carrier partnerships. No vendor referral fees. Built by a licensed actuary and software engineer who answers only to the plan fiduciary.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle2 className="text-cyan-400 shrink-0 mt-1" size={24} />
                  <div>
                    <h5 className="text-white font-bold mb-2">Court-Admissible Evidence</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Every finding is backed by specific contract clauses, claims data cross-references, and actuarial calculations that meet ERISA litigation standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle2 className="text-purple-400 shrink-0 mt-1" size={24} />
                  <div>
                    <h5 className="text-white font-bold mb-2">Benchmark Database</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Pricing, rebates, and administrative fees compared against anonymized data from every prior engagement — continuously refined with each new client.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle2 className="text-blue-400 shrink-0 mt-1" size={24} />
                  <div>
                    <h5 className="text-white font-bold mb-2">Fiduciary Protection</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Documentation that demonstrates plan fiduciary diligence for DOL audits, participant lawsuits, and board oversight requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar IV: Execution Model */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/30 to-rose-500/30 flex items-center justify-center text-2xl font-black text-orange-400">
                IV
              </div>
              <h3 className="text-3xl font-bold text-white">Execution Model</h3>
            </div>

            <div className="bg-gradient-to-br from-orange-950/40 to-rose-950/40 border border-orange-500/30 rounded-2xl p-8 mb-8">
              <h4 className="text-xl font-bold text-white mb-4">How We Engage</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h5 className="text-white font-semibold mb-1">Upload Contract + Claims Data</h5>
                    <p className="text-slate-400 text-sm">Fully executed PBM agreement + 90-day de-identified claims file (EDI 837/835). HIPAA-compliant secure upload.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h5 className="text-white font-semibold mb-1">48-Hour Initial Analysis</h5>
                    <p className="text-slate-400 text-sm">Automated clause extraction, claims validation, benchmark comparison. First-pass findings delivered as executive summary + full technical report.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h5 className="text-white font-semibold mb-1">Negotiation Playbook Delivery</h5>
                    <p className="text-slate-400 text-sm">Provision-by-provision recommended contract language, financial quantification, and fiduciary risk assessment ranked by savings impact.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h5 className="text-white font-semibold mb-1">Optional: Renegotiation Support</h5>
                    <p className="text-slate-400 text-sm">We sit in on renewal meetings, provide technical testimony, and validate PBM counter-proposals in real-time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar V: Competitive Moat */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/30 to-purple-500/30 flex items-center justify-center text-2xl font-black text-rose-400">
                V
              </div>
              <h3 className="text-3xl font-bold text-white">Why This Exists Now</h3>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-xl p-8 mb-6">
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                The Consolidated Appropriations Act (2021) and subsequent regulatory guidance created a transparency mandate that PBMs are structurally unable to comply with. They cannot audit themselves. Consultants lack the technical infrastructure to analyze millions of claims. Brokers are financially aligned with the PBM, not the plan.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                <span className="text-white font-semibold">The regulatory window is open.</span> Self-funded plans now have legal standing to demand full contract transparency and fiduciary alignment. The DOL is actively investigating PBM practices. Litigation is rising. The next 24 months represent a structural reset in PBM contracting — and the only way to capture value is with independent, evidence-grade analysis that no conflicted party can provide.
              </p>
            </div>

            <div className="bg-gradient-to-br from-rose-950/40 to-purple-950/40 border border-rose-500/30 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-white mb-4">Who This Is For</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-rose-400 font-bold mb-2 text-sm uppercase tracking-wider">Self-Insured Employers</div>
                  <p className="text-slate-400 text-sm">500–5,000 lives. $2M–$50M annual drug spend. HR/Benefits Directors and CFOs who suspect PBM overcharges but lack the tools to prove it.</p>
                </div>
                <div>
                  <div className="text-purple-400 font-bold mb-2 text-sm uppercase tracking-wider">Plan Fiduciaries</div>
                  <p className="text-slate-400 text-sm">Board members, trustees, and named fiduciaries who need documentation that they fulfilled their ERISA duty to monitor service providers.</p>
                </div>
                <div>
                  <div className="text-cyan-400 font-bold mb-2 text-sm uppercase tracking-wider">Private Equity / PE-Backed CFOs</div>
                  <p className="text-slate-400 text-sm">Portfolio companies where healthcare is 8–15% of EBITDA and PBM contracts have never been independently audited.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Experience - The Buyer-Facing Promise */}
        <section className="mb-24 border-t border-white/10 pt-16">
          <div className="text-xs font-bold tracking-[0.25em] text-blue-500 mb-6 uppercase text-center">
            Product Experience
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight">
            The Buyer-Facing Promise
          </h2>

          {/* The Asymmetric Offer */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-blue-950/60 to-cyan-950/40 border border-blue-500/40 rounded-2xl p-10 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">The 48-Hour Leak Assessment</h3>
              <p className="text-slate-200 text-lg leading-relaxed mb-6">
                Upload your current PBM contract and a 90-day de-identified claims file to our secure SOC 2 portal. Give us 48 hours. We return a deterministic financial audit of your pharmacy spend.
              </p>
              <p className="text-slate-200 text-lg leading-relaxed">
                If your contract is airtight, you gain peace of mind. If it is leaking, we will show you the exact clauses draining your EBITDA — <span className="text-cyan-400 font-semibold">to the dollar, in language your General Counsel can take to court.</span>
              </p>
            </div>
          </div>

          {/* The Guarantee */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-emerald-950/60 to-cyan-950/40 border border-emerald-500/40 rounded-2xl p-10 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">The 3:1 Guarantee</h3>
              <p className="text-slate-200 text-lg leading-relaxed mb-4">
                If Rx Defense identifies less than three times your engagement fee in recoverable leakage, the analysis is free.
              </p>
              <p className="text-emerald-400 text-xl font-bold">
                To date, we have not invoked this clause.
              </p>
            </div>
          </div>

          {/* The Differentiator */}
          <div className="mb-8">
            <div className="bg-gradient-to-br from-purple-950/60 to-blue-950/40 border border-purple-500/40 rounded-2xl p-10">
              <h3 className="text-2xl font-bold text-white mb-6">The Differentiator</h3>
              <div className="text-center mb-8">
                <p className="text-3xl font-bold text-white mb-2">
                  No broker commissions. No carrier relationships.
                </p>
                <p className="text-2xl text-purple-300">
                  One fiduciary duty: yours.
                </p>
              </div>
              <p className="text-slate-200 text-lg leading-relaxed">
                Rx Defense is built by a licensed insurance professional with twenty years of actuarial and global brokerage experience — and an applied AI engineering team. We do not earn overrides. We do not accept carrier bonuses. We do not sell pharmacy benefits. <span className="text-white font-semibold">We sell the truth about the ones you already bought.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Execution Plan - Audience-Specific Copy Blocks */}
        <section className="mb-24 border-t border-white/10 pt-16">
          <div className="text-xs font-bold tracking-[0.25em] text-orange-500 mb-6 uppercase text-center">
            Execution Plan
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight">
            Audience-Specific Messaging
          </h2>

          {/* Block A: CFO Frame */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center text-lg font-black text-orange-400">
                A
              </div>
              <h3 className="text-2xl font-bold text-white">The CFO Frame</h3>
            </div>
            <div className="bg-[#111] border border-orange-500/20 rounded-xl p-8">
              <div className="text-xs font-bold tracking-wider text-orange-400 mb-4 uppercase">Web Hero, Executive Email, Board Memo</div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Healthcare is your second-largest operating expense, growing at 12–15% annually against a medical inflation rate of 7–8%. The delta is not inflation. It is structural leakage — and it is recoverable. A 300-life employer at $10M annual spend is hemorrhaging $300,000 to $600,000 per year through ten contractual mechanisms written by the PBM's lawyers, reviewed by the PBM's auditors, and measured by the PBM's reporting system. There is not a single independent party in that chain. <span className="text-white font-semibold">Rx Defense is the independent party.</span> Give us 48 hours and your Form 5500. We will show you your number.
              </p>
            </div>
          </div>

          {/* Block B: Private Equity Frame */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500/30 to-purple-500/30 flex items-center justify-center text-lg font-black text-rose-400">
                B
              </div>
              <h3 className="text-2xl font-bold text-white">The Private Equity Operator Frame</h3>
            </div>
            <div className="bg-[#111] border border-rose-500/20 rounded-xl p-8">
              <div className="text-xs font-bold tracking-wider text-rose-400 mb-4 uppercase">Highest-Priority Channel</div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Across a ten-company portfolio averaging 300 lives and $10M in annual healthcare spend per entity, you are sitting on <span className="text-emerald-400 font-bold">$25M of EBITDA recovery</span> hidden inside your current run rate. Healthcare is 15–20% of portfolio operating cost and is being managed with a fraction of the rigor applied to procurement, real estate, or working capital. Rx Defense delivers a portfolio-level leakage map within 30 days — entity by entity, dollar by dollar, with the evidence chain required to act on it before the next renewal cycle. This is not vendor management. This is balance-sheet recovery at portfolio scale.
              </p>
            </div>
          </div>

          {/* Block C: Benefits Director Frame */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center text-lg font-black text-cyan-400">
                C
              </div>
              <h3 className="text-2xl font-bold text-white">The Benefits Director / HR VP Frame</h3>
            </div>
            <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-8">
              <div className="text-xs font-bold tracking-wider text-cyan-400 mb-4 uppercase">The Internal Champion</div>
              <p className="text-slate-300 text-lg leading-relaxed">
                You did not write your PBM contract. You inherited it. You renew it under deadline pressure with data your PBM controls and your broker interprets. <span className="text-white font-semibold">Rx Defense is the tool that finally puts you, not them, in the seat of authority at the renewal table.</span> You bring the X-ray. You bring the dollar-quantified findings. You bring the ERISA evidence trail. Your CFO will thank you. Your CEO will promote you. Your employees will never know how close their premiums came to absorbing another year of hidden margin — and that is the point.
              </p>
            </div>
          </div>

          {/* Block D: Broker Partnership Frame */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center text-lg font-black text-purple-400">
                D
              </div>
              <h3 className="text-2xl font-bold text-white">The Broker Partnership Frame</h3>
            </div>
            <div className="bg-[#111] border border-purple-500/20 rounded-xl p-8">
              <div className="text-xs font-bold tracking-wider text-purple-400 mb-4 uppercase">Channel Expansion</div>
              <p className="text-slate-300 text-lg leading-relaxed">
                The brokers who survive the next five years will be the ones who bring independent forensic intelligence to the renewal table — not the ones who hide behind a carrier-fed dashboard. Rx Defense is the upgrade to your advisory: white-label findings, co-branded reporting, and a revenue share that aligns your economics with your client's outcome. <span className="text-white font-semibold">Your competition is about to start carrying an X-ray to every renewal meeting. The question is whether you arrive with one or against one.</span>
              </p>
            </div>
          </div>

          {/* Block E: Cold Outreach */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 flex items-center justify-center text-lg font-black text-emerald-400">
                E
              </div>
              <h3 className="text-2xl font-bold text-white">Cold LinkedIn / Email Opener</h3>
            </div>
            <div className="bg-[#111] border border-emerald-500/20 rounded-xl p-8">
              <div className="text-xs font-bold tracking-wider text-emerald-400 mb-4 uppercase">300 Characters, Weaponized Loss Aversion</div>
              <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-lg p-6 font-mono text-emerald-300">
                "I pulled [Company]'s Form 5500 this morning. There is a number in there your benefits team may not have seen — and it changes the renewal conversation entirely. Worth a quick look?"
              </div>
            </div>
          </div>

          {/* Block F: Proof Stack */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-indigo-500/30 flex items-center justify-center text-lg font-black text-blue-400">
                F
              </div>
              <h3 className="text-2xl font-bold text-white">The Proof Stack</h3>
            </div>
            <div className="bg-[#111] border border-blue-500/20 rounded-xl p-8">
              <div className="text-xs font-bold tracking-wider text-blue-400 mb-6 uppercase">Use Beneath Every Hero Block</div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Employer Size</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Annual Spend</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-slate-400 uppercase tracking-wider">X-Ray Fee</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Average Finding</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-slate-400 uppercase tracking-wider">ROI Multiple</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4 text-white">100–250 lives</td>
                      <td className="py-3 px-4 text-slate-300">$2M–$5M</td>
                      <td className="py-3 px-4 text-slate-300">$1,500–$3,000</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">$300K–$600K</td>
                      <td className="py-3 px-4 text-cyan-400 font-bold">100x–200x</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4 text-white">250–700 lives</td>
                      <td className="py-3 px-4 text-slate-300">$5M–$14M</td>
                      <td className="py-3 px-4 text-slate-300">$5,000–$15,000</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">$900K–$2.3M</td>
                      <td className="py-3 px-4 text-cyan-400 font-bold">60x–153x</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4 text-white">700–2,000 lives</td>
                      <td className="py-3 px-4 text-slate-300">$14M–$40M</td>
                      <td className="py-3 px-4 text-slate-300">$50K base</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">$2.5M–$6M</td>
                      <td className="py-3 px-4 text-cyan-400 font-bold">50x–120x</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4 text-white">2,000–5,000 lives</td>
                      <td className="py-3 px-4 text-slate-300">$40M–$100M</td>
                      <td className="py-3 px-4 text-slate-300">$200K flat</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">$6M–$15M</td>
                      <td className="py-3 px-4 text-cyan-400 font-bold">30x–75x</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-white">5,000+ lives</td>
                      <td className="py-3 px-4 text-slate-300">$100M+</td>
                      <td className="py-3 px-4 text-slate-300">$2M–$5M</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">$15M–$50M</td>
                      <td className="py-3 px-4 text-cyan-400 font-bold">7x–25x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-slate-400 text-sm mt-6 leading-relaxed italic">
                Rx Defense is the rarest category in enterprise software: a product whose value is so asymmetric to its price that the buyer's cognitive challenge is not whether to buy, but whether the finding is real. The 48-hour offer and the 3:1 guarantee exist to resolve that exact question.
              </p>
            </div>
          </div>

          {/* Block G: Call to Action */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500/30 to-orange-500/30 flex items-center justify-center text-lg font-black text-rose-400">
                G
              </div>
              <h3 className="text-2xl font-bold text-white">The Call to Action</h3>
            </div>
            <div className="bg-gradient-to-br from-orange-950/60 to-rose-950/40 border border-orange-500/40 rounded-2xl p-10 text-center">
              <div className="text-xs font-bold tracking-wider text-orange-400 mb-6 uppercase">Use Everywhere, Single Voice</div>
              <p className="text-white text-2xl md:text-3xl font-bold leading-relaxed mb-6">
                Send the contract. Send 90 days of claims. Give us 48 hours.
              </p>
              <p className="text-slate-300 text-lg mb-8">
                Schedule the leak assessment:
              </p>
              <div className="inline-block">
                <Link 
                  href="/request-demo" 
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-rose-600 transition-all shadow-lg shadow-orange-500/30"
                >
                  <span>Request Your 48-Hour Analysis</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="mb-24 border-t border-white/10 pt-16">
          <div className="text-xs font-bold tracking-[0.25em] text-emerald-500 mb-6 uppercase text-center">
            Industry Recognition
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight">
            Trusted by Fiduciaries & CFOs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111] border border-white/5 rounded-xl p-8">
              <div className="flex text-emerald-400 mb-4">
                {[...Array(5)].map((_, i) => <CheckCircle2 key={i} size={16} className="mr-1 fill-emerald-400/20" />)}
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed">
                "We had our broker review the contract twice. Rx Defense found $1.2M in hidden spread pricing and rebate reclassifications in 48 hours. The deterministic evidence chain made it impossible for the PBM to argue."
              </p>
              <div>
                <p className="text-white font-bold">CFO, Manufacturing Enterprise</p>
                <p className="text-sm text-slate-500">3,200 Covered Lives</p>
              </div>
            </div>
            <div className="bg-[#111] border border-white/5 rounded-xl p-8">
              <div className="flex text-emerald-400 mb-4">
                {[...Array(5)].map((_, i) => <CheckCircle2 key={i} size={16} className="mr-1 fill-emerald-400/20" />)}
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed">
                "As an ERISA fiduciary, I needed proof we were monitoring our vendors properly. The Rx Defense analysis gave us the exact documentation we needed for our DOL compliance file, while saving us millions."
              </p>
              <div>
                <p className="text-white font-bold">VP Total Rewards, Tech Firm</p>
                <p className="text-sm text-slate-500">1,800 Covered Lives</p>
              </div>
            </div>
            <div className="bg-[#111] border border-white/5 rounded-xl p-8">
              <div className="flex text-emerald-400 mb-4">
                {[...Array(5)].map((_, i) => <CheckCircle2 key={i} size={16} className="mr-1 fill-emerald-400/20" />)}
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed">
                "We've run this across four of our portfolio companies so far. Total recovered EBITDA is north of $8M. It's the highest ROI initiative we've deployed this year, hands down."
              </p>
              <div>
                <p className="text-white font-bold">Operating Partner, PE Firm</p>
                <p className="text-sm text-slate-500">Mid-Market Portfolio</p>
              </div>
            </div>
          </div>
        </section>

        {/* Power Moves Section */}
        <section className="mb-24 border-t border-white/10 pt-16">
          <div className="text-xs font-bold tracking-[0.25em] text-rose-500 mb-6 uppercase text-center">
            Strategic Execution
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight">
            Power Moves
          </h2>

          <div className="space-y-8">
            {/* Power Move 1 */}
            <div className="bg-gradient-to-br from-[#1a050a] to-[#0a0204] border border-rose-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl font-black">1</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">The "Form 5500 Mic Drop" Cold Open</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Every outreach sequence opens with the prospect's own federal filing. Not a pitch. Not a product. <span className="text-rose-400 font-semibold">Their data, returned to them, before anyone else does it.</span> This converts a sales call into a fiduciary intervention. Loss aversion does the rest.
                  </p>
                </div>
              </div>
            </div>

            {/* Power Move 2 */}
            <div className="bg-gradient-to-br from-[#051015] to-[#020508] border border-cyan-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl font-black">2</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">The "Carrier Rating System" Preview</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Tease, in every channel, the forthcoming <span className="text-cyan-400 font-semibold">Kincaid IQ Carrier Rating</span>. Position it as Moody's for health insurance carriers and PBMs. This single forward-promise reframes Rx Defense from a point product into the leading edge of an industry-wide accountability platform — and the carriers that behave well will promote it for us.
                  </p>
                </div>
              </div>
            </div>

            {/* Power Move 3 */}
            <div className="bg-gradient-to-br from-[#0a1005] to-[#030502] border border-emerald-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-black">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">The "Independent" Claim, Weaponized</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Every competitor will eventually claim transparency. None can claim independence the way Rx Defense can, because the founder holds no carrier appointments and no broker overrides. <span className="text-emerald-400 font-semibold">Make "independence" the category-defining word.</span> It is the one attribute incumbents structurally cannot copy without dismantling their business model.
                  </p>
                </div>
              </div>
            </div>

            {/* Power Move 4 */}
            <div className="bg-gradient-to-br from-[#150a05] to-[#080402] border border-orange-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl font-black">4</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">The Price-Anchoring Asymmetry</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Never lead with the X-Ray fee. Always lead with the average finding. <span className="text-orange-400 font-semibold">"$2.3M discovered. $5,000 to discover it."</span> The fee disappears against the recovery. Pricing to value, not cost — exactly as the board directed.
                  </p>
                </div>
              </div>
            </div>

            {/* Power Move 5 */}
            <div className="bg-gradient-to-br from-[#0a0515] to-[#030208] border border-purple-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl font-black">5</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">The ERISA Fiduciary Inversion</h3>
                  <p className="text-slate-300 leading-relaxed">
                    To General Counsel and Board Audit Committees, position the X-Ray not as a savings opportunity but as a <span className="text-purple-400 font-semibold">fiduciary defense instrument</span>. "Do you have the evidence trail today that would demonstrate diligence if your plan were audited tomorrow?" This converts a CFO purchase into a board-level mandate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-[#111] border border-white/5 rounded-xl p-8">
            <p className="text-slate-300 text-lg leading-relaxed text-center italic">
              Rx Defense is the rarest category in enterprise software: a product whose value is so asymmetric to its price that the buyer's cognitive challenge is not whether to buy, but whether the finding is real. The 48-hour offer and the 3:1 guarantee exist to resolve that exact question.
            </p>
          </div>
        </section>

        {/* Interactive ROI Calculator */}
        <section className="mb-24 border-t border-white/10 pt-16">
          <div className="text-xs font-bold tracking-[0.25em] text-cyan-500 mb-6 uppercase text-center">
            Financial Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight">
            Interactive Leakage Calculator
          </h2>
          <div className="bg-gradient-to-br from-[#0a1520] to-[#050a10] border border-cyan-900/50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calculator className="text-cyan-400" size={24} />
                  Plan Inputs
                </h3>
                
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex justify-between">
                    <span>Covered Lives</span>
                    <span className="text-white">{calcLives.toLocaleString()}</span>
                  </label>
                  <input 
                    type="range" 
                    min="100" 
                    max="10000" 
                    step="100"
                    value={calcLives} 
                    onChange={(e) => setCalcLives(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex justify-between">
                    <span>Annual Rx Spend</span>
                    <span className="text-white">{formatCurrency(calcSpend)}</span>
                  </label>
                  <input 
                    type="range" 
                    min="1000000" 
                    max="100000000" 
                    step="500000"
                    value={calcSpend} 
                    onChange={(e) => setCalcSpend(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="bg-[#050505]/80 rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-center">
                <div className="mb-6 text-center">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Estimated Annual Leakage</p>
                  <div className="text-4xl md:text-5xl font-black text-cyan-400 tracking-tight">
                    {formatCurrency(estimatedSavingsMin)} <span className="text-2xl text-slate-500">-</span> {formatCurrency(estimatedSavingsMax)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Audit Fee</p>
                    <p className="text-xl font-bold text-white">{formatCurrency(auditFee)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Est. ROI</p>
                    <p className="text-xl font-bold text-emerald-400">{roiMultiple}x</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="mb-24 border-t border-white/10 pt-16">
          <div className="text-xs font-bold tracking-[0.25em] text-purple-500 mb-6 uppercase text-center">
            Proof of Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight">
            Recent Engagements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#111] border border-white/5 hover:border-purple-500/30 transition-colors rounded-2xl overflow-hidden group">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Building className="text-purple-400" size={24} />
                  <h3 className="text-xl font-bold text-white">Logistics Enterprise</h3>
                </div>
                <div className="flex gap-6 mb-8 border-b border-white/5 pb-6">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Lives</p>
                    <p className="text-lg font-bold text-white">4,200</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Prior Spend</p>
                    <p className="text-lg font-bold text-white">$22.4M</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recovered</p>
                    <p className="text-lg font-bold text-emerald-400">$3.8M</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Identified massive spread pricing leakage through MAC list opacity. Renegotiated to a pure pass-through model and secured 100% manufacturer revenue pass-through, resulting in a 17% absolute reduction in pharmacy spend.
                </p>
              </div>
            </div>
            
            <div className="bg-[#111] border border-white/5 hover:border-blue-500/30 transition-colors rounded-2xl overflow-hidden group">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-blue-400" size={24} />
                  <h3 className="text-xl font-bold text-white">Regional Healthcare System</h3>
                </div>
                <div className="flex gap-6 mb-8 border-b border-white/5 pb-6">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Lives</p>
                    <p className="text-lg font-bold text-white">1,500</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Prior Spend</p>
                    <p className="text-lg font-bold text-white">$14.1M</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recovered</p>
                    <p className="text-lg font-bold text-emerald-400">$2.1M</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Discovered the PBM was aggressively steering specialty fills to its owned pharmacy at a 14% markup vs. independent specialty pharmacies. Added carve-out rights and neutral network language.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Scorecard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-12 rounded-2xl bg-gradient-to-br from-[#1a050a] to-[#0a0204] border border-rose-900/50 p-8 md:p-12 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="text-center md:text-left">
                <div className="text-8xl md:text-[140px] font-black text-rose-500 leading-none tracking-tighter">
                  38
                </div>
                <div className="text-sm font-mono text-slate-400 tracking-widest mt-2 uppercase">Out of 100</div>
              </div>
              <div className="w-px h-32 bg-rose-900/30 hidden md:block mx-4" />
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-rose-500 tracking-tight mb-2">RED FLAG</h2>
                <p className="text-xl text-slate-300 mb-1">CAA 2026 Fiduciary Alignment Score</p>
                <p className="text-slate-500">50 Issues &middot; 10 Provisions Evaluated</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
            <div className="text-3xl font-bold text-emerald-400 mb-2">$3.6M</div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-relaxed">Estimated<br/>Annual<br/>Savings</div>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
            <div className="text-3xl font-bold text-rose-500 mb-2">2</div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-relaxed">Critical<br/>Flags</div>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
            <div className="text-3xl font-bold text-orange-400 mb-2">14</div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-relaxed">Issues Not<br/>Met</div>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
            <div className="text-3xl font-bold text-emerald-500 mb-2">5</div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-relaxed">Protections<br/>Found</div>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
            <div className="text-3xl font-bold text-blue-400 mb-2">10</div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-relaxed">Provisions<br/>Analyzed</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12 bg-[#0a0a0a] border border-white/10 p-1 rounded-xl">
            <TabsTrigger 
              value="summary" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-800 data-[state=active]:text-white flex items-center gap-2 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Executive Summary</span>
              <span className="sm:hidden">Summary</span>
            </TabsTrigger>
            <TabsTrigger 
              value="provisions" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-600 data-[state=active]:to-rose-800 data-[state=active]:text-white flex items-center gap-2 rounded-lg"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="hidden sm:inline">Provisions</span>
              <span className="sm:hidden">Issues</span>
            </TabsTrigger>
            <TabsTrigger 
              value="financial" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-800 data-[state=active]:text-white flex items-center gap-2 rounded-lg"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Financial Impact</span>
              <span className="sm:hidden">Impact</span>
            </TabsTrigger>
            <TabsTrigger 
              value="playbook" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-800 data-[state=active]:text-white flex items-center gap-2 rounded-lg"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Action Plan</span>
              <span className="sm:hidden">Actions</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Executive Summary */}
          <TabsContent value="summary" className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Executive Summary</h2>
              
              <div className="bg-[#111] border-l-4 border-rose-500 p-8 rounded-r-xl mb-12 text-lg text-slate-300 leading-relaxed">
                This contract presents severe fiduciary risk. With a score of 38/100, it falls in the Red Flag tier — indicating that the PBM retains significant authority to act against the economic interests of the plan and its participants. Immediate renegotiation is warranted across all major provisions.
              </div>

              <div className="bg-gradient-to-r from-[#051510] to-[#052015] border border-emerald-900/30 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
                <div className="text-6xl text-emerald-400"><DollarSign size={64} className="stroke-[2.5]" /></div>
                <div>
                  <div className="text-5xl font-bold text-emerald-400 tracking-tight mb-2">$3.6M</div>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Estimated annual savings opportunity if all identified gaps are remediated through renegotiation. This represents the cumulative financial impact of spread pricing, unreturned rebates, audit recovery potential, specialty pharmacy excess cost, and administrative fee reduction.
                  </p>
                </div>
              </div>

              <h3 className="text-xs font-bold tracking-[0.15em] text-slate-500 mb-6 uppercase">Key Findings</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <ShieldAlert className="text-rose-500 shrink-0 mt-1" size={20} />
                  <div className="bg-[#110505] border border-rose-900/30 rounded-xl p-5 flex-1">
                    <p className="text-rose-200">No explicit acceptance of fiduciary status or compliance with ERISA fiduciary standards.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldAlert className="text-rose-500 shrink-0 mt-1" size={20} />
                  <div className="bg-[#110505] border border-rose-900/30 rounded-xl p-5 flex-1">
                    <p className="text-rose-200">Data ownership rights are insufficiently defined, and PBM retains commercial control over plan data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mt-6">
                  <AlertTriangle className="text-orange-400 shrink-0 mt-1" size={20} />
                  <div className="bg-[#151005] border border-orange-900/30 rounded-xl p-5 flex-1">
                    <p className="text-orange-200">Rebate and manufacturer revenue disclosures lack transparency and specificity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <AlertTriangle className="text-orange-400 shrink-0 mt-1" size={20} />
                  <div className="bg-[#151005] border border-orange-900/30 rounded-xl p-5 flex-1">
                    <p className="text-orange-200">Audit rights and processes have limited detail and lack sufficient guarantees for independent verification.</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Savings Opportunity by Provision</h3>
                
                <div className="space-y-3">
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-sm">02</span>
                        <h3 className="text-xl font-bold text-white">Pass-Through Pharmacy Costs</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-orange-400 tracking-wider uppercase px-2 py-1 bg-orange-400/10 rounded mr-4">Concern (4.0/10)</span>
                        <span className="text-3xl font-bold text-emerald-400">$960K</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '27%' }}></div>
                    </div>
                    <p className="text-slate-500 text-sm">Spread pricing elimination and MAC pricing transparency (27% of total)</p>
                  </div>

                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-sm">03</span>
                        <h3 className="text-xl font-bold text-white">Rebate & Manufacturer Revenue</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-orange-400 tracking-wider uppercase px-2 py-1 bg-orange-400/10 rounded mr-4">Concern (3.0/10)</span>
                        <span className="text-3xl font-bold text-emerald-400">$583K</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '16%' }}></div>
                    </div>
                    <p className="text-slate-500 text-sm">Full manufacturer revenue pass-through including pooled rebates (16% of total)</p>
                  </div>

                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-sm">08</span>
                        <h3 className="text-xl font-bold text-white">Lowest Net Cost & Clinical Integrity</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-orange-400 tracking-wider uppercase px-2 py-1 bg-orange-400/10 rounded mr-4">Concern (3.0/10)</span>
                        <span className="text-3xl font-bold text-emerald-400">$583K</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '16%' }}></div>
                    </div>
                    <p className="text-slate-500 text-sm">Formulary optimization and lowest net cost mandatory fulfillment (16% of total)</p>
                  </div>

                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-sm">07</span>
                        <h3 className="text-xl font-bold text-white">Carve-Out & Vendor Rights</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-rose-500 tracking-wider uppercase px-2 py-1 bg-rose-500/10 rounded mr-4">Red Flag (2.0/10)</span>
                        <span className="text-3xl font-bold text-emerald-400">$410K</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '11%' }}></div>
                    </div>
                    <p className="text-slate-500 text-sm">Specialty carve-out and competitive vendor flexibility (11% of total)</p>
                  </div>

                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-sm">05</span>
                        <h3 className="text-xl font-bold text-white">Audit Rights & Extrapolation</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-orange-400 tracking-wider uppercase px-2 py-1 bg-orange-400/10 rounded mr-4">Concern (3.5/10)</span>
                        <span className="text-3xl font-bold text-emerald-400">$339K</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '9%' }}></div>
                    </div>
                    <p className="text-slate-500 text-sm">Retroactive audit recovery and extrapolation rights (9% of total)</p>
                  </div>
                  
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-sm">06</span>
                        <h3 className="text-xl font-bold text-white">Pharmacy Ownership & Neutrality</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-orange-400 tracking-wider uppercase px-2 py-1 bg-orange-400/10 rounded mr-4">Concern (4.0/10)</span>
                        <span className="text-3xl font-bold text-emerald-400">$192K</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                    <p className="text-slate-500 text-sm">Specialty pharmacy steering prevention and network neutrality (5% of total)</p>
                  </div>
                  
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-sm">01</span>
                        <h3 className="text-xl font-bold text-white">Fiduciary Loyalty Commitment</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-rose-500 tracking-wider uppercase px-2 py-1 bg-rose-500/10 rounded mr-4">Red Flag (1.5/10)</span>
                        <span className="text-3xl font-bold text-emerald-400">$174K</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                    <p className="text-slate-500 text-sm">Legal exposure mitigation and ERISA fiduciary compliance (5% of total)</p>
                  </div>
                  
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-sm">09</span>
                        <h3 className="text-xl font-bold text-white">Termination & Clean Exit</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-rose-500 tracking-wider uppercase px-2 py-1 bg-rose-500/10 rounded mr-4">Red Flag (2.5/10)</span>
                        <span className="text-3xl font-bold text-emerald-400">$154K</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '4%' }}></div>
                    </div>
                    <p className="text-slate-500 text-sm">Termination penalty avoidance and clean exit rights (4% of total)</p>
                  </div>
                  
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-sm">10</span>
                        <h3 className="text-xl font-bold text-white">Administrative Fee Verification</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-orange-400 tracking-wider uppercase px-2 py-1 bg-orange-400/10 rounded mr-4">Concern (4.5/10)</span>
                        <span className="text-3xl font-bold text-emerald-400">$119K</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '3%' }}></div>
                    </div>
                    <p className="text-slate-500 text-sm">Administrative fee reduction and performance guarantee recovery (3% of total)</p>
                  </div>
                  
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-sm">04</span>
                        <h3 className="text-xl font-bold text-white">Data Ownership & Access</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-rose-500 tracking-wider uppercase px-2 py-1 bg-rose-500/10 rounded mr-4">Red Flag (2.5/10)</span>
                        <span className="text-3xl font-bold text-emerald-400">$78K</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                    <p className="text-slate-500 text-sm">Data commercialization prevention and real-time access value (2% of total)</p>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Tab 2: Provisions Analysis */}
          <TabsContent value="provisions" className="space-y-12">
            {provisions.map((prov, i) => (
              <section key={prov.id} className="mb-24">
                <div className={`text-xs font-bold tracking-[0.2em] ${prov.statusColor} mb-4 uppercase`}>Provision {prov.id} of 10</div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-8">
                  <div>
                    <h2 className="text-4xl font-bold text-white tracking-tight mb-3">{prov.title}</h2>
                    <div className="flex items-center gap-3">
                      <span className={`${prov.bgStatusColor} text-black text-xs font-bold px-3 py-1 rounded tracking-widest uppercase`}>{prov.status}</span>
                      <span className="text-slate-400 text-sm">{prov.met}</span>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 text-right">
                    <div className={`text-5xl font-black ${prov.statusColor} mb-1 tracking-tighter`}>{prov.score.toFixed(1)} <span className="text-xl text-slate-500 font-medium">/ 10</span></div>
                    <div className="text-xl font-bold text-emerald-400">{prov.savings} <span className="text-sm font-normal text-slate-500 block uppercase tracking-widest mt-1">Savings Opp</span></div>
                  </div>
                </div>

                <div className="bg-[#111] border border-white/5 rounded-2xl p-8 mb-12">
                  <h4 className={`text-xs font-bold tracking-[0.15em] ${prov.statusColor} mb-3 uppercase`}>Why This Provision Matters</h4>
                  <p className="text-slate-300 leading-relaxed mb-8">{prov.why}</p>
                  
                  <h4 className="text-xs font-bold tracking-[0.15em] text-cyan-500 mb-3 uppercase">Financial Context</h4>
                  <p className="text-slate-300 leading-relaxed mb-8">{prov.financial}</p>

                  <h4 className="text-xs font-bold tracking-[0.15em] text-purple-500 mb-3 uppercase">Fiduciary Significance</h4>
                  <p className="text-slate-300 leading-relaxed">{prov.fiduciary}</p>
                </div>

                {prov.issues.map((issue, issueIdx) => (
                  <div key={issueIdx} className={`border-l-2 border-rose-500 pl-8 relative ${issueIdx > 0 ? 'mt-16' : ''}`}>
                    <div className="absolute -left-[17px] top-0 bg-[#050505] p-1">
                      <AlertCircle className="text-rose-500" size={24} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-6">{issue.title}</h3>
                    
                    <div className="bg-[#1a0505] border border-rose-900/30 rounded-xl p-6 mb-8">
                      <h4 className="text-xs font-bold tracking-[0.15em] text-rose-500 mb-3 uppercase">AI Analysis &mdash; What was found in this contract</h4>
                      <p className="text-rose-200">{issue.found}</p>
                    </div>

                    <h4 className="text-xs font-bold tracking-[0.15em] text-orange-400 mb-4 uppercase flex items-center gap-2">
                      <AlertTriangle size={16} /> How PBMs Exploit This Gap
                    </h4>
                    <ul className="space-y-4 mb-8 text-slate-300">
                      {issue.exploits.map((exploit, idx) => (
                        <li key={idx} className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                          <p>{exploit}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-gradient-to-r from-[#051510] to-[#052015] border border-emerald-900/30 rounded-xl p-6 mb-8">
                      <h4 className="text-xs font-bold tracking-[0.15em] text-emerald-400 mb-3 uppercase flex items-center gap-2">
                        <DollarSign size={16} /> Dollar Impact &mdash; How this costs your plan
                      </h4>
                      <p className="text-emerald-100/80 leading-relaxed">
                        {issue.impact}
                      </p>
                    </div>

                    <h4 className="text-xs font-bold tracking-[0.15em] text-rose-500 mb-4 uppercase flex items-center gap-2">
                      <ShieldAlert size={16} /> Red-Flag Language Found In Your Contract
                    </h4>
                    <div className="space-y-3 mb-8">
                      {issue.redFlags.map((flag, idx) => (
                        <div key={idx} className="bg-[#111] border border-rose-900/50 rounded-lg p-4 font-mono text-sm text-rose-300/80">
                          {flag}
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#05101a] border border-cyan-900/50 rounded-xl p-6">
                      <h4 className="text-xs font-bold tracking-[0.15em] text-cyan-400 mb-4 uppercase flex items-center gap-2">
                        <Lock size={16} /> Required Fix &mdash; Add this language to the contract
                      </h4>
                      <div className="font-mono text-sm text-cyan-300/90 leading-relaxed bg-[#020810] p-5 rounded-lg border border-cyan-900/30 whitespace-pre-line">
                        {issue.fix}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </TabsContent>

          {/* Tab 3: Financial Impact */}
          <TabsContent value="financial" className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Financial Impact Analysis</h2>
              <p className="text-slate-400 text-lg mb-12 max-w-3xl leading-relaxed">
                This section quantifies the estimated financial exposure across all identified contract gaps. These projections are based on industry benchmarks and your plan's characteristics.
              </p>

              {/* Total Savings Summary */}
              <div className="bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8 mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Total Annual Savings Opportunity</h3>
                  <div className="text-5xl font-black text-emerald-400">$3.6M</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-white/5">
                    <div className="text-sm text-emerald-400 font-bold tracking-widest uppercase mb-2">Per Member Per Year</div>
                    <div className="text-3xl font-bold text-white">$240</div>
                  </div>
                  <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-white/5">
                    <div className="text-sm text-emerald-400 font-bold tracking-widest uppercase mb-2">Current Annual Spend</div>
                    <div className="text-3xl font-bold text-white">$18.5M</div>
                  </div>
                  <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-white/5">
                    <div className="text-sm text-emerald-400 font-bold tracking-widest uppercase mb-2">Potential Reduction</div>
                    <div className="text-3xl font-bold text-white">19.5%</div>
                  </div>
                </div>
              </div>

              {/* Savings Breakdown by Provision */}
              <div className="space-y-6 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6">Savings Breakdown by Provision</h3>
                
                <div className="space-y-3">
                  {[
                    { name: "Pass-Through Pharmacy Costs", amount: "$960K", percent: "26.7%", color: "bg-emerald-500" },
                    { name: "Rebate & Manufacturer Revenue", amount: "$583K", percent: "16.2%", color: "bg-emerald-400" },
                    { name: "Lowest Net Cost & Clinical Integrity", amount: "$583K", percent: "16.2%", color: "bg-cyan-500" },
                    { name: "Carve-Out & Vendor Rights", amount: "$410K", percent: "11.4%", color: "bg-blue-500" },
                    { name: "Audit Rights & Extrapolation", amount: "$339K", percent: "9.4%", color: "bg-indigo-500" },
                    { name: "Pharmacy Ownership & Neutrality", amount: "$192K", percent: "5.3%", color: "bg-purple-500" },
                    { name: "Fiduciary Loyalty Commitment", amount: "$174K", percent: "4.8%", color: "bg-pink-500" },
                    { name: "Termination & Clean Exit", amount: "$154K", percent: "4.3%", color: "bg-rose-500" },
                    { name: "Administrative Fee Verification", amount: "$119K", percent: "3.3%", color: "bg-orange-500" },
                    { name: "Data Ownership & Access", amount: "$78K", percent: "2.2%", color: "bg-yellow-500" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4 flex-1">
                          <span className="text-slate-500 font-mono text-sm font-bold">#{idx + 1}</span>
                          <span className="text-white font-semibold">{item.name}</span>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          <span className="text-slate-500 text-sm font-mono">{item.percent}</span>
                          <span className="text-xl font-bold text-emerald-400 min-w-[100px] text-right">{item.amount}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: item.percent }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Category Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    Pharmacy Cost Savings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Pass-Through Pricing</span>
                      <span className="text-white font-bold">$960K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">MAC Optimization</span>
                      <span className="text-white font-bold">$340K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Generic Substitution</span>
                      <span className="text-white font-bold">$287K</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                      <span className="text-white font-bold">Subtotal</span>
                      <span className="text-emerald-400 font-bold text-xl">$1.59M</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    Rebate & Revenue Recovery
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Rebate Pass-Through</span>
                      <span className="text-white font-bold">$583K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Manufacturer Direct</span>
                      <span className="text-white font-bold">$410K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">GPO Alignment</span>
                      <span className="text-white font-bold">$192K</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                      <span className="text-white font-bold">Subtotal</span>
                      <span className="text-cyan-400 font-bold text-xl">$1.19M</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Exposure */}
              <div className="bg-gradient-to-br from-rose-950/40 to-rose-900/20 border border-rose-500/30 rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-rose-400" />
                  Annual Risk Exposure
                </h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Without contract remediation, your plan is exposed to ongoing financial risks from PBM discretion, hidden fees, and misaligned incentives.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-rose-500/20">
                    <div className="text-sm text-rose-400 font-bold tracking-widest uppercase mb-2">Spread Pricing Risk</div>
                    <div className="text-3xl font-bold text-white mb-2">$1.2M</div>
                    <div className="text-xs text-slate-500">Estimated annual hidden margin</div>
                  </div>
                  <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-rose-500/20">
                    <div className="text-sm text-rose-400 font-bold tracking-widest uppercase mb-2">Rebate Retention Risk</div>
                    <div className="text-3xl font-bold text-white mb-2">$840K</div>
                    <div className="text-xs text-slate-500">Potential withheld rebates</div>
                  </div>
                  <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-rose-500/20">
                    <div className="text-sm text-rose-400 font-bold tracking-widest uppercase mb-2">Data Monetization</div>
                    <div className="text-3xl font-bold text-white mb-2">$320K</div>
                    <div className="text-xs text-slate-500">Estimated value of your data</div>
                  </div>
                </div>
              </div>

              {/* 3-Year Projection */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">3-Year Financial Impact Projection</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-4 text-sm font-bold text-slate-500 uppercase tracking-wider border-b border-white/10 pb-4">
                    <div>Year</div>
                    <div className="text-right">Baseline Spend</div>
                    <div className="text-right">With Changes</div>
                    <div className="text-right">Annual Savings</div>
                    <div className="text-right">Cumulative</div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="text-white font-bold">2026</div>
                    <div className="text-right text-slate-400">$18.5M</div>
                    <div className="text-right text-white font-semibold">$14.9M</div>
                    <div className="text-right text-emerald-400 font-bold">$3.6M</div>
                    <div className="text-right text-emerald-400 font-bold">$3.6M</div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 items-center bg-white/5 rounded-lg p-3 -mx-3">
                    <div className="text-white font-bold">2027</div>
                    <div className="text-right text-slate-400">$19.3M</div>
                    <div className="text-right text-white font-semibold">$15.5M</div>
                    <div className="text-right text-emerald-400 font-bold">$3.8M</div>
                    <div className="text-right text-emerald-400 font-bold">$7.4M</div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="text-white font-bold">2028</div>
                    <div className="text-right text-slate-400">$20.1M</div>
                    <div className="text-right text-white font-semibold">$16.1M</div>
                    <div className="text-right text-emerald-400 font-bold">$4.0M</div>
                    <div className="text-right text-emerald-400 font-bold">$11.4M</div>
                  </div>

                  <div className="border-t border-white/10 pt-6 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">3-Year Total Savings</span>
                      <span className="text-4xl font-black text-emerald-400">$11.4M</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">Based on 4.5% annual trend and full contract remediation in 2026</p>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Tab 4: Negotiation Playbook */}
          <TabsContent value="playbook" className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Negotiation Playbook</h2>
              <p className="text-slate-400 text-lg mb-12 max-w-3xl leading-relaxed">
                The following is a consolidated negotiation roadmap, ordered by financial impact. Use this as your primary action document in PBM renegotiation meetings.
              </p>

              <div className="space-y-4">
                <div className="bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono font-bold">#1</span>
                      <h3 className="text-lg font-bold text-white">Provision 2: Pass-Through Pharmacy Costs</h3>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase border border-orange-400/20 px-2 py-1 bg-orange-400/5 rounded">Concern</span>
                      <span className="text-xl font-bold text-emerald-400">$960K</span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                    <ArrowRight className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-slate-300 italic">"Stress the importance of fair pricing and access for plan participants."</p>
                  </div>
                  <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> Ambiguities around cost pass-through and MAC transparency.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono font-bold">#2</span>
                      <h3 className="text-lg font-bold text-white">Provision 3: Rebate & Manufacturer Revenue</h3>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase border border-orange-400/20 px-2 py-1 bg-orange-400/5 rounded">Concern</span>
                      <span className="text-xl font-bold text-emerald-400">$583K</span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                    <ArrowRight className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-slate-300 italic">"Ensure alignment with plan's cost-management goals and audit readiness for compliance."</p>
                  </div>
                  <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> Rebate transparency and allocation need clarity and commitment.</p>
                </div>
                
                <div className="bg-[#0a0a0a] border border-rose-900/30 hover:border-rose-900/60 transition-colors rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono font-bold">#3</span>
                      <h3 className="text-lg font-bold text-white">Provision 8: Lowest Net Cost & Clinical Integrity</h3>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase border border-orange-400/20 px-2 py-1 bg-orange-400/5 rounded">Concern</span>
                      <span className="text-xl font-bold text-emerald-400">$583K</span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                    <ArrowRight className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-slate-300 italic">"Push for formulary decisions based on clinical evidence and lowest net cost."</p>
                  </div>
                  <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> No explicit lowest-cost mandate or biosimilar substitution requirements.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-rose-900/30 hover:border-rose-900/60 transition-colors rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono font-bold">#4</span>
                      <h3 className="text-lg font-bold text-white">Provision 7: Carve-Out & Vendor Rights</h3>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="text-[10px] font-bold text-rose-500 tracking-widest uppercase border border-rose-500/20 px-2 py-1 bg-rose-500/5 rounded">Red Flag</span>
                      <span className="text-xl font-bold text-emerald-400">$410K</span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                    <ArrowRight className="text-rose-500 shrink-0 mt-0.5" size={16} />
                    <p className="text-slate-300 italic">"Focus on ensuring plan flexibility and adaptability for managing specialty drugs."</p>
                  </div>
                  <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> Carve-out and vendor flexibility for specialty drugs are not supported.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono font-bold">#5</span>
                      <h3 className="text-lg font-bold text-white">Provision 5: Audit Rights & Extrapolation</h3>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase border border-orange-400/20 px-2 py-1 bg-orange-400/5 rounded">Concern</span>
                      <span className="text-xl font-bold text-emerald-400">$339K</span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                    <ArrowRight className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-slate-300 italic">"Demand comprehensive audit rights with extrapolation and 36-month lookback."</p>
                  </div>
                  <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> Audit timeline and statistical extrapolation rights not defined.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono font-bold">#6</span>
                      <h3 className="text-lg font-bold text-white">Provision 6: Pharmacy Ownership & Neutrality</h3>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase border border-orange-400/20 px-2 py-1 bg-orange-400/5 rounded">Concern</span>
                      <span className="text-xl font-bold text-emerald-400">$192K</span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                    <ArrowRight className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-slate-300 italic">"Require explicit anti-steering protections and specialty pharmacy neutrality."</p>
                  </div>
                  <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> No protections against owned-pharmacy steering.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-rose-900/30 hover:border-rose-900/60 transition-colors rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono font-bold">#7</span>
                      <h3 className="text-lg font-bold text-white">Provision 1: Fiduciary Loyalty Commitment</h3>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="text-[10px] font-bold text-rose-500 tracking-widest uppercase border border-rose-500/20 px-2 py-1 bg-rose-500/5 rounded">Red Flag</span>
                      <span className="text-xl font-bold text-emerald-400">$174K</span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                    <ArrowRight className="text-rose-500 shrink-0 mt-0.5" size={16} />
                    <p className="text-slate-300 italic">"Insist on explicit fiduciary acceptance and ERISA compliance language."</p>
                  </div>
                  <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> No fiduciary status acceptance or conflict disclosure.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-rose-900/30 hover:border-rose-900/60 transition-colors rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono font-bold">#8</span>
                      <h3 className="text-lg font-bold text-white">Provision 9: Termination & Clean Exit</h3>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="text-[10px] font-bold text-rose-500 tracking-widest uppercase border border-rose-500/20 px-2 py-1 bg-rose-500/5 rounded">Red Flag</span>
                      <span className="text-xl font-bold text-emerald-400">$154K</span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                    <ArrowRight className="text-rose-500 shrink-0 mt-0.5" size={16} />
                    <p className="text-slate-300 italic">"Secure 30-day termination rights with no penalties or data withholding."</p>
                  </div>
                  <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> Long notice periods and potential exit penalties.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono font-bold">#9</span>
                      <h3 className="text-lg font-bold text-white">Provision 10: Administrative Fee Verification</h3>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase border border-orange-400/20 px-2 py-1 bg-orange-400/5 rounded">Concern</span>
                      <span className="text-xl font-bold text-emerald-400">$119K</span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                    <ArrowRight className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-slate-300 italic">"Request itemized fee schedules and benchmarking rights with at-risk guarantees."</p>
                  </div>
                  <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> Hidden fees and weak performance guarantee structure.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-rose-900/30 hover:border-rose-900/60 transition-colors rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono font-bold">#10</span>
                      <h3 className="text-lg font-bold text-white">Provision 4: Data Ownership & Access</h3>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="text-[10px] font-bold text-rose-500 tracking-widest uppercase border border-rose-500/20 px-2 py-1 bg-rose-500/5 rounded">Red Flag</span>
                      <span className="text-xl font-bold text-emerald-400">$78K</span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                    <ArrowRight className="text-rose-500 shrink-0 mt-0.5" size={16} />
                    <p className="text-slate-300 italic">"Establish complete data ownership and prohibit PBM commercialization of plan data."</p>
                  </div>
                  <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> Data ownership unclear, PBM retains commercial rights.</p>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <section className="mt-32 mb-16 max-w-4xl mx-auto">
          <div className="text-xs font-bold tracking-[0.25em] text-slate-500 mb-6 uppercase text-center">
            Clarifications
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden transition-all duration-200 hover:border-white/20">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-white">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="text-cyan-400 flex-shrink-0 ml-4" size={20} />
                  ) : (
                    <ChevronDown className="text-slate-500 flex-shrink-0 ml-4" size={20} />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5">
                    <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer Footer */}
        <div className="border-t border-white/10 pt-12 text-center pb-12 mt-12">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-bold mb-4">
            Kincaid IQ &mdash; Strictly Confidential &middot; Account SHRACK-7742
          </p>
          <p className="text-[10px] text-slate-700 max-w-4xl mx-auto leading-relaxed">
            IMPORTANT DISCLAIMER: This report is for informational purposes only and does not constitute legal advice. Savings estimates are projections based on industry data and should not be relied upon as guarantees of actual savings. Plan fiduciaries should consult qualified ERISA counsel before making contractual decisions based on this analysis. Kincaid IQ makes no representation as to the legal enforceability of any model contract language provided herein.
          </p>
        </div>

      </main>
      
      <SiteFooter />

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-t border-white/10 py-4 px-6 translate-y-0 transform transition-transform duration-300">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-lg">Stop the Leakage.</h4>
            <p className="text-slate-400 text-sm">Upload your contract and claims data for a 48-hour deterministic analysis.</p>
          </div>
          <Link 
            href="/request-demo" 
            className="flex-shrink-0 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            Request 48-Hour Analysis
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}