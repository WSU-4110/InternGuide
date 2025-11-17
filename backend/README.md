# InternGuide Backend (NestJS)

This service provides the API layer for InternGuide using NestJS and TypeScript. The current setup exposes a single health endpoint that returns a simple status payload and lays the groundwork for future features such as authentication, resume ingestion, AI integrations, and progress tracking.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server with auto-reload:
   ```bash
   npm run start:dev
   ```

3. The API listens on port `3000` by default with all routes prefixed by `/api`. The root endpoint (`GET /api`) returns a JSON status message.

## Scripts

- `npm run start`: start the app in production mode.
- `npm run start:dev`: start the app with hot reload.
- `npm run build`: compile TypeScript into the `dist` directory.
- `npm run lint`: apply ESLint rules to the `src` and `test` folders.
- `npm run test`: execute unit tests.
- `npm run test:e2e`: execute end-to-end tests against the compiled app.
- `npm run format`: format source and test files with Prettier.

## Testing

- Unit tests live alongside the implementation in `src/` (see `app.controller.spec.ts`).
- End-to-end tests live in `test/` and exercise the compiled application (`app.e2e-spec.ts`).

## Next Steps

- Add domain modules (auth, resumes, mindmaps, resources, etc.).
- Wire up persistence (SQL/NoSQL) and configure the required environment variables.
- Integrate AI providers or internal services for resume analysis and mindmap generation.
- Harden the app for production with validation, logging, security headers, and observability.
