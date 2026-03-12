# 🚀 S&A NexTech AI — Production AI SaaS Platform

A premium, production-grade AI SaaS platform built with Next.js 14, Groq AI, Supabase, and a stunning dark futuristic UI.

![S&A NexTech AI](https://via.placeholder.com/1200x630/050507/8b5cf6?text=S%26A+NexTech+AI)

## ✨ Features

- **🤖 AI Chat** — ChatGPT-style streaming chat powered by Groq's ultra-fast LPU (500+ tokens/sec)
- **📊 Analytics Dashboard** — Usage charts, request tracking, and performance metrics
- **⚡ Usage Limits** — Per-user daily/monthly limits with beautiful progress indicators
- **🔐 Authentication** — Supabase Auth with email/password + OAuth (GitHub, Google)
- **🎨 Premium UI** — Dark glassmorphism design with Framer Motion animations
- **📱 Fully Responsive** — Works perfectly on mobile, tablet, and desktop

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + custom CSS |
| UI Components | Radix UI primitives |
| Animations | Framer Motion |
| AI Provider | Groq API (llama3-8b-8192) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Charts | Recharts |
| Markdown | react-markdown |
| Deployment | Vercel |

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repo-url>
cd s-and-a-nextech-ai
npm install
```

### 2. Environment Setup

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

> **Note**: The app works without any API keys in demo mode! Try it with `npm run dev` right away.

### 3. Supabase Setup (Optional)

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase-schema.sql` in the Supabase SQL Editor
3. Copy your project URL and anon key to `.env.local`

### 4. Groq API Key (Optional)

1. Sign up at [console.groq.com](https://console.groq.com) (free!)
2. Create an API key
3. Add it to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📁 Project Structure

```
s-and-a-nextech-ai/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── auth/
│   │   ├── login/page.tsx          # Login page
│   │   └── signup/page.tsx         # Signup page
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard sidebar layout
│   │   ├── page.tsx                # Dashboard home
│   │   ├── chat/page.tsx           # AI Chat interface
│   │   ├── analytics/page.tsx      # Analytics charts
│   │   ├── usage/page.tsx          # Usage & limits
│   │   └── settings/page.tsx       # User settings
│   └── api/
│       ├── chat/route.ts           # Groq streaming API
│       ├── sessions/route.ts       # Chat sessions
│       └── usage/route.ts          # Usage tracking
├── components/
│   └── ui/                         # Reusable UI components
├── lib/
│   ├── supabase.ts                 # Supabase client
│   └── utils.ts                    # Utilities
├── types/
│   ├── index.ts                    # App types
│   └── supabase.ts                 # Database types
├── supabase-schema.sql             # Database schema
└── .env.local.example              # Environment template
```

## 🎨 Design System

### Color Palette
- **Primary**: Violet (#8b5cf6) — Main accent, CTAs
- **Secondary**: Cyan (#22d3ee) — Supporting accent
- **Background**: Near-black (#050507)
- **Surface**: Glass layers with white/5-10% opacity

### Typography
- **Display**: Syne (headings, brand elements)
- **Body**: Outfit (general text, UI)
- **Mono**: JetBrains Mono (code blocks)

### Components
All UI components are custom-built with Radix UI primitives and TailwindCSS, including:
- `Button` — Multiple variants (gradient, glass, ghost, etc.)
- `Card` — Glassmorphism surfaces
- `Badge` — Status indicators
- `Progress` — Gradient progress bars
- `Input` — Styled form inputs
- `Avatar` — User avatars
- `ScrollArea` — Custom scrollbars
- `Tooltip` — Hover tooltips
- `Separator` — Visual dividers

## 🤖 AI Integration

The chat uses Groq's OpenAI-compatible API with streaming:

```typescript
// app/api/chat/route.ts
const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${groqKey}` },
  body: JSON.stringify({
    model: 'llama3-8b-8192',
    messages: [...],
    stream: true,
  }),
})
```

**Demo Mode**: Without a Groq API key, the app uses simulated streaming responses.

## 🗄️ Database Schema

```sql
-- 4 main tables
profiles    -- User profiles (extends auth.users)
sessions    -- Chat conversations
messages    -- Individual messages per session
usage_stats -- Daily usage tracking per user
```

Row Level Security (RLS) ensures users can only access their own data.

## 📦 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

Add environment variables in Vercel dashboard.

### Self-hosted

```bash
npm run build
npm start
```

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Optional | Groq API key (demo mode without it) |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Supabase service role key |

## 📄 License

MIT License — Built by S&A NexTech

---

**Built with ❤️ using Next.js 14, Groq, and Supabase**
