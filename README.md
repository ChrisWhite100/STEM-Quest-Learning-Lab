# STEM Quest Learning Lab — Website

Full-stack website for **STEM Quest Learning Lab**, built from the RSTP Incubator Application & Partnership Proposal (2025).

**Unveiling Potential Through STEM Education**

## Structure

```
stemquest-website/
├── frontend/     # React + Vite + Tailwind SPA
├── backend/      # Express API (contact, enroll, data)
├── dataset/      # Standalone JSON data files
└── README.md
```

## Quick start

### 1. Backend

```bash
cd backend
npm install
npm start
# → http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

The Vite dev server proxies `/api` to the backend.

## Features

- Responsive marketing site (Home, About, Services, Pricing, Contact, Enroll)
- School partnership packages (Bronze / Silver / Gold) in Rands
- Curriculum progression (Foundation → Intermediate → Senior Phase)
- Founder profiles (Linda Zwelakhe Dlamini & Thandolwethu Carlos Magaya)
- Contact and enrollment forms with JSON persistence
- Aligned with South African context

## Zips

Build downloadable archives:

```bash
# From project root (stemquest-website parent)
zip -r stemquest-frontend.zip frontend/
zip -r stemquest-backend.zip backend/
zip -r stemquest-dataset.zip dataset/
```

## Licence / attribution

Content derived from the proposal by Linda Zwelakhe Dlamini in partnership with Thandolwethu Carlos Magaya. Website implementation for incubation and launch support.

