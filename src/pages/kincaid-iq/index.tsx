import Head from "next/head";
import Link from "next/link";
import { TrendingDown, AlertTriangle, Shield, TrendingUp, CheckCircle, LineChart, Users } from "lucide-react";
import { FAQ } from "@/components/kincaid-iq/FAQ";
import { WarRoomPreview } from "@/components/kincaid-iq/WarRoomPreview";

export default function KincaidIQHome() {
  return (
    <>
      <Head>
        <title>Kincaid IQ | War Room - Recover Hidden EBITDA from Pharmacy Benefit Structures</title>
        <meta
          name="description"
          content="Kincaid IQ instruments PBM economics and healthcare cost exposure — transforming opaque claims flows into measurable capital governance."
        />
      </Head>

      <style jsx global>{`
        :root {
          --bg: #0f141a;
          --card: #161c23;
          --accent: #00c2ff;
          --text: #f4f6f9;
          --muted: #9aa4b2;
          --border: #1f2933;
        }

        .kincaid-page * {
          box-sizing: border-box;
        }

        .kincaid-page {
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.6;
          min-height: 100vh;
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: auto;
          padding: 80px 0;
        }

        .container.narrow {
          max-width: 800px;
          text-align: center;
        }

        .nav {
          background: #0b1016;
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          width: 90%;
          max-width: 1200px;
          margin: auto;
        }

        .logo {
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 1px;
        }

        .hero h1 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .hero p {
          color: var(--muted);
          font-size: 18px;
          margin-bottom: 30px;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: var(--accent);
          color: #000;
          padding: 14px 28px;
          text-decoration: none;
          font-weight: 600;
          border-radius: 6px;
          transition: 0.3s ease;
          display: inline-block;
        }

        .btn-primary:hover {
          opacity: 0.85;
        }

        .btn-secondary {
          border: 1px solid var(--accent);
          color: var(--accent);
          padding: 14px 28px;
          text-decoration: none;
          font-weight: 600;
          border-radius: 6px;
          display: inline-block;
          background: transparent;
          transition: 0.3s ease;
        }

        .btn-secondary:hover {
          background: rgba(0, 194, 255, 0.1);
        }

        .btn-outline {
          border: 1px solid var(--accent);
          padding: 8px 18px;
          color: var(--accent);
          text-decoration: none;
          border-radius: 4px;
          display: inline-block;
        }

        .proof-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .proof-card {
          background: var(--card);
          padding: 30px;
          border-radius: 8px;
          border: 1px solid var(--border);
          text-align: center;
        }

        .proof-card h3 {
          font-size: 32px;
          color: var(--accent);
          margin-bottom: 10px;
        }

        .proof-card p {
          color: var(--muted);
        }

        .warroom h2,
        .how h2,
        .differentiation h2,
        .whois h2,
        .cta h2 {
          margin-bottom: 30px;
          font-size: 32px;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .tile {
          background: var(--card);
          padding: 30px;
          border-radius: 8px;
          border: 1px solid var(--border);
          transition: 0.3s ease;
        }

        .tile:hover {
          border-color: var(--accent);
        }

        .tile-icon {
          margin-bottom: 20px;
        }

        .tile h4 {
          margin-bottom: 10px;
        }

        .tile p {
          color: var(--muted);
          font-size: 14px;
        }

        .steps {
          text-align: left;
          margin-top: 30px;
        }

        .step {
          margin-bottom: 15px;
          font-weight: 500;
          padding: 20px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 8px;
        }

        .step span {
          color: var(--accent);
          margin-right: 10px;
        }

        .step p {
          color: var(--muted);
          margin-top: 10px;
        }

        .differentiation {
          background: #0c1218;
        }

        .differentiation p {
          color: var(--muted);
          margin-bottom: 15px;
        }

        .check-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .check-item {
          display: flex;
          align-items: start;
          gap: 12px;
          padding: 20px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 8px;
        }

        .check-item h5 {
          font-weight: 600;
          margin-bottom: 5px;
        }

        .check-item p {
          color: var(--muted);
          font-size: 14px;
        }

        .who-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .who-card {
          background: var(--card);
          padding: 40px;
          border: 1px solid var(--border);
          border-radius: 8px;
          transition: 0.3s ease;
          text-decoration: none;
          display: block;
          color: var(--text);
        }

        .who-card:hover {
          border-color: var(--accent);
          transform: translateY(-5px);
        }

        .who-card h4 {
          font-size: 22px;
          margin: 20px 0 15px;
        }

        .who-card p {
          color: var(--muted);
        }

        .cta {
          background: #0c1218;
          padding-bottom: 100px;
        }

        .cta-card {
          background: var(--card);
          padding: 60px 40px;
          border: 1px solid var(--accent);
          border-radius: 12px;
          text-align: center;
          max-width: 900px;
          margin: auto;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 30px;
          flex-wrap: wrap;
        }

        footer {
          border-top: 1px solid var(--border);
          padding: 20px 0;
          text-align: center;
          color: var(--muted);
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 36px;
          }
          .grid-4, .proof-grid, .who-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="kincaid-page">
        <header className="nav">
          <div className="nav-inner">
            <div className="logo">Kincaid IQ</div>
            <a href="#cta" className="btn-outline">Request Executive Briefing</a>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="container narrow">
              <h1>Recover Hidden EBITDA from Pharmacy Benefit Structures</h1>
              <p>
                Kincaid IQ instruments PBM economics and healthcare cost exposure — transforming opaque claims flows into measurable capital governance.
              </p>
              <div className="hero-buttons">
                <a href="#cta" className="btn-primary">Enter the War Room</a>
                <a href="#how" className="btn-secondary">How It Works</a>
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <div className="proof-grid">
                <div className="proof-card">
                  <h3>3–8%</h3>
                  <p>Average EBITDA exposure identified in pharmacy benefit structures</p>
                </div>
                <div className="proof-card">
                  <h3>48 Hours</h3>
                  <p>GLP-1 exposure modeling turnaround</p>
                </div>
                <div className="proof-card">
                  <h3>Board-Level</h3>
                  <p>Decision interface built for CFOs and institutional investors</p>
                </div>
              </div>
            </div>
          </section>

          <section className="warroom">
            <div className="container">
              <h2>The Executive War Room Interface</h2>
              <div className="grid-4">
                <div className="tile">
                  <div className="tile-icon">
                    <TrendingDown size={48} color="var(--accent)" />
                  </div>
                  <h4>Verified Margin Leakage</h4>
                  <p>Quantified financial impact from spread pricing and rebate retention.</p>
                </div>
                <div className="tile">
                  <div className="tile-icon">
                    <AlertTriangle size={48} color="var(--accent)" />
                  </div>
                  <h4>Arbitrage Exposure</h4>
                  <p>Identification of economic differentials across drugs and formularies.</p>
                </div>
                <div className="tile">
                  <div className="tile-icon">
                    <Shield size={48} color="var(--accent)" />
                  </div>
                  <h4>Incentive Misalignment</h4>
                  <p>Visualization of contractual divergence from employer cost minimization.</p>
                </div>
                <div className="tile">
                  <div className="tile-icon">
                    <TrendingUp size={48} color="var(--accent)" />
                  </div>
                  <h4>EBITDA Recovery Pathways</h4>
                  <p>Strategic governance actions tied directly to renewal leverage.</p>
                </div>
              </div>

              <div style={{ marginTop: "40px" }}>
                <WarRoomPreview />
              </div>

              <p style={{ marginTop: "20px", textAlign: "center", color: "var(--muted)", fontSize: "14px" }}>
                Executive dashboard preview.{" "}
                <Link href="/war-room" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                  Full War Room platform
                </Link>
                {" "}includes drill-down analytics, evidence trails, and exportable proof packs.
              </p>
            </div>
          </section>

          <section id="how" className="how">
            <div className="container">
              <h2>How It Works</h2>
              <div className="steps">
                <div className="step">
                  <span>01</span>
                  <strong>Secure Claims & Contract Ingestion</strong>
                  <p>Encrypted data ingestion with cryptographic receipts and immutable audit trails.</p>
                </div>
                <div className="step">
                  <span>02</span>
                  <strong>Arbitrage Reconstruction & Economic Modeling</strong>
                  <p>Advanced algorithms identify pricing differentials and structural inefficiencies.</p>
                </div>
                <div className="step">
                  <span>03</span>
                  <strong>Margin Quantification & Risk Mapping</strong>
                  <p>Precise EBITDA impact calculation with risk-adjusted scenarios.</p>
                </div>
                <div className="step">
                  <span>04</span>
                  <strong>Executive Briefing & Renewal Strategy</strong>
                  <p>Board-ready presentations with actionable recommendations and quantified leverage points.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="differentiation">
            <div className="container narrow">
              <h2>Beyond Traditional Advisory</h2>
              <p>Traditional firms review contracts annually.</p>
              <p><strong>Kincaid IQ instruments PBM economics continuously.</strong></p>
              <p>We do not negotiate in the dark.</p>
              <p><strong>We restore price signals before renewal cycles begin.</strong></p>

              <div className="check-grid">
                <div className="check-item">
                  <CheckCircle size={24} color="#10b981" style={{ flexShrink: 0 }} />
                  <div>
                    <h5>Continuous Monitoring</h5>
                    <p>Real-time analytics, not annual reviews</p>
                  </div>
                </div>
                <div className="check-item">
                  <CheckCircle size={24} color="#10b981" style={{ flexShrink: 0 }} />
                  <div>
                    <h5>Evidence-Based</h5>
                    <p>Cryptographic receipts for every metric</p>
                  </div>
                </div>
                <div className="check-item">
                  <CheckCircle size={24} color="#10b981" style={{ flexShrink: 0 }} />
                  <div>
                    <h5>Board-Ready</h5>
                    <p>Institutional-grade reporting</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="whois">
            <div className="container">
              <h2>Who It's For</h2>
              <div className="who-grid">
                <Link href="/capital-markets" className="who-card">
                  <LineChart size={48} color="var(--accent)" />
                  <h4>CFOs & Finance Leaders</h4>
                  <p>
                    Replace opacity with fiduciary-grade precision. Show EBITDA drag with receipts, defend budgets with
                    cryptographic evidence, and quantify the impact of every benefits decision.
                  </p>
                </Link>
                <Link href="/actuarial-benefits" className="who-card">
                  <Users size={48} color="var(--accent)" />
                  <h4>HR & Benefits Leaders</h4>
                  <p>
                    Move from reactive reporting to strategic control with evidence receipts. Get real-time visibility into
                    plan performance with insights backed by cryptographic proof.
                  </p>
                </Link>
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Frequently Asked Questions</h2>
              <FAQ />
            </div>
          </section>

          <section id="cta" className="cta">
            <div className="container">
              <div className="cta-card">
                <h2>Healthcare Expense Above Seven Figures?</h2>
                <p style={{ fontSize: "18px", color: "var(--muted)", marginBottom: "0" }}>
                  Request a confidential War Room briefing before your next renewal cycle.
                </p>
                <div className="cta-buttons">
                  <Link href="/contact" className="btn-primary">Schedule Executive Session</Link>
                  <a href="mailto:jer@kincaidrmc.com" className="btn-secondary">jer@kincaidrmc.com</a>
                  <a href="tel:12192563331" className="btn-secondary">219.256.3331</a>
                </div>
                <p style={{ marginTop: "30px", fontSize: "14px", color: "var(--muted)" }}>
                  Learn more about healthcare governance in our{" "}
                  <Link href="/company" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                    Healthcare Intelligence
                  </Link>
                  {" "}series.
                </p>
              </div>
            </div>
          </section>

          <footer>
            <p>© 2026 Kincaid Risk Management Company. All Rights Reserved.</p>
          </footer>
        </main>
      </div>
    </>
  );
}