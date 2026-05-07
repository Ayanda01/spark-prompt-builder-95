import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/PageHeader";
import { AIOutput } from "@/components/AIOutput";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { runAI } from "@/server/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/app/research")({
  head: () => ({ meta: [{ title: "Research Assistant — WorkFlow AI" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!topic.trim() && !content.trim()) {
      toast.error("Add a topic, question, or text to summarize");
      return;
    }
    setLoading(true);
    try {
      const prompt = `Topic / question: ${topic || "(none)"}\n\nArticle / source text:\n${content || "(none)"}\n\nProduce simplified insights.`;
      const res = await runAI({ data: { task: "research", messages: [{ role: "user", content: prompt }] } });
      setOutput(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={<Search className="h-5 w-5" />}
        title="AI Research Assistant"
        description="Distill articles and complex topics into clear, actionable insights."
      />
      <AIDisclaimer />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic or research question</Label>
            <Input
              id="topic"
              placeholder="e.g. How does retrieval-augmented generation work?"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              maxLength={300}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Article text (optional)</Label>
            <Textarea
              id="content"
              rows={12}
              placeholder="Paste an article or notes to summarize…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={20000}
            />
          </div>
          <Button onClick={run} disabled={loading} size="lg" className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? "Researching…" : "Get insights"}
          </Button>
        </div>
        <div>
          <AIOutput
            content={output}
            loading={loading}
            onRegenerate={output ? run : undefined}
            emptyHint="Key insights and a simplified explanation will appear here."
          />
        </div>
      </div>
    </div>
  );
}
