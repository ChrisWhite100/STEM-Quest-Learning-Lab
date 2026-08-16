# STEM Quest Learning Lab — Dataset

JSON data derived from the RSTP Incubator Application & Partnership Proposal (2025).

## Files

| File | Description |
|------|-------------|
| `packages.json` | School partnership tiers (Bronze, Silver, Gold) with fees in Rands |
| `services.json` | Four delivery channels: school partnerships, robotics clubs, teacher training, holiday bootcamps |
| `curriculum.json` | Foundation / Intermediate / Senior Phase tools, skills, extras |
| `team.json` | Founding team profiles |
| `contacts.json` | Runtime storage for contact form submissions (starts empty) |
| `enrollments.json` | Runtime storage for enrollment submissions (starts empty) |

## Usage

- Frontend: mirrored in `frontend/src/data/siteData.js`
- Backend: served under `/api/data/*` and used for form persistence

All monetary values are in Rands (R). Content is aligned with the official proposal.
