import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";
import { supabase } from "../lib/supabase";
import type { Client, TrackedQuery, Competitor, MonthlySnapshot, VisibilityCheck } from "../lib/types";
import ScoreRing from "../components/ScoreRing";
import Logo from "../components/Logo";
import {
  Eye,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  MessageSquare,
  ArrowUpRight,
  LogOut,
  Download,
  ChevronRight,
  FileText,
  Sparkles,
} from "lucide-react";

const PLATFORMS = ["ChatGPT", "Perplexity", "Gemini", "Google AI"] as const;
const PLATFORM_COLORS: Record<string, string> = {
  "ChatGPT": "bg-brand-500",
  "Perplexity": "bg-accent-500",
  "Gemini": "bg-amber-500",
  "Google AI": "bg-rose-500",
};

export default function DashboardPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [client, setClient] = useState<Client | null>(null);
  const [queries, setQueries] = useState<TrackedQuery[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [snapshots, setSnapshots] = useState<MonthlySnapshot[]>([]);
  const [checks, setChecks] = useState<VisibilityCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "queries" | "competitors" | "report">("overview");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const { data: clientData } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!clientData) {
      setLoading(false);
      return;
    }

    setClient(clientData as Client);

    const [q, c, s, ch] = await Promise.all([
      supabase.from("tracked_queries").select("*").eq("client_id", clientData.id).order("category"),
      supabase.from("competitors").select("*").eq("client_id", clientData.id).order("overall_score", { ascending: false }),
      supabase.from("monthly_snapshots").select("*").eq("client_id", clientData.id).order("month_date"),
      supabase.from("visibility_checks").select("*").eq("client_id", clientData.id),
    ]);

    setQueries((q.data as TrackedQuery[]) ?? []);
    setCompetitors((c.data as Competitor[]) ?? []);
    setSnapshots((s.data as MonthlySnapshot[]) ?? []);
    setChecks((ch.data as VisibilityCheck[]) ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="text-center">
          <p className="text-neutral-600">No practice data found.</p>
          <Link to="/" className="mt-4 inline-block text-brand-600 hover:underline">Return home</Link>
        </div>
      </div>
    );
  }

  // Compute platform scores from checks
  const platformScores = PLATFORMS.map((p) => {
    const pChecks = checks.filter((c) => c.platform === p);
    const mentioned = pChecks.filter((c) => c.mentioned).length;
    const pct = pChecks.length > 0 ? Math.round((mentioned / pChecks.length) * 100) : 0;
    return { name: p, score: pct, mentioned, total: pChecks.length };
  });

  // Category breakdown
  const categories = Array.from(new Set(queries.map((q) => q.category)));
  const filteredQueries = categoryFilter === "all" ? queries : queries.filter((q) => q.category === categoryFilter);
  const categoryStats = categories.map((cat) => {
    const catQueries = queries.filter((q) => q.category === cat);
    const mentioned = catQueries.filter((q) => q.mentioned).length;
    return { category: cat, total: catQueries.length, mentioned, rate: Math.round((mentioned / catQueries.length) * 100) };
  }).sort((a, b) => b.rate - a.rate);

  // Trend data
  const latestSnapshot = snapshots[snapshots.length - 1];
  const prevSnapshot = snapshots[snapshots.length - 2];
  const scoreChange = latestSnapshot && prevSnapshot
    ? latestSnapshot.visibility_score - prevSnapshot.visibility_score
    : 0;

  // Sorted competitors (client included)
  const sortedComps = [...competitors].sort((a, b) => b.overall_score - a.overall_score);
  const clientRank = sortedComps.findIndex((c) => c.is_client) + 1;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top nav */}
      <nav className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-8">
            <Logo />
            <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 sm:block">
              {client.practice_name} — {client.city}, {client.state}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 flex gap-1 overflow-x-auto rounded-xl border border-neutral-200 bg-white p-1">
          {[
            { id: "overview", label: "Overview", icon: Eye },
            { id: "queries", label: "Queries", icon: MessageSquare },
            { id: "competitors", label: "Competitors", icon: BarChart3 },
            { id: "report", label: "Monthly Report", icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex flex-shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== Overview Tab ===== */}
        {activeTab === "overview" && (
          <div className="animate-fade-in space-y-6">
            {/* Top cards */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Score card */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Eye className="h-5 w-5" />
                    <span className="text-sm font-medium">AI Visibility Score</span>
                  </div>
                  <div className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${
                    scoreChange > 0 ? "bg-accent-50 text-accent-700" : scoreChange < 0 ? "bg-rose-50 text-rose-700" : "bg-neutral-100 text-neutral-500"
                  }`}>
                    {scoreChange > 0 ? <TrendingUp className="h-3 w-3" /> : scoreChange < 0 ? <TrendingDown className="h-3 w-3" /> : null}
                    {scoreChange > 0 ? `+${scoreChange}` : scoreChange}
                    {scoreChange !== 0 && "%"}
                  </div>
                </div>
                <div className="flex justify-center">
                  <ScoreRing score={client.overall_score} size={150} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
                  <div>
                    <div className="text-xs text-neutral-500">Mention rate</div>
                    <div className="text-lg font-bold text-neutral-900">{client.mention_rate}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Citation rate</div>
                    <div className="text-lg font-bold text-neutral-900">{client.citation_rate}%</div>
                  </div>
                </div>
              </div>

              {/* Platform breakdown */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 lg:col-span-2">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-sm font-medium">Platform Breakdown</span>
                  </div>
                  <span className="text-xs text-neutral-400">Based on {queries.length} queries</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {platformScores.map((p) => (
                    <div key={p.name} className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold text-neutral-700">{p.name}</span>
                        <span className="text-lg font-bold text-neutral-900">{p.score}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-neutral-200">
                        <div
                          className={`h-full rounded-full ${PLATFORM_COLORS[p.name]} transition-all duration-1000`}
                          style={{ width: `${p.score}%` }}
                        />
                      </div>
                      <div className="mt-2 text-xs text-neutral-500">
                        Mentioned in {p.mentioned} of {p.total} queries
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trend chart + category breakdown */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Trend chart */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 lg:col-span-2">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm font-medium">Visibility Trend</span>
                  </div>
                  <span className="text-xs font-medium text-accent-600">
                    {snapshots.length > 1 && scoreChange > 0 ? `↑ ${scoreChange}% since ${(snapshots[0] as MonthlySnapshot).visibility_score}%` : "Tracking started"}
                  </span>
                </div>
                <div className="flex h-56 items-end justify-around gap-3 px-2">
                  {snapshots.map((s, i) => {
                    const isLatest = i === snapshots.length - 1;
                    return (
                      <div key={s.id} className="flex flex-1 flex-col items-center gap-2">
                        <div className="flex w-full flex-1 items-end">
                          <div
                            className={`relative w-full rounded-t-lg transition-all duration-1000 ${
                              isLatest ? "bg-gradient-to-t from-brand-600 to-brand-400" : "bg-gradient-to-t from-brand-300 to-brand-200"
                            }`}
                            style={{ height: `${s.visibility_score}%` }}
                          >
                            {isLatest && (
                              <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">
                                {s.visibility_score}%
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-neutral-500">
                          {new Date(s.month_date + "T00:00:00").toLocaleDateString("en-US", { month: "short" })}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-neutral-100 pt-4">
                  <div>
                    <div className="text-xs text-neutral-500">Best month</div>
                    <div className="text-sm font-bold text-neutral-900">
                      {Math.max(...snapshots.map((s) => s.visibility_score))}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Starting score</div>
                    <div className="text-sm font-bold text-neutral-900">
                      {snapshots[0]?.visibility_score ?? 0}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Total change</div>
                    <div className="text-sm font-bold text-accent-600">
                      +{(snapshots[snapshots.length - 1]?.visibility_score ?? 0) - (snapshots[0]?.visibility_score ?? 0)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="mb-5 flex items-center gap-2 text-neutral-500">
                  <Target className="h-5 w-5" />
                  <span className="text-sm font-medium">By Service Category</span>
                </div>
                <div className="space-y-4">
                  {categoryStats.map((c) => (
                    <div key={c.category}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="capitalize font-medium text-neutral-700">{c.category}</span>
                        <span className="font-semibold text-neutral-900">{c.rate}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            c.rate >= 50 ? "bg-accent-500" : c.rate >= 25 ? "bg-amber-500" : "bg-rose-500"
                          }`}
                          style={{ width: `${c.rate}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-neutral-400">
                        {c.mentioned} / {c.total} queries
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50/50 p-3">
                  <p className="text-xs text-neutral-700">
                    <strong>Biggest opportunity:</strong> {categoryStats[categoryStats.length - 1]?.category ?? "N/A"} queries
                    have the lowest mention rate. Improving content here could drive the biggest gains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== Queries Tab ===== */}
        {activeTab === "queries" && (
          <div className="animate-fade-in space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Tracked Queries</h2>
                  <p className="text-sm text-neutral-500">{queries.length} patient queries monitored across 4 AI platforms</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      categoryFilter === "all" ? "bg-brand-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    All ({queries.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
                        categoryFilter === cat ? "bg-brand-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {cat} ({queries.filter((q) => q.category === cat).length})
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-neutral-200">
                <table className="w-full">
                  <thead className="bg-neutral-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      <th className="px-4 py-3">Query</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="hidden px-4 py-3 md:table-cell">Platforms Mentioned</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredQueries.map((q) => {
                      const qChecks = checks.filter((c) => c.query_id === q.id);
                      const platformsMentioned = PLATFORMS.filter((p) =>
                        qChecks.some((c) => c.platform === p && c.mentioned)
                      );
                      return (
                        <tr key={q.id} className="text-sm transition hover:bg-neutral-50/50">
                          <td className="px-4 py-3 font-medium text-neutral-900">"{q.query_text}"</td>
                          <td className="px-4 py-3">
                            <span className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium capitalize text-neutral-600">
                              {q.category}
                            </span>
                          </td>
                          <td className="hidden px-4 py-3 md:table-cell">
                            <div className="flex gap-1">
                              {PLATFORMS.map((p) => (
                                <span
                                  key={p}
                                  className={`h-2 w-8 rounded-full ${
                                    platformsMentioned.includes(p) ? PLATFORM_COLORS[p] : "bg-neutral-200"
                                  }`}
                                  title={p}
                                />
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {q.mentioned ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold text-accent-700">
                                <ArrowUpRight className="h-3 w-3" /> Mentioned
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                                Missing
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
                <span>
                  Showing {filteredQueries.length} of {queries.length} queries
                </span>
                <span>
                  {filteredQueries.filter((q) => q.mentioned).length} mentioned · {" "}
                  {filteredQueries.filter((q) => !q.mentioned).length} missing
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ===== Competitors Tab ===== */}
        {activeTab === "competitors" && (
          <div className="animate-fade-in space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-neutral-900">Competitor Comparison</h2>
                <p className="text-sm text-neutral-500">
                  How your AI visibility compares to {competitors.filter((c) => !c.is_client).length} competitors in your area
                </p>
              </div>

              {/* Ranked list */}
              <div className="space-y-4">
                {sortedComps.map((c, i) => (
                  <div
                    key={c.id}
                    className={`flex items-center gap-4 rounded-xl border p-4 transition ${
                      c.is_client ? "border-brand-300 bg-brand-50/50" : "border-neutral-200"
                    }`}
                  >
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      i === 0 ? "bg-amber-100 text-amber-700" : i === 1 ? "bg-neutral-200 text-neutral-700" : i === 2 ? "bg-orange-100 text-orange-700" : "bg-neutral-100 text-neutral-500"
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900">{c.name}</span>
                        {c.is_client && (
                          <span className="rounded-md bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">YOU</span>
                        )}
                      </div>
                      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            c.is_client ? "bg-brand-600" : "bg-neutral-400"
                          }`}
                          style={{ width: `${c.overall_score}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-neutral-900">{c.overall_score}%</div>
                      <div className="text-xs text-neutral-500">{c.mention_rate} mention rate</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-neutral-100 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-900">#{clientRank}</div>
                  <div className="text-xs text-neutral-500">Your rank</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-900">
                    {sortedComps[0]?.overall_score ?? 0}%
                  </div>
                  <div className="text-xs text-neutral-500">Leader's score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-600">
                    {(sortedComps[0]?.overall_score ?? 0) - client.overall_score}%
                  </div>
                  <div className="text-xs text-neutral-500">Gap to #1</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== Monthly Report Tab ===== */}
        {activeTab === "report" && (
          <div className="animate-fade-in space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-brand-600" />
                    <h2 className="text-lg font-bold text-neutral-900">Monthly Visibility Report</h2>
                  </div>
                  <p className="mt-1 text-sm text-neutral-500">
                    {client.practice_name} — {latestSnapshot ? new Date(latestSnapshot.month_date + "T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Current period"}
                  </p>
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50">
                  <Download className="h-4 w-4" />
                  Export Report
                </button>
              </div>

              {/* Summary stats */}
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  { label: "Visibility Score", value: `${client.overall_score}/100`, change: scoreChange > 0 ? `+${scoreChange}%` : "—", positive: scoreChange > 0 },
                  { label: "Mention Rate", value: `${client.mention_rate}%`, change: `${client.queries_mentioned}/${client.queries_tracked} queries`, positive: true },
                  { label: "Citation Rate", value: `${client.citation_rate}%`, change: "↑ from last month", positive: true },
                  { label: "Competitor Rank", value: `#${clientRank}`, change: `of ${sortedComps.length} tracked`, positive: false },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                    <div className="text-xs font-medium text-neutral-500">{stat.label}</div>
                    <div className="mt-1 text-2xl font-bold text-neutral-900">{stat.value}</div>
                    <div className={`mt-1 text-xs font-medium ${stat.positive ? "text-accent-600" : "text-neutral-500"}`}>
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Competitor table */}
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-neutral-500">Top Competitors</h3>
                <div className="overflow-hidden rounded-xl border border-neutral-200">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        <th className="px-4 py-3">Practice</th>
                        <th className="px-4 py-3 text-right">Score</th>
                        <th className="px-4 py-3 text-right">Mention Rate</th>
                        <th className="hidden px-4 py-3 text-right sm:table-cell">vs. You</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {sortedComps.map((c) => (
                        <tr key={c.id} className={`text-sm ${c.is_client ? "bg-brand-50/30" : ""}`}>
                          <td className="px-4 py-3 font-medium text-neutral-900">
                            {c.name}
                            {c.is_client && <span className="ml-2 text-xs font-bold text-brand-600">(You)</span>}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-neutral-900">{c.overall_score}%</td>
                          <td className="px-4 py-3 text-right text-neutral-600">{c.mention_rate}%</td>
                          <td className="hidden px-4 py-3 text-right sm:table-cell">
                            <span className={c.is_client ? "text-neutral-400" : c.overall_score > client.overall_score ? "font-semibold text-rose-600" : "font-semibold text-accent-600"}>
                              {c.is_client ? "—" : `${c.overall_score > client.overall_score ? "+" : ""}${c.overall_score - client.overall_score}%`}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Biggest improvement */}
              <div className="mt-8 rounded-xl border border-accent-200 bg-accent-50/50 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">Biggest Improvement This Month</h3>
                    <p className="mt-1 text-sm text-neutral-700">
                      Your visibility score increased from {prevSnapshot?.visibility_score ?? 0}% to {latestSnapshot?.visibility_score ?? client.overall_score}%.
                      Implant-related queries showed the most growth — from 5 mentions last month to 17 this month.
                    </p>
                  </div>
                </div>
              </div>

              {/* Next month's plan */}
              <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
                <h3 className="text-sm font-bold text-neutral-900">Next Month's Work</h3>
                <ul className="mt-3 space-y-2">
                  {[
                    "Improve implant service page content with patient-focused FAQs",
                    "Strengthen local authority through 2 relevant publication opportunities",
                    "Fix 3 directory listing inconsistencies (NAP mismatch on Yelp, Healthgrades)",
                    "Add structured data to doctor/team pages",
                    "Improve emergency dentistry content for after-hours queries",
                  ].map((task, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                      <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
