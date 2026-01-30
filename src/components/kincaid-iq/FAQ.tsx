import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-white/10">
        <AccordionTrigger className="text-left text-white hover:text-white/80">
          What data sources does Kincaid IQ integrate with?
        </AccordionTrigger>
        <AccordionContent className="text-white/60">
          We integrate directly with claims feeds (medical and pharmacy), PBM reporting, plan documents, and
          actuarial models. Our system normalizes data across formats and applies consistent business rules to
          ensure apples-to-apples comparisons.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-white/10">
        <AccordionTrigger className="text-left text-white hover:text-white/80">
          How is Kincaid IQ different from what my PBM or TPA provides?
        </AccordionTrigger>
        <AccordionContent className="text-white/60">
          Your vendors provide summaries optimized for their business model. Kincaid IQ is independent,
          audit-grade analytics built on your raw claims data. We surface misalignment between what you're
          contractually owed and what you're actually receiving—without vendor filter layers.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="border-white/10">
        <AccordionTrigger className="text-left text-white hover:text-white/80">
          How long does implementation take?
        </AccordionTrigger>
        <AccordionContent className="text-white/60">
          Initial setup typically takes 2-4 weeks depending on data source complexity. You'll see preliminary
          insights within the first week, with full historical analysis and benchmarking available by week 3.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="border-white/10">
        <AccordionTrigger className="text-left text-white hover:text-white/80">
          What size organizations is this built for?
        </AccordionTrigger>
        <AccordionContent className="text-white/60">
          Kincaid IQ is designed for mid-market to enterprise employers with self-funded or level-funded health
          plans. Typical clients have 500+ covered lives and annual benefits spend of $5M+. If you're evaluating
          vendor performance or considering plan design changes, you're our ideal customer.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5" className="border-white/10">
        <AccordionTrigger className="text-left text-white hover:text-white/80">
          Is my data secure?
        </AccordionTrigger>
        <AccordionContent className="text-white/60">
          Yes. We're SOC 2 Type II certified, HIPAA compliant, and use enterprise-grade encryption for data in
          transit and at rest. All claims data is de-identified at the individual level and only accessible to
          authorized users within your organization. We never share client data across customers or use it for
          training models.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6" className="border-white/10">
        <AccordionTrigger className="text-left text-white hover:text-white/80">
          Can I use this during vendor negotiations?
        </AccordionTrigger>
        <AccordionContent className="text-white/60">
          Absolutely. That's a primary use case. Our exportable evidence packs provide contract-specific
          benchmarks, variance analysis, and quantified leakage that you can present directly to PBMs, TPAs, and
          consultants. Many clients use Kincaid IQ to validate guarantees and hold vendors accountable to
          contractual commitments.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}