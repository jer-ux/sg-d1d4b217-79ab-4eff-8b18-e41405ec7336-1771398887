-- Shady Broker Index schema
-- Product: A broker transparency scoring system based on DOL Form 5500 Schedule A data
-- Score range: 0-100 (higher = shadier)
-- Grade mapping: A (0-20), B (21-40), C (41-60), D (61-80), F (81-100), INSUFFICIENT EVIDENCE

-- Entity types
CREATE TYPE entity_type AS ENUM ('broker', 'consultant', 'pbm', 'tpa');

-- Grade tiers
CREATE TYPE grade_tier AS ENUM ('A', 'B', 'C', 'D', 'F', 'INSUFFICIENT');

-- Epistemic tiers
CREATE TYPE epistemic_tier AS ENUM ('CERTIFIED', 'MODELED', 'INSUFFICIENT_EVIDENCE');

-- Brokers / Entities table
CREATE TABLE brokers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type entity_type NOT NULL,
  shady_score INTEGER CHECK (shady_score >= 0 AND shady_score <= 100),
  grade grade_tier NOT NULL,
  hq_region TEXT,
  industries_served TEXT[],
  client_count INTEGER DEFAULT 0,
  summary_finding TEXT NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_brokers_score ON brokers(shady_score DESC NULLS LAST);
CREATE INDEX idx_brokers_grade ON brokers(grade);
CREATE INDEX idx_brokers_type ON brokers(type);
CREATE INDEX idx_brokers_name ON brokers(name);

-- Filings (Schedule A evidence)
CREATE TABLE filings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id UUID REFERENCES brokers(id) ON DELETE CASCADE,
  plan_sponsor TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  plan_ein TEXT,
  plan_year INTEGER NOT NULL,
  schedule_a_line TEXT NOT NULL,
  disclosed_amount DECIMAL(12,2),
  hidden_amount DECIMAL(12,2),
  conflict_type TEXT,
  source_url TEXT NOT NULL,
  filing_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_filings_broker ON filings(broker_id);
CREATE INDEX idx_filings_year ON filings(plan_year DESC);

-- Scoring components (the five bars)
CREATE TABLE scoring_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id UUID REFERENCES brokers(id) ON DELETE CASCADE,
  component_name TEXT NOT NULL,
  component_score INTEGER CHECK (component_score >= 0 AND component_score <= 100),
  weight DECIMAL(3,2) NOT NULL,
  epistemic_tier epistemic_tier NOT NULL,
  evidence_count INTEGER DEFAULT 0,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(broker_id, component_name)
);

CREATE INDEX idx_components_broker ON scoring_components(broker_id);

-- Lookups (lead capture from Score My Broker flow)
CREATE TABLE lookups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  ein TEXT,
  broker_name TEXT NOT NULL,
  plan_name TEXT,
  broker_id UUID REFERENCES brokers(id),
  preliminary_grade TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders (report purchases and consult bookings)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lookup_id UUID REFERENCES lookups(id),
  email TEXT NOT NULL,
  product TEXT DEFAULT 'forensic_report',
  amount NUMERIC DEFAULT 4500,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'consult_booked')),
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lookups_email ON lookups(visitor_email);
CREATE INDEX idx_lookups_broker ON lookups(broker_id);
CREATE INDEX idx_orders_lookup ON orders(lookup_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Consultations (booked instead of paid report)
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lookup_id UUID REFERENCES lookups(id),
  visitor_email TEXT NOT NULL,
  visitor_name TEXT,
  company_name TEXT NOT NULL,
  broker_name TEXT NOT NULL,
  calendly_event_id TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_consultations_email ON consultations(visitor_email);

-- RLS Policies
ALTER TABLE brokers ENABLE ROW LEVEL SECURITY;
ALTER TABLE filings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scoring_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE lookups ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Public read on brokers, filings, scoring_components (for SEO and Index)
CREATE POLICY "public_read_brokers" ON brokers FOR SELECT USING (true);
CREATE POLICY "public_read_filings" ON filings FOR SELECT USING (true);
CREATE POLICY "public_read_components" ON scoring_components FOR SELECT USING (true);

-- Lookups: insert for anyone, select only own
CREATE POLICY "anon_insert_lookups" ON lookups FOR INSERT WITH CHECK (true);
CREATE POLICY "select_own_lookups" ON lookups FOR SELECT USING (auth.uid() IS NOT NULL);

-- Orders: insert for anyone, select only own
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "select_own_orders" ON orders FOR SELECT USING (email = auth.email());

-- Consultations: insert for anyone, select only own
CREATE POLICY "anon_insert_consultations" ON consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "select_own_consultations" ON consultations FOR SELECT USING (visitor_email = auth.email());