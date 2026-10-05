/*
# AI Search Visibility Schema — Initial Setup

1. Overview
This schema powers a dental practice's AI search visibility dashboard. Each signed-in
user owns a client record (their practice). Under it we track: the AI search queries
being monitored, per-query mention results across multiple AI platforms, competitors,
and monthly visibility snapshots for trend reporting.

2. New Tables
- `clients` — the practice profile (name, city, website, plan tier). Owned by the
  authenticated user via `user_id`.
- `tracked_queries` — individual AI search questions monitored for a client
  (e.g. "best dentist in Austin for implants").
- `visibility_checks` — a single check result: did the client (or a competitor) get
  mentioned for a given query on a given AI platform on a given date?
- `competitors` — competitor practices tracked alongside the client.
- `monthly_snapshots` — monthly aggregate visibility score per client, used for trend
  charts and the monthly report.

3. Relationships
- tracked_queries → clients (FK, cascade delete)
- visibility_checks → tracked_queries (FK, cascade delete)
- visibility_checks → clients (FK, cascade delete)
- competitors → clients (FK, cascade delete)
- monthly_snapshots → clients (FK, cascade delete)

4. Security
- RLS enabled on every table.
- All policies are owner-scoped via `auth.uid() = clients.user_id`, either directly
  (clients) or through an EXISTS subquery checking parent ownership (child tables).
- `user_id` on clients defaults to `auth.uid()` so inserts that omit it succeed.
- All policies scoped to `authenticated` only — the app requires sign-in.

5. Indexes
- Indexes on foreign keys and commonly filtered columns for query performance.
*/

-- ============================================================
-- clients
-- ============================================================
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  practice_name text NOT NULL,
  city text NOT NULL,
  state text NOT NULL DEFAULT 'TX',
  website text,
  plan text NOT NULL DEFAULT 'audit',
  overall_score integer NOT NULL DEFAULT 0,
  mention_rate integer NOT NULL DEFAULT 0,
  citation_rate integer NOT NULL DEFAULT 0,
  queries_tracked integer NOT NULL DEFAULT 0,
  queries_mentioned integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_clients" ON clients;
CREATE POLICY "select_own_clients" ON clients FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_clients" ON clients;
CREATE POLICY "insert_own_clients" ON clients FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_clients" ON clients;
CREATE POLICY "update_own_clients" ON clients FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_clients" ON clients;
CREATE POLICY "delete_own_clients" ON clients FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ============================================================
-- tracked_queries
-- ============================================================
CREATE TABLE IF NOT EXISTS tracked_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  query_text text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  mentioned boolean NOT NULL DEFAULT false,
  mention_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tracked_queries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_tracked_queries" ON tracked_queries;
CREATE POLICY "select_own_tracked_queries" ON tracked_queries FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = tracked_queries.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "insert_own_tracked_queries" ON tracked_queries;
CREATE POLICY "insert_own_tracked_queries" ON tracked_queries FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM clients WHERE clients.id = tracked_queries.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "update_own_tracked_queries" ON tracked_queries;
CREATE POLICY "update_own_tracked_queries" ON tracked_queries FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = tracked_queries.client_id AND clients.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM clients WHERE clients.id = tracked_queries.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "delete_own_tracked_queries" ON tracked_queries;
CREATE POLICY "delete_own_tracked_queries" ON tracked_queries FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = tracked_queries.client_id AND clients.user_id = auth.uid()));

-- ============================================================
-- competitors
-- ============================================================
CREATE TABLE IF NOT EXISTS competitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  overall_score integer NOT NULL DEFAULT 0,
  mention_rate integer NOT NULL DEFAULT 0,
  is_client boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_competitors" ON competitors;
CREATE POLICY "select_own_competitors" ON competitors FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = competitors.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "insert_own_competitors" ON competitors;
CREATE POLICY "insert_own_competitors" ON competitors FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM clients WHERE clients.id = competitors.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "update_own_competitors" ON competitors;
CREATE POLICY "update_own_competitors" ON competitors FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = competitors.client_id AND clients.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM clients WHERE clients.id = competitors.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "delete_own_competitors" ON competitors;
CREATE POLICY "delete_own_competitors" ON competitors FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = competitors.client_id AND clients.user_id = auth.uid()));

-- ============================================================
-- visibility_checks
-- ============================================================
CREATE TABLE IF NOT EXISTS visibility_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  query_id uuid REFERENCES tracked_queries(id) ON DELETE CASCADE,
  platform text NOT NULL,
  mentioned boolean NOT NULL DEFAULT false,
  cited boolean NOT NULL DEFAULT false,
  checked_at timestamptz DEFAULT now()
);

ALTER TABLE visibility_checks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_visibility_checks" ON visibility_checks;
CREATE POLICY "select_own_visibility_checks" ON visibility_checks FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = visibility_checks.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "insert_own_visibility_checks" ON visibility_checks;
CREATE POLICY "insert_own_visibility_checks" ON visibility_checks FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM clients WHERE clients.id = visibility_checks.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "update_own_visibility_checks" ON visibility_checks;
CREATE POLICY "update_own_visibility_checks" ON visibility_checks FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = visibility_checks.client_id AND clients.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM clients WHERE clients.id = visibility_checks.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "delete_own_visibility_checks" ON visibility_checks;
CREATE POLICY "delete_own_visibility_checks" ON visibility_checks FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = visibility_checks.client_id AND clients.user_id = auth.uid()));

-- ============================================================
-- monthly_snapshots
-- ============================================================
CREATE TABLE IF NOT EXISTS monthly_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  month_date date NOT NULL,
  visibility_score integer NOT NULL DEFAULT 0,
  mention_rate integer NOT NULL DEFAULT 0,
  citation_rate integer NOT NULL DEFAULT 0,
  queries_tracked integer NOT NULL DEFAULT 0,
  queries_mentioned integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE monthly_snapshots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_monthly_snapshots" ON monthly_snapshots;
CREATE POLICY "select_own_monthly_snapshots" ON monthly_snapshots FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = monthly_snapshots.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "insert_own_monthly_snapshots" ON monthly_snapshots;
CREATE POLICY "insert_own_monthly_snapshots" ON monthly_snapshots FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM clients WHERE clients.id = monthly_snapshots.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "update_own_monthly_snapshots" ON monthly_snapshots;
CREATE POLICY "update_own_monthly_snapshots" ON monthly_snapshots FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = monthly_snapshots.client_id AND clients.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM clients WHERE clients.id = monthly_snapshots.client_id AND clients.user_id = auth.uid()));

DROP POLICY IF EXISTS "delete_own_monthly_snapshots" ON monthly_snapshots;
CREATE POLICY "delete_own_monthly_snapshots" ON monthly_snapshots FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM clients WHERE clients.id = monthly_snapshots.client_id AND clients.user_id = auth.uid()));

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_tracked_queries_client_id ON tracked_queries(client_id);
CREATE INDEX IF NOT EXISTS idx_competitors_client_id ON competitors(client_id);
CREATE INDEX IF NOT EXISTS idx_visibility_checks_client_id ON visibility_checks(client_id);
CREATE INDEX IF NOT EXISTS idx_visibility_checks_query_id ON visibility_checks(query_id);
CREATE INDEX IF NOT EXISTS idx_monthly_snapshots_client_id ON monthly_snapshots(client_id);
