import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

// SEO elements that can be used in _document.tsx (returns JSX without Head wrapper)
export function SEOElements({
  title = "Kincaid Health | Enterprise Fiduciary Intelligence Platform",
  description = "Enterprise-grade fiduciary intelligence platform for healthcare benefits analysis and PBM contract forensics. Continuous monitoring, not quarterly reports.",
  image = "/og-image.png",
  url = "https://kincaidhealth.ai",
}: SEOProps): React.ReactElement {
  const siteName = "Kincaid Health";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Kincaid Health" />
      <meta name="publisher" content="Kincaid Health" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={url} />
      
      {/* Core SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
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
            "email": "info@kincaidhealth.ai"
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
  title = "Kincaid Health | Enterprise Fiduciary Intelligence Platform",
  description = "Enterprise-grade fiduciary intelligence platform for healthcare benefits analysis and PBM contract forensics. Continuous monitoring, not quarterly reports.",
  image = "/og-image.png",
  url = "https://kincaidhealth.ai"
}: SEOProps) {
  const siteName = "Kincaid Health";
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={url} />
      
      {/* Core SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Kincaid Health" />
      <meta name="publisher" content="Kincaid Health" />
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