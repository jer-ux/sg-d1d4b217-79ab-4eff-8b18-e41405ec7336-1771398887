import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

// SEO elements that can be used in _document.tsx (returns JSX without Head wrapper)
export function SEOElements({
  title = "SiriusB iQ AI Data Sciences Lab | Enterprise Fiduciary Intelligence Platform",
  description = "Transform benefits intelligence with algorithmic fiduciary governance. Real-time EBITDA impact tracking, AI-powered contract analysis, actuarial precision, and cryptographic audit trails. Trusted by Fortune 500 enterprises for healthcare cost optimization and compliance excellence.",
  image = "/og-image.png",
  url = "https://kincaidiq.ai",
}: SEOProps) {
  const siteName = "SiriusB iQ AI Data Sciences Lab";
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={url} />
      
      {/* Core SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="SiriusB iQ AI Data Sciences Lab" />
      <meta name="publisher" content="SiriusB iQ AI Data Sciences Lab" />
      <meta name="keywords" content="AI benefits platform, fiduciary governance, PBM contract analysis, healthcare cost optimization, EBITDA impact tracking, actuarial intelligence, contract compliance, enterprise benefits, algorithmic governance, verified savings" />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SiriusBiQ" />
      <meta name="twitter:creator" content="@SiriusBiQ" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#0F172A" />
      <meta name="msapplication-TileColor" content="#0F172A" />
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "url": url,
          "logo": `${url}/og-image.png`,
          "description": description,
          "sameAs": [
            "https://www.linkedin.com/company/siriusb-iq"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Sales",
            "email": "info@kincaidiq.ai"
          }
        })
      }} />
      
      {/* Structured Data - WebSite */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteName,
          "url": url,
          "description": description,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })
      }} />
    </>
  );
}

// SEO component for use in pages/_app.tsx or individual pages (uses next/head)
// Note: Flattened structure (no fragment) for better Next.js Head compatibility during hot reload
export function SEO({
  title = "SiriusB iQ AI Data Sciences Lab | Enterprise Fiduciary Intelligence Platform",
  description = "Transform benefits intelligence with algorithmic fiduciary governance. Real-time EBITDA impact tracking, AI-powered contract analysis, actuarial precision, and cryptographic audit trails. Trusted by Fortune 500 enterprises for healthcare cost optimization and compliance excellence.",
  image = "/og-image.png",
  url = "https://kincaidiq.ai"
}: SEOProps) {
  const siteName = "SiriusB iQ AI Data Sciences Lab";
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={url} />
      
      {/* Core SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="SiriusB iQ AI Data Sciences Lab" />
      <meta name="publisher" content="SiriusB iQ AI Data Sciences Lab" />
      <meta name="keywords" content="AI benefits platform, fiduciary governance, PBM contract analysis, healthcare cost optimization, EBITDA impact tracking, actuarial intelligence, contract compliance, enterprise benefits, algorithmic governance, verified savings" />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SiriusBiQ" />
      <meta name="twitter:creator" content="@SiriusBiQ" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#0F172A" />
      <meta name="msapplication-TileColor" content="#0F172A" />
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  );
}