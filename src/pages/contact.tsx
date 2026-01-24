import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Container, PageHero } from "@/components/Blocks";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact — Kincaid IQ"
        description="Request a demo, ask for investor access, or start a diligence conversation. We'll respond with a clear next step."
      />
      <Container>
        <PageHero
          title="Contact"
          subtitle="Request a demo, ask for investor access, or start a diligence conversation. We'll respond with a clear next step."
        />

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 k-panel p-6">
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="First name" name="firstName" placeholder="Jeremiah" />
                <Field label="Last name" name="lastName" placeholder="Shrack" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Email" name="email" placeholder="you@firm.com" type="email" />
                <Field label="Company / Family Office" name="company" placeholder="Firm name" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Reason"
                  name="reason"
                  options={[
                    "Request demo",
                    "Investor access",
                    "Family office conversation",
                    "M&A / diligence sprint",
                    "Marketplace partnership",
                    "Actuarial benefits consulting",
                    "Other",
                  ]}
                />
                <Select label="Timeline" name="timeline" options={["This week", "Next 2 weeks", "This month", "Next quarter", "Exploring"]} />
              </div>

              <div>
                <label className="text-sm text-white/70">Message</label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="What are you trying to decide? What systems are in scope (Snowflake/Databricks/ServiceNow/ERP)?"
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
                />
                <div className="text-xs text-white/50 mt-2">
                  Note: This form is UI-only in the scaffold. Wire it to your CRM (HubSpot/Salesforce) or email handler when ready.
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button type="button" className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition">
                  Submit
                </button>
                <Link href="/capital-markets" className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition">
                  Investor overview
                </Link>
              </div>
            </form>
          </div>

          <div className="k-panel p-6">
            <div className="font-semibold">Direct lanes</div>
            <div className="text-sm text-white/70 mt-2">
              Pick the lane and we'll respond with a concrete plan, not a generic reply.
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <InfoRow title="Capital Markets / Strategic" body="Evidence packs, diligence, value realization ledger." />
              <InfoRow title="Family Offices / HNW" body="Governance-grade reporting, clarity engines, oversight cadence." />
              <InfoRow title="Marketplaces" body="Snowflake / Databricks / ServiceNow packaging and GTM." />
              <InfoRow title="Agentic Transformation" body="12-month policy, measured rollouts, controls-first design." />
              <InfoRow title="Actuarial Benefits" body="PBM/Rx intelligence, compliance, benchmarking, verified savings." />
            </div>

            <div className="mt-6 text-xs text-white/55">
              If you prefer email-only workflows, wire this page to your preferred intake path and keep the proof bar consistent.
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm text-white/70">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
      />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm text-white/70">{label}</label>
      <select
        name={name}
        className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white/90 outline-none focus:border-white/25"
        defaultValue={options[0]}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-black">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function InfoRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-white/10 rounded-xl bg-white/5 p-4">
      <div className="text-white/90 font-medium">{title}</div>
      <div className="text-white/65 mt-1">{body}</div>
    </div>
  );
}