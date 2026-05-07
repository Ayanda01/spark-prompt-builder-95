import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListChecks,
  Search,
  MessagesSquare,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [{ title: "Dashboard — WorkFlow AI" }],
  }),
  component: Dashboard,
});

const tools = [
  { url: "/app/email", title: "Email Generator", desc: "Draft professional emails", icon: Mail },
  { url: "/app/meetings", title: "Meeting Summarizer", desc: "Extract action items", icon: FileText },
  { url: "/app/tasks", title: "Task Planner", desc: "Build a smart schedule", icon: ListChecks },
  { url: "/app/research", title: "Research Assistant", desc: "Simplify complex topics", icon: Search },
  { url: "/app/chat", title: "AI Chatbot", desc: "Ask anything", icon: MessagesSquare },
];

const stats = [
  { label: "Time saved this week", value: "8.4h", icon: Clock },
  { label: "AI tasks completed", value: "127", icon: Sparkles },
  { label: "Productivity score", value: "+34%", icon: TrendingUp },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold">Welcome back 👋</h1>
        <p className="mt-1 text-muted-foreground">Here's your AI workspace at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Quick actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.url}
              to={t.url}
              className="group rounded-2xl border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <t.icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <h3 className="mt-4 font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="rounded-2xl border bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent AI activity</h2>
        </div>
        <div className="space-y-3">
          {[
            ["Email", "Follow-up to client on proposal", "2h ago"],
            ["Summary", "Q2 Planning meeting notes", "Yesterday"],
            ["Plan", "Tomorrow's daily schedule", "Yesterday"],
          ].map(([type, title, time]) => (
            <div key={title} className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{type}</p>
                <p className="text-sm font-medium">{title}</p>
              </div>
              <span className="text-xs text-muted-foreground">{time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-xs text-warning-foreground">
        <strong>Ethical AI notice:</strong> Outputs may contain inaccuracies or bias.
        Always review AI-generated content before sharing externally or making decisions.
      </div>

      <div className="flex justify-end">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">← Back to landing page</Link>
        </Button>
      </div>
    </div>
  );
}
