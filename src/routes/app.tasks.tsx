import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/PageHeader";
import { AIOutput } from "@/components/AIOutput";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { runAI } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/app/tasks")({
  head: () => ({ meta: [{ title: "Task Planner — WorkFlow AI" }] }),
  component: TasksPage,
});

function TasksPage() {
  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState("9:00 - 17:00");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const plan = async () => {
    if (!tasks.trim()) {
      toast.error("Add at least one task");
      return;
    }
    setLoading(true);
    try {
      const prompt = `Available working hours: ${hours}\n\nTasks (one per line, format: task — priority — due date):\n${tasks}\n\nCreate a structured plan.`;
      const res = await runAI({ data: { task: "tasks", messages: [{ role: "user", content: prompt }] } });
      setOutput(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={<ListChecks className="h-5 w-5" />}
        title="AI Task Planner"
        description="Prioritize tasks and build a structured daily schedule."
      />
      <AIDisclaimer />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="hours">Available working hours</Label>
            <Input
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="e.g. 9:00 - 17:00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tasks">Your tasks</Label>
            <Textarea
              id="tasks"
              rows={12}
              placeholder={`Finish Q3 report — high — Friday\nReview PRs — medium — today\nClient call prep — high — tomorrow`}
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              maxLength={5000}
            />
          </div>
          <Button onClick={plan} disabled={loading} size="lg" className="w-full">
            <CalendarClock className="mr-2 h-4 w-4" />
            {loading ? "Planning…" : "Build my schedule"}
          </Button>
        </div>
        <div>
          <AIOutput
            content={output}
            loading={loading}
            onRegenerate={output ? plan : undefined}
            emptyHint="Your prioritized plan and time-blocked schedule will appear here."
          />
        </div>
      </div>
    </div>
  );
}
