import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { MessagesSquare, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/PageHeader";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { runAI } from "@/server/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/app/chat")({
  head: () => ({ meta: [{ title: "AI Chatbot — WorkFlow AI" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Write a professional follow-up email.",
  "Summarize these meeting notes.",
  "Plan my tasks for today.",
  "Explain this report in simple terms.",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const newMsgs: Msg[] = [...messages, { role: "user", content }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const res = await runAI({ data: { task: "chat", messages: newMsgs } });
      setMessages((m) => [...m, { role: "assistant", content: res.content }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-4xl flex-col space-y-4">
      <PageHeader
        icon={<MessagesSquare className="h-5 w-5" />}
        title="AI Chatbot Assistant"
        description="Your conversational workplace co-pilot."
      />

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border bg-card shadow-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">How can I help you today?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try one of these to get started:</p>
              <div className="mt-6 grid w-full max-w-lg gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-xl border bg-muted/40 p-3 text-left text-sm transition-colors hover:bg-muted"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <pre className="whitespace-pre-wrap break-words font-sans">{m.content}</pre>
              </div>
              {m.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t bg-background/60 p-4 backdrop-blur">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask anything…"
              rows={1}
              className="min-h-[44px] resize-none"
              maxLength={2000}
            />
            <Button onClick={() => send()} disabled={loading || !input.trim()} size="icon" className="h-11 w-11 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <AIDisclaimer />
    </div>
  );
}
