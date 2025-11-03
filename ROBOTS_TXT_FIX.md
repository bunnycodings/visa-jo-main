# How to Fix "Invalid Sitemap URL" Error

## The Problem

Google Search Console is showing:
```
Line 12: Sitemap: rhananiacars.com/sitemap.xml
Error: Invalid sitemap URL
```

This error occurs because the sitemap URL is missing the protocol (`https://`).

---

## The Solution

I've updated the code to automatically add `https://` if it's missing from environment variables.

### Files Updated:
1. ✅ `src/app/robots.ts` - Now validates and adds protocol if missing
2. ✅ `src/app/sitemap.ts` - Now validates and adds protocol if missing  
3. ✅ `next.config.js` - Added default SITE_URL configuration

---

## How the Fix Works

The code now includes this validation:

```typescript
// Get the base URL from environment variables
let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://visa-jo.com';

// Ensure the URL has a protocol (https://)
if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
  baseUrl = `https://${baseUrl}`;
}

// Remove trailing slash if present
baseUrl = baseUrl.replace(/\/$/, '');
```

**This means:**
- ✅ If env var is `visa-jo.com` → becomes `https://visa-jo.com`
- ✅ If env var is `https://visa-jo.com` → stays `https://visa-jo.com`
- ✅ If env var is `rhananiacars.com` → becomes `https://rhananiacars.com`
- ✅ If no env var is set → uses `https://visa-jo.com`

---

## Immediate Fix Steps

### Option 1: Remove/Fix Wrong Environment Variable (RECOMMENDED)

If you have `rhananiacars.com` set as an environment variable somewhere:

1. **Go to your hosting platform** (Vercel/Netlify/etc.)
2. **Find and DELETE** any environment variable with value `rhananiacars.com`
3. **Add the correct variables:**
   ```bash
   SITE_URL=https://visa-jo.com
   NEXT_PUBLIC_SITE_URL=https://visa-jo.com
   ```
4. **Redeploy** your site

### Option 2: Just Redeploy (Quick Fix)

The updated code will automatically add `https://` even if the env var is wrong:

1. **Deploy this updated code**
2. The robots.txt will now show: `https://rhananiacars.com/sitemap.xml`
3. Then **fix the environment variable** to the correct domain
4. **Redeploy again** to get: `https://visa-jo.com/sitemap.xml`

---

## Verify the Fix

### 1. Check Local Development

Run locally:
```bash
npm run dev
```

Visit: `http://localhost:3000/robots.txt`

**Should show:**
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://visa-jo.com/sitemap.xml
```

### 2. Check Production

After deployment, visit: `https://visa-jo.com/robots.txt`

**Must show a VALID URL with https:// protocol**

### 3. Validate in Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Navigate to: **Crawling and Indexing** → **robots.txt**
3. The error should be **GONE** ✅
4. Submit your sitemap: `https://visa-jo.com/sitemap.xml`

---

## Where Did "rhananiacars.com" Come From?

This domain might be set in:

1. ❌ **Environment Variables** on your hosting platform
2. ❌ **Local `.env` file** (if you have one)
3. ❌ **Build settings** on your hosting platform
4. ❌ **Custom domain configuration** that wasn't fully updated

### To Find It:

#### On Vercel:
1. Project Settings → Environment Variables
2. Search for any variable containing "rhananiacars"
3. Delete it

#### On Netlify:
1. Site settings → Build & deploy → Environment
2. Look for variables with "rhananiacars"
3. Delete them

#### Locally:
```bash
# Search for it in your project
grep -r "rhananiacars" .
```

---

## Prevention

To prevent this from happening again:

### 1. Always Use Full URLs in Environment Variables
✅ **GOOD:**
```bash
SITE_URL=https://visa-jo.com
```

❌ **BAD:**
```bash
SITE_URL=visa-jo.com  # Missing protocol!
```

### 2. Set Environment Variables in Multiple Places

Make sure it's set in:
- [ ] Production environment
- [ ] Preview/Staging environment  
- [ ] Development environment (local `.env.local`)

### 3. Add to Your Build Process

Add this check to your build process:
```bash
echo "Site URL: $SITE_URL"
echo "Public Site URL: $NEXT_PUBLIC_SITE_URL"
```

This will help you catch misconfigurations early.

---

## Testing Checklist

After deploying the fix:

- [ ] Visit `https://visa-jo.com/robots.txt`
- [ ] Confirm sitemap URL includes `https://`
- [ ] Confirm sitemap URL is `visa-jo.com` (not rhananiacars.com)
- [ ] Visit `https://visa-jo.com/sitemap.xml`
- [ ] Confirm sitemap loads properly
- [ ] Check Google Search Console - error should be gone
- [ ] Submit sitemap to Google Search Console
- [ ] Run Lighthouse audit - should pass

---

## Quick Reference

### Current Status:
- ✅ Code updated to add protocol automatically
- ✅ next.config.js has correct default
- ⚠️ Need to fix environment variable (if using rhananiacars.com)
- ⚠️ Need to redeploy

### What You Need to Do:
1. **Find and remove** the wrong environment variable
2. **Set correct environment variables:**
   - `SITE_URL=https://visa-jo.com`
   - `NEXT_PUBLIC_SITE_URL=https://visa-jo.com`
3. **Deploy** the updated code
4. **Verify** robots.txt shows correct URL
5. **Resubmit** sitemap to Google

---

## Support

If the error persists after following these steps:

1. Check browser console for errors
2. Check deployment logs
3. Verify environment variables are actually set
4. Try a hard refresh (Ctrl+Shift+R)
5. Clear your site cache on hosting platform

---

**Expected Timeline:**
- Code deployment: 2-5 minutes
- robots.txt update: Immediate
- Google recrawl: 24-48 hours
- Error removal from Search Console: 3-7 days

---

**Last Updated:** November 3, 2025

