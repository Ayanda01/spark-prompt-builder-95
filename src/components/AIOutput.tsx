import { useState } from "react";
import { Copy, Check, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AIOutputProps {
  content: string;
  loading?: boolean;
  onRegenerate?: () => void;
  emptyHint?: string;
}

export function AIOutput({ content, loading, onRegenerate, emptyHint }: AIOutputProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/30 p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Thinking…</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center text-sm text-muted-foreground">
        {emptyHint ?? "Output will appear here."}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border bg-card p-5 shadow-card">
        <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-card-foreground">
          {content}
        </pre>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">{content.length} characters</span>
        <div className="flex gap-2">
          {onRegenerate && (
            <Button variant="outline" size="sm" onClick={onRegenerate}>
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Regenerate
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={copy}>
            {copied ? (
              <Check className="mr-1.5 h-3.5 w-3.5" />
            ) : (
              <Copy className="mr-1.5 h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  );
}
