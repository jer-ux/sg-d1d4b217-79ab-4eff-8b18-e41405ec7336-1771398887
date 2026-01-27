export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#070B12] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-3xl font-semibold">Book a Strategy Call</div>
        <div className="mt-3 text-sm text-white/65">
          Drop your calendly embed here or add your booking form. This route exists so the CTA is always valid.
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Next step</div>
          <div className="mt-2 text-sm text-white/70">
            Send Jer a note or embed your scheduling link here.
          </div>
        </div>
      </div>
    </div>
  );
}