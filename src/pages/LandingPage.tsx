import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  Globe2,
  Menu,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import Logo from "../components/Logo";
import ScoreRing from "../components/ScoreRing";
const PLATFORMS = [
  { name: "ChatGPT", score: 42, color: "bg-brand-500" },
  { name: "Perplexity", score: 38, color: "bg-accent-500" },
  { name: "Gemini", score: 31, color: "bg-amber-500" },
  { name: "Google AI", score: 33, color: "bg-rose-500" },
  { name: "Claude", score: 35, color: "bg-orange-500" },
  { name: "DeepSeek", score: 29, color: "bg-violet-500" },
];


export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="hidden items-center gap-9 md:flex">
            <a href="#how-it-works" className="text-sm font-medium text-neutral-600 transition hover:text-brand-600">How It Works</a>
            <a href="#industries" className="text-sm font-medium text-neutral-600 transition hover:text-brand-600">Industries</a>
            <a href="#pricing" className="text-sm font-medium text-neutral-600 transition hover:text-brand-600">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-neutral-600 transition hover:text-brand-600">FAQ</a>
            <Link to="/auth" className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 hover:shadow-md">Sign In</Link>
          </div>
          <button className="rounded-lg p-2 text-neutral-600 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-neutral-200 bg-white px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">How It Works</a>
              <a href="#industries" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">Industries</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">Pricing</a>
              <a href="#faq" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-600">FAQ</a>
              <Link to="/auth" className="rounded-xl bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white">Sign In</Link>
            </div>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-white to-neutral-50">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-56 top-32 h-[520px] w-[520px] rounded-full bg-brand-200/40 blur-3xl" />
          <div className="absolute -right-48 top-44 h-[500px] w-[500px] rounded-full bg-accent-100/50 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
            <div className="animate-fade-in-up">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-5 py-2.5 text-sm font-medium text-brand-700">
                <Sparkles className="h-4 w-4" />
                AI Search Visibility for Any Business
              </div>
              <h1 className="max-w-3xl text-balance text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-neutral-950 md:text-7xl">
                When customers ask AI for a recommendation, <span className="gradient-text">are they mentioning you?</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600 md:text-xl">
                We measure how often ChatGPT, Perplexity, Gemini, Claude, DeepSeek, and Google AI recommend your business — then improve the real-world signals that drive those mentions. Works for dental clinics, law firms, HVAC companies, hotels, SaaS products, and 12+ more industries.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/auth" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 hover:shadow-xl">
                  Get Your Free Visibility Check <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>
                <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-7 py-4 text-base font-semibold text-neutral-700 transition hover:border-brand-300 hover:bg-brand-50/40">
                  See How It Works
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-neutral-500">
                {['No fake reviews', 'No AI manipulation', 'Real data, real results'].map((item) => (
                  <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-600" />{item}</span>
                ))}
              </div>
            </div>

            <div className="animate-scale-in">
              <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-2xl shadow-neutral-300/40 md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Riverside Dental — Austin, TX</p>
                    <p className="mt-1 text-xl font-bold text-neutral-950">AI Visibility Score</p>
                  </div>
                  <div className="whitespace-nowrap rounded-lg bg-accent-50 px-3 py-2 text-sm font-semibold text-accent-700">↑ 18% this month</div>
                </div>
                <div className="mb-7 flex justify-center"><ScoreRing score={36} size={174} /></div>
                <div className="space-y-3.5">
                  {PLATFORMS.map((platform) => (
                    <div key={platform.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium text-neutral-600">{platform.name}</span>
                        <span className="font-bold text-neutral-950">{platform.score}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-neutral-100">
                        <div className={`h-full rounded-full ${platform.color}`} style={{ width: `${platform.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-neutral-100 pt-5">
                  <div className="flex items-center justify-between text-sm"><span className="text-neutral-500">Queries tracked</span><span className="font-bold text-neutral-950">30</span></div>
                  <div className="mt-2 flex items-center justify-between text-sm"><span className="text-neutral-500">Mentioned in</span><span className="font-bold text-neutral-950">11 of 30</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-neutral-200/80 pt-8">
            <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">Monitoring six AI search platforms</p>
            <div className="mt-5 flex flex-wrap justify-center gap-x-9 gap-y-3 text-sm font-semibold text-neutral-600">
              {PLATFORMS.map((platform) => <span key={platform.name} className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${platform.color}`} />{platform.name}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-neutral-200 px-6 md:grid-cols-4">
          {[{ value: '1.2B+', label: 'AI searches per month' }, { value: '73%', label: 'of consumers use AI before buying' }, { value: '6', label: 'AI platforms we monitor' }, { value: '16+', label: 'industries supported' }].map((stat) => (
            <div key={stat.label} className="px-4 py-8 text-center md:px-6"><div className="text-3xl font-bold text-brand-600">{stat.value}</div><div className="mt-1 text-sm text-neutral-500">{stat.label}</div></div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700"><Activity className="h-4 w-4" /> The Process</div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">Find, audit, improve, monitor</h2>
            <p className="mt-4 text-lg text-neutral-600">A clear operating system for turning AI invisibility into measurable business growth.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, title: 'Measure visibility', text: 'Test real customer questions across six AI platforms and establish your baseline score.' },
              { icon: BarChart3, title: 'Analyze the gap', text: 'See where competitors appear, which sources they earn, and what signals drive the difference.' },
              { icon: Target, title: 'Improve signals', text: 'Strengthen your website, listings, reviews, and authoritative third-party presence.' },
              { icon: TrendingUp, title: 'Monitor progress', text: 'Track score movement, platform performance, and opportunities every month.' },
            ].map((step, index) => (
              <div key={step.title} className="relative rounded-2xl border border-neutral-200 bg-white p-7 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50"><step.icon className="h-6 w-6 text-brand-600" /></div>
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-600">0{index + 1}</div>
                <h3 className="text-lg font-bold text-neutral-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700"><Globe2 className="h-4 w-4" /> What drives visibility</div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">Become the business AI can confidently recommend.</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">AI recommendations are built from many real-world signals. Sighten shows you which ones are helping, which ones are missing, and what to improve next.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { icon: Search, title: "Customer language", text: "Understand the exact questions your customers ask and whether your business appears in the answers." },
              { icon: ShieldCheck, title: "Trusted business data", text: "Strengthen the website, listings, reviews, and third-party sources AI systems use to verify your business." },
              { icon: BarChart3, title: "Competitive position", text: "See where competitors are being recommended more often and turn those gaps into an action plan." },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-7 transition hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-50/40 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm"><card.icon className="h-6 w-6 text-brand-600" /></div>
                <h3 className="text-lg font-bold text-neutral-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{card.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand-100 bg-brand-50/60 px-7 py-6 md:flex-row">
            <div><p className="font-semibold text-neutral-950">Your industry is already supported.</p><p className="mt-1 text-sm text-neutral-600">From dental clinics and law firms to SaaS companies and hotels, every account gets industry-specific queries.</p></div>
            <Link to="/auth" className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">Check your visibility <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-300"><Bot className="h-4 w-4" /> Your command center</div><h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">A clear view of your AI visibility</h2><p className="mt-4 text-lg text-neutral-400">See the metrics that matter to leadership: visibility, competitive position, source coverage, and momentum.</p></div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6"><div className="mb-4 flex items-center gap-2 text-neutral-400"><BarChart3 className="h-5 w-5" /><span className="text-sm font-medium">Platform performance</span></div><div className="space-y-3">{PLATFORMS.map((platform) => <div key={platform.name}><div className="mb-1 flex justify-between text-xs"><span className="text-neutral-400">{platform.name}</span><span className="font-bold text-white">{platform.score}%</span></div><div className="h-2 overflow-hidden rounded-full bg-neutral-700"><div className={`h-full rounded-full ${platform.color}`} style={{ width: `${platform.score}%` }} /></div></div>)}</div></div>
            <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6"><div className="mb-4 flex items-center gap-2 text-neutral-400"><TrendingUp className="h-5 w-5" /><span className="text-sm font-medium">Visibility trend</span></div><div className="flex h-40 items-end justify-around gap-3">{[{ month: 'May', value: 18 }, { month: 'Jun', value: 24 }, { month: 'Jul', value: 31 }, { month: 'Aug', value: 36 }].map((item) => <div key={item.month} className="flex flex-1 flex-col items-center gap-2"><div className="flex w-full flex-1 items-end"><div className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400" style={{ height: `${item.value}%` }} /></div><span className="text-xs text-neutral-500">{item.month}</span><span className="text-xs font-bold text-white">{item.value}%</span></div>)}</div></div>
            <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6"><div className="mb-4 flex items-center gap-2 text-neutral-400"><ShieldCheck className="h-5 w-5" /><span className="text-sm font-medium">Trust by design</span></div><div className="flex justify-center py-3"><ScoreRing score={36} size={130} dark /></div><p className="mt-3 text-center text-sm leading-6 text-neutral-400">Ethical improvements built on accurate business information, not manipulation.</p></div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6"><div className="mx-auto max-w-3xl text-center"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-600"><Target className="h-4 w-4" /> Simple pricing</div><h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">Start with an audit. Grow with a plan.</h2><p className="mt-4 text-lg text-neutral-600">Flexible engagement models for local operators, growing teams, and multi-location businesses.</p></div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[{ tier: '01', name: 'AI Visibility Audit', price: '$300', range: '– $750', note: 'One-time deep analysis', features: ['50–100 customer queries tested', 'All 6 AI platforms covered', 'Competitor visibility analysis', 'Citation and source audit', 'Detailed findings report', 'Prioritized recommendations'], cta: 'Request Audit' }, { tier: '02', name: 'Visibility Management', price: '$500', range: '– $1,000/mo', note: 'Ongoing monitoring & improvement', features: ['Monthly AI query monitoring', 'Competitor tracking', 'Website and content recommendations', 'Source and citation analysis', 'Implementation of agreed changes', 'Monthly visibility report', 'Ongoing optimization'], cta: 'Start Management Plan', featured: true }, { tier: '03', name: 'Growth', price: '$1,000', range: '– $2,000+/mo', note: 'Multi-location and enterprise', features: ['100+ tracked queries', 'Multiple locations tracked', 'Expanded competitor set', 'Content creation included', 'Reputation management', 'Third-party authority building', 'Dedicated strategy and reporting'], cta: 'Contact for Growth' }].map((plan) => <div key={plan.name} className={`relative rounded-2xl border bg-white p-8 ${plan.featured ? 'border-brand-500 shadow-xl shadow-brand-600/10' : 'border-neutral-200'}`}>{plan.featured && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-bold text-white">MOST POPULAR</div>}<p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Tier {plan.tier}</p><h3 className="mt-2 text-lg font-bold text-neutral-950">{plan.name}</h3><p className="mt-1 text-sm text-neutral-500">{plan.note}</p><div className="mt-6 border-y border-neutral-100 py-5"><span className="text-4xl font-bold text-neutral-950">{plan.price}</span><span className="text-neutral-500"> {plan.range}</span></div><ul className="mt-6 space-y-3 text-sm text-neutral-600">{plan.features.map((feature) => <li key={feature} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />{feature}</li>)}</ul><Link to="/auth" className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition ${plan.featured ? 'bg-brand-600 text-white hover:bg-brand-700' : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50'}`}>{plan.cta}</Link></div>)}</div>
        </div>
      </section>

      <section id="faq" className="bg-white py-20 md:py-28"><div className="mx-auto max-w-3xl px-6"><div className="text-center"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-600"><MessageSquare className="h-4 w-4" /> Questions</div><h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">Frequently Asked Questions</h2></div><div className="mt-12 space-y-3">{[{ q: 'Is this just another SEO service?', a: "No. Traditional SEO optimizes for Google's search results. We measure and improve how often your business appears in AI-generated answers from ChatGPT, Perplexity, Gemini, Claude, DeepSeek, and Google AI — a different landscape with different signals." }, { q: 'Do you guarantee AI rankings?', a: "No. AI systems do not produce rankings in the same way Google does. We measure visibility, identify gaps versus competitors, and strengthen the real-world information AI systems rely on." }, { q: 'Which industries do you support?', a: 'We support dental, legal, medical, med spas, HVAC, plumbing, roofing, hotels, restaurants, real estate, SaaS, e-commerce, B2B, education, automotive, and more. The core service stays the same while query sets and recommendations are customized.' }, { q: 'How long until I see results?', a: 'AI visibility changes typically take two to three months before meaningful movement. We show month-over-month progress and explain what changed.' }, { q: 'Do you use fake reviews or manipulate AI?', a: 'Never. We strengthen your real business information — your website, listings, reviews, and third-party presence — so AI systems have accurate, trustworthy data to work with.' }, { q: 'Which AI platforms do you monitor?', a: 'We monitor ChatGPT, Perplexity, Gemini, Claude, DeepSeek, and Google AI. As important new platforms emerge, they can be added to your monitoring program.' }].map((item, index) => <div key={item.q} className="overflow-hidden rounded-xl border border-neutral-200"><button className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left" onClick={() => setOpenFaq(openFaq === index ? null : index)}><span className="font-semibold text-neutral-950">{item.q}</span><ChevronDown className={`h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button><div className={`grid transition-all duration-300 ${openFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden"><p className="px-6 pb-5 text-sm leading-6 text-neutral-600">{item.a}</p></div></div></div>)}</div></div></section>

      <section className="relative overflow-hidden bg-brand-600 py-20 md:py-24"><div className="absolute inset-0"><div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" /><div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-brand-700/30 blur-3xl" /></div><div className="relative mx-auto max-w-3xl px-6 text-center"><h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Find out if AI mentions your business</h2><p className="mt-4 text-lg text-brand-100">Sign up for a free account and get an initial visibility check across 30 customer queries and six AI platforms.</p><Link to="/auth" className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50">Get Started Free <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></Link></div></section>

      <footer className="bg-neutral-950 py-12"><div className="mx-auto max-w-7xl px-6"><div className="flex flex-col items-center justify-between gap-6 md:flex-row"><Logo light /><div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-400"><a href="#how-it-works" className="hover:text-white">How It Works</a><a href="#industries" className="hover:text-white">Industries</a><a href="#pricing" className="hover:text-white">Pricing</a><a href="#faq" className="hover:text-white">FAQ</a><Link to="/auth" className="hover:text-white">Sign In</Link></div></div><div className="mt-8 border-t border-neutral-800 pt-8 text-center text-sm text-neutral-500"><p>Sighten — AI Search Visibility for Any Business. No manipulation. No fake reviews. Just real data and real results.</p><p className="mt-2">© 2026 Sighten. All rights reserved.</p></div></div></footer>
    </div>
  );
}
