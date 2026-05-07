import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "system" | "user" | "assistant"; content: string };

type AIInput = {
  task: "email" | "summary" | "tasks" | "research" | "chat";
  messages: Msg[];
};

const SYSTEM_PROMPTS: Record<AIInput["task"], string> = {
  email:
    "You are an expert workplace communication assistant. Generate a professional email. Always respond in this exact format:\n\nSubject: <subject line>\n\n<email body with greeting, paragraphs, and closing>\n\nKeep it clear, concise, and matched to the requested tone.",
  summary:
    "You are an expert meeting analyst. Summarize the provided meeting notes into well-structured Markdown with these sections (use ## headings):\n## Summary\n## Key Discussion Points\n## Decisions Made\n## Action Items\n## Deadlines\n## Responsible Team Members\nBe concise and accurate. If a section has no info, write 'None noted'.",
  tasks:
    "You are an AI productivity coach. Given a list of tasks with priorities, due dates, and available working hours, produce a structured plan in Markdown:\n## Prioritized Tasks\n## Suggested Daily Schedule (with time blocks and breaks)\n## Productivity Tips\nUse bullet lists and time blocks like '09:00 – 10:30'.",
  research:
    "You are a research assistant. Given a topic, article, or question, produce Markdown with:\n## Quick Summary\n## Key Insights\n## Simplified Explanation\n## Important Findings\n## Recommendations\nUse plain language suitable for a beginner audience.",
  chat:
    "You are WorkFlow AI, a helpful workplace productivity assistant. Be friendly, concise, and practical. Use Markdown formatting where helpful. When generating content, remind the user that AI-generated output may need human review for important communications.",
};

export const runAI = createServerFn({ method: "POST" })
  .inputValidator((data: AIInput) => {
    if (!data || !data.task || !Array.isArray(data.messages)) {
      throw new Error("Invalid input");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[data.task] },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Add credits in workspace settings.");
      throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = await res.json();
    const content: string = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
