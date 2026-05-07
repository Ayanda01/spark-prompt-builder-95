import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { AIOutput } from "@/components/AIOutput";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { runAI } from "@/server/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/app/email")({
  head: () => ({ meta: [{ title: "Email Generator — WorkFlow AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("Client");
  const [tone, setTone] = useState("Formal");
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!purpose.trim()) {
      toast.error("Please describe the email purpose");
      return;
    }
    setLoading(true);
    try {
      const prompt = `Email purpose: ${purpose}\nRecipient type: ${recipient}\nTone: ${tone}\nAdditional notes: ${notes || "none"}\n\nGenerate the email.`;
      const res = await runAI({ data: { task: "email", messages: [{ role: "user", content: prompt }] } });
      setOutput(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={<Mail className="h-5 w-5" />}
        title="Smart Email Generator"
        description="Generate polished, on-tone professional emails in seconds."
      />
      <AIDisclaimer />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="purpose">Email purpose</Label>
            <Input
              id="purpose"
              placeholder="e.g. Follow up on delayed project delivery"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              maxLength={200}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Recipient</Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Client">Client</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Team Member">Team Member</SelectItem>
                  <SelectItem value="Vendor">Vendor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Informal">Informal</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Persuasive">Persuasive</SelectItem>
                  <SelectItem value="Apologetic">Apologetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional notes (optional)</Label>
            <Textarea
              id="notes"
              rows={5}
              placeholder="Key points to include, context, deadlines…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={1000}
            />
            <p className="text-right text-xs text-muted-foreground">{notes.length}/1000</p>
          </div>
          <Button onClick={generate} disabled={loading} className="w-full" size="lg">
            <Send className="mr-2 h-4 w-4" />
            {loading ? "Generating…" : "Generate email"}
          </Button>
        </div>
        <div>
          <AIOutput
            content={output}
            loading={loading}
            onRegenerate={output ? generate : undefined}
            emptyHint="Your generated email will appear here."
          />
        </div>
      </div>
    </div>
  );
}
