import React from "react";
import Head from "next/head";
import { 
  ShieldAlert, 
  AlertTriangle, 
  DollarSign, 
  AlertCircle,
  ArrowRight,
  Lock,
  CheckCircle2
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

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
  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-rose-500/30">
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-24">
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

        {/* Section 1: Executive Summary */}
        <section className="mb-24">
          <div className="text-xs font-bold tracking-[0.2em] text-blue-500 mb-4 uppercase">Section 1</div>
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
        </section>

        {/* Section 2: Financial Impact Analysis */}
        <section className="mb-24">
          <div className="text-xs font-bold tracking-[0.2em] text-emerald-500 mb-4 uppercase">Section 2</div>
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Financial Impact Analysis</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-3xl leading-relaxed">
            The following savings estimates represent the potential annual financial benefit to the plan if the identified contractual gaps in each provision are remediated through renegotiation.
          </p>

          <div className="space-y-6">
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
        </section>

        {/* Detailed Provisions Breakdown */}
        {provisions.map((prov, i) => (
          <section key={prov.id} className="mb-24">
            <div className={`text-xs font-bold tracking-[0.2em] ${prov.statusColor} mb-4 uppercase`}>Section {i + 4} &middot; Provision {prov.id} of 10</div>
            
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

        {/* Playbook Section */}
        <section className="mb-24">
          <div className="text-xs font-bold tracking-[0.2em] text-orange-400 mb-4 uppercase">Section 14</div>
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
          </div>
        </section>

        {/* Disclaimer Footer */}
        <div className="border-t border-white/10 pt-12 text-center pb-12">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-bold mb-4">
            Kincaid IQ &mdash; Strictly Confidential &middot; Account SHRACK-7742
          </p>
          <p className="text-[10px] text-slate-700 max-w-4xl mx-auto leading-relaxed">
            IMPORTANT DISCLAIMER: This report is for informational purposes only and does not constitute legal advice. Savings estimates are projections based on industry data and should not be relied upon as guarantees of actual savings. Plan fiduciaries should consult qualified ERISA counsel before making contractual decisions based on this analysis. Kincaid IQ makes no representation as to the legal enforceability of any model contract language provided herein.
          </p>
        </div>

      </main>
      
      <SiteFooter />
    </div>
  );
}