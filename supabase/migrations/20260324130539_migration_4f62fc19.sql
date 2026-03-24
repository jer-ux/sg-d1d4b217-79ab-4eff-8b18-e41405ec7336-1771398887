-- Fix contract_uploads: Remove ALL policies with organization_members references
DROP POLICY IF EXISTS "Users can upload contracts to their org" ON contract_uploads;
DROP POLICY IF EXISTS "Users can view their org contracts" ON contract_uploads;

-- Keep only the simple demo org policies
-- (These policies already exist, so this will just ensure they're the only ones)

-- Fix contract_analysis_results: Remove policy with organization_members reference
DROP POLICY IF EXISTS "Users can view their org analysis results" ON contract_analysis_results;

-- Fix contract_provision_analysis: Remove policy with organization_members reference
DROP POLICY IF EXISTS "Users can view provision analysis" ON contract_provision_analysis;

-- Fix contract_insights: Remove policy with organization_members reference
DROP POLICY IF EXISTS "Users can view contract insights" ON contract_insights;

-- Fix contract_recommendations: Simplify the policy
DROP POLICY IF EXISTS "Users can view recommendations" ON contract_recommendations;
CREATE POLICY "Users can view recommendations"
ON contract_recommendations
FOR SELECT
TO public
USING (true);

-- Fix contract_benchmarks: Simplify the policy
DROP POLICY IF EXISTS "Users can view benchmarks" ON contract_benchmarks;
CREATE POLICY "Users can view benchmarks"
ON contract_benchmarks
FOR SELECT
TO public
USING (true);