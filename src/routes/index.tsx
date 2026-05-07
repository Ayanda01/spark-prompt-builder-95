import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessagesSquare,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkFlow AI — Boost Workplace Productivity with AI" },
      {
        name: "description",
        content:
          "Automate emails, summarize meetings, plan tasks, and simplify research with one intelligent AI assistant built for modern teams.",
      },
      { property: "og:title", content: "WorkFlow AI — Boost Workplace Productivity with AI" },
      {
        property: "og:description",
        content:
          "Your AI-powered productivity assistant for emails, meetings, planning, and research.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Mail, title: "Smart Email Generator", desc: "Draft polished emails in seconds with the right tone for any recipient." },
  { icon: FileText, title: "Meeting Summarizer", desc: "Turn long meeting notes into action items, decisions, and deadlines." },
  { icon: ListChecks, title: "AI Task Planner", desc: "Prioritize your day and build a structured schedule that actually works." },
  { icon: Search, title: "Research Assistant", desc: "Distill articles and complex topics into simple, actionable insights." },
  { icon: MessagesSquare, title: "Workplace Chatbot", desc: "Ask anything — your AI co-worker is always one message away." },
  { icon: Shield, title: "Responsible AI", desc: "Built-in disclaimers, validation prompts, and bias awareness throughout." },
];

const steps = [
  { n: "01", title: "Pick a tool", desc: "Choose from email, meetings, tasks, research, or chat." },
  { n: "02", title: "Give context", desc: "Share your inputs — the AI does the heavy lifting." },
  { n: "03", title: "Review & ship", desc: "Refine, copy, or export the output. You're always in control." },
];

const testimonials = [
  { quote: "Saves me an hour a day on email alone. The tone selector is magic.", name: "Priya S.", role: "Product Manager" },
  { quote: "Meeting summaries used to take 30 minutes. Now they're done before I close my laptop.", name: "Marcus T.", role: "Engineering Lead" },
  { quote: "The task planner brought structure to my chaotic week. Genuinely useful.", name: "Elena R.", role: "Operations" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold">WorkFlow AI</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <Button asChild size="sm">
            <Link to="/app">Open app <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Zap className="h-3.5 w-3.5 text-primary" />
            Powered by Lovable AI
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Boost workplace productivity with{" "}
            <span className="text-gradient">AI</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Automate emails, summarize meetings, plan tasks, and simplify research using one intelligent assistant.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="shadow-glow">
              <Link to="/app">Get started <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/app/chat">Try the demo</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> 5 AI tools included</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Responsible AI built-in</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold">Everything you need to work smarter</h2>
          <p className="mt-3 text-muted-foreground">Five focused AI tools, one clean dashboard.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold">How it works</h2>
            <p className="mt-3 text-muted-foreground">From input to insight in three steps.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border bg-card p-8 shadow-card">
                <div className="font-display text-5xl font-semibold text-gradient">{s.n}</div>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-4xl font-semibold">Get hours back, every week</h2>
            <p className="mt-4 text-muted-foreground">
              WorkFlow AI removes the small frictions that slow your day down — drafting, summarizing, planning. So you can spend time where it matters.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ["Save 5–10 hours per week", "Automate repetitive writing and planning."],
                ["Stay organized effortlessly", "AI-prioritized task lists and schedules."],
                ["Communicate with confidence", "Polished emails matched to your tone."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">{t}</p>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
            <div className="relative rounded-2xl border bg-card p-6 shadow-elegant">
              <div className="space-y-3">
                {features.slice(0, 4).map((f) => (
                  <div key={f.title} className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                      <f.icon className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium">{f.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold">Loved by busy professionals</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border bg-card p-6 shadow-card">
                <blockquote className="text-sm leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.name}</span> · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-center text-4xl font-semibold">Frequently asked</h2>
        <Accordion type="single" collapsible className="mt-10">
          {[
            ["Is WorkFlow AI free to try?", "Yes — open the app and start using all 5 tools immediately."],
            ["What AI model powers this?", "We use Google Gemini through the Lovable AI gateway for fast, high-quality responses."],
            ["Is my data private?", "Inputs are sent to the AI gateway only to generate your output and are not used to train models."],
            ["How accurate is the output?", "AI-generated content may need human review. We surface disclaimers across the app to remind you."],
          ].map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-primary p-12 text-center shadow-elegant">
          <h2 className="font-display text-4xl font-semibold text-primary-foreground">Ready to work smarter?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Join the professionals saving hours every week with AI-powered workflows.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/app">Open WorkFlow AI <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            © {new Date().getFullYear()} WorkFlow AI. Built responsibly.
          </div>
          <p>AI-generated content may require human review.</p>
        </div>
      </footer>
    </div>
  );
}
