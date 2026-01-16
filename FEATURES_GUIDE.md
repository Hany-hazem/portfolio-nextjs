# Quick Start Guide - New Portfolio Features

## Accessing the Admin Dashboard

1. Go to: **www.notworthy.vip/admin**
2. Enter password: `portfolio2026`
3. All features below are now editable

---

## 📞 Adding Contact Methods

### WhatsApp
- **Field:** "WhatsApp Number"
- **Format:** International format (e.g., +201027579528)
- **Display:** Green WhatsApp button in contact section
- **Auto-links to:** wa.me/{number}

### Telegram  
- **Field:** "Telegram Username"
- **Format:** @username or just username (e.g., @myusername or myusername)
- **Display:** Blue Telegram button in contact section
- **Auto-links to:** t.me/{username}

### Resume/CV
- **Field:** "Resume/CV Link"
- **Format:** Full URL (e.g., https://example.com/resume.pdf)
- **Display:** Purple Resume button in contact section
- **Action:** Opens link in new tab

---

## 🎯 Managing Projects

### Adding a Featured Project
1. Go to **Projects** section
2. Add or edit a project
3. Check the **"Featured Project"** checkbox
4. The project will show a yellow "Featured" badge on the portfolio

### Adding Demo & Repository Links
1. In the project form, fill:
   - **Demo Link:** URL to live demo/preview
   - **Repo Link:** URL to GitHub repository
2. These buttons appear below the technology stack
3. Demo button (blue) and Code button (gray)

---

## 🎓 Education & Experience

### Adding Education
1. Go to **Education** section (click to expand)
2. Click **"Add Education"**
3. Fill in:
   - Institution name (university/college)
   - Degree (e.g., "B.S. Computer Science")
   - Period (e.g., "2020 - 2024")
4. Click **Save**
5. Appears in portfolio if section has data

### Adding Experience
1. Go to **Experience** section (click to expand)
2. Click **"Add Experience"**
3. Fill in:
   - Company name
   - Job title/role
   - Period (e.g., "Jan 2020 - Dec 2021")
   - Description (achievements, responsibilities)
4. Click **Save**
5. Renders in portfolio in order added

### Adding Certifications
1. Go to **Certifications** section
2. Click **"Add Certification"**
3. Fill in:
   - Certification name
   - Issuing organization
   - Issue date
   - Certificate link (optional - for viewing)
4. Click **Save**
5. Shows in portfolio as card grid

---

## 🎨 Customizing Theme

### Change Primary Color
1. Go to **Theme Colors** section
2. Use color picker or enter hex code for **Primary Color**
   - Default: `#3b82f6` (blue)
   - Used for: Buttons, links, accents
3. Click **Save**

### Change Secondary Color
1. In **Theme Colors** section
2. Use color picker or enter hex code for **Secondary Color**
   - Default: `#14b8a6` (teal)
   - Used for: Highlights, secondary accents
3. Click **Save**

*Note: Colors are stored and ready for theme application*

---

## 📱 Social Media SEO

### Setting OG Title
- **What it is:** Title that appears when sharing on social media
- **Where:** SEO & Social Media section
- **Example:** "Hani Hazem - Full Stack Developer & AI Enthusiast"
- **Used by:** Facebook, Twitter, LinkedIn when sharing

### Setting OG Description
- **What it is:** Description text in social media preview
- **Where:** SEO & Social Media section
- **Example:** "Check out my portfolio featuring AI translation models, SaaS projects, and home automation systems."
- **Length:** 150-160 chars recommended

### Setting OG Image
- **What it is:** Image that appears in social media preview
- **Format:** Full URL to image (https://...)
- **Size:** 1200x630px recommended (Facebook standard)
- **Appears in:** LinkedIn, Facebook, Twitter card previews

---

## 📊 Managing Skills

### Adding/Editing Skills
1. Go to **Skills** section
2. Edit or add skill:
   - **Skill Name:** Technology/tool name
   - **Category:** (e.g., "Backend", "Frontend", "Database")
   - **Proficiency:** Slider 0-100%
   - **Years:** (Optional) Experience duration
3. Click **Save**

*Skills appear automatically in portfolio*

---

## 💬 Custom Contact Message

- **Field:** "Contact Form Message (Optional)"
- **Use case:** Custom introductory text above contact methods
- **Example:** "Let's collaborate on something amazing!"
- **Rendered:** Above all contact links in portfolio

---

## 🔄 Saving Changes

After editing any field:
1. Click the **"Save Portfolio"** button at bottom
2. Wait for success message
3. Changes appear live on www.notworthy.vip

**Note:** Vercel auto-deploys on changes, so live site updates within seconds

---

## 📋 Section Visibility

All new sections (Education, Experience, Certifications) only appear in the portfolio if they have data:
- Empty sections don't render
- Add data to make sections appear
- Remove all entries to hide section

---

## 🔐 Security

- Password: `portfolio2026` (change in production)
- All changes require authentication header: `x-admin-token: portfolio2026`
- Database: Supabase with RLS policies
- Backups: Available in `/backup` directory

---

## 📞 Need Help?

Refer to **FEATURES_COMPLETE.md** for technical implementation details.

All 7 features implemented:
✅ Contact methods (WhatsApp, Telegram, Resume)
✅ Enhanced projects (Featured, Demo, Repo links)
✅ Skills with years
✅ Theme colors
✅ SEO metadata
✅ Education & Experience
✅ Certifications
