# WorkFlow AI Assistant

An AI-powered workplace productivity assistant that helps professionals automate repetitive tasks — drafting emails, summarizing meetings, planning work, researching topics, and chatting with an AI assistant.

Built as a modern, responsive SaaS-style web app suitable for demos to recruiters, lecturers, and employers.

## ✨ Features

- **📧 Email Generator** — Generate professional emails from a short brief, with tone and audience controls.
- **📝 Meeting Summarizer** — Turn raw meeting notes into clean summaries with key points, decisions, and action items. Export as `.txt`.
- **✅ Task Planner** — Break goals into prioritized, structured task plans with timelines.
- **🔍 Research Assistant** — Summarize articles or topics into beginner-friendly key insights and recommendations.
- **💬 AI Chatbot** — Conversational assistant with suggested prompts for common workplace questions.
- **🛡️ Responsible AI** — Disclaimers across all tools reminding users to review AI output before use.

## 🧱 Tech Stack

- **Frontend:** React 19, TanStack Start (Vite 7), TanStack Router
- **Styling:** Tailwind CSS v4 with a custom OKLCH design system (Space Grotesk + Inter)
- **UI:** shadcn/ui + Radix primitives
- **Backend:** Lovable Cloud (managed Supabase) — auth, database, storage
- **AI:** Lovable AI Gateway → `google/gemini-3-flash-preview` (no API key required)
- **Deploy target:** Edge / Cloudflare Workers

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Run the dev server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment

Lovable Cloud automatically provisions and manages the `.env` file. No manual setup is required when working inside Lovable.

## 🗂️ Project Structure

```
src/
├── components/        # Reusable UI (AppSidebar, AIOutput, AIDisclaimer, PageHeader)
├── lib/
│   └── ai.functions.ts  # Server functions calling Lovable AI Gateway
├── routes/
│   ├── index.tsx        # Marketing landing page
│   ├── app.tsx          # Authenticated app shell (sidebar layout)
│   ├── app.index.tsx    # Dashboard
│   ├── app.email.tsx    # Email Generator
│   ├── app.meetings.tsx # Meeting Summarizer
│   ├── app.tasks.tsx    # Task Planner
│   ├── app.research.tsx # Research Assistant
│   ├── app.chat.tsx     # AI Chatbot
│   └── app.settings.tsx # Settings
└── styles.css         # Design tokens (OKLCH colors, gradients, shadows)
```

## 🧠 Prompt Engineering

Each AI tool uses a specialized system prompt to enforce structure, tone, and safety:

- **Email** — Professional tone, clear subject + body, audience-aware.
- **Summary** — Bullet-pointed key takeaways, decisions, and action items.
- **Tasks** — Prioritized list with estimated effort and ordering.
- **Research** — Beginner-friendly insights with practical recommendations.

## 🛡️ Responsible AI

- Visible disclaimers on all AI outputs.
- Users are encouraged to review and verify AI-generated content before sending or acting on it.
- No sensitive data is stored without explicit user action.

## 📦 Deployment

The app is deployed automatically by Lovable on every change. You can also connect this repository to your own hosting provider (Cloudflare, Vercel, etc.) since the codebase is standard open-source TanStack Start.

## 📄 License

MIT — free to use, modify, and learn from.

---

Built with ❤️ using [Lovable](https://lovable.dev).
