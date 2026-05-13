// Google Analytics utilities for Next.js
// Supports both GA4 and Google Tag Manager

// Environment variables
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// Check if analytics is enabled
export const isAnalyticsEnabled = () => {
  return typeof window !== 'undefined' && (GA_TRACKING_ID || GTM_ID);
};

// Google Analytics 4 (GA4) page view tracking
export const pageview = (url: string) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Event tracking for GA4
interface GtagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Custom events for SiriusB iQ platform
export const trackEvent = {
  // Navigation events
  navigation: (destination: string) => {
    event({
      action: 'navigate',
      category: 'Navigation',
      label: destination,
    });
  },

  // Lead generation events
  demoRequest: (source: string) => {
    event({
      action: 'demo_request',
      category: 'Lead Generation',
      label: source,
    });
  },

  contactForm: (formType: string) => {
    event({
      action: 'contact_form_submit',
      category: 'Lead Generation',
      label: formType,
    });
  },

  calendlyBooked: (meetingType: string) => {
    event({
      action: 'calendly_booking',
      category: 'Lead Generation',
      label: meetingType,
    });
  },

  // Content engagement
  videoPlay: (videoTitle: string) => {
    event({
      action: 'video_play',
      category: 'Content Engagement',
      label: videoTitle,
    });
  },

  downloadResource: (resourceName: string) => {
    event({
      action: 'resource_download',
      category: 'Content Engagement',
      label: resourceName,
    });
  },

  caseStudyView: (caseStudyTitle: string) => {
    event({
      action: 'case_study_view',
      category: 'Content Engagement',
      label: caseStudyTitle,
    });
  },

  // Product interactions
  warRoomAccess: (lane: string) => {
    event({
      action: 'war_room_access',
      category: 'Product Usage',
      label: lane,
    });
  },

  contractUpload: (contractType: string) => {
    event({
      action: 'contract_upload',
      category: 'Product Usage',
      label: contractType,
    });
  },

  ledgerAction: (actionType: string) => {
    event({
      action: 'ledger_action',
      category: 'Product Usage',
      label: actionType,
    });
  },

  aiCopilotQuery: (queryType: string) => {
    event({
      action: 'ai_copilot_query',
      category: 'Product Usage',
      label: queryType,
    });
  },

  // Feature discovery
  featureClick: (featureName: string) => {
    event({
      action: 'feature_click',
      category: 'Feature Discovery',
      label: featureName,
    });
  },

  solutionPageView: (solutionName: string) => {
    event({
      action: 'solution_page_view',
      category: 'Feature Discovery',
      label: solutionName,
    });
  },

  // Enterprise events
  enterpriseSignup: (planType: string) => {
    event({
      action: 'enterprise_signup',
      category: 'Conversion',
      label: planType,
    });
  },

  pricingCalculator: (calculationType: string) => {
    event({
      action: 'pricing_calculator_use',
      category: 'Product Interest',
      label: calculationType,
    });
  },

  // Search and discovery
  siteSearch: (searchTerm: string) => {
    event({
      action: 'site_search',
      category: 'Search',
      label: searchTerm,
    });
  },

  // Error tracking
  errorOccurred: (errorType: string, errorMessage: string) => {
    event({
      action: 'error',
      category: 'Error Tracking',
      label: `${errorType}: ${errorMessage}`,
    });
  },

  // Social sharing
  socialShare: (platform: string, contentTitle: string) => {
    event({
      action: 'social_share',
      category: 'Social Engagement',
      label: `${platform}: ${contentTitle}`,
    });
  },
};

// Conversion tracking
export const trackConversion = (conversionId: string, value?: number) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', 'conversion', {
    send_to: `${GA_TRACKING_ID}/${conversionId}`,
    value: value,
    currency: 'USD',
  });
};

// Enhanced ecommerce tracking (for future use)
export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: 'USD',
    items: items,
  });
};

// User properties (for segmentation)
export const setUserProperties = (properties: Record<string, any>) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('set', 'user_properties', properties);
};

// Consent mode for privacy compliance (GDPR, CCPA)
export const updateConsent = (granted: boolean) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: granted ? 'granted' : 'denied',
  });
};

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}