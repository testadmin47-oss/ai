import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, Eye, TrendingUp, ShieldCheck, ChartBar as BarChart3, Target, ArrowRight, Check, Menu, X, Bot, MessageSquare, Activity, Sparkles, ChevronDown } from "lucide-react";
import Logo from "../components/Logo";
import ScoreRing from "../components/ScoreRing";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ===== Nav ===== */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="hidden items-center gap-8 md:flex">
            <a href="#how-it-works" className="text-sm font-medium text-neutral-600 transition hover:text-brand-600">How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-neutral-600 transition hover:text-brand-600">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-neutral-600 transition hover:text-brand-600">FAQ</a>
            <Link
              to="/auth"
              className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 hover:shadow-md"
            >
              Sign In
            </Link>
          </div>
          <button
            className="rounded-lg p-2 text-neutral-600 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-neutral-200 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">How It Works</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">Pricing</a>
              <a href="#faq" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">FAQ</a>
              <Link to="/auth" className="rounded-lg bg-brand-600 px-5 py-2.5 text-center text-sm font-semibold text-white">Sign In</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/40 to-neutral-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
          <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="animate-fade-in-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
                <Sparkles className="h-4 w-4" />
                AI Search Visibility for Dental Practices
              </div>
              <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 md:text-6xl">
                When patients ask AI for a dentist,{" "}
                <span className="gradient-text">are they mentioning you?</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
                We measure how often ChatGPT, Perplexity, Gemini, and Google AI
                recommend your practice — then improve the real-world signals that
                drive those mentions.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/auth"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30"
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
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-neutral-500">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-600" /> No fake reviews
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-600" /> No AI manipulation
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-600" /> Real data, real results
                </span>
              </div>
            </div>

            {/* Hero dashboard preview */}
            <div className="animate-scale-in">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl shadow-neutral-300/40">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Riverside Dental — Austin, TX</p>
                    <p className="text-lg font-bold text-neutral-900">AI Visibility Score</p>
                  </div>
                  <div className="rounded-lg bg-accent-50 px-3 py-1 text-sm font-semibold text-accent-700">
                    ↑ 18% this month
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-center">
                  <ScoreRing score={36} size={160} />
                </div>

                <div className="space-y-3">
                  {[
                    { name: "ChatGPT", score: 42, color: "bg-brand-500" },
                    { name: "Perplexity", score: 38, color: "bg-accent-500" },
                    { name: "Gemini", score: 31, color: "bg-amber-500" },
                    { name: "Google AI", score: 33, color: "bg-rose-500" },
                  ].map((p) => (
                    <div key={p.name}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-neutral-600">{p.name}</span>
                        <span className="font-semibold text-neutral-900">{p.score}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className={`h-full rounded-full ${p.color} transition-all duration-1000`}
                          style={{ width: `${p.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-neutral-100 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Queries tracked</span>
                    <span className="font-bold text-neutral-900">30</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Mentioned in</span>
                    <span className="font-bold text-neutral-900">11 of 30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats bar ===== */}
      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-neutral-200 px-6 md:grid-cols-4">
          {[
            { value: "1.2B+", label: "AI searches per month" },
            { value: "73%", label: "of patients use AI before booking" },
            { value: "4", label: "AI platforms we monitor" },
            { value: "30+", label: "queries tracked per practice" },
          ].map((s) => (
            <div key={s.label} className="px-6 py-8 text-center">
              <div className="text-3xl font-bold text-brand-600">{s.value}</div>
              <div className="mt-1 text-sm text-neutral-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Problem section ===== */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Patients aren't searching Google anymore
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              They're asking ChatGPT, Perplexity, and Gemini for recommendations.
              If your practice isn't mentioned in the answer, you don't exist —
              no matter how good your SEO used to be.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100">
                <X className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">The old way</h3>
              <ul className="mt-4 space-y-3 text-neutral-600">
                {["Optimize for Google search rankings", "Hope patients find your website", "Compete on keywords, not mentions", "No idea what AI systems say about you"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-accent-200 bg-accent-50/50 p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100">
                <Check className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">The Sighten way</h3>
              <ul className="mt-4 space-y-3 text-neutral-600">
                {["Measure how often AI recommends your practice", "See exactly where competitors win", "Strengthen real signals AI systems trust", "Track visibility month over month"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="how-it-works" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-600">
              <Activity className="h-4 w-4" /> The Process
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Find, Audit, Improve, Monitor
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              A clear five-step process that turns AI invisibility into measurable growth.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Search, title: "Test Visibility", desc: "We run 30+ patient queries across ChatGPT, Perplexity, Gemini, and Google AI to see if your practice appears.", color: "brand" },
              { icon: BarChart3, title: "Audit & Analyze", desc: "Deep audit comparing your visibility against top competitors, with gap analysis by query category.", color: "brand" },
              { icon: Target, title: "Improve Signals", desc: "Strengthen your website, business listings, reviews, and third-party presence — the real data AI systems use.", color: "accent" },
              { icon: TrendingUp, title: "Monitor Monthly", desc: "Every month we re-test all queries and track your visibility trend alongside competitors.", color: "accent" },
              { icon: ShieldCheck, title: "Report & Retain", desc: "You receive a clear monthly report showing score changes, improvements, and next steps.", color: "brand" },
            ].map((step, i) => (
              <div
                key={step.title}
                className="group relative rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-lg"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-${step.color}-100`}>
                  <step.icon className={`h-6 w-6 text-${step.color}-600`} />
                </div>
                <div className="mb-1 text-xs font-bold text-neutral-400">STEP {i + 1}</div>
                <h3 className="text-lg font-bold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.desc}</p>
                {i < 4 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-neutral-300 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Dashboard preview ===== */}
      <section className="bg-neutral-900 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-300">
              <Bot className="h-4 w-4" /> Your Dashboard
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              See exactly where you stand — and where you're heading
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              A live dashboard tracking your AI visibility score, platform breakdown,
              competitor comparison, and monthly trend.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Score card */}
            <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6">
              <div className="mb-4 flex items-center gap-2 text-neutral-400">
                <Eye className="h-5 w-5" />
                <span className="text-sm font-medium">Visibility Score</span>
              </div>
              <div className="flex justify-center">
                <ScoreRing score={36} size={140} dark />
              </div>
            </div>

            {/* Competitor card */}
            <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6">
              <div className="mb-4 flex items-center gap-2 text-neutral-400">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm font-medium">Competitor Comparison</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: "BrightSmile Dental", score: 78, isYou: false },
                  { name: "Lakeside Family Dental", score: 64, isYou: false },
                  { name: "Riverside (You)", score: 36, isYou: true },
                  { name: "Austin Premier", score: 52, isYou: false },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className={`w-28 flex-shrink-0 text-xs ${c.isYou ? "font-bold text-brand-400" : "text-neutral-400"}`}>
                      {c.name}
                    </span>
                    <div className="h-5 flex-1 overflow-hidden rounded-full bg-neutral-700">
                      <div
                        className={`h-full rounded-full ${c.isYou ? "bg-brand-500" : "bg-neutral-500"}`}
                        style={{ width: `${c.score}%` }}
                      />
                    </div>
                    <span className={`w-8 text-right text-xs font-bold ${c.isYou ? "text-brand-400" : "text-neutral-400"}`}>{c.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend card */}
            <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6">
              <div className="mb-4 flex items-center gap-2 text-neutral-400">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">4-Month Trend</span>
              </div>
              <div className="flex h-32 items-end justify-around gap-2">
                {[
                  { m: "May", v: 18 },
                  { m: "Jun", v: 24 },
                  { m: "Jul", v: 31 },
                  { m: "Aug", v: 36 },
                ].map((d) => (
                  <div key={d.m} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400 transition-all duration-1000"
                        style={{ height: `${d.v}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-500">{d.m}</span>
                    <span className="text-xs font-bold text-white">{d.v}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              See Your Dashboard
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-600">
              <Target className="h-4 w-4" /> Simple Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Start with an audit, grow with a plan
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              No long-term contracts. Cancel anytime. Every plan includes our core
              visibility measurement across all four AI platforms.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Audit */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <h3 className="text-lg font-bold text-neutral-900">AI Visibility Audit</h3>
              <p className="mt-1 text-sm text-neutral-500">One-time deep analysis</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-neutral-900">$300</span>
                <span className="text-neutral-500"> – $750</span>
              </div>
              <p className="mt-1 text-sm text-neutral-500">depending on practice size</p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                {["50–100 patient queries tested", "All 4 AI platforms covered", "Competitor visibility analysis", "Citation and source audit", "Detailed findings report", "Improvement recommendations"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
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
            <div className="relative rounded-2xl border-2 border-brand-500 bg-white p-8 shadow-xl shadow-brand-600/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-bold text-white">
                MOST POPULAR
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Visibility Management</h3>
              <p className="mt-1 text-sm text-neutral-500">Ongoing monitoring & improvement</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-neutral-900">$500</span>
                <span className="text-neutral-500"> – $1,000/mo</span>
              </div>
              <p className="mt-1 text-sm text-neutral-500">per location</p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                {["Monthly AI query monitoring", "Competitor tracking", "Website & content recommendations", "Source and citation analysis", "Implementation of agreed changes", "Monthly visibility report", "Ongoing optimization"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className="mt-8 block rounded-xl bg-brand-600 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Start Management Plan
              </Link>
            </div>

            {/* Growth */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <h3 className="text-lg font-bold text-neutral-900">Growth</h3>
              <p className="mt-1 text-sm text-neutral-500">For multi-location practices</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-neutral-900">$1,000</span>
                <span className="text-neutral-500"> – $2,000+/mo</span>
              </div>
              <p className="mt-1 text-sm text-neutral-500">per practice</p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                {["Larger query set (100+ queries)", "Multiple locations tracked", "More competitors monitored", "Content creation included", "Reputation management", "Third-party authority building", "Deeper reporting & strategy"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
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

          <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50/50 p-6 text-center">
            <p className="text-sm text-neutral-700">
              <strong>Why it pays for itself:</strong> A single new implant patient
              can be worth $2,000+. If improved AI visibility brings in even one
              additional patient, your plan is covered.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-600">
              <MessageSquare className="h-4 w-4" /> Questions
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {[
              {
                q: "Is this just another SEO service?",
                a: "No. Traditional SEO optimizes for Google's search results. We measure and improve how often your practice appears in AI-generated answers from ChatGPT, Perplexity, Gemini, and Google AI — a completely different landscape with different signals.",
              },
              {
                q: "Do you guarantee AI rankings?",
                a: "No, and you should be skeptical of anyone who does. AI systems don't have \"rankings\" the way Google does. We measure your visibility, identify gaps, and strengthen the real-world information AI systems rely on — then track the results over time.",
              },
              {
                q: "How is this different from what an SEO agency does?",
                a: "SEO agencies focus on Google search rankings. We focus on AI-generated answers. The signals are different: AI systems weight third-party coverage, review quality, structured data, and content clarity differently than Google's algorithm. We specialize in that difference.",
              },
              {
                q: "How long until I see results?",
                a: "AI visibility changes take time — typically 2–3 months before meaningful movement. We set clear expectations upfront and show you month-over-month progress so you always know where things stand.",
              },
              {
                q: "Do you use fake reviews or manipulate AI?",
                a: "Never. We don't create fake reviews, fake websites, or fake recommendations. We strengthen your real business information — your website, listings, reviews, and third-party presence — so AI systems have accurate, trustworthy data to work with.",
              },
              {
                q: "Which AI platforms do you monitor?",
                a: "We currently track ChatGPT, Perplexity, Gemini, and Google AI Overviews — the four systems patients use most. As new platforms emerge, we add them to your monitoring automatically.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-neutral-900">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
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
      <section className="relative overflow-hidden bg-brand-600 py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Find out if AI mentions your practice
          </h2>
          <p className="mt-4 text-lg text-brand-100">
            Sign up for a free account and we'll run an initial visibility check
            across 30 patient queries on four AI platforms.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/auth"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-300 bg-transparent px-7 py-3.5 text-base font-semibold text-white transition hover:bg-brand-500/30"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-neutral-900 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Logo light />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400">
              <a href="#how-it-works" className="transition hover:text-white">How It Works</a>
              <a href="#pricing" className="transition hover:text-white">Pricing</a>
              <a href="#faq" className="transition hover:text-white">FAQ</a>
              <Link to="/auth" className="transition hover:text-white">Sign In</Link>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-800 pt-8 text-center text-sm text-neutral-500">
            <p>Sighten — AI Search Visibility for Dental Practices. We measure, improve, and monitor your visibility in AI-generated answers. No manipulation. No fake reviews. Just real data and real results.</p>
            <p className="mt-2">© 2026 Sighten. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
