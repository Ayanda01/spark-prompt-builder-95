import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/PageHeader";
import { AIOutput } from "@/components/AIOutput";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { runAI } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/app/meetings")({
  head: () => ({ meta: [{ title: "Meeting Summarizer — WorkFlow AI" }] }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (notes.trim().length < 30) {
      toast.error("Paste at least a few lines of meeting notes");
      return;
    }
    setLoading(true);
    try {
      const res = await runAI({
        data: { task: "summary", messages: [{ role: "user", content: notes }] },
      });
      setOutput(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to summarize");
    } finally {
      setLoading(false);
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meeting-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={<FileText className="h-5 w-5" />}
        title="Meeting Notes Summarizer"
        description="Turn raw meeting notes into structured summaries with action items."
      />
      <AIDisclaimer />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="notes">Raw meeting notes</Label>
            <Textarea
              id="notes"
              rows={16}
              placeholder="Paste your meeting transcript or rough notes here…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={20000}
            />
            <p className="text-right text-xs text-muted-foreground">{notes.length} chars</p>
          </div>
          <Button onClick={summarize} disabled={loading} size="lg" className="w-full">
            <Wand2 className="mr-2 h-4 w-4" />
            {loading ? "Summarizing…" : "Summarize"}
          </Button>
        </div>
        <div className="space-y-3">
          <AIOutput
            content={output}
            loading={loading}
            onRegenerate={output ? summarize : undefined}
            emptyHint="Your structured summary will appear here."
          />
          {output && (
            <Button variant="outline" size="sm" onClick={downloadTxt}>
              Download as .txt
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
