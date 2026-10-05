import { supabase } from "./supabase";
import type { Client, TrackedQuery, MonthlySnapshot } from "./types";

const DENTAL_QUERIES: { text: string; category: string }[] = [
  { text: "Best dentist in Austin for dental implants", category: "implants" },
  { text: "Top-rated dentist near me for teeth whitening", category: "cosmetic" },
  { text: "Best family dentist in Austin TX", category: "general" },
  { text: "Affordable dental implants Austin", category: "implants" },
  { text: "Who is the best cosmetic dentist in Austin?", category: "cosmetic" },
  { text: "Best dentist for emergency tooth extraction Austin", category: "emergency" },
  { text: "Top dentist for Invisalign in Austin", category: "orthodontics" },
  { text: "Best pediatric dentist in Austin", category: "pediatric" },
  { text: "Which dentist in Austin accepts Delta Dental?", category: "insurance" },
  { text: "Best dentist for crowns and bridges in Austin", category: "restorative" },
  { text: "Highest rated dental clinic in Austin Texas", category: "general" },
  { text: "Best dentist for root canal in Austin", category: "restorative" },
  { text: "Top reviewed dentist in downtown Austin", category: "general" },
  { text: "Best dentist for veneers in Austin", category: "cosmetic" },
  { text: "Which Austin dentist is best for anxious patients?", category: "general" },
  { text: "Best same-day dentist appointment Austin", category: "emergency" },
  { text: "Best dentist for gum disease treatment Austin", category: "restorative" },
  { text: "Top dentist for dentures in Austin TX", category: "restorative" },
  { text: "Best dentist accepting new patients in Austin", category: "general" },
  { text: "Which dental clinic in Austin has the best reviews?", category: "general" },
  { text: "Best dentist for sleep apnea mouthguard Austin", category: "specialty" },
  { text: "Top dental implant specialist in Austin Texas", category: "implants" },
  { text: "Best dentist for TMJ treatment in Austin", category: "specialty" },
  { text: "Which Austin dentist offers payment plans?", category: "insurance" },
  { text: "Best full-mouth dental implants Austin", category: "implants" },
  { text: "Best dentist for teeth cleaning in Austin", category: "general" },
  { text: "Top-rated dentist in South Austin", category: "general" },
  { text: "Best dentist for wisdom teeth removal Austin", category: "restorative" },
  { text: "Which dentist in Austin is best for seniors?", category: "general" },
  { text: "Best dentist for dental bonding in Austin", category: "cosmetic" },
];

const PLATFORMS = ["ChatGPT", "Perplexity", "Gemini", "Google AI"];

const COMPETITORS = [
  { name: "BrightSmile Dental", baseScore: 78 },
  { name: "Lakeside Family Dental", baseScore: 64 },
  { name: "Summit Dental Group", baseScore: 58 },
  { name: "Austin Premier Dentistry", baseScore: 52 },
];



export async function seedDemoData(userId: string): Promise<void> {
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
      practice_name: "Riverside Dental",
      city: "Austin",
      state: "TX",
      website: "riversidedental.com",
      plan: "growth",
      overall_score: 36,
      mention_rate: 36,
      citation_rate: 28,
      queries_tracked: DENTAL_QUERIES.length,
      queries_mentioned: 11,
    })
    .select()
    .single<Client>();

  if (clientErr || !client) throw new Error("Failed to create demo client");

  // Create tracked queries with random mention status
  const queryRows = DENTAL_QUERIES.map((q, i) => ({
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
  const compRows = COMPETITORS.map((c) => ({
    client_id: client.id,
    name: c.name,
    overall_score: c.baseScore,
    mention_rate: c.baseScore,
    is_client: false,
  }));
  await supabase.from("competitors").insert(compRows);

  // Also add the client as a competitor row for the comparison chart
  await supabase.from("competitors").insert({
    client_id: client.id,
    name: "Riverside Dental (You)",
    overall_score: 36,
    mention_rate: 36,
    is_client: true,
  });

  // Create monthly snapshots for trend chart
  const snapshots: Omit<MonthlySnapshot, "id">[] = [];
  const months = [
    { date: "2025-05-01", score: 18, mention: 18, citation: 12 },
    { date: "2025-06-01", score: 24, mention: 24, citation: 16 },
    { date: "2025-07-01", score: 31, mention: 31, citation: 22 },
    { date: "2025-08-01", score: 36, mention: 36, citation: 28 },
    { date: "2025-09-01", score: 36, mention: 36, citation: 28 },
  ];

  months.forEach((m) => {
    snapshots.push({
      client_id: client.id,
      month_date: m.date,
      visibility_score: m.score,
      mention_rate: m.mention,
      citation_rate: m.citation,
      queries_tracked: DENTAL_QUERIES.length,
      queries_mentioned: Math.round((m.mention / 100) * DENTAL_QUERIES.length),
    });
  });

  await supabase.from("monthly_snapshots").insert(snapshots);
}
