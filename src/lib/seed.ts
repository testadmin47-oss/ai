import { supabase } from "./supabase";
import type { Client, TrackedQuery, MonthlySnapshot } from "./types";
import { INDUSTRY_MAP, type IndustryConfig } from "./industries";

const PLATFORMS = ["ChatGPT", "Perplexity", "Gemini", "Google AI"];

export async function seedDemoData(
  userId: string,
  industryId: string
): Promise<void> {
  const industry: IndustryConfig = INDUSTRY_MAP[industryId] ?? INDUSTRY_MAP["dental"];

  // Check if user already has a client
  const { data: existing } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) return;

  // Create client
  const { data: client, error: clientErr } = await supabase
    .from("clients")
    .insert({
      user_id: userId,
      practice_name: industry.exampleBusiness,
      industry: industry.id,
      city: industry.exampleCity,
      state: industry.exampleState,
      website: industry.exampleWebsite,
      plan: "growth",
      overall_score: 36,
      mention_rate: 36,
      citation_rate: 28,
      queries_tracked: industry.queries.length,
      queries_mentioned: 11,
    })
    .select()
    .single<Client>();

  if (clientErr || !client) throw new Error("Failed to create demo client");

  // Create tracked queries
  const queryRows = industry.queries.map((q, i) => ({
    client_id: client.id,
    query_text: q.text,
    category: q.category,
    mentioned: i % 3 === 0 || i % 5 === 0,
    mention_count: (i % 3) + 1,
  }));

  const { data: queries, error: qErr } = await supabase
    .from("tracked_queries")
    .insert(queryRows)
    .select();

  if (qErr || !queries) throw new Error("Failed to create tracked queries");

  // Create visibility checks for each query x platform
  const checkRows: {
    client_id: string;
    query_id: string;
    platform: string;
    mentioned: boolean;
    cited: boolean;
  }[] = [];

  (queries as TrackedQuery[]).forEach((q, qi) => {
    PLATFORMS.forEach((p, pi) => {
      checkRows.push({
        client_id: client.id,
        query_id: q.id,
        platform: p,
        mentioned: (qi + pi) % 3 === 0,
        cited: (qi + pi) % 5 === 0,
      });
    });
  });

  await supabase.from("visibility_checks").insert(checkRows);

  // Create competitors
  const compRows = industry.competitors.map((c) => ({
    client_id: client.id,
    name: c.name,
    overall_score: c.baseScore,
    mention_rate: c.baseScore,
    is_client: false,
  }));
  await supabase.from("competitors").insert(compRows);

  // Also add the client as a competitor row for comparison
  await supabase.from("competitors").insert({
    client_id: client.id,
    name: `${industry.exampleBusiness} (You)`,
    overall_score: 36,
    mention_rate: 36,
    is_client: true,
  });

  // Create monthly snapshots for trend chart
  const months = [
    { date: "2025-05-01", score: 18, mention: 18, citation: 12 },
    { date: "2025-06-01", score: 24, mention: 24, citation: 16 },
    { date: "2025-07-01", score: 31, mention: 31, citation: 22 },
    { date: "2025-08-01", score: 36, mention: 36, citation: 28 },
    { date: "2025-09-01", score: 36, mention: 36, citation: 28 },
  ];

  const snapshots: Omit<MonthlySnapshot, "id">[] = months.map((m) => ({
    client_id: client.id,
    month_date: m.date,
    visibility_score: m.score,
    mention_rate: m.mention,
    citation_rate: m.citation,
    queries_tracked: industry.queries.length,
    queries_mentioned: Math.round((m.mention / 100) * industry.queries.length),
  }));

  await supabase.from("monthly_snapshots").insert(snapshots);
}
