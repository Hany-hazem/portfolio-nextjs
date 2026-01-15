# Deployment Guide - Vercel Migration

This guide walks you through deploying your Next.js portfolio to Vercel and updating your DNS configuration.

## Pre-Deployment Checklist

- ✅ Node.js 20.19.6 installed via nvm
- ✅ Next.js 14.1 project created and configured
- ✅ Portfolio component migrated and working
- ✅ Admin dashboard ported
- ✅ Environment variables configured in `.env.local`
- ✅ API proxy configured in `next.config.js`
- ⏳ Git repository initialization
- ⏳ GitHub repository connection
- ⏳ Vercel deployment
- ⏳ DNS configuration

## Step 1: Initialize Git Repository

From `/home/hani/portfolio-nextjs`:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: Complete Next.js migration with admin dashboard

- Migrated Portfolio component from React to Next.js
- Added admin dashboard at /admin route
- Configured Supabase and GitHub integration
- Set up API proxy to self-hosted backend
- Environment variables: VITE_* → NEXT_PUBLIC_*
- Added TypeScript, Tailwind CSS, and Lucide icons
- Password-protected admin route (portfolio2026)
- Activity logging and settings management
- Responsive design with mobile navigation"
```

## Step 2: Create GitHub Repository

### Option A: Using GitHub CLI (gh)

```bash
# Install gh if needed
# On Debian/Ubuntu: sudo apt install gh

# Login to GitHub
gh auth login

# Create new repository
gh repo create portfolio-nextjs --public --source=. --remote=origin --push

# Or create private repository
gh repo create portfolio-nextjs --private --source=. --remote=origin --push
```

### Option B: Using GitHub Web Interface

1. Go to https://github.com/new
2. Repository name: `portfolio-nextjs`
3. Description: "Modern portfolio with Next.js 14, TypeScript, and Tailwind CSS"
4. Visibility: Public or Private
5. **Do NOT initialize with README** (you already have one)
6. Click "Create repository"

7. Add remote and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio-nextjs.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub repositories
4. Click "Import" next to your `portfolio-nextjs` repository
5. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

6. **Environment Variables** - Add all from your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://notworthy.vip
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzM2NjM1MjAwLAogICJleHAiOiAxODk0NDAxNjAwCn0.6fgZWBGqQYqPPfpBnvQhyJ5HsjGlpRJ5m6xAZ6LnDcI
NEXT_PUBLIC_GITHUB_USER=Hany-hazem
ADMIN_PASSWORD=portfolio2026
```

7. Click **"Deploy"**

Vercel will:
- Clone your repository
- Install dependencies
- Run `npm run build`
- Deploy to a global CDN
- Provide a production URL (e.g., `portfolio-nextjs-xyz.vercel.app`)

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project's name? portfolio-nextjs
# - In which directory is your code located? ./
# - Want to modify settings? No

# Deploy to production
vercel --prod
```

## Step 4: Update DNS Configuration

After successful deployment, Vercel provides a URL. Now update your DNS to point `notworthy.vip` to Vercel.

### Cloudflare DNS (if you use Cloudflare)

1. Log in to Cloudflare dashboard
2. Select your domain: `notworthy.vip`
3. Go to **DNS** section
4. Update or add CNAME record:

```
Type: CNAME
Name: @ (or notworthy.vip)
Target: cname.vercel-dns.com
Proxy status: Proxied (orange cloud) or DNS only (gray cloud)
TTL: Auto
```

5. Delete existing A record for `notworthy.vip` if it points to your home server

### Generic DNS Provider

1. Log in to your DNS provider (Namecheap, GoDaddy, etc.)
2. Find DNS management for `notworthy.vip`
3. Add CNAME record:

```
Type: CNAME
Host: @ (or leave blank for root domain)
Points to: cname.vercel-dns.com
TTL: 3600 (or auto)
```

### Subdomain Strategy (Alternative)

If you want to keep self-hosted tools on the root:

```
notworthy.vip (A record) → 100.70.101.75 (Tailscale IP - self-hosted tools)
www.notworthy.vip (CNAME) → cname.vercel-dns.com (Next.js portfolio)
portfolio.notworthy.vip (CNAME) → cname.vercel-dns.com (Next.js portfolio)
proxmox.notworthy.vip (A record) → 100.70.101.75 (already configured)
```

## Step 5: Configure Custom Domain in Vercel

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add domain: `notworthy.vip` (or `www.notworthy.vip`)
4. Vercel will verify DNS configuration
5. Once verified, automatic HTTPS is enabled

## Step 6: Test Deployment

1. Wait for DNS propagation (can take 5 minutes to 48 hours)
2. Visit `https://notworthy.vip` (or your Vercel URL)
3. Verify:
   - ✅ Portfolio loads correctly
   - ✅ GitHub data fetches successfully
   - ✅ `/admin` route requires password
   - ✅ Admin dashboard loads (may show API offline if backend not accessible)
   - ✅ Tailwind CSS styles applied
   - ✅ Mobile responsive

## Step 7: Backend API Considerations

Your admin API is currently on `https://notworthy.vip/admin-api/`. After DNS points to Vercel:

### Option A: Keep Backend on Subdomain (Recommended)

1. Update DNS:
```
notworthy.vip → Vercel (portfolio)
api.notworthy.vip → Your home server (admin API)
```

2. Update `next.config.js`:
```js
async rewrites() {
  return [
    {
      source: '/admin-api/:path*',
      destination: 'https://api.notworthy.vip/admin-api/:path*',
    },
  ];
}
```

### Option B: Use Tailscale Subdomain

```
notworthy.vip → Vercel (portfolio)
proxmox.notworthy.vip → Your home server (admin API)
```

Update `next.config.js`:
```js
async rewrites() {
  return [
    {
      source: '/admin-api/:path*',
      destination: 'https://proxmox.notworthy.vip/admin-api/:path*',
    },
  ];
}
```

### Option C: Migrate Backend to Vercel Serverless Functions

Create API routes in Next.js:
```
portfolio-nextjs/app/api/admin/settings/route.ts
portfolio-nextjs/app/api/admin/logs/route.ts
portfolio-nextjs/app/api/health/route.ts
```

This requires more work but eliminates dependency on home server.

## Step 8: CI/CD - Automatic Deployments

Vercel automatically deploys on every `git push`:

```bash
# Make changes to your code
git add .
git commit -m "feat: Update portfolio content"
git push origin main
```

Vercel will:
- Detect push to `main` branch
- Run build automatically
- Deploy to production if build succeeds
- Update your live site (https://notworthy.vip)

### Branch Previews

```bash
# Create feature branch
git checkout -b feature/new-section
# Make changes
git add .
git commit -m "feat: Add new section"
git push origin feature/new-section
```

Vercel creates preview deployment at unique URL for testing.

## Monitoring and Logs

### Vercel Dashboard

- **Deployments**: View build logs, deployment history
- **Analytics**: Page views, performance metrics (may require upgrade)
- **Logs**: Runtime logs from serverless functions
- **Speed Insights**: Core Web Vitals monitoring

### Environment Variables

To update:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Update values
3. Redeploy (Deployments → … → Redeploy)

## Rollback

If deployment fails:
1. Vercel Dashboard → Deployments
2. Find last successful deployment
3. Click **…** → **Promote to Production**

Or via Git:
```bash
git revert HEAD
git push origin main
```

## Next Steps After Deployment

1. **Test admin dashboard**: Verify `/admin` works with Tailscale (if ACL still applies)
2. **Update README**: Add live URL to README.md
3. **Add monitoring**: Set up Vercel Analytics or Google Analytics
4. **SEO optimization**: Add metadata, sitemap, robots.txt
5. **Performance**: Test with Lighthouse, optimize images
6. **Security**: Review CORS settings, API token security

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Test build locally: `npm run build`

### API 404 Errors

- Verify `next.config.js` rewrites configuration
- Check admin API is accessible from Vercel servers (not blocked by Tailscale ACL)
- Test API endpoint directly

### DNS Not Resolving

- Check DNS propagation: `dig notworthy.vip`
- Verify CNAME record: `nslookup notworthy.vip`
- Try with www subdomain if root fails

### Admin Dashboard Blank

- Check browser console for errors
- Verify ADMIN_PASSWORD environment variable is set
- Check sessionStorage is working (not in incognito mode)

## Success Criteria

- ✅ Portfolio live at `https://notworthy.vip`
- ✅ GitHub data loads correctly
- ✅ Admin dashboard accessible at `/admin`
- ✅ Mobile responsive design
- ✅ Automatic deployments on git push
- ✅ HTTPS enabled with valid certificate

## Estimated Timeline

- Step 1-2 (Git setup): 5 minutes
- Step 3 (Vercel deployment): 10 minutes
- Step 4-5 (DNS configuration): 5 minutes + 5-60 minutes for propagation
- Step 6 (Testing): 10 minutes

**Total**: ~30-90 minutes depending on DNS propagation

---

**Status**: Ready to deploy! All prerequisites met. Run Step 1 when you're ready.
