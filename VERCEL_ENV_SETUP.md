# Vercel Environment Variables Setup

To deploy with the online Supabase database, you need to add these environment variables to your Vercel project:

## Steps:

1. Go to **https://vercel.com/dashboard**
2. Select your **portfolio-nextjs** project
3. Go to **Settings → Environment Variables**
4. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://tbnhhyznoqjhzcthubqv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmhoeXpub3FqaHpjdGh1YnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTk5MjMsImV4cCI6MjA4NDEzNTkyM30.VZsuIY24zG8Wb8KdMMxa7EtLAh7qSMdrNZVYG2QKLHI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmhoeXpub3FqaHpjdGh1YnF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU1OTkyMywiZXhwIjoyMDg0MTM1OTIzfQ.hiFxNyG6tfBXRuB-o7WyEEHsei5aBoltt9SJwSIuhDA
NEXT_PUBLIC_GITHUB_USER=Hany-hazem
ADMIN_PASSWORD=portfolio2026
```

5. Click **Save**
6. Go to **Deployments** and redeploy the latest version
7. Wait for deployment to complete

## Verify Connection

1. Test your portfolio: **https://your-vercel-domain.vercel.app**
2. Test admin dashboard: **https://your-vercel-domain.vercel.app/admin**
   - Password: `portfolio2026`
3. Try editing content and saving

That's it! Your portfolio is now using the online Supabase database.
