# Apex Forum Community

A modern community forum built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Demo accounts

- admin@ascend.gg / admin123 (admin)
- ironwill@ascend.gg / password (moderator)
- style@ascend.gg / password (user)

## Supabase

Copy `.env.example` to `.env.local` and fill in your Supabase credentials. Run `supabase/schema.sql` in your Supabase SQL editor. When credentials are absent, the app runs in demo mode using an in-memory store with seed content.

## Features

- Auth (signup/login/logout), profiles, settings
- Forum categories, threads, comments, likes/dislikes, views, sorting, search
- Polls, bookmarks, notifications, direct messages
- User follow, leaderboard, member search
- Reporting and admin dashboard (users, threads, categories, reports, analytics)
- Dark/light mode toggle, responsive layout