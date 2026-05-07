import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon, Shield } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — WorkFlow AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        icon={<SettingsIcon className="h-5 w-5" />}
        title="Settings"
        description="Manage preferences and review responsible AI guidelines."
      />

      <div className="rounded-2xl border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold">Preferences</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Theme and personalization options will be available here.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-card">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Shield className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-semibold">Responsible AI</h2>
        </div>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li>• AI-generated content may contain inaccuracies — always review before sharing.</li>
          <li>• Avoid pasting confidential information you wouldn't want processed by an AI provider.</li>
          <li>• Be aware that language models can reflect bias — validate sensitive outputs.</li>
          <li>• Use AI as a co-pilot, not a replacement for human judgment in critical decisions.</li>
        </ul>
      </div>
    </div>
  );
}
