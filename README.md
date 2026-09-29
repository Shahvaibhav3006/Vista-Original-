# VISTA / QuestTrail (Backend Integrated)

“Don’t just visit a city. Play it.”

This repository contains the full frontend code and the foundational backend structure for VISTA, a gamified cultural tourism web application.

## Prerequisites
- Node.js (v18+)
- Supabase account (for PostgreSQL, Auth, and Storage)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Supabase Setup
1. Create a new project in [Supabase](https://supabase.com/).
2. Go to SQL Editor and run the migration script located at `supabase/schema.sql`. This will create all the required tables and Row Level Security (RLS) policies.
3. Enable Email/Password authentication in the Supabase Auth settings.
4. Create a new Storage bucket named `user_photos` and make sure public access is appropriately configured.
5. Retrieve your project URL, Anon Key, and Service Role Key from the Project Settings -> API page.

### 3. Environment Variables
Copy `.env.example` to `.env` and fill in the values:
```bash
cp .env.example .env
```
Ensure you have:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
API_BASE_URL=http://localhost:3001/api
VITE_API_BASE_URL=http://localhost:3001/api
VITE_ENABLE_DEMO_MODE=true
```

### 4. Running the Development Server
The backend requires a tool like `ts-node` or `tsx` (which is included in `devDependencies`) to run.

To start the frontend:
```bash
npm run dev
```

To start the backend (in a separate terminal):
```bash
npx tsx server/src/server.ts
```

*(You can also use a package like `concurrently` to run both from a single script).*

### 5. Frontend & Backend Integration
The `src/lib/api.ts` file acts as the client for all backend calls. The `GameContext.tsx` has been fully refactored to consume these APIs instead of purely relying on `localStorage`.

When a user logs in, their guest progress in `localStorage` is automatically migrated securely via backend APIs. All pages (Photos, Hidden Gems, QR Rewards, Teams, Replay, etc.) are deeply integrated with the Node.js/Express backend.

### 6. Rate Limiting and Security
- API endpoints are protected using `express-rate-limit` to prevent brute-force and DDoS attacks.
- Row Level Security (RLS) policies exist on all Supabase tables, ensuring users can only access and modify their own data.
- User inputs and XP transactions are validated backend-side to prevent cheating or malicious requests.

## Deployment
- **Frontend**: Deployable on Vercel natively via `vite build`.
- **Backend**: Can be deployed on Render, Heroku, or as Vercel Serverless Functions by migrating `server.ts` to `api/index.ts`.
- **Database**: Supabase handles Postgres scaling.
