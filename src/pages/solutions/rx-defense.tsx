import React, { useState } from "react";
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
  X
} from "lucide-react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Nav from "@/components/Nav";

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
  },
  {
    id: 11,
    title: "DIR Fees & Post-Point-of-Sale Adjustments",
    score: 2.0,
    savings: "$425K",
    status: "RED FLAG",
    statusColor: "text-rose-500",
    bgStatusColor: "bg-rose-500",
    met: "0 of 2 requirements met",
    why: "Direct and Indirect Remuneration (DIR) fees are retroactive charges applied to pharmacy claims weeks or months after the member's copay was collected. These fees are invisible at point of sale and systematically increase plan costs while reducing pharmacy reimbursement.",
    financial: "DIR fees average 8-15% of total prescription cost and are applied retroactively, meaning the plan pays more than the quoted price at point of sale. For a $3M drug spend plan, DIR fees add $240K-$450K in hidden annual costs that never appear in real-time pricing.",
    fiduciary: "CMS has proposed banning DIR fees in Medicare Part D due to their opacity and anti-competitive effects. Self-funded ERISA plans have no such protection. Contractual prohibition of retroactive price adjustments is essential for cost predictability and fiduciary compliance.",
    issues: [
      {
        title: "DIR fees and retroactive adjustments are not prohibited.",
        found: "No language preventing post-adjudication price changes or DIR fee assessments.",
        exploits: [
          "DIR fees are the perfect hidden margin mechanism. The member pays their copay based on one price, the plan is billed a second price, and then weeks or months later the PBM applies retroactive 'performance fees' that increase the effective cost by another 8-15%.",
          "PBMs structure DIR fees as 'quality metrics,' 'network participation fees,' or 'performance guarantees' — making them sound like legitimate business practices rather than retroactive price increases.",
          "The timing delay is intentional. By the time DIR fees hit the plan's books, the claim is closed, the member has their medication, and there is no practical way to dispute the charge. This creates a systematic upward ratchet on pharmacy costs."
        ],
        impact: "For a plan with $3M in annual drug spend, DIR fees averaging 12% add $360,000 per year in costs that are invisible at point of sale. These fees are typically excluded from PBM guarantees and performance metrics, meaning they grow year-over-year without contractual limits.",
        redFlags: [
          "\"PBM may assess network performance fees on pharmacy claims as determined in PBM's sole discretion\"",
          "\"Final claim reimbursement amounts may be adjusted for quality metrics and network compliance\"",
          "\"Plan pricing excludes Direct and Indirect Remuneration fees assessed by PBM or its affiliates\""
        ],
        fix: "Add: \"PBM shall not apply any retroactive price adjustments, DIR fees, clawbacks, or post-point-of-sale charges to any claim after the claim has been adjudicated and paid. The amount invoiced to Plan for each claim shall be final and not subject to subsequent adjustment, except for fraud or clear processing error.\""
      },
      {
        title: "Real-time adjudication pricing is not guaranteed.",
        found: "No commitment that point-of-sale pricing equals final plan cost.",
        exploits: [
          "Without real-time adjudication guarantees, PBMs can show one price at the pharmacy counter and bill the plan a completely different amount on the back end."
        ],
        impact: "Price opacity at point of sale means plan sponsors cannot accurately budget pharmacy costs or validate PBM performance guarantees.",
        redFlags: [
          "\"Pricing provided at adjudication is preliminary and subject to final reconciliation\""
        ],
        fix: "Add: \"All pricing communicated at point of sale shall be final. Plan shall not be charged more than the amount adjudicated in real-time for any claim.\""
      }
    ]
  },
  {
    id: 12,
    title: "Formulary Transparency & Independent Review",
    score: 3.5,
    savings: "$298K",
    status: "CONCERN",
    statusColor: "text-orange-400",
    bgStatusColor: "bg-orange-400",
    met: "1 of 3 requirements met",
    why: "The formulary is the single most powerful tool for managing drug costs, but most PBMs retain complete control over formulary design with no plan input or independent oversight. Transparent formulary management with clinical justification requirements prevents PBM conflicts of interest.",
    financial: "Formulary placement determines whether a drug is covered, what tier it occupies, and what prior authorization requirements apply. PBMs often favor high-rebate drugs regardless of clinical efficacy or net cost. Independent formulary review can reduce brand drug spend by 15-25% through evidence-based tier placement.",
    fiduciary: "Formulary decisions affect patient access to medically necessary drugs. ERISA requires that plan fiduciaries act in participants' best interests. Delegating formulary authority to a PBM without oversight or review rights creates fiduciary exposure when PBM decisions prioritize rebate revenue over clinical outcomes.",
    issues: [
      {
        title: "Plan has no input on formulary composition or tier placement.",
        found: "Formulary is determined solely by PBM with no plan review or approval rights.",
        exploits: [
          "PBMs design formularies to maximize their own revenue, not plan savings. High-rebate brand drugs are placed in favorable tiers even when cheaper generic or biosimilar alternatives exist, because PBM earns more from the rebate than the plan saves from the lower-cost alternative.",
          "Step therapy protocols are structured to funnel members toward high-rebate drugs first, requiring 'failure' on preferred options before allowing access to clinically equivalent but lower-rebate alternatives.",
          "Formulary changes mid-year are common and almost always move in one direction: toward higher-cost, higher-rebate drugs. Plans have no contractual right to block these changes or require clinical justification."
        ],
        impact: "For a plan with 500 members and $1.5M in brand drug spend, formulary decisions that favor rebate revenue over net cost add an estimated $225,000-$375,000 per year in unnecessary spending. This gap represents the difference between evidence-based lowest-net-cost formulary management and PBM rebate-optimization strategies.",
        redFlags: [
          "\"Formulary composition is determined by PBM's P&T Committee in its sole discretion\"",
          "\"PBM may modify the formulary at any time with 60 days notice to Plan\"",
          "\"Plan may request but not require specific formulary changes\""
        ],
        fix: "Add: \"Plan shall have the right to review and approve the initial formulary and all mid-year formulary changes. PBM shall provide clinical justification for all tier placements and shall prioritize lowest net cost options when clinical equivalence exists. No formulary change shall take effect without Plan's written approval.\""
      },
      {
        title: "No independent clinical review of formulary decisions.",
        found: "PBM's internal P&T committee is the sole authority on clinical decisions.",
        exploits: [
          "PBM-employed pharmacists on internal P&T committees are not independent. Their employment and bonuses depend on PBM profitability, creating inherent conflicts when formulary decisions affect PBM revenue."
        ],
        impact: "Lack of independent oversight allows systematic bias toward high-margin drugs disguised as clinical decision-making.",
        redFlags: [
          "\"PBM's Pharmacy and Therapeutics Committee makes all clinical determinations\""
        ],
        fix: "Add: \"Plan may engage an independent clinical pharmacist to review formulary decisions and PBM shall provide all supporting documentation for such review.\""
      },
      {
        title: "Biosimilar and generic substitution is not mandatory.",
        found: "No requirement to default to lowest-cost interchangeable options.",
        exploits: [
          "When biosimilars or AB-rated generics are available, PBMs can continue to favor brand originator products that generate higher rebates."
        ],
        impact: "Biosimilar conversion for just 10 Humira users saves $120,000-$180,000 annually at identical clinical outcomes.",
        redFlags: [
          "\"PBM shall consider biosimilar alternatives when clinically appropriate\""
        ],
        fix: "Add: \"For any drug with an FDA-approved interchangeable biosimilar or AB-rated generic, the biosimilar or generic shall be placed in the lowest-cost tier and substitution shall be mandatory unless medically contraindicated for a specific member.\""
      }
    ]
  },
  {
    id: 13,
    title: "Specialty Pharmacy Network Adequacy",
    score: 4.0,
    savings: "$215K",
    status: "CONCERN",
    statusColor: "text-orange-400",
    bgStatusColor: "bg-orange-400",
    met: "1 of 2 requirements met",
    why: "Specialty drug spend represents 50-60% of total pharmacy costs for most plans despite accounting for only 1-2% of claims. Network adequacy requirements ensure members have access to high-quality specialty pharmacies and prevent PBM monopolization through mandatory mail-order or owned-pharmacy requirements.",
    financial: "Specialty drugs dispensed through PBM-owned pharmacies cost 12-20% more than independent specialty pharmacies due to lack of competitive pressure. For a plan with $1M in specialty spend, network restrictions add $120K-$200K in annual excess costs.",
    fiduciary: "CAA 2026 transparency requirements apply to specialty pharmacy arrangements. Plans must be able to demonstrate that specialty pharmacy choices serve participants' interests, not PBM profit margins. Network adequacy language creates documentation of fiduciary diligence.",
    issues: [
      {
        title: "Limited specialty pharmacy network creates effective monopoly.",
        found: "Plan members have access to only 1-3 specialty pharmacies, all PBM-affiliated.",
        exploits: [
          "PBMs create 'narrow networks' for specialty drugs that include only their owned pharmacies or exclusive partners. This eliminates competitive pricing and allows the PBM to charge monopoly rates.",
          "Members are told their specialty medications 'must' be filled through specific pharmacies due to clinical requirements, when the real reason is contractual restrictions that benefit the PBM financially.",
          "Independent specialty pharmacies that offer lower prices are excluded from the network not due to quality concerns but to protect PBM-owned pharmacy margins."
        ],
        impact: "For a plan with $1.5M in specialty drug spend, mandatory use of PBM-owned specialty pharmacies adds $180,000-$300,000 per year compared to competitive specialty pharmacy pricing. This gap represents pure margin for the PBM's pharmacy operations.",
        redFlags: [
          "\"Specialty medications must be dispensed through PBM's designated specialty network\"",
          "\"Limited distribution drugs are only available through PBM's specialty pharmacy\"",
          "\"Plan may request alternative specialty pharmacies subject to PBM approval\""
        ],
        fix: "Add: \"Plan members shall have access to at least five (5) independent specialty pharmacies in addition to any PBM-owned specialty pharmacy. Plan retains the right to designate preferred specialty pharmacies and PBM shall credential and contract with Plan's preferred providers within 30 days of request.\""
      },
      {
        title: "No pricing parity requirement across specialty network.",
        found: "PBM can charge different prices for the same drug depending on which network pharmacy dispenses it.",
        exploits: [
          "PBMs charge higher dispensing fees and ingredient costs when members use PBM-owned specialty pharmacies, while steering members away from lower-cost independents through 'preferred pharmacy' incentives that actually cost the plan more."
        ],
        impact: "Price variation of 15-25% across specialty network pharmacies for identical drugs represents systematic cost inflation.",
        redFlags: [
          "\"Pricing may vary by specialty pharmacy location and may be higher at non-preferred pharmacies\""
        ],
        fix: "Add: \"Plan pricing for specialty medications shall be uniform across all network specialty pharmacies. Member cost-sharing and plan reimbursement shall not vary based on which network specialty pharmacy is used.\""
      }
    ]
  },
  {
    id: 14,
    title: "Clinical Program Outcomes & ROI Validation",
    score: 3.0,
    savings: "$187K",
    status: "CONCERN",
    statusColor: "text-orange-400",
    bgStatusColor: "bg-orange-400",
    met: "0 of 3 requirements met",
    why: "PBMs sell clinical programs — medication therapy management, adherence programs, prior authorization — as value-added services, but these programs often cost more than they save and lack outcomes measurement. ROI validation requirements ensure clinical programs deliver documented value.",
    financial: "Clinical program fees average $3-$8 PMPM ($36-$96 per member per year) with claimed savings of 3-5:1 ROI. Independent audits typically find actual ROI of 0.8-1.2:1, meaning the programs cost more than they save. For a 500-member plan, this is $18,000-$48,000 per year in fees for programs with negative ROI.",
    fiduciary: "ERISA requires that plan expenses be reasonable and necessary. Clinical programs that cost more than they save violate this standard. Contractual ROI validation and opt-out rights ensure fiduciaries can demonstrate prudent expense management.",
    issues: [
      {
        title: "Clinical program fees are mandatory with no opt-out provision.",
        found: "Plan is charged for MTM, adherence programs, and clinical interventions with no ability to decline services.",
        exploits: [
          "PBMs bundle clinical programs into the base contract as mandatory services, charging PMPM fees whether or not the plan uses the programs or sees any value from them.",
          "Claimed savings from clinical programs are often based on projected 'avoided costs' rather than actual measured outcomes, making it impossible to verify ROI.",
          "Programs are structured to maximize PBM billing rather than optimize outcomes — for example, prior authorizations that delay care and frustrate members while generating administrative fees for the PBM."
        ],
        impact: "For a 500-member plan charged $6 PMPM for clinical programs with 1:1 actual ROI (neutral value), the $36,000 in annual fees deliver zero net benefit to the plan. If programs have negative ROI (as independent audits often find), the plan is paying to make its pharmacy benefit more expensive and less user-friendly.",
        redFlags: [
          "\"Clinical program fees are included in the base administrative rate and are non-waivable\"",
          "\"PBM shall provide medication therapy management and adherence programs to all eligible members\"",
          "\"Clinical program savings are estimated based on industry benchmarks and are not guaranteed\""
        ],
        fix: "Add: \"All clinical programs shall be optional and subject to Plan approval. Plan may opt out of any clinical program with 30 days notice. PBM shall provide quarterly reporting of program participation rates, intervention counts, and measured cost savings with independently verifiable methodology. Programs that fail to demonstrate positive ROI may be discontinued by Plan without penalty.\""
      },
      {
        title: "No measurement of clinical program outcomes or ROI.",
        found: "PBM reports program activity but not validated savings or health outcomes.",
        exploits: [
          "PBMs report 'interventions made' and 'members contacted' but never disclose whether those interventions produced cost savings or improved health outcomes."
        ],
        impact: "Without outcomes measurement, plans pay for clinical programs that may actively harm member experience (prior authorization delays, medication access barriers) while providing no financial or clinical benefit.",
        redFlags: [
          "\"PBM shall report on clinical program activities quarterly\""
        ],
        fix: "Add: \"Clinical program reporting shall include measured outcomes: actual cost savings compared to control group, medication adherence rates, hospitalization rates, and member satisfaction scores. ROI calculations shall be independently auditable and based on actual plan-specific data, not industry averages.\""
      },
      {
        title: "Prior authorization creates access barriers without documented clinical value.",
        found: "PBM applies prior authorization protocols with no measurement of clinical appropriateness or cost-effectiveness.",
        exploits: [
          "Prior authorizations are often applied to drugs where clinical evidence does not support the restriction, purely to create administrative friction that reduces utilization and shifts costs to members who abandon therapy."
        ],
        impact: "Inappropriate prior authorization protocols increase member out-of-pocket costs, delay medically necessary treatment, and generate administrative fees for PBMs without demonstrable cost savings or clinical benefit.",
        redFlags: [
          "\"PBM shall apply prior authorization protocols consistent with PBM's clinical policies\""
        ],
        fix: "Add: \"Prior authorization protocols shall be based on peer-reviewed clinical evidence and shall not be applied to medications where such evidence does not support the restriction. Plan retains the right to review and approve all prior authorization criteria annually.\""
      }
    ]
  },
  {
    id: 15,
    title: "Transparency Reporting & Real-Time Data Access",
    score: 2.5,
    savings: "$142K",
    status: "RED FLAG",
    statusColor: "text-rose-500",
    bgStatusColor: "bg-rose-500",
    met: "0 of 3 requirements met",
    why: "CAA 2026 requires PBMs to provide specific transparency reports to plan sponsors. Beyond compliance, real-time data access enables proactive cost management, fraud detection, and member support. Contracts that restrict data access or delay reporting undermine plan fiduciary responsibility.",
    financial: "Real-time claims data allows plans to identify high-cost claimants early, intervene with care management, negotiate direct manufacturer programs, and detect billing errors before they become systemic. Delayed reporting costs plans an estimated $40-$80 PMPY in missed intervention opportunities.",
    fiduciary: "ERISA requires plan fiduciaries to monitor service providers. Without real-time data access, monitoring is impossible. Data delays create legal exposure when fiduciaries cannot demonstrate they had visibility into plan operations or could have detected problems earlier.",
    issues: [
      {
        title: "Claims data is provided quarterly with 45-90 day delays.",
        found: "Plan receives claims data 6-12 weeks after claims are adjudicated, making real-time intervention impossible.",
        exploits: [
          "Delayed data reporting prevents plans from identifying cost trends, high-cost claimants, or billing errors until months after the fact, when intervention opportunities have passed.",
          "PBMs claim data delays are due to 'processing requirements' but the real reason is to prevent plans from discovering overcharges or switching PBMs mid-contract when problems are identified.",
          "By the time quarterly reports arrive, the PBM has already collected payment for potentially erroneous claims and has no incentive to correct errors retroactively."
        ],
        impact: "For a plan with 500 members and $3M in drug spend, 90-day data delays cost an estimated $60,000-$120,000 per year in missed care management opportunities, uncaught billing errors, and inability to negotiate direct manufacturer programs for identified high-cost members.",
        redFlags: [
          "\"PBM shall provide claims data within 60 days of the end of each calendar quarter\"",
          "\"Data access is subject to PBM's standard reporting schedules\"",
          "\"Real-time data feeds are available at additional cost\""
        ],
        fix: "Add: \"PBM shall provide Plan with real-time data access to all claims information via secure API or data feed, with no more than 24-hour delay from claim adjudication. Quarterly and annual reports required by CAA 2026 shall be provided within 30 days of period close at no additional charge.\""
      },
      {
        title: "Transparency reports do not include all required CAA 2026 disclosures.",
        found: "PBM reporting lacks detailed rebate allocation, DIR fee breakdowns, and specialty pharmacy margin disclosure.",
        exploits: [
          "PBMs provide summary-level reports that technically comply with CAA 2026 while omitting the detailed information needed to actually validate pricing or identify overcharges."
        ],
        impact: "Incomplete transparency reporting prevents plan fiduciaries from fulfilling their ERISA monitoring obligations and creates DOL audit risk.",
        redFlags: [
          "\"PBM shall provide transparency reports as required by applicable law\"",
          "\"Certain proprietary pricing information may be excluded from standard reports\""
        ],
        fix: "Add: \"PBM shall provide complete CAA 2026 transparency reports including: (i) total rebates by drug, manufacturer, and therapeutic class; (ii) all DIR fees by type and payee; (iii) specialty pharmacy dispensing fees and ingredient cost by drug; (iv) administrative compensation by source; (v) affiliate revenue by type. Reports shall be in machine-readable format (CSV or Excel) with drug-level detail.\""
      },
      {
        title: "Plan has no portal access for member-level inquiry.",
        found: "When members call with drug cost questions, plan administrators cannot access real-time pricing or coverage information.",
        exploits: [
          "Without portal access, plan administrators must rely on PBM call centers for member support, creating delays and preventing independent verification of PBM responses."
        ],
        impact: "Member service delays and inability to validate PBM information create member dissatisfaction and increase HR administrative burden.",
        redFlags: [
          "\"Member eligibility and claims inquiries shall be directed to PBM's customer service center\""
        ],
        fix: "Add: \"PBM shall provide Plan administrators with secure web portal access to real-time member eligibility, formulary coverage, claim status, and pricing information. Portal shall include search and reporting functionality at no additional charge.\""
      }
    ]
  }
];

export default function RxDefensePresentation() {
  const [currentPage, setCurrentPage] = useState(0); // 0 = overview, 1-15 = provisions
  const [tocOpen, setTocOpen] = useState(false);

  const totalPages = provisions.length + 1; // Overview + 15 provisions

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
        <title>RX Defense IQ | 15 Critical PBM Contract Provisions</title>
      </Head>

      <Nav />

      {/* Table of Contents Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-[#0a0a0a] border-r border-white/10 z-50 transform transition-transform duration-300 ${tocOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
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
                currentPage === 0 
                  ? 'bg-cyan-600 text-white' 
                  : 'hover:bg-white/5 text-slate-400'
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
                  currentPage === idx + 1 
                    ? 'bg-cyan-600 text-white' 
                    : 'hover:bg-white/5 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs font-mono shrink-0">{String(prov.id).padStart(2, '0')}</span>
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
                className="text-slate-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                  Rx Defense IQ™ Presentation
                </div>
                <div className="text-sm text-white font-semibold">
                  {currentPage === 0 ? 'Overview' : `Provision ${currentPage}: ${provisions[currentPage - 1].title}`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400 font-mono">
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
              <div className="text-center mb-16">
                <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
                  RX Defense IQ™
                </h1>
                <p className="text-2xl text-slate-400 mb-8">
                  15 Critical PBM Contract Provisions
                </p>
                <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
                  A comprehensive analysis of your PBM contract identifying $3.6M in annual savings opportunities across 15 structural provisions.
                </p>
              </div>

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

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-6">Provisions Overview</h2>
                {provisions.map((prov, idx) => (
                  <button
                    key={prov.id}
                    onClick={() => goToPage(idx + 1)}
                    className="w-full bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all rounded-xl p-6 text-left group"
                  >
                    <div className="flex items-center justify-between mb-4">
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
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-900 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            prov.score < 3 ? 'bg-rose-500' : prov.score < 5 ? 'bg-orange-400' : 'bg-emerald-400'
                          }`}
                          style={{ width: `${prov.score * 10}%` }}
                        />
                      </div>
                      <span className={`text-sm font-bold ${prov.statusColor}`}>
                        {prov.score.toFixed(1)}/10
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 rounded-2xl p-8 mt-12">
                <div className="text-center">
                  <p className="text-lg text-slate-300 mb-6">
                    Click any provision above to view detailed analysis, or use the navigation controls to browse page by page.
                  </p>
                  <Button
                    onClick={() => goToPage(1)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg"
                  >
                    Start Presentation <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Pricing Models Section */}
              <div className="space-y-8 mt-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Choose Your Engagement Model</h2>
                  <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                    Two proven approaches to unlock your $3.6M in annual savings opportunities
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Model 1: Fixed Fee */}
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
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white font-semibold">Complete Contract Analysis</div>
                            <div className="text-sm text-slate-400">Full 15-provision forensic review with detailed findings</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white font-semibold">No Performance Risk</div>
                            <div className="text-sm text-slate-400">Fixed fee regardless of savings achieved</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white font-semibold">Negotiation Support</div>
                            <div className="text-sm text-slate-400">Expert guidance through PBM contract renegotiation</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white font-semibold">Audit Rights Documentation</div>
                            <div className="text-sm text-slate-400">Prepared enforcement framework for contract terms</div>
                          </div>
                        </div>
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

                  {/* Model 2: Performance-Based */}
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
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white font-semibold">Lower Upfront Cost</div>
                            <div className="text-sm text-slate-400">Half the upfront investment of fixed fee model</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white font-semibold">Shared Success</div>
                            <div className="text-sm text-slate-400">We only win when you achieve verified savings</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white font-semibold">Ongoing Validation</div>
                            <div className="text-sm text-slate-400">Quarterly savings verification and reconciliation</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white font-semibold">Maximum Accountability</div>
                            <div className="text-sm text-slate-400">Payment tied directly to measurable results</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 mb-6">
                        <div className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-2">Example Economics</div>
                        <div className="text-sm text-slate-300 space-y-2">
                          <div className="flex justify-between">
                            <span>Upfront engagement:</span>
                            <span className="font-mono font-semibold">$35,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Year 1 verified savings:</span>
                            <span className="font-mono font-semibold text-emerald-400">$2,400,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Performance fee (20%):</span>
                            <span className="font-mono font-semibold">$480,000</span>
                          </div>
                          <div className="border-t border-emerald-500/30 pt-2 mt-2 flex justify-between text-white font-bold">
                            <span>Your net savings:</span>
                            <span className="font-mono text-lg text-emerald-400">$1,885,000</span>
                          </div>
                        </div>
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
                    <div className="flex items-center gap-8">
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
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
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
                    currentPage === pageNum 
                      ? 'bg-cyan-500 w-8' 
                      : 'bg-slate-700 hover:bg-slate-600'
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
            {currentPage === totalPages - 1 ? 'Request Analysis' : 'Next'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}