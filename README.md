# InternGuide

## Install dependencies

Clone repo and run:

```
npm install
cd backend
npm install
cd ..
```

You only need to run the second `npm install` if you plan to build/run the backend locally.

## Development: run frontend and backend

Run the frontend development server (Vite + React):

```
npm run dev
```

This starts Vite's dev server (default port 5173). Open the address shown in the console (usually http://localhost:5173).

Run the backend in watch/dev mode (from repository root):

```
cd backend
npm run start:dev
```

This starts the NestJS server in watch mode (default port 3000). The backend will pick up changes automatically.

You can run both concurrently in separate terminals.


## Environment variables (Supabase)

The backend uses Supabase. Create a `.env` file in `backend/` and include the required keys:

- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_KEY` — your service or anon key (use the appropriate key for server vs client usage)

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=...
```

Check `backend/README.md` for any backend-specific notes.

## Useful commands

```
# Install deps
npm install
cd backend && npm install && cd ..

# Dev servers (run in two terminals)
npm run dev         # frontend
cd backend && npm run start:dev

# Build
npm run build       # frontend build (root)
cd backend && npm run build

# Preview frontend
npm run preview

# Tests (backend)
cd backend && npm run test
```