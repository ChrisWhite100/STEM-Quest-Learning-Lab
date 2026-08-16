# STEM Quest Learning Lab — Backend

Express.js API for contact forms, enrollments, and static site data.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/enroll` | Submit enrollment interest |
| GET | `/api/admin/contacts` | List contact submissions |
| GET | `/api/admin/enrollments` | List enrollments |
| GET | `/api/data/packages` | School packages |
| GET | `/api/data/services` | Services list |
| GET | `/api/data/curriculum` | Curriculum phases |
| GET | `/api/data/team` | Founding team |

## Setup

```bash
cd backend
npm install
npm start          # http://localhost:3001
# or
npm run dev        # with --watch
```

Submissions are stored as JSON under `data/contacts.json` and `data/enrollments.json`.

**Note:** Admin list endpoints are unauthenticated for development. Protect them (API key / auth) before production use.
