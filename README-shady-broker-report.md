# The Shady Broker Report - System Documentation

## Overview

The Shady Broker Report is a $4,500 forensic audit offering built on the Kincaid IQ platform. It provides a 24-page board-ready dossier exposing broker compensation opacity and PBM contract leakage.

## Architecture

### Frontend Pages
- `/shady-broker-report` - Main landing page (Stanford design language)
- `/shady-broker-report/intake` - Document upload and engagement form
- `/shady-broker-report/confirmation` - Post-submission confirmation

### API Routes
- `/api/shady-broker-report/create-checkout` - Stripe checkout session creation
- `/api/shady-broker-report/submit-intake` - File upload and engagement creation

### Database
Table: `shady_broker_engagements`
- Stores all engagement data, document URLs, and delivery tracking
- Located in Supabase Postgres

## Environment Variables

Required variables in `.env.local`:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Email (Resend or Postmark)
RESEND_API_KEY=re_...
# OR
POSTMARK_SERVER_TOKEN=...

# Slack (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

## Rotating Credentials

### Stripe Keys
1. Log in to Stripe Dashboard
2. Navigate to Developers → API keys
3. Create new secret key
4. Update `STRIPE_SECRET_KEY` in `.env.local`
5. Restart Next.js server

### Supabase Storage
1. Log in to Supabase Dashboard
2. Navigate to Settings → API
3. Service role key is already configured
4. Storage bucket `documents` must exist with proper RLS policies

### Email Service (Resend)
1. Log in to Resend Dashboard
2. Navigate to API Keys
3. Create new API key
4. Update `RESEND_API_KEY` in `.env.local`

## File Upload Configuration

Files are uploaded to Supabase Storage:
- Bucket: `documents`
- Path: `shady-broker-reports/{EIN}/{timestamp}-{filename}`
- Max file size: 50MB per file
- Accepted format: PDF only
- Virus scanning: Recommended via ClamAV Lambda (not implemented)

## Payment Flow

1. User clicks "Commission the report"
2. Modal opens with engagement summary
3. "Proceed to payment" → Stripe Checkout
4. Payment success → Redirect to `/shady-broker-report/intake?session_id={CHECKOUT_SESSION_ID}`
5. User completes intake form
6. Submit → Database record + File uploads + Email notifications
7. Redirect to `/shady-broker-report/confirmation`

## Email Templates

### Client Confirmation Email
Sent to: `{contact_email}`
From: `jer@kincaidrmc.com`
Subject: "Your Shady Broker Report engagement is confirmed"
Includes: NDA attachment, Calendly link for kickoff call

### Internal Notification Email
Sent to: `jer@kincaidrmc.com`
Subject: "New Shady Broker Report Engagement - {company_name}"
Includes: All form data, file URLs, engagement ID

## Slack Notifications

Optional Slack alert to `#engagements` channel:
```
New Shady Broker Report Engagement
Company: {company_name}
Lives: {lives_covered}
Contact: {contact_name} ({contact_email})
Engagement ID: {id}
View: [Database Link]
```

## Database Schema

```sql
CREATE TABLE shady_broker_engagements (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ,
  company_legal_name TEXT,
  ein TEXT,
  plan_name TEXT,
  lives_covered INTEGER,
  funding_type TEXT,
  current_broker TEXT,
  current_pbm TEXT,
  contact_name TEXT,
  contact_email TEXT,
  form_5500_urls TEXT[],
  schedule_a_urls TEXT[],
  broker_disclosure_url TEXT,
  pbm_contract_url TEXT,
  engagement_state TEXT, -- 'intake' | 'in_progress' | 'delivered'
  payment_status TEXT,   -- 'pending' | 'paid' | 'refunded'
  delivered_at TIMESTAMPTZ,
  delivery_url TEXT
);
```

## Design System

### Colors
- Background: `#FAF8F5` (bone white)
- Text: `#0B1220` (deep ink)
- Accent: `#8C1515` (Stanford cardinal)
- Secondary: `#5B6472` (muted slate)
- Divider: `#EDE6D6` (soft sand)

### Typography
- Display: Source Serif Pro / Spectral (serif, 600 weight)
- Body: Inter / Söhne (sans-serif, 400 weight)
- Mono: JetBrains Mono (for data/labels)

### Layout
- Max width: 1120px
- Section spacing: 120px vertical (desktop), 64px (mobile)
- Grid: 12 columns
- Margins: generous, breathable

## Deployment Checklist

Before deploying to production:

1. Set production Stripe keys
2. Update `NEXT_PUBLIC_BASE_URL` to production domain
3. Run database migration: `supabase db push`
4. Create Supabase Storage bucket: `documents`
5. Configure Supabase RLS policies for `shady_broker_engagements`
6. Set up Resend/Postmark email service
7. Create NDA PDF and place at `/public/shady-broker-report-nda.pdf`
8. Optional: Configure Slack webhook
9. Optional: Set up ClamAV for virus scanning

## Support

Contact: Jeremiah Shrack
Email: jer@kincaidrmc.com
Phone: (317) 362-9840