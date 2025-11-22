# Moodboard Backend

Next.js API backend with Supabase authentication and mood tracking.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up Supabase database:
   - Go to your Supabase project SQL Editor
   - Run the SQL script in `SUPABASE_SETUP.sql`
   - This will create the `moods` table with proper RLS policies

3. Start the development server:
```bash
npm run dev
```

The API will run on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh session token

### Moods
- `GET /api/moods` - Get all moods for authenticated user
- `POST /api/moods` - Create new mood
- `GET /api/moods/[id]` - Get specific mood
- `PUT /api/moods/[id]` - Update mood
- `DELETE /api/moods/[id]` - Delete mood

## Environment Variables

Required in `.env`:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
