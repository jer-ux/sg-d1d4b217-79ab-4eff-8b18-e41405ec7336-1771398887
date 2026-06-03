import type { NextApiRequest, NextApiResponse } from 'next';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = 'https://kincaidiq.ai';
  const currentDate = new Date().toISOString().split('T')[0];

  // Define all static pages with their SEO priorities
  const staticPages: SitemapUrl[] = [
    // High priority pages (homepage, main features)
    { loc: `${baseUrl}/`, lastmod: currentDate, changefreq: 'daily', priority: 1.0 },
    { loc: `${baseUrl}/platform`, lastmod: currentDate, changefreq: 'weekly', priority: 0.9 },
    { loc: `${baseUrl}/investor`, lastmod: currentDate, changefreq: 'monthly', priority: 0.9 },
    { loc: `${baseUrl}/about`, lastmod: currentDate, changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/company`, lastmod: currentDate, changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/board-of-directors`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 },
    
    // Platform pages
    { loc: `${baseUrl}/platform-overview`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/platform-why`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/executive-command-center`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/executive-war-room`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    
    // Solutions pages
    { loc: `${baseUrl}/solutions/ai-transformation`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/solutions/contract-xray`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/solutions/ebitda-defense`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/solutions/rx-defense`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/solutions/nadac-benchmarking`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/claims-analytics`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/health-benefits`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/loss-ratio-analysis`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/member-management`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/performance-metrics`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/policy-compliance`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/premium-calculation`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/risk-assessment`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/actuarial-benefits`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/ai-automation`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/cost-optimization`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/fiduciary-governance`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/quality-assurance`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/solutions/soc2-certification`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    
    // Core features
    { loc: `${baseUrl}/contract-intelligence`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/contract-xray-offering`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/verified-savings-ledger`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/ebitda-governance`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/evidence-receipts`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    
    // AI & Agentic features
    { loc: `${baseUrl}/agentic-workflow`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/agentic-transformation`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/agentic-policy`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { loc: `${baseUrl}/gen-ai-agents`, lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    
    // Specialized offerings
    { loc: `${baseUrl}/family-offices`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 },
    { loc: `${baseUrl}/family-offices/ma`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    { loc: `${baseUrl}/family-offices/venture-capital`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    { loc: `${baseUrl}/ma-vc-pe`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 },
    { loc: `${baseUrl}/capital-markets`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    { loc: `${baseUrl}/capital-library`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    
    // Enterprise features
    { loc: `${baseUrl}/enterprise/dashboard`, lastmod: currentDate, changefreq: 'weekly', priority: 0.6 },
    { loc: `${baseUrl}/enterprise/compliance-center`, lastmod: currentDate, changefreq: 'weekly', priority: 0.6 },
    { loc: `${baseUrl}/enterprise/marketplace`, lastmod: currentDate, changefreq: 'weekly', priority: 0.6 },
    { loc: `${baseUrl}/enterprise/professional-services`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    { loc: `${baseUrl}/enterprise/strategy-consulting`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    { loc: `${baseUrl}/enterprise/volume-calculator`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    
    // Resources & Info
    { loc: `${baseUrl}/case-studies`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    { loc: `${baseUrl}/docs`, lastmod: currentDate, changefreq: 'weekly', priority: 0.6 },
    { loc: `${baseUrl}/compliance`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    { loc: `${baseUrl}/security-governance`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    { loc: `${baseUrl}/marketplace`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 },
    { loc: `${baseUrl}/proof-library`, lastmod: currentDate, changefreq: 'weekly', priority: 0.6 },
    
    // Contact & Demo
    { loc: `${baseUrl}/request-demo`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/contact`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 },
    
    // War Room demos
    { loc: `${baseUrl}/war-room-v2`, lastmod: currentDate, changefreq: 'weekly', priority: 0.6 },
    { loc: `${baseUrl}/war-room/demo/claims-efficiency`, lastmod: currentDate, changefreq: 'monthly', priority: 0.5 },
    { loc: `${baseUrl}/war-room/demo/contract-leakage`, lastmod: currentDate, changefreq: 'monthly', priority: 0.5 },
    { loc: `${baseUrl}/war-room/demo/ebitda-impact`, lastmod: currentDate, changefreq: 'monthly', priority: 0.5 },
    { loc: `${baseUrl}/war-room/demo/vendor-performance`, lastmod: currentDate, changefreq: 'monthly', priority: 0.5 },
    
    // Tools & Utilities
    { loc: `${baseUrl}/kincaid-iq`, lastmod: currentDate, changefreq: 'weekly', priority: 0.6 },
    { loc: `${baseUrl}/ledger`, lastmod: currentDate, changefreq: 'weekly', priority: 0.6 },
    { loc: `${baseUrl}/databank-manager`, lastmod: currentDate, changefreq: 'monthly', priority: 0.5 },
    { loc: `${baseUrl}/arbitrage-events`, lastmod: currentDate, changefreq: 'weekly', priority: 0.5 },
    { loc: `${baseUrl}/contract-comparison`, lastmod: currentDate, changefreq: 'monthly', priority: 0.5 },
  ];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticPages.map(page => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Set appropriate headers
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.status(200).send(sitemap);
}