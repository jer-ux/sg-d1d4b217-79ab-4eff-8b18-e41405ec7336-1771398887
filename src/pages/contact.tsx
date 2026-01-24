import { SEO } from "@/components/SEO";
import { Container, PageHero } from "@/components/Blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact — Kincaid IQ"
        description="Get in touch to learn how Kincaid IQ can deliver decision-grade value systems for your organization."
      />
      <Container>
        <PageHero
          title="Contact Us"
          subtitle="Get in touch to learn how Kincaid IQ can deliver decision-grade value systems for your organization."
        />

        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="k-panel p-8 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Request a Demo</h2>
                <p className="text-white/70 mb-6">
                  See how Kincaid IQ delivers evidence receipts, CFO-grade value ledger, and marketplace-native delivery across your stack.
                </p>

                <form className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-white/90">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      className="mt-1.5 bg-white/5 border-white/15 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white/90">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className="mt-1.5 bg-white/5 border-white/15 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-white/90">Company</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Acme Corp"
                      className="mt-1.5 bg-white/5 border-white/15 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white/90">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your needs..."
                      rows={5}
                      className="mt-1.5 bg-white/5 border-white/15 text-white placeholder:text-white/40"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-white/90 font-medium"
                  >
                    Request Demo
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="k-panel p-8">
                <h3 className="text-xl font-semibold mb-3">Enterprise Sales</h3>
                <p className="text-white/70 text-sm mb-4">
                  For enterprise deployments, cost optimization programs, and agentic transformation pathways.
                </p>
                <a href="mailto:enterprise@kincaidiq.com" className="text-blue-400 hover:text-blue-300 text-sm">
                  enterprise@kincaidiq.com
                </a>
              </div>

              <div className="k-panel p-8">
                <h3 className="text-xl font-semibold mb-3">Investor Relations</h3>
                <p className="text-white/70 text-sm mb-4">
                  For capital markets professionals, family offices, and investment firms seeking portfolio verification.
                </p>
                <a href="mailto:investors@kincaidiq.com" className="text-blue-400 hover:text-blue-300 text-sm">
                  investors@kincaidiq.com
                </a>
              </div>

              <div className="k-panel p-8">
                <h3 className="text-xl font-semibold mb-3">Security & Compliance</h3>
                <p className="text-white/70 text-sm mb-4">
                  For security inquiries, compliance documentation, and governance questions.
                </p>
                <a href="mailto:security@kincaidiq.com" className="text-blue-400 hover:text-blue-300 text-sm">
                  security@kincaidiq.com
                </a>
              </div>

              <div className="k-panel p-8">
                <h3 className="text-xl font-semibold mb-3">General Inquiries</h3>
                <p className="text-white/70 text-sm mb-4">
                  For all other questions, partnership opportunities, and general information.
                </p>
                <a href="mailto:info@kincaidiq.com" className="text-blue-400 hover:text-blue-300 text-sm">
                  info@kincaidiq.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}