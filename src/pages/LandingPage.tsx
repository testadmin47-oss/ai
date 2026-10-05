import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  Eye,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Target,
  ArrowRight,
  Check,
  Menu,
  X,
  Bot,
  MessageSquare,
  Activity,
  ChevronDown,
  Globe2,
  Building2,
  LineChart,
  FileBarChart,
  Building,
  Scale,
  Stethoscope,
  Wrench,
  Car,
  Hotel,
  UtensilsCrossed,
  ShoppingBag,
  GraduationCap,
  Zap,
  Home,
  Cpu,
  Briefcase,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Logo from "../components/Logo";
import ScoreRing from "../components/ScoreRing";
import { INDUSTRIES } from "../lib/industries";

const AI_PLATFORMS = [
  { name: "ChatGPT", color: "text-brand-600" },
  { name: "Perplexity", color: "text-accent-600" },
  { name: "Gemini", color: "text-amber-600" },
  { name: "Google AI", color: "text-rose-600" },
  { name: "Claude", color: "text-orange-600" },
  { name: "DeepSeek", color: "text-violet-600" },
];

const INDUSTRY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  dental: Stethoscope,
  legal: Scale,
  medical: Stethoscope,
  medspa: Sparkles,
  hvac: Zap,
  plumbing: Wrench,
  roofing: Home,
  hotels: Hotel,
  restaurants: UtensilsCrossed,
  realestate: Building,
  saas: Cpu,
  ecommerce: ShoppingBag,
  b2b: Briefcase,
  education: GraduationCap,
  automotive: Car,
};

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== Nav ===== */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="hidden items-center gap-8 lg:flex">
            <a href="#platforms" className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">Platforms</a>
            <a href="#how-it-works" className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">Methodology</a>
            <a href="#industries" className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">Industries</a>
            <a href="#pricing" className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">FAQ</a>
            <Link
              to="/auth"
              className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Client Portal
            </Link>
          </div>
          <button
            className="rounded-lg p-2 text-neutral-600 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-neutral-200 bg-white px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              <a href="#platforms" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">Platforms</a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">Methodology</a>
              <a href="#industries" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">Industries</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">Pricing</a>
              <a href="#faq" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">FAQ</a>
              <Link to="/auth" className="rounded-lg bg-neutral-900 px-5 py-2.5 text-center text-sm font-semibold text-white">Client Portal</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-50/60 to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-brand-600" />
              AI Search Visibility for Any Business
            </div>
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 md:text-6xl">
              When customers ask AI for a recommendation,{" "}
              <span className="gradient-text">are they mentioning you?</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              We measure how often ChatGPT, Perplexity, Gemini, Claude, DeepSeek, and Google AI
              recommend your business — then improve the real-world signals that
              drive those mentions. Works for dental clinics, law firms, HVAC
              companies, hotels, SaaS products, and 12+ more industries.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/auth"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-800 hover:shadow-xl"
              >
                Get Your Free Visibility Check
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-7 py-3.5 text-base font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* AI Platform strip */}
          <div id="platforms" className="mt-16 border-t border-neutral-100 pt-10">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Monitoring 6 AI Search Platforms
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {AI_PLATFORMS.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${p.color.replace("text", "bg")}`} />
                  <span className="text-sm font-semibold text-neutral-700">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Enterprise stats bar ===== */}
      <section className="border-y border-neutral-200 bg-neutral-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-neutral-700 px-6 md:grid-cols-4">
          {[
            { value: "1.2B+", label: "AI searches per month" },
            { value: "73%", label: "of consumers use AI before buying" },
            { value: "6", label: "AI platforms monitored" },
            { value: "16+", label: "industries supported" },
          ].map((s) => (
            <div key={s.label} className="px-6 py-8 text-center">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="mt-1 text-sm text-neutral-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== The Shift — professional problem section ===== */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-600">
                <Activity className="h-4 w-4" /> The Paradigm Shift
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl">
                Search is no longer a list of links. It's a single AI-generated answer.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                When a potential customer asks an AI for a recommendation, the
                response names specific businesses. If yours isn't one of them,
                you've lost that opportunity — regardless of your Google ranking.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-neutral-600">
                Sighten gives you enterprise-grade visibility into how AI systems
                perceive your business, and a structured methodology to improve it.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "Quantitative Measurement", desc: "Know exactly how often each AI platform mentions you across hundreds of real customer queries." },
                  { title: "Competitive Intelligence", desc: "See where competitors appear that you don't, and understand the signals driving that gap." },
                  { title: "Structured Improvement", desc: "Strengthen the real-world data AI systems rely on — your website, listings, reviews, and third-party presence." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-100/40 to-neutral-100 blur-2xl" />
              <div className="relative rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-300/30">
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-3">
                  <div className="h-3 w-3 rounded-full bg-neutral-200" />
                  <div className="h-3 w-3 rounded-full bg-neutral-200" />
                  <div className="h-3 w-3 rounded-full bg-neutral-200" />
                  <div className="ml-3 flex-1 rounded-md bg-neutral-50 px-3 py-1 text-xs text-neutral-400">
                    sighten.ai/dashboard
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-neutral-400">ENTERPRISE DASHBOARD</p>
                      <p className="text-base font-bold text-neutral-900">AI Visibility Score</p>
                    </div>
                    <div className="rounded-lg bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
                      ↑ 18% MoM
                    </div>
                  </div>
                  <div className="mb-6 flex items-center justify-center">
                    <ScoreRing score={36} size={140} />
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: "ChatGPT", score: 42, color: "bg-brand-500" },
                      { name: "Perplexity", score: 38, color: "bg-accent-500" },
                      { name: "Claude", score: 35, color: "bg-orange-500" },
                      { name: "Gemini", score: 31, color: "bg-amber-500" },
                      { name: "Google AI", score: 33, color: "bg-rose-500" },
                      { name: "DeepSeek", score: 29, color: "bg-violet-500" },
                    ].map((p) => (
                      <div key={p.name}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-medium text-neutral-600">{p.name}</span>
                          <span className="font-semibold text-neutral-900">{p.score}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
                          <div className={`h-full rounded-full ${p.color} transition-all duration-1000`} style={{ width: `${p.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Methodology — how it works ===== */}
      <section id="how-it-works" className="border-y border-neutral-200 bg-neutral-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-600">
              <BarChart3 className="h-4 w-4" /> Our Methodology
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              A structured, measurable approach to AI visibility
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Not guesswork. A repeatable framework for measuring, analyzing,
              and improving how AI systems represent your business.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 md:grid-cols-3">
            {[
              { icon: Search, title: "01 — Measure", desc: "We test hundreds of real customer queries across 6 AI platforms to establish your baseline visibility score and map where you appear — and where you don't.", bg: "bg-white" },
              { icon: FileBarChart, title: "02 — Analyze", desc: "Deep competitive analysis identifies why competitors appear more frequently. We examine their third-party coverage, content structure, reviews, and citations.", bg: "bg-white" },
              { icon: Target, title: "03 — Improve", desc: "We strengthen the real-world signals AI systems trust: website content, structured data, business listings, review presence, and authoritative third-party coverage.", bg: "bg-white" },
              { icon: TrendingUp, title: "04 — Monitor", desc: "Monthly re-testing across all platforms tracks your visibility trend alongside competitors. You see exactly what's changing and why.", bg: "bg-white" },
              { icon: ShieldCheck, title: "05 — Report", desc: "Executive-grade reports with visibility scores, platform breakdowns, competitor benchmarks, and prioritized recommendations for the coming period.", bg: "bg-white" },
              { icon: LineChart, title: "06 — Scale", desc: "As visibility improves, we expand query coverage, add locations, and deepen industry-specific signals to compound your advantage over time.", bg: "bg-white" },
            ].map((step) => (
              <div key={step.title} className={`${step.bg} p-8`}>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900">
                  <step.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Industries ===== */}
      <section id="industries" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-600">
              <Globe2 className="h-4 w-4" /> Industry Coverage
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Built for the businesses people ask AI about
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              The core methodology stays the same. We customize query sets,
              competitor benchmarks, and signal strategies for each vertical.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {INDUSTRIES.map((ind) => {
              const Icon = INDUSTRY_ICONS[ind.id] ?? Building2;
              return (
                <Link
                  key={ind.id}
                  to="/auth"
                  className="group flex items-center gap-4 bg-white p-5 transition hover:bg-neutral-50"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100 transition group-hover:bg-neutral-900">
                    <Icon className="h-5 w-5 text-neutral-600 transition group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-neutral-900 group-hover:text-neutral-900">{ind.label}</div>
                    <div className="text-xs text-neutral-500">{ind.queries.length} tracked queries</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-neutral-300 transition group-hover:text-neutral-600" />
                </Link>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Don't see your industry? The platform works for any business that customers search for.{" "}
            <Link to="/auth" className="font-semibold text-neutral-900 hover:underline">Get started →</Link>
          </p>
        </div>
      </section>

      {/* ===== Enterprise feature showcase ===== */}
      <section className="border-y border-neutral-200 bg-neutral-900 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-300">
              <Bot className="h-4 w-4" /> Platform Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Enterprise-grade visibility infrastructure
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Everything a multi-location business needs to measure, manage,
              and improve its presence in AI-generated answers.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Eye, title: "Visibility Scoring", desc: "A composite score across 6 AI platforms, normalized by industry and query set, with month-over-month delta tracking." },
              { icon: BarChart3, title: "Platform Breakdown", desc: "Per-platform mention rates for ChatGPT, Perplexity, Gemini, Claude, DeepSeek, and Google AI — see where you're strong and where you're invisible." },
              { icon: TrendingUp, title: "Trend Analytics", desc: "Historical visibility charts showing score progression, citation growth, and mention rate changes over custom date ranges." },
              { icon: Target, title: "Competitive Benchmarking", desc: "Side-by-side competitor comparison with gap analysis, rank tracking, and signal-level diagnostics." },
              { icon: Search, title: "Query Intelligence", desc: "30–100+ real customer queries per industry, categorized by service line, with per-query platform mention indicators." },
              { icon: ShieldCheck, title: "Compliance & Ethics", desc: "No fake reviews, no AI manipulation, no deceptive content. We strengthen real business data — the approach that scales safely." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6 transition hover:border-neutral-600">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-700">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-600">
              <Target className="h-4 w-4" /> Engagement Models
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Transparent pricing for every stage
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Start with a one-time audit, then move to an ongoing management
              relationship. No long-term contracts. Cancel anytime.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Audit */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-neutral-400">Tier 1</div>
              <h3 className="text-lg font-bold text-neutral-900">Visibility Audit</h3>
              <p className="mt-1 text-sm text-neutral-500">One-time deep analysis</p>
              <div className="mt-6 border-y border-neutral-100 py-6">
                <span className="text-4xl font-bold text-neutral-900">$300</span>
                <span className="text-neutral-500"> – $750</span>
                <p className="mt-1 text-sm text-neutral-500">scope-dependent</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                {["50–100 customer queries tested", "All 6 AI platforms covered", "Competitor visibility analysis", "Citation and source audit", "Detailed findings report", "Prioritized recommendations"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-900" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className="mt-8 block rounded-xl border border-neutral-300 bg-white py-3 text-center text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
              >
                Request Audit
              </Link>
            </div>

            {/* Management - highlighted */}
            <div className="relative rounded-2xl border-2 border-neutral-900 bg-white p-8 shadow-xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900 px-4 py-1 text-xs font-bold text-white">
                RECOMMENDED
              </div>
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-neutral-400">Tier 2</div>
              <h3 className="text-lg font-bold text-neutral-900">Visibility Management</h3>
              <p className="mt-1 text-sm text-neutral-500">Ongoing monitoring & improvement</p>
              <div className="mt-6 border-y border-neutral-100 py-6">
                <span className="text-4xl font-bold text-neutral-900">$500</span>
                <span className="text-neutral-500"> – $1,000</span>
                <p className="mt-1 text-sm text-neutral-500">per month, per location</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                {["Monthly AI query monitoring", "Competitor tracking", "Website & content recommendations", "Source and citation analysis", "Implementation of agreed changes", "Monthly visibility report", "Ongoing optimization"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-900" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className="mt-8 block rounded-xl bg-neutral-900 py-3 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Start Management Plan
              </Link>
            </div>

            {/* Growth */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-neutral-400">Tier 3</div>
              <h3 className="text-lg font-bold text-neutral-900">Growth</h3>
              <p className="mt-1 text-sm text-neutral-500">Multi-location & enterprise</p>
              <div className="mt-6 border-y border-neutral-100 py-6">
                <span className="text-4xl font-bold text-neutral-900">$1,000</span>
                <span className="text-neutral-500"> – $2,000+</span>
                <p className="mt-1 text-sm text-neutral-500">per month, per business</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                {["100+ tracked queries", "Multiple locations tracked", "Expanded competitor set", "Content creation included", "Reputation management", "Third-party authority building", "Dedicated strategy & reporting"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-900" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className="mt-8 block rounded-xl border border-neutral-300 bg-white py-3 text-center text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
              >
                Contact for Growth
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-center">
            <p className="text-sm text-neutral-600">
              <strong className="text-neutral-900">ROI justification:</strong> A single new high-value customer
              — a dental implant patient, a personal injury client, an HVAC installation —
              can be worth thousands. If improved AI visibility generates even one,
              the engagement pays for itself.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="border-t border-neutral-200 bg-neutral-50 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-600">
              <MessageSquare className="h-4 w-4" /> Questions & Answers
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {[
              {
                q: "Is this just another SEO service?",
                a: "No. Traditional SEO optimizes for Google's search results — a list of links. We measure and improve how often your business appears in AI-generated answers from ChatGPT, Perplexity, Gemini, Claude, DeepSeek, and Google AI. The signals, the format, and the competitive landscape are fundamentally different.",
              },
              {
                q: "Do you guarantee AI rankings?",
                a: "No, and you should be skeptical of anyone who does. AI systems don't produce \"rankings\" — they generate narrative answers that name specific businesses. We measure your visibility, identify gaps versus competitors, and strengthen the real-world information AI systems rely on. Results are tracked monthly.",
              },
              {
                q: "Which AI platforms do you monitor?",
                a: "Six platforms: ChatGPT, Perplexity, Gemini, Claude, DeepSeek, and Google AI Overviews. These represent the vast majority of AI-assisted search traffic today. As new platforms emerge, we add them to your monitoring automatically.",
              },
              {
                q: "Which industries do you support?",
                a: "16+ industries including dental, legal, medical, med spas, HVAC, plumbing, roofing, hotels, restaurants, real estate, SaaS, e-commerce, B2B, education, and automotive. The core methodology is identical across verticals — we customize the query sets, competitor benchmarks, and signal strategies for each.",
              },
              {
                q: "How long until I see results?",
                a: "AI visibility changes take time — typically 2–3 months before meaningful movement as AI systems re-index updated content and signals. We set clear expectations upfront and show you month-over-month progress so you always know where things stand.",
              },
              {
                q: "Do you use fake reviews or manipulate AI?",
                a: "Never. We don't create fake reviews, fake websites, or fake recommendations. We don't attempt to trick AI systems. We strengthen your real business information — your website, listings, reviews, and third-party presence — so AI systems have accurate, trustworthy data to work with. This is the approach that scales safely and sustainably.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-neutral-900">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-4 text-sm leading-relaxed text-neutral-600">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-neutral-900 py-24 md:py-32">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-500/10 to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Building2 className="mx-auto mb-6 h-10 w-10 text-neutral-600" />
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Find out if AI mentions your business
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Sign up for a free account and we'll run an initial visibility check
            across 30 customer queries on six AI platforms — customized for your industry.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/auth"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-transparent px-7 py-3.5 text-base font-semibold text-white transition hover:bg-neutral-800"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-neutral-800 bg-neutral-900 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo light />
              <p className="mt-4 max-w-sm text-sm text-neutral-400">
                Sighten is an AI Search Visibility platform for businesses across
                16+ industries. We measure, improve, and monitor your presence in
                AI-generated answers — no manipulation, no fake reviews, just
                real data and measurable results.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Platform</h4>
              <ul className="mt-4 space-y-2 text-sm text-neutral-400">
                <li><a href="#platforms" className="transition hover:text-white">AI Platforms</a></li>
                <li><a href="#how-it-works" className="transition hover:text-white">Methodology</a></li>
                <li><a href="#industries" className="transition hover:text-white">Industries</a></li>
                <li><a href="#pricing" className="transition hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-neutral-400">
                <li><a href="#faq" className="transition hover:text-white">FAQ</a></li>
                <li><Link to="/auth" className="transition hover:text-white">Client Portal</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-neutral-800 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-neutral-500">© 2026 Sighten. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Ethical methodology</span>
              <span className="flex items-center gap-2"><Globe2 className="h-4 w-4" /> Multi-region</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
