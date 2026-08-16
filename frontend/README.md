# STEM Quest Learning Lab — Frontend

React + Vite + Tailwind CSS single-page application for STEM Quest Learning Lab (South Africa EdTech).

## Stack

- React 18 + React Router
- Vite 5
- Tailwind CSS 3
- Lucide React icons

## Pages

- `/` — Home (hero, value props, services, curriculum, pricing teaser, CTA)
- `/about` — Mission, problem statement, founders, Year 1 roadmap
- `/services` — Detailed programmes + curriculum table
- `/pricing` — Package comparison + revenue model
- `/contact` — Contact form (posts to `/api/contact`)
- `/enroll` — Enrollment interest form (posts to `/api/enroll`)

## Setup

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173 (proxies /api → backend :3001)
npm run build    # production build → dist/
npm run preview
```

Ensure the backend is running on port 3001 for contact and enrollment forms to work.

