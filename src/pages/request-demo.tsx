import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function RequestDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual form submission
    console.log("Demo request:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-md text-center">
            <div className="text-xs tracking-[0.2em] text-white/50">
              REQUEST RECEIVED
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-white/95">
              We'll be in touch shortly.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Our team will reach out within 24 hours to schedule your personalized demo.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-md">
          <div className="text-xs tracking-[0.2em] text-white/50">
            REQUEST DEMO
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-white/95">
            See Kincaid IQ in action.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Get a personalized walkthrough of the War Room, Evidence Receipts, and Truth Governance
            framework—tailored to your organization's needs.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-white/80">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/20 focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-white/80">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/20 focus:outline-none"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm text-white/80">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                value={formData.company}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/20 focus:outline-none"
                placeholder="Company name"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm text-white/80">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-white/20 focus:outline-none"
              >
                <option value="">Select role</option>
                <option value="cfo">CFO / Finance Executive</option>
                <option value="benefits">Benefits / HR Executive</option>
                <option value="operations">Operations Executive</option>
                <option value="boardmember">Board Member</option>
                <option value="consultant">Consultant / Advisor</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-white/80">
                Message (optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/20 focus:outline-none"
                placeholder="Tell us about your use case..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15"
            >
              Request demo →
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}