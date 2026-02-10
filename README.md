# NYU Campus Cycle

A campus-only, peer-to-peer marketplace for NYU students. Browse and list used textbooks, electronics, dorm essentials, and more — with on-campus pickup only.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Demo-only: no backend yet.** All data is in-memory for the session (no database, no auth).

## Tech

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- react-hook-form + zod (create listing form)
- lucide-react (icons)
- Client-side state only (Context + useReducer)
