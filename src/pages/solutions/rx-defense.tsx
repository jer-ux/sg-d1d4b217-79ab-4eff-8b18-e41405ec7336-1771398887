import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import {
  ShieldAlert,
  AlertTriangle,
  DollarSign,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
  CheckCircle2,
  Home,
  Menu,
  X,
  Upload,
  FileText,
  TrendingUp,
  Users,
  Award,
  Shield,
  Clock,
  Play,
  Star,
  Building2,
  Check,
  FileCheck,
  Zap,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Settings
} from "lucide-react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Nav from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";

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

const comparisonData = [
  {
    provision: "Fiduciary Status",
    typical: "Explicitly disclaimed",
    bestPractice: "Contractual acceptance",
    yourContract: "Not mentioned"
  },
  {
    provision: "Spread Pricing",
    typical: "Allowed, undisclosed",
    bestPractice: "100% pass-through required",
    yourContract: "No prohibition"
  },
  {
    provision: "Rebate Pass-Through",
    typical: "Pooled at 60-75%",
    bestPractice: "100% client-specific",
    yourContract: "Pooled methodology"
  },
  {
    provision: "Audit Rights",
    typical: "12-month lookback",
    bestPractice: "36-month + extrapolation",
    yourContract: "18-month, no extrapolation"
  },
  {
    provision: "Specialty Carve-Out",
    typical: "Prohibited or penalized",
    bestPractice: "Unconditional, 30-day notice",
    yourContract: "180-day notice + rebate reduction"
  },
  {
    provision: "Data Ownership",
    typical: "PBM retains rights",
    bestPractice: "Plan owns all data",
    yourContract: "Shared rights"
  },
  {
    provision: "DIR Fees",
    typical: "Unlimited retroactive",
    bestPractice: "Prohibited",
    yourContract: "No restrictions"
  },
  {
    provision: "Termination",
    typical: "180 days + penalties",
    bestPractice: "30 days, no penalties",
    yourContract: "90 days + wind-down fees"
  }
];

export default function RxDefensePresentation() {
  const [currentPage, setCurrentPage] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [showROICalc, setShowROICalc] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [members, setMembers] = useState("500");
  const [drugSpend, setDrugSpend] = useState("3000000");
  const [calcResults, setCalcResults] = useState<any>(null);

  // PBM Optimization Simulator Interactive State
  const [simLives, setSimLives] = useState<number>(850);
  const [simSpend, setSimSpend] = useState<number>(4200000);
  const [clauseFiduciary, setSimFiduciary] = useState<boolean>(false);
  const [clausePassThrough, setSimPassThrough] = useState<boolean>(false);
  const [clauseRebates, setSimRebates] = useState<boolean>(false);
  const [clauseAudit, setSimAudit] = useState<boolean>(false);
  const [clauseCarveOut, setSimCarveOut] = useState<boolean>(false);
  const [clauseRealtime, setSimRealtime] = useState<boolean>(false);

  const totalPages = provisions.length + 1;

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && currentPage > 0) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [currentPage]);

  // Derived calculations for simulator
  const simMetrics = useMemo(() => {
    let score = 10; // baseline score
    if (clauseFiduciary) score += 20;
    if (clausePassThrough) score += 20;
    if (clauseRebates) score += 15;
    if (clauseAudit) score += 15;
    if (clauseCarveOut) score += 10;
    if (clauseRealtime) score += 10;

    // Pricing leakage percentages (higher score = lower leakage)
    const leakagePercent = Math.max(2, 28 - (score * 0.25)); 
    const annualLeakage = (simSpend * leakagePercent) / 100;
    const projectedSavings = simSpend * 0.18 * (1 - (score / 130));
    
    // Protection band
    let band = "HIGH EXPOSURE";
    let bandColor = "text-rose-500 border-rose-500/30 bg-rose-500/10";
    if (score >= 40 && score < 75) {
      band = "CAUTIONARY";
      bandColor = "text-orange-400 border-orange-400/30 bg-orange-400/10";
    } else if (score >= 75) {
      band = "FIDUCIARY STANDARD";
      bandColor = "text-emerald-400 border-emerald-400/30 bg-emerald-400/10";
    }

    return {
      score,
      leakagePercent: leakagePercent.toFixed(1),
      annualLeakage: annualLeakage.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      projectedSavings: projectedSavings.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      threeYearSavings: (projectedSavings * 3).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      band,
      bandColor
    };
  }, [simLives, simSpend, clauseFiduciary, clausePassThrough, clauseRebates, clauseAudit, clauseCarveOut, clauseRealtime]);

  const calculateROI = () => {
    const memberCount = parseInt(members) || 0;
    const annualSpend = parseInt(drugSpend) || 0;

    const spreadPricingSavings = annualSpend * 0.10;
    const rebateGap = annualSpend * 0.08;
    const dirFeesElimination = annualSpend * 0.12;
    const specialtyOptimization = annualSpend * 0.05;
    const adminFeeReduction = memberCount * 36;

    const totalSavings = spreadPricingSavings + rebateGap + dirFeesElimination + specialtyOptimization + adminFeeReduction;
    const fixedFeeInvestment = 75000;
    const performanceBasedUpfront = 40000;

    setCalcResults({
      totalSavings: totalSavings.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      spreadPricing: spreadPricingSavings.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      rebate: rebateGap.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      dirFees: dirFeesElimination.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      specialty: specialtyOptimization.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      admin: adminFeeReduction.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      fixedFeeROI: (totalSavings / fixedFeeInvestment * 100).toFixed(0),
      performanceROI: (totalSavings / performanceBasedUpfront * 100).toFixed(0),
      fixedPayback: (fixedFeeInvestment / (totalSavings / 12)).toFixed(1),
      performancePayback: (performanceBasedUpfront / (totalSavings / 12)).toFixed(1)
    });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setTocOpen(false);
    window.scrollTo(0, 0);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-rose-500/30 relative">
      <Head>
        <title>PBM Contract Clarity 360 | Forensic PBM Contract Analysis</title>
      </Head>

      <Nav />

      {/* Sticky Upload CTA */}
      {currentPage > 0 && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-24 right-6 z-50"
        >
          <Link href="/upload-pbm-contract">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white shadow-2xl shadow-rose-500/30">
              <Upload className="w-4 h-4 mr-2" />
              Upload Your Contract
            </Button>
          </Link>
        </motion.div>
      )}

      {/* Table of Contents Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-[#0a0a0a] border-r border-white/10 z-50 transform transition-transform duration-300 ${tocOpen ? "translate-x-0" : "-translate-x-full"} overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Table of Contents</h3>
            <Button variant="ghost" size="sm" onClick={() => setTocOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => goToPage(0)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentPage === 0 ? "bg-cyan-600 text-white" : "hover:bg-white/5 text-slate-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4" />
                <span className="font-semibold">Overview</span>
              </div>
            </button>
            
            {provisions.map((prov, idx) => (
              <button
                key={prov.id}
                onClick={() => goToPage(idx + 1)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === idx + 1 ? "bg-cyan-600 text-white" : "hover:bg-white/5 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs font-mono shrink-0">{String(prov.id).padStart(2, "0")}</span>
                    <span className="text-sm truncate">{prov.title}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${prov.bgStatusColor} text-black shrink-0`}>
                    {prov.score.toFixed(1)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen pt-20 pb-32">
        {/* Page Header */}
        <div className="bg-[#0a0a0a] border-b border-white/10 sticky top-16 z-40 backdrop-blur-xl bg-opacity-95">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTocOpen(!tocOpen)}
                className="text-slate-400 hover:text-white lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                  PBM Contract Clarity 360™ Presentation
                </div>
                <div className="text-sm text-white font-semibold hidden md:block">
                  {currentPage === 0 ? "Overview" : `Provision ${currentPage}: ${provisions[currentPage - 1].title}`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400 font-mono hidden sm:block">
                Page {currentPage + 1} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="border-white/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className="border-white/10"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {currentPage === 0 ? (
            // Overview Page
            <div className="space-y-12">
              {/* Enhanced Hero Section */}
              <div className="text-center mb-16 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-full px-4 py-2 mb-6">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span className="text-sm font-bold text-rose-400 uppercase tracking-widest">PBM Contract X-Ray</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                    PBM Contract Clarity 360
                  </h1>
                  <p className="text-2xl md:text-3xl text-slate-300 mb-6 font-bold">
                    The Forensic Infrastructure That Turns<br />
                    Pharmacy Spend Opacity Into Fiduciary-Grade Transparency
                  </p>
                  <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
                    A comprehensive forensic analysis of your PBM contract identifying <span className="text-emerald-400 font-bold">$3.6M in annual savings opportunities</span> across 15 structural provisions. 
                    We expose hidden margin sources, validate pricing mechanisms, and provide Board-ready documentation for contract renegotiation.
                  </p>
                  
                  {/* Animated Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                    {[
                      { icon: DollarSign, value: "$3.6M", label: "Avg. Annual Savings", color: "emerald" },
                      { icon: Clock, value: "7-10", label: "Business Days", color: "cyan" },
                      { icon: Shield, value: "15", label: "Critical Provisions", color: "rose" }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className={`bg-zinc-900/80 border border-zinc-800 rounded-xl p-6`}
                      >
                        <stat.icon className="w-8 h-8 text-rose-500 mx-auto mb-3" />
                        <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                        <div className="text-sm text-slate-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/upload-pbm-contract">
                      <Button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-lg">
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Your Contract
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setShowROICalc(true)}
                      variant="outline"
                      className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 px-8 py-4 text-lg"
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Calculate Your Savings
                    </Button>
                    <Button
                      onClick={() => goToPage(1)}
                      variant="outline"
                      className="border-white/20 hover:border-white/40 px-8 py-4 text-lg"
                    >
                      View Sample Analysis
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* INDUSTRIAL-GRADE PBM CONTRACT OPTIMIZATION SIMULATOR */}
              <section className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/5 blur-3xl rounded-full" />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-8 border-b border-zinc-800">
                    <div>
                      <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest mb-1">
                        <Settings className="w-4 h-4 animate-spin-slow" /> Interactive Forensic Laboratory
                      </div>
                      <h2 className="text-3xl font-black text-white tracking-tight">
                        PBM Contract Optimization Simulator
                      </h2>
                      <p className="text-sm text-slate-400">
                        Toggle clauses to immediately model your plan's Fiduciary Health Score and calculate leakages.
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-3">
                      <span className="text-xs text-slate-400">Database Source:</span>
                      <span className="text-xs font-mono font-bold text-white bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                        NADAC 2026 Reference v4
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Parameter Inputs & Switches */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Covered Members (Lives)
                          </label>
                          <Input 
                            type="number" 
                            value={simLives} 
                            onChange={(e) => setSimLives(Math.max(10, parseInt(e.target.value) || 0))}
                            className="bg-black/40 border-zinc-800 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Annual Drug Spend ($)
                          </label>
                          <Input 
                            type="number" 
                            value={simSpend} 
                            onChange={(e) => setSimSpend(Math.max(1000, parseInt(e.target.value) || 0))}
                            className="bg-black/40 border-zinc-800 text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                          Current Contract Clauses
                        </span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { state: clauseFiduciary, setter: setSimFiduciary, label: "Fiduciary Loyalty Clause", desc: "Explicit written fiduciary duty status" },
                            { state: clausePassThrough, setter: setSimPassThrough, label: "Pass-Through Pricing", desc: "Guaranteed pass-through pharmacy pricing" },
                            { state: clauseRebates, setter: setSimRebates, label: "100% Rebate Return", desc: "No pooled rebate retentions allowed" },
                            { state: clauseAudit, setter: setSimAudit, label: "Audit & Extrapolation", desc: "Full retrospective lookback rights" },
                            { state: clauseCarveOut, setter: setSimCarveOut, label: "Specialty Carve-Outs", desc: "Ability to route specialty pharmacies" },
                            { state: clauseRealtime, setter: setSimRealtime, label: "Real-Time API Access", desc: "On-demand claims transparency data" }
                          ].map((clause, idx) => (
                            <button
                              key={idx}
                              onClick={() => clause.setter(!clause.state)}
                              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                                clause.state 
                                  ? "bg-cyan-950/20 border-cyan-500/60 shadow-lg shadow-cyan-500/5 text-white" 
                                  : "bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 text-slate-400"
                              }`}
                            >
                              <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${
                                clause.state ? "border-cyan-400 bg-cyan-400" : "border-slate-600 bg-transparent"
                              }`}>
                                {clause.state && <Check className="w-3 h-3 text-black stroke-[3px]" />}
                              </div>
                              <div>
                                <div className={`text-sm font-bold ${clause.state ? "text-cyan-400" : "text-slate-300"}`}>
                                  {clause.label}
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{clause.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Performance Outputs & Metrics */}
                    <div className="lg:col-span-5 bg-zinc-950/80 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Fiduciary Health Level
                          </span>
                          <span className={`text-xs font-mono font-bold px-2 py-1 rounded border ${simMetrics.bandColor}`}>
                            {simMetrics.band}
                          </span>
                        </div>

                        {/* Large Gauge Meter */}
                        <div className="flex items-center gap-6 mb-6">
                          <div className="relative w-28 h-28 flex items-center justify-center bg-zinc-900 rounded-full border border-zinc-800">
                            <div className="absolute inset-2 rounded-full border border-dashed border-zinc-700" />
                            <div className="text-center z-10">
                              <span className="text-3xl font-black text-white">{simMetrics.score}%</span>
                              <span className="block text-[10px] text-slate-500 font-mono tracking-widest uppercase">Score</span>
                            </div>
                          </div>

                          <div className="flex-1 space-y-2">
                            <div className="text-xs text-slate-400 flex justify-between">
                              <span>Estimated Pricing Leakage:</span>
                              <span className="font-mono text-rose-400 font-bold">{simMetrics.leakagePercent}%</span>
                            </div>
                            <div className="text-xs text-slate-400 flex justify-between">
                              <span>Leakage Amount:</span>
                              <span className="font-mono text-white font-bold">{simMetrics.annualLeakage}</span>
                            </div>
                            <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="h-full bg-rose-500 transition-all duration-300" 
                                style={{ width: `${simMetrics.leakagePercent}%` }} 
                              />
                            </div>
                          </div>
                        </div>

                        {/* Calculated Savings Box */}
                        <div className="space-y-4">
                          <div className="p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-xl">
                            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono mb-1">
                              Projected 1-Year Optimization Savings
                            </div>
                            <div className="text-3xl font-black text-emerald-400 font-mono">
                              {simMetrics.projectedSavings}
                            </div>
                          </div>

                          <div className="p-4 bg-cyan-950/10 border border-cyan-500/20 rounded-xl">
                            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono mb-1">
                              Projected 3-Year Cumulative Savings
                            </div>
                            <div className="text-3xl font-black text-cyan-400 font-mono">
                              {simMetrics.threeYearSavings}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Strategic Recommendation */}
                      <div className="pt-6 mt-6 border-t border-zinc-800">
                        <div className="text-xs text-slate-400 mb-3 leading-relaxed">
                          {simMetrics.score < 50 ? (
                            <span className="text-rose-400">
                              ⚠️ Your contract is highly exposed to PBM spreads and unremitted rebates. We strongly recommend immediate ingestion and forensic auditing.
                            </span>
                          ) : simMetrics.score < 80 ? (
                            <span className="text-orange-400">
                              ⚠️ Standard commercial protections are missing. Some savings are captured, but legal exposure under CAA 2026 remains high.
                            </span>
                          ) : (
                            <span className="text-emerald-400">
                              ✓ Contract complies with optimal fiduciary standards. Continued monitoring and audit validation are required to prevent degradation.
                            </span>
                          )}
                        </div>
                        <Link href="/upload-pbm-contract">
                          <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm">
                            <Upload className="w-4 h-4 mr-2" /> Ingest & Generate Forensic Report
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Trust Indicators */}
              <div className="border-t border-gray-800 pt-12">
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Shield className="w-6 h-6 text-cyan-400" />
                    <div>
                      <div className="text-sm font-semibold text-white">SOC 2 Type II</div>
                      <div className="text-xs">Certified</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Lock className="w-6 h-6 text-cyan-400" />
                    <div>
                      <div className="text-sm font-semibold text-white">HIPAA</div>
                      <div className="text-xs">Compliant</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Award className="w-6 h-6 text-cyan-400" />
                    <div>
                      <div className="text-sm font-semibold text-white">ERISA</div>
                      <div className="text-xs">Specialist</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <FileCheck className="w-6 h-6 text-cyan-400" />
                    <div>
                      <div className="text-sm font-semibold text-white">500+ Plans</div>
                      <div className="text-xs">Analyzed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Is PBM Contract Clarity 360 */}
              <section className="py-20 bg-gradient-to-b from-black to-gray-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,63,94,0.1),transparent_70%)]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-rose-500/20 p-3 rounded-xl border border-rose-500/30">
                      <ShieldAlert className="w-6 h-6 text-rose-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">What Is PBM Contract Clarity 360?</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        PBMs structure contracts to hide margin sources from buyers. Spread pricing, DIR fees, rebate retention, 
                        specialty pharmacy steering, and formulary manipulation are all designed to be invisible at contract signing 
                        and impossible to detect during contract execution.
                      </p>
                      <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        <span className="font-bold text-white">PBM Contract Clarity 360</span> is forensic contract analysis that forces transparency. 
                        We map every revenue stream, validate every pricing mechanism, and document every conflict of interest, then translate findings into Board-ready reports and enforceable contract language.
                      </p>
                    </div>
                    
                    <div className="bg-[#0a0a0a]/50 border border-rose-500/20 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4">The X-Ray Process</h3>
                      <div className="space-y-4">
                        {[
                          { num: 1, title: "Contract Ingestion", desc: "Upload your PBM contract, all amendments, pricing schedules, and side letters" },
                          { num: 2, title: "Forensic Clause Analysis", desc: "15-provision structural review identifying gaps, conflicts, and exposure points" },
                          { num: 3, title: "Financial Impact Modeling", desc: "Quantify hidden costs and savings opportunities with P&L-ready estimates" },
                          { num: 4, title: "Renegotiation Strategy", desc: "Board presentation deck + revised contract language + enforcement framework" }
                        ].map((step) => (
                          <div key={step.num} className="flex items-start gap-3">
                            <div className="bg-rose-500/20 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-rose-400 font-bold text-sm">{step.num}</span>
                            </div>
                            <div>
                              <div className="text-white font-semibold">{step.title}</div>
                              <div className="text-sm text-slate-400">{step.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-rose-500/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-black text-rose-400 mb-2">15</div>
                        <div className="text-sm text-slate-400">Critical Provisions Analyzed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-black text-rose-400 mb-2">7-10</div>
                        <div className="text-sm text-slate-400">Business Days Turnaround</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-black text-rose-400 mb-2">$3.6M</div>
                        <div className="text-sm text-slate-400">Avg. Annual Savings Identified</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Video Explainer Section */}
              <div className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 rounded-2xl p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                    <Play className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Video Walkthrough</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    See How Contract X-Ray Works
                  </h2>
                  <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                    Watch a 5-minute walkthrough of the complete analysis process, from contract upload to Board presentation
                  </p>
                  <div className="aspect-video max-w-4xl mx-auto bg-[#111] border border-cyan-500/30 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-cyan-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-10 h-10 text-cyan-400" />
                      </div>
                      <p className="text-slate-400">Video coming soon</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-white mb-4">How Your Contract Compares</h2>
                  <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                    See where your PBM contract stands against typical contracts and best-in-class provisions
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Provision</th>
                        <th className="text-left py-4 px-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Typical Contract</th>
                        <th className="text-left py-4 px-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Best Practice</th>
                        <th className="text-left py-4 px-6 text-sm font-bold text-rose-400 uppercase tracking-widest">Your Contract</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 font-semibold text-white">{row.provision}</td>
                          <td className="py-4 px-6 text-slate-400">{row.typical}</td>
                          <td className="py-4 px-6 text-emerald-400 font-medium">{row.bestPractice}</td>
                          <td className="py-4 px-6 text-rose-400 font-medium">{row.yourContract}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-6 text-center">
                  <p className="text-rose-300 mb-4">
                    Your contract scores <span className="font-black text-2xl text-rose-400">38/100</span> overall, 
                    placing it in the <span className="font-bold">bottom 12th percentile</span> of contracts we've analyzed.
                  </p>
                  <Link href="/upload-pbm-contract">
                    <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                      Upload Your Contract for Full Analysis
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Sample Scorecard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-rose-950/40 to-rose-900/20 border border-rose-500/30 rounded-2xl p-8 text-center">
                  <div className="text-7xl font-black text-rose-500 mb-2">38</div>
                  <div className="text-sm text-slate-400 uppercase tracking-widest">Overall Score</div>
                  <div className="text-xs text-rose-400 font-bold mt-2">RED FLAG</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8 text-center">
                  <div className="text-5xl font-black text-emerald-400 mb-2">$3.6M</div>
                  <div className="text-sm text-slate-400 uppercase tracking-widest">Annual Savings</div>
                  <div className="text-xs text-emerald-400 font-bold mt-2">Opportunity</div>
                </div>
                <div className="bg-gradient-to-br from-orange-950/40 to-orange-900/20 border border-orange-500/30 rounded-2xl p-8 text-center">
                  <div className="text-5xl font-black text-orange-400 mb-2">15</div>
                  <div className="text-sm text-slate-400 uppercase tracking-widest">Provisions</div>
                  <div className="text-xs text-orange-400 font-bold mt-2">Analyzed</div>
                </div>
              </div>

              {/* Provisions Overview */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-6">Provisions Overview</h2>
                {provisions.map((prov, idx) => (
                  <motion.button
                    key={prov.id}
                    onClick={() => goToPage(idx + 1)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="w-full bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all rounded-xl p-6 text-left group flex flex-col justify-between"
                  >
                    <div className="w-full flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-lg font-bold">#{prov.id}</span>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {prov.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded tracking-widest uppercase ${prov.bgStatusColor} text-black`}>
                          {prov.status}
                        </span>
                        <span className="text-2xl font-bold text-emerald-400">{prov.savings}</span>
                        <ArrowRight className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <div className="flex-1 bg-slate-900 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            prov.score < 3 ? "bg-rose-500" : prov.score < 5 ? "bg-orange-400" : "bg-emerald-400"
                          }`}
                          style={{ width: `${prov.score * 10}%` }}
                        />
                      </div>
                      <span className={`text-sm font-bold ${prov.statusColor}`}>
                        {prov.score.toFixed(1)}/10
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 rounded-2xl p-8 mt-12">
                <div className="text-center">
                  <p className="text-lg text-slate-300 mb-6">
                    Click any provision above to view detailed analysis, or use the navigation controls to browse page by page.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      onClick={() => goToPage(1)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg"
                    >
                      Start Presentation <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Link href="/upload-pbm-contract">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg">
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Your Contract
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Negotiation Reset Section */}
              <div className="bg-gradient-to-br from-red-950/20 via-orange-950/20 to-yellow-950/20 border border-orange-500/30 rounded-2xl p-8 my-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,146,60,0.1),transparent_50%)]" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-orange-500/20 p-3 rounded-xl border border-orange-500/30">
                      <AlertTriangle className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">The Strategic Reality</h3>
                      <blockquote className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6">
                        "PBMs structure contracts to hide margin sources from buyers. A tool that forces clarity shifts all the leverage. That's not neutral analysis, it's a negotiation reset."
                      </blockquote>
                      <div className="bg-[#0a0a0a]/50 border border-orange-500/20 rounded-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <div className="text-xs text-orange-400 uppercase tracking-widest font-bold mb-2">Contract Opacity</div>
                            <div className="text-sm text-slate-300">Deliberately obscured pricing mechanisms protect PBM margins at your expense</div>
                          </div>
                          <div>
                            <div className="text-xs text-orange-400 uppercase tracking-widest font-bold mb-2">Forced Transparency</div>
                            <div className="text-sm text-slate-300">Forensic analysis exposes hidden revenue streams and pricing manipulation</div>
                          </div>
                          <div>
                            <div className="text-xs text-orange-400 uppercase tracking-widest font-bold mb-2">Power Shift</div>
                            <div className="text-sm text-slate-300">Armed with evidence, you renegotiate from strength, not hope</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CFO Entry Point */}
              <div className="bg-gradient-to-br from-emerald-950/20 via-teal-950/20 to-cyan-950/20 border-2 border-emerald-500/30 rounded-2xl p-8 my-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_70%)]" />
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-4">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">CFO Entry Point</span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                        Not Ready for the Full Analysis?<br />
                        <span className="text-emerald-400">Start With Your Broker.</span>
                      </h3>
                      
                      <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                        Most CFOs don't know what their broker is actually being paid by the PBM. 
                        The compensation structure is deliberately obscured in addendums, side letters, and "administrative fees."
                      </p>

                      <div className="bg-[#0a0a0a]/50 border border-emerald-500/20 rounded-xl p-6 mb-6">
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-5xl font-black text-emerald-400">$3,500</span>
                          <span className="text-slate-400">one-time fee</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Broker Compensation Study</h4>
                        <p className="text-sm text-slate-400 mb-4">
                          We'll forensically map every dollar flowing from your PBM to your broker —  
                          administrative fees, performance bonuses, volume incentives, and undisclosed overrides.
                        </p>
                        
                        <div className="space-y-2">
                          {[
                            "Complete compensation mapping across all contract documents",
                            "Benchmark against industry standards and fiduciary best practices",
                            "Plain-English summary for Board presentation",
                            "Delivered in 5 business days"
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-slate-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link href="/upload-pbm-contract">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
                          <FileText className="w-5 h-5 mr-2" />
                          Upload Contract for Broker Study
                        </Button>
                      </Link>
                    </div>

                    <div className="flex-1 lg:pl-8 lg:border-l lg:border-emerald-500/20">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">Why This Matters</h4>
                      
                      <div className="space-y-4">
                        {[
                          { title: "Misaligned Incentives", desc: "When your broker gets paid more for higher PBM costs, they're not incentivized to negotiate aggressively on your behalf." },
                          { title: "Hidden Overrides", desc: "PBMs pay brokers performance bonuses and volume incentives that aren't disclosed to you — often 3-8% of your total spend." },
                          { title: "Fiduciary Risk", desc: "If your broker's compensation creates conflicts of interest and the DOL audits your plan, you need documentation showing you knew and addressed it." },
                          { title: "Board Liability", desc: "Your Board is asking \"Are we getting ripped off?\" Start with the broker study — it's the fastest way to answer that question with evidence." }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-[#0a0a0a]/30 border border-slate-700 rounded-lg p-4">
                            <h5 className="text-white font-semibold mb-2">{item.title}</h5>
                            <p className="text-sm text-slate-400">{item.desc}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-4">
                        <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-2">Next Step</p>
                        <p className="text-sm text-slate-300">
                          If the broker study reveals concerning conflicts, we'll recommend proceeding to the full 15-provision Contract X-Ray. 
                          The $3,500 study fee applies toward either engagement model.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Models */}
              <div className="space-y-8 mt-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Choose Your Engagement Model</h2>
                  <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                    Two proven approaches to unlock your $3.6M in annual savings opportunities
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Fixed Fee Model */}
                  <div className="bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">Fixed Fee Model</h3>
                        <div className="text-xs font-bold px-3 py-1 rounded bg-slate-700 text-slate-300 uppercase tracking-widest">
                          Predictable
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <div className="text-sm text-slate-500 uppercase tracking-widest mb-2">Investment Range</div>
                        <div className="text-4xl font-black text-white mb-2">
                          $50K–$100K
                        </div>
                        <div className="text-sm text-slate-400">Based on plan size and complexity</div>
                      </div>

                      <div className="space-y-4 mb-8">
                        {[
                          { title: "Complete Contract Analysis", desc: "Full 15-provision forensic review with detailed findings" },
                          { title: "No Performance Risk", desc: "Fixed fee regardless of savings achieved" },
                          { title: "Negotiation Support", desc: "Expert guidance through PBM contract renegotiation" },
                          { title: "Audit Rights Documentation", desc: "Prepared enforcement framework for contract terms" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-white font-semibold">{item.title}</div>
                              <div className="text-sm text-slate-400">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-4 mb-6">
                        <div className="text-xs text-cyan-400 uppercase tracking-widest font-bold mb-2">Best For</div>
                        <div className="text-sm text-slate-300">
                          Organizations that prefer predictable budgeting and want comprehensive analysis without performance-based payments
                        </div>
                      </div>

                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                        Request Fixed Fee Proposal
                      </Button>
                    </div>
                  </div>

                  {/* Performance-Based Model */}
                  <div className="bg-gradient-to-br from-[#0a0a0a] to-[#111] border-2 border-emerald-500/50 rounded-2xl p-8 hover:border-emerald-500 transition-all relative overflow-hidden group">
                    <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded bg-emerald-500 text-black uppercase tracking-widest">
                      Recommended
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">Performance-Based Model</h3>
                        <div className="text-xs font-bold px-3 py-1 rounded bg-emerald-700 text-emerald-100 uppercase tracking-widest">
                          Aligned
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <div className="text-sm text-slate-500 uppercase tracking-widest mb-2">Upfront Investment</div>
                        <div className="text-4xl font-black text-white mb-2">
                          $25K–$50K
                        </div>
                        <div className="text-sm text-emerald-400 font-semibold">+ 20% of verified savings</div>
                        <div className="text-xs text-slate-500 mt-1">50% of fixed fee model</div>
                      </div>

                      <div className="space-y-4 mb-8">
                        {[
                          { title: "Lower Upfront Cost", desc: "Half the upfront investment of fixed fee model" },
                          { title: "Shared Success", desc: "We only win when you achieve verified savings" },
                          { title: "Ongoing Validation", desc: "Quarterly savings verification and reconciliation" },
                          { title: "Maximum Accountability", desc: "Payment tied directly to measurable results" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-white font-semibold">{item.title}</div>
                              <div className="text-sm text-slate-400">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 mb-6">
                        <div className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-2">Best For</div>
                        <div className="text-sm text-slate-300">
                          Organizations that want aligned incentives and prefer to pay based on actual results delivered
                        </div>
                      </div>

                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                        Request Performance-Based Proposal
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111] border border-white/5 rounded-2xl p-8 text-center">
                  <p className="text-slate-400 text-sm mb-4">
                    Both models include the complete 15-provision analysis, negotiation strategy documentation, and 12 months of implementation support
                  </p>
                  <p className="text-xs text-slate-500">
                    Pricing based on plan size, complexity, and current contract structure. Contact us for a customized proposal.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Individual Provision Page
            (() => {
              const prov = provisions[currentPage - 1];
              return (
                <div className="space-y-12">
                  {/* Provision Header */}
                  <div className="border-b border-white/10 pb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded tracking-widest uppercase ${prov.bgStatusColor} text-black`}>
                        PROVISION {prov.id} OF 15
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded tracking-widest uppercase ${prov.bgStatusColor} text-black`}>
                        {prov.status}
                      </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                      {prov.title}
                    </h1>
                    <div className="flex items-center gap-8 flex-wrap">
                      <div>
                        <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Score</div>
                        <div className={`text-4xl font-black ${prov.statusColor}`}>
                          {prov.score.toFixed(1)} <span className="text-xl text-slate-500">/ 10</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Savings Opportunity</div>
                        <div className="text-4xl font-black text-emerald-400">{prov.savings}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Requirements</div>
                        <div className="text-lg text-slate-400">{prov.met}</div>
                      </div>
                    </div>
                  </div>

                  {/* Why This Matters */}
                  <section className="bg-[#111] border border-white/5 rounded-2xl p-8">
                    <h2 className="text-xs font-bold tracking-widest text-cyan-500 uppercase mb-4">Why This Provision Matters</h2>
                    <p className="text-slate-300 text-lg leading-relaxed">{prov.why}</p>
                  </section>

                  {/* Financial Context */}
                  <section className="bg-gradient-to-r from-emerald-950/40 to-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8">
                    <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-4 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Financial Context
                    </h2>
                    <p className="text-emerald-100/80 text-lg leading-relaxed">{prov.financial}</p>
                  </section>

                  {/* Fiduciary Significance */}
                  <section className="bg-gradient-to-r from-purple-950/40 to-purple-900/20 border border-purple-500/30 rounded-2xl p-8">
                    <h2 className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-4 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" />
                      Fiduciary Significance
                    </h2>
                    <p className="text-purple-100/80 text-lg leading-relaxed">{prov.fiduciary}</p>
                  </section>

                  {/* Issues Analysis */}
                  {prov.issues.map((issue, issueIdx) => (
                    <section key={issueIdx} className="border-l-4 border-rose-500 pl-8 relative">
                      <div className="absolute -left-[21px] top-0 bg-[#050505] p-1">
                        <AlertCircle className="text-rose-500" size={28} />
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-6">{issue.title}</h3>
                      
                      {/* What Was Found */}
                      <div className="bg-[#1a0505] border border-rose-900/30 rounded-xl p-6 mb-8">
                        <h4 className="text-xs font-bold tracking-widest text-rose-500 uppercase mb-3">What Was Found In This Contract</h4>
                        <p className="text-rose-200 text-lg">{issue.found}</p>
                      </div>

                      {/* How PBMs Exploit This */}
                      <div className="mb-8">
                        <h4 className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          How PBMs Exploit This Gap
                        </h4>
                        <ul className="space-y-4">
                          {issue.exploits.map((exploit, idx) => (
                            <li key={idx} className="flex gap-4">
                              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center text-sm font-bold">
                                {idx + 1}
                              </span>
                              <p className="text-slate-300 text-lg leading-relaxed">{exploit}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Dollar Impact */}
                      <div className="bg-gradient-to-r from-emerald-950/40 to-emerald-900/20 border border-emerald-500/30 rounded-xl p-6 mb-8">
                        <h4 className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Dollar Impact
                        </h4>
                        <p className="text-emerald-100/80 text-lg leading-relaxed">{issue.impact}</p>
                      </div>

                      {/* Red-Flag Language */}
                      <div className="mb-8">
                        <h4 className="text-xs font-bold tracking-widest text-rose-500 uppercase mb-4 flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4" />
                          Red-Flag Language Found In Your Contract
                        </h4>
                        <div className="space-y-3">
                          {issue.redFlags.map((flag, idx) => (
                            <div key={idx} className="bg-[#111] border border-rose-900/50 rounded-lg p-5 font-mono text-sm text-rose-300/80">
                              {flag}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Required Fix */}
                      <div className="bg-[#05101a] border border-cyan-900/50 rounded-xl p-6">
                        <h4 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-4 flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Required Fix — Add This Language
                        </h4>
                        <div className="font-mono text-sm text-cyan-300/90 leading-relaxed bg-[#020810] p-6 rounded-lg border border-cyan-900/30 whitespace-pre-line">
                          {issue.fix}
                        </div>
                      </div>
                    </section>
                  ))}

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between pt-12 border-t border-white/10">
                    <Button
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      variant="outline"
                      className="border-white/10"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <div className="text-sm text-slate-500">
                      Provision {currentPage} of {provisions.length}
                    </div>
                    <Button
                      onClick={nextPage}
                      disabled={currentPage === totalPages - 1}
                      className="bg-cyan-600 hover:bg-cyan-700"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            onClick={prevPage}
            disabled={currentPage === 0}
            variant="outline"
            size="lg"
            className="border-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          <div className="hidden md:flex items-center gap-2">
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
              let pageNum;
              if (totalPages <= 10) {
                pageNum = i;
              } else if (currentPage < 5) {
                pageNum = i;
              } else if (currentPage > totalPages - 6) {
                pageNum = totalPages - 10 + i;
              } else {
                pageNum = currentPage - 4 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPage === pageNum ? "bg-cyan-500 w-8" : "bg-slate-700 hover:bg-slate-600"
                  }`}
                />
              );
            })}
          </div>

          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            size="lg"
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            <span className="hidden sm:inline">{currentPage === totalPages - 1 ? "Request Analysis" : "Next"}</span>
            <span className="sm:hidden">→</span>
            <ArrowRight className="w-5 h-5 ml-2 hidden sm:inline" />
          </Button>
        </div>
      </div>

      {/* ROI Calculator Modal */}
      <AnimatePresence>
        {showROICalc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowROICalc(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-emerald-500/40 rounded-3xl p-8 md:p-12 max-w-4xl w-full shadow-2xl shadow-emerald-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowROICalc(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                  Calculate Your Savings
                </h3>
                <p className="text-lg text-gray-400">
                  Enter your plan details to estimate potential annual savings
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="members" className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Covered Members
                  </label>
                  <Input
                    id="members"
                    type="number"
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                    className="bg-black/50 border-gray-700 focus:border-emerald-500 text-white font-mono"
                    placeholder="500"
                  />
                </div>

                <div>
                  <label htmlFor="drugSpend" className="block text-sm font-medium text-gray-300 mb-2">
                    Annual Drug Spend ($)
                  </label>
                  <Input
                    id="drugSpend"
                    type="number"
                    value={drugSpend}
                    onChange={(e) => setDrugSpend(e.target.value)}
                    className="bg-black/50 border-gray-700 focus:border-emerald-500 text-white font-mono"
                    placeholder="3000000"
                  />
                </div>
              </div>

              <Button
                onClick={calculateROI}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg mb-8"
              >
                Calculate Savings
              </Button>

              {calcResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-8 text-center">
                    <div className="text-sm text-emerald-400 uppercase tracking-widest font-bold mb-2">
                      Estimated Annual Savings
                    </div>
                    <div className="text-5xl md:text-6xl font-black text-emerald-400 mb-4 font-mono">
                      {calcResults.totalSavings}
                    </div>
                    <div className="text-sm text-gray-400">
                      Based on 15-provision contract optimization
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Spread Pricing Elimination", value: calcResults.spreadPricing },
                      { label: "Rebate Gap Recovery", value: calcResults.rebate },
                      { label: "DIR Fees Removed", value: calcResults.dirFees },
                      { label: "Specialty Optimization", value: calcResults.specialty },
                      { label: "Admin Fee Reduction", value: calcResults.admin }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-black/30 border border-gray-700 rounded-xl p-4">
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                          {item.label}
                        </div>
                        <div className="text-2xl font-bold text-white font-mono">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-6">
                      <div className="text-xs text-cyan-400 uppercase tracking-widest font-bold mb-3">
                        Fixed Fee Model
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">ROI:</span>
                          <span className="text-white font-bold">{calcResults.fixedFeeROI}x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Payback:</span>
                          <span className="text-white font-bold">{calcResults.fixedPayback} months</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-6">
                      <div className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-3">
                        Performance-Based Model
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">ROI:</span>
                          <span className="text-white font-bold">{calcResults.performanceROI}x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Payback:</span>
                          <span className="text-white font-bold">{calcResults.performancePayback} months</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href="/upload-pbm-contract">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 text-lg">
                      <Upload className="w-5 h-5 mr-2" />
                      Get Your Actual Analysis
                    </Button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowExitIntent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-rose-500/40 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl shadow-rose-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500/20 border border-rose-500/40 rounded-full mb-4">
                  <AlertTriangle className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                  Wait! Before You Go...
                </h3>
                <p className="text-lg text-gray-400 mb-6">
                  Don't leave money on the table. Get a free preliminary assessment of your PBM contract.
                </p>
              </div>

              <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-6 mb-6">
                <h4 className="text-white font-bold mb-4">Free Preliminary Assessment Includes:</h4>
                <div className="space-y-3">
                  {[
                    "Quick score of your current contract (0-100)",
                    "Top 3 red flag provisions identified",
                    "Estimated annual savings opportunity",
                    "15-minute expert consultation call",
                    "No obligation, no credit card required"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/upload-pbm-contract">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 text-lg">
                    <Upload className="w-5 h-5 mr-2" />
                    Get Free Assessment
                  </Button>
                </Link>
                <Button
                  onClick={() => setShowExitIntent(false)}
                  variant="outline"
                  className="w-full border-gray-700 text-gray-400 hover:text-white py-4 text-lg"
                >
                  Continue Browsing
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}