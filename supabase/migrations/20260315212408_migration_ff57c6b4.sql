-- Create orders table for tracking RX Defense Board Report purchases
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  
  -- Customer Info
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  customer_company text,
  customer_job_title text,
  customer_phone text,
  
  -- Order Details
  product_name text NOT NULL DEFAULT 'RX Defense Board Report',
  amount_paid numeric(10,2) NOT NULL DEFAULT 199.00,
  currency text NOT NULL DEFAULT 'USD',
  payment_status text NOT NULL DEFAULT 'pending',
  
  -- Contract Upload
  contract_uploaded boolean DEFAULT false,
  contract_file_name text,
  contract_file_url text,
  contract_upload_date timestamp with time zone,
  
  -- Report Status
  report_status text NOT NULL DEFAULT 'awaiting_contract',
  report_url text,
  report_generated_date timestamp with time zone,
  
  -- Metadata
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT orders_payment_status_check CHECK (
    payment_status IN ('pending', 'succeeded', 'failed', 'refunded')
  ),
  CONSTRAINT orders_report_status_check CHECK (
    report_status IN ('awaiting_contract', 'processing', 'analyzing', 'completed', 'delivered')
  )
);

-- Create indexes for performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_stripe_session_id ON orders(stripe_session_id);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_report_status ON orders(report_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
  ON orders FOR UPDATE
  USING (auth.uid() = user_id);

-- Create report_deliverables table for tracking individual reports
CREATE TABLE IF NOT EXISTS report_deliverables (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  
  -- Report Components
  deliverable_type text NOT NULL,
  deliverable_name text NOT NULL,
  file_url text,
  file_size bigint,
  
  -- Status
  status text NOT NULL DEFAULT 'pending',
  generated_at timestamp with time zone,
  
  -- Metadata
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT report_deliverables_type_check CHECK (
    deliverable_type IN (
      'quick_look',
      'executive_scorecard', 
      'negotiation_guide',
      'board_summary',
      'full_analysis',
      'clause_explorer',
      'risk_dashboard',
      'comparison_report'
    )
  ),
  CONSTRAINT report_deliverables_status_check CHECK (
    status IN ('pending', 'generating', 'completed', 'failed')
  )
);

-- Create indexes
CREATE INDEX idx_deliverables_order_id ON report_deliverables(order_id);
CREATE INDEX idx_deliverables_type ON report_deliverables(deliverable_type);
CREATE INDEX idx_deliverables_status ON report_deliverables(status);

-- Enable RLS
ALTER TABLE report_deliverables ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own report deliverables"
  ON report_deliverables FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = report_deliverables.order_id 
      AND orders.user_id = auth.uid()
    )
  );

COMMENT ON TABLE orders IS 'Tracks RX Defense Board Report purchases and contract uploads';
COMMENT ON TABLE report_deliverables IS 'Individual report components and deliverables for each order';