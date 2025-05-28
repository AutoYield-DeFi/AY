# Vercel Deployment Guide - FIXED

## Issue Resolved
The previous deployment was showing raw JavaScript because Vercel was incorrectly configured. This has been fixed with proper static file serving and API routing.

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Have your Neon database URL ready
3. Generate a session secret (use: `openssl rand -base64 32`)

## Deployment Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Project Locally (Test)
```bash
npm run build:vercel
```

### 3. Login to Vercel
```bash
vercel login
```

### 4. Deploy to Vercel
```bash
vercel --prod
```

### 5. Set Environment Variables
Set these in Vercel dashboard or CLI:
- `DATABASE_URL`: Your Neon PostgreSQL connection string
- `SESSION_SECRET`: Random 32-character string
- `NODE_ENV`: `production`

## Fixed Configuration

### Key Changes Made:
1. **Separate API endpoint** - Created `/api/index.ts` for proper serverless function handling
2. **Corrected static file serving** - Frontend now serves from `dist/public`
3. **Fixed routing** - API calls go to `/api/*`, everything else serves the React app
4. **Proper build process** - Only builds frontend for static hosting

### Project Structure:
```
/
├── api/              # Vercel serverless functions
│   └── index.ts      # Main API handler
├── server/           # Original Express server (for local dev)
├── client/           # React frontend source
├── dist/public/      # Built frontend (auto-generated)
├── vercel.json       # Vercel configuration
└── package.json      # Dependencies and scripts
```

## Environment Variables Setup

### Via Vercel CLI:
```bash
vercel env add DATABASE_URL
vercel env add SESSION_SECRET
vercel env add NODE_ENV
```

### Via Vercel Dashboard:
1. Go to your project in Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add the required variables

## Troubleshooting

### If you still see raw JavaScript:
1. Clear Vercel cache: `vercel --prod --force`
2. Check build logs in Vercel dashboard
3. Verify `dist/public/index.html` exists after build

### API Routes Not Working:
- All API routes must be prefixed with `/api/`
- Check function logs in Vercel dashboard
- Verify environment variables are set

### Database Connection Issues:
- Ensure `DATABASE_URL` environment variable is set
- Test connection string locally first
- Check if your database allows connections from Vercel's IP ranges

## Next Steps After Deployment
1. Test the React app loads properly (no more raw JavaScript)
2. Add your API routes to `server/routes.ts`
3. Test API endpoints work at `https://yourapp.vercel.app/api/your-endpoint`
4. Set up database migrations if needed