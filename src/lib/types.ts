export type Plan = "audit" | "management" | "growth";

export interface Client {
  id: string;
  user_id: string;
  practice_name: string;
  city: string;
  state: string;
  website: string | null;
  plan: Plan;
  overall_score: number;
  mention_rate: number;
  citation_rate: number;
  queries_tracked: number;
  queries_mentioned: number;
  created_at: string;
}

export interface TrackedQuery {
  id: string;
  client_id: string;
  query_text: string;
  category: string;
  mentioned: boolean;
  mention_count: number;
  created_at: string;
}

export interface Competitor {
  id: string;
  client_id: string;
  name: string;
  overall_score: number;
  mention_rate: number;
  is_client: boolean;
  created_at: string;
}

export interface VisibilityCheck {
  id: string;
  client_id: string;
  query_id: string | null;
  platform: string;
  mentioned: boolean;
  cited: boolean;
  checked_at: string;
}

export interface MonthlySnapshot {
  id: string;
  client_id: string;
  month_date: string;
  visibility_score: number;
  mention_rate: number;
  citation_rate: number;
  queries_tracked: number;
  queries_mentioned: number;
}
