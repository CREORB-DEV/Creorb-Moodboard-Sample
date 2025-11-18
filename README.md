```markdown
# Moodboard — Mobile (Expo) + Backend (Next.js + Prisma + Postgres)

Production-ready mood tracker app with a React Native (Expo) mobile client and a custom Next.js + Prisma + PostgreSQL backend.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Repo Layout](#repo-layout)
- [Quick Start (Clone → Run)](#quick-start-clone--run)
- [Backend — Setup & Run](#backend--setup--run-detailed)
- [Mobile — Setup & Run](#mobile--setup--run-detailed)
- [Database (Postgres) — Local or Hosted](#database--local-vs-hosted)
- [Auth Design & Tokens](#auth-design-summary-recommended)
- [Environment Variables](#environment-variables-env-samples)
- [Development Workflow & Scripts](#development-workflow--scripts)
- [CI/CD & Release Notes](#cicd--release-notes)
- [Testing & Observability](#testing--observability)
- [Security & Privacy Considerations](#security--privacy-considerations)
- [Next Steps / Roadmap](#next-steps--roadmap-recommended-mvp)
- [Troubleshooting / FAQ](#troubleshooting--faq)

---

## Project Overview

Moodboard is a cross-platform mobile mood tracker app (iOS + Android) built with **Expo (React Native)** for the client and **Next.js (TypeScript)** for the custom backend API.

The backend uses **Prisma ORM** with **PostgreSQL** and implements **JWT-based access tokens + refresh tokens** for secure authentication.

Core flows (designed in Figma):
- Onboarding & Login
- Home (select mood)
- Add Mood (description + tags)
- Dashboard (list of mood entries)

This README documents exactly how to set up the local dev environment and start building.

---

## Tech Stack

### Mobile (Client)
- Expo (managed workflow) + React Native (TypeScript)
- React Navigation (stack + bottom-tabs)
- `@tanstack/react-query` (data fetching & caching)
- `axios` (HTTP client)
- `expo-secure-store` (secure token storage)
- `react-hook-form` + `zod` (forms + validation)
- `react-native-vector-icons`
- `dayjs` (date handling)
- EAS (Expo Application Services) for builds

### Backend
- Next.js (TypeScript) — API routes or App Router
- Prisma ORM + `@prisma/client`
- PostgreSQL
- `bcrypt` (password hashing)
- `jsonwebtoken` (JWT)
- `cookie` (cookie helpers)
- `zod` (validation)
- `helmet`, `cors` (security)
- `pino` or `winston` (logging)
- `Sentry` (optional error monitoring)
- `nodemailer` (optional emails)

### Dev & Infra
- Git + GitHub
- VS Code
- Android Studio (AVD), Xcode (macOS only)
- Docker (optional local Postgres)
- CI: GitHub Actions
- Deploy: Vercel/Render (backend), EAS + App Store / Play Store (mobile)

---

## Repo Layout

Monorepo structure:

```text
/ (repo root)
├── README.md
├── /backend
│   ├── prisma/
│   ├── pages/ (or app/)
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── register.ts
│   │       │   ├── login.ts
│   │       │   ├── refresh.ts
│   │       │   └── logout.ts
│   │       └── moods/
│   │           ├── index.ts
│   │           └── [id].ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── auth.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
└── /mobile
    └── moodboard-app/ (Expo project)
        ├── src/
        │   ├── api/
        │   │   └── axios.ts
        │   ├── services/
        │   │   ├── auth.ts
        │   │   └── moods.ts
        │   ├── screens/
        │   │   ├── Onboarding.tsx
        │   │   ├── Login.tsx
        │   │   ├── Home.tsx
        │   │   ├── AddMood.tsx
        │   │   └── Dashboard.tsx
        │   ├── components/
        │   └── navigation/
        ├── package.json
        ├── app.json
        └── eas.json
```

---

## Quick Start (Clone → Run)

```bash
# Clone repo
git clone git@github.com:<your-org>/<your-repo>.git
cd <your-repo>

# Backend
cd backend
pnpm install        # or npm install / yarn
# → create .env (see env section)
npx prisma migrate dev --name init
pnpm dev             # runs on http://localhost:3000

# Mobile (new terminal)
cd ../mobile/moodboard-app
pnpm install
expo start           # or expo start --android / --ios
```

> Use `pnpm` (recommended), `npm`, or `yarn` — commands are equivalent.

---

## Backend — Setup & Run (Detailed)

```bash
pnpm create next-app@latest backend --ts

cd backend
pnpm add prisma @prisma/client bcrypt jsonwebtoken cookie zod cors helmet pino
pnpm add -D prisma ts-node-dev
```

### Local PostgreSQL with Docker

```bash
docker run --name moodboard-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=moodboard \
  -p 5432:5432 -d postgres:15
```

Or use Supabase / Neon / Railway and paste the `DATABASE_URL`.

### Prisma Setup

```bash
npx prisma init
# → edit prisma/schema.prisma (User, RefreshToken, MoodEntry models)
npx prisma migrate dev --name init
npx prisma generate
```

### Run Dev Server

```bash
pnpm dev
# or
next dev -p 3000
```

Test with Postman/Insomnia:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/moods` (with Bearer token)

---

## Mobile — Setup & Run (Detailed)

```bash
cd mobile
expo init moodboard-app --template expo-template-blank-typescript
cd moodboard-app

pnpm add @tanstack/react-query axios expo-secure-store \
  react-hook-form zod react-native-vector-icons dayjs

expo install react-native-gesture-handler react-native-reanimated \
  react-native-screens @react-navigation/native @react-navigation/native-stack \
  @react-navigation/bottom-tabs
```

Configure `src/api/axios.ts`:
- `baseURL` from `EXPO_PUBLIC_API_URL`
- Request interceptor → attach access token
- Response interceptor → auto-refresh on 401

Implement:
- `services/auth.ts` (login/register + SecureStore)
- `services/moods.ts` (CRUD via axios + react-query)

Start:

```bash
expo start
# Android emulator → use 10.0.2.2
# iOS simulator → localhost works
# Physical device → use your machine’s LAN IP or ngrok
```

> Mobile apps **cannot** use httpOnly cookies reliably → return refresh token in JSON and store in `expo-secure-store`.

---

## Database — Local vs Hosted

| Option       | Command / URL                                 | Recommended For       |
|--------------|-----------------------------------------------|-----------------------|
| Local Docker | `docker run ...` (above)                      | Dev                   |
| Supabase     | Free tier + Prisma compatible                 | Staging / Prod        |
| Neon         | Serverless Postgres                           | Prod                  |
| Railway      | Easy deploy + Postgres                        | Prod                  |

Set `DATABASE_URL` in `backend/.env`.

---

## Auth Design Summary (Recommended)

- **Access Token**: JWT, short-lived (15 min)
- **Refresh Token**: Stored in DB, long-lived (30 days), rotatable
- Mobile stores both tokens in `expo-secure-store`
- Refresh endpoint: `/api/auth/refresh` → validates DB record → issues new access (and optionally new refresh)
- Logout → delete refresh token record + clear client storage

---

## Environment Variables (.env samples)

### Backend → `backend/.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/moodboard?schema=public"
ACCESS_TOKEN_SECRET="replace_with_a_secure_random_64_char_string"
REFRESH_TOKEN_SECRET="another_secure_random_string"
NODE_ENV="development"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Mobile → `mobile/moodboard-app/.env`

```env
EXPO_PUBLIC_API_URL="http://10.0.2.2:3000"        # Android emulator
# EXPO_PUBLIC_API_URL="http://192.168.1.100:3000" # Physical device (your LAN IP)
# EXPO_PUBLIC_API_URL="http://localhost:3000"    # iOS simulator
```

---

## Development Workflow & Scripts

### Backend `package.json` scripts

```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "eslint . --ext .ts,.tsx,.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "test": "jest"
  }
}
```

### Mobile `package.json` scripts

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios":": "expo start --ios",
    "web": "expo start --web",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios",
    "test": "jest"
  }
}
```

---

## CI/CD & Release Notes

- **Backend**: GitHub Actions → lint → test → deploy to Vercel or Render
- **Mobile**: EAS Build + EAS Submit on `main` merge
- Secrets: Store `DATABASE_URL`, token secrets in GitHub / Vercel / EAS secrets

---

## Testing & Observability

| Layer    | Tools                                 |
|----------|---------------------------------------|
| Backend  | Jest + supertest, Sentry, pino logs   |
| Mobile   | Jest + RTL, Detox/E2E (optional), sentry-expo |
| Infra    | GitHub Actions, Vercel analytics      |

---

## Security & Privacy Considerations

- Mood data is sensitive → provide privacy policy + data export/delete endpoints
- `bcrypt` cost ≥ 12
- HTTPS in production (Vercel/EAS enforce it)
- Never commit `.env` files
- Validate all input with `zod`
- Rate-limit auth routes
- Rotate/revoke refresh tokens on logout or suspicious activity

---

## Next Steps / Roadmap (Recommended MVP)

1. Backend auth (register/login/refresh/logout)
2. Moods CRUD with Prisma
3. Mobile auth screens + SecureStore token handling
4. Add Mood + Dashboard with react-query
5. Offline caching (optional)
6. CI/CD + Sentry + staging deploy
7. UI polish, accessibility, store submission

---

## Troubleshooting / FAQ

**Q: Backend not reachable from device/emulator?**  
→ Android emulator: use `10.0.2.2`  
→ iOS simulator: `localhost` works  
→ Physical device: use your machine’s LAN IP or ngrok

**Q: Prisma migrate failing?**  
→ Ensure Postgres container is running (`docker ps`) and `DATABASE_URL` is correct.

**Q: Cookies not working on mobile?**  
→ Native apps don’t send httpOnly cookies reliably. Return refresh token in JSON and store in SecureStore.

**Q: Access token expires too fast in dev?**  
→ Increase expiry in dev only; keep refresh flow working.

### Useful Commands Summary

```bash
# Global
nvm use --lts
pnpm add -g expo-cli eas-cli

# Backend
cd backend
pnpm install
npx prisma migrate dev --name init
pnpm dev

# Mobile
cd mobile/moodboard-app
pnpm install
expo start
```

Enjoy building Moodboard! 🚀
```

Just copy and paste the above into `README.md` at the root of your repo.
```
