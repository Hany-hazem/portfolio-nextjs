# Portfolio - Next.js Migration

Modern portfolio built with Next.js 14, TypeScript, and Tailwind CSS, featuring dynamic GitHub integration and an admin dashboard.

## Features

- 🚀 **Next.js 14** with App Router
- 📱 **Responsive Design** with Tailwind CSS
- 🔗 **GitHub Integration** - Dynamic profile and repository display
- 🔐 **Admin Dashboard** - Password-protected settings management
- 📊 **Activity Logging** - Track portfolio interactions
- ☁️ **Vercel Ready** - Optimized for Vercel deployment

## Tech Stack

- **Framework**: Next.js 14.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (self-hosted)
- **Backend API**: Node.js/Express (self-hosted on notworthy.vip)
- **Icons**: Lucide React
- **Deployment**: Vercel (frontend), Self-hosted (backend API)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://notworthy.vip
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_GITHUB_USER=Hany-hazem
ADMIN_PASSWORD=portfolio2026
```

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial Next.js portfolio migration"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your portfolio repository
4. Configure environment variables (add all from `.env.local`)
5. Click "Deploy"

### Step 3: Update DNS

After deployment, update DNS to point notworthy.vip to Vercel.

## Admin Dashboard

Access at `/admin` with password: `portfolio2026`

Features:
- Update GitHub username
- Configure repository settings
- Override bio text
- View activity logs
- Monitor API health

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Migration Notes

Migrated from React + Vite to Next.js 14:
- ✅ Environment variables: `VITE_*` → `NEXT_PUBLIC_*`
- ✅ Client components: Added `'use client'` directive
- ✅ Routing: File-based routing with App Router
- ✅ API proxy: Configured in `next.config.js`
