-- Intelligence Product Orders Table
CREATE TABLE IF NOT EXISTS public.intelligence_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Product Details
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  product_category TEXT NOT NULL,
  
  -- Customer Information
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_company TEXT,
  customer_phone TEXT,
  
  -- Order Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'payment_processing', 'confirmed', 'delivered', 'cancelled')),
  
  -- Payment Information (store minimal payment metadata only)
  payment_intent_id TEXT,
  payment_status TEXT,
  
  -- Data Requirements (JSON array of what customer will provide)
  required_data JSONB,
  
  -- Notes and Special Requests
  notes TEXT,
  
  -- Delivery Information
  turnaround_days INTEGER,
  expected_delivery_date DATE,
  delivered_at TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB
);

-- Enable RLS
ALTER TABLE public.intelligence_orders ENABLE ROW LEVEL SECURITY;

-- Public insert policy (anyone can create an order)
CREATE POLICY "allow_public_insert" ON public.intelligence_orders
  FOR INSERT
  WITH CHECK (true);

-- Users can view their own orders by email
CREATE POLICY "users_view_own_orders" ON public.intelligence_orders
  FOR SELECT
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Admin full access (when we add admin roles later)
CREATE POLICY "admin_full_access" ON public.intelligence_orders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create index for faster lookups
CREATE INDEX intelligence_orders_customer_email_idx ON public.intelligence_orders(customer_email);
CREATE INDEX intelligence_orders_status_idx ON public.intelligence_orders(status);
CREATE INDEX intelligence_orders_product_id_idx ON public.intelligence_orders(product_id);
CREATE INDEX intelligence_orders_created_at_idx ON public.intelligence_orders(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_intelligence_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER intelligence_orders_updated_at
  BEFORE UPDATE ON public.intelligence_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_intelligence_orders_updated_at();