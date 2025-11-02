# Sitemap & Google Search Console Setup Guide

## 📋 What's Been Created

### 1. **Sitemap** (`/sitemap.xml`)
- ✅ Dynamically generated XML sitemap
- ✅ Includes all pages:
  - Homepage (Priority: 1.0)
  - About, Contact, Services (Priority: 0.8)
  - All 12 visa pages (Priority: 0.8)
  - Visa category pages (Priority: 0.7)
- ✅ Auto-updated with current date
- ✅ Proper change frequency for each page

### 2. **Robots.txt** (`/robots.txt`)
- ✅ Allows all search engines
- ✅ Blocks `/admin` and `/api` from indexing
- ✅ Points to sitemap.xml
- ✅ Specific rules for Googlebot and Bingbot

## 🚀 How to Use

### Step 1: Set Your Website URL
Add this to `.env.local`:
```
SITE_URL=https://yourdomain.com
```

If not set, defaults to `https://visa-jo.com`

### Step 2: Verify Files Are Generated
After deployment, check:
- `https://yourdomain.com/sitemap.xml` - Should show XML sitemap
- `https://yourdomain.com/robots.txt` - Should show robots.txt

### Step 3: Add to Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain)
3. Go to **Sitemaps**
4. Click **"Add/test sitemap"**
5. Enter: `sitemap.xml`
6. Submit!

### Step 4: Monitor Coverage
- Check **Coverage** report to see indexed pages
- Monitor **Mobile usability** issues
- Review **Core Web Vitals** performance

## 📊 Sitemap Content

**Static Pages (4):**
- Homepage
- /about
- /contact
- /services

**Visa Pages (12):**
- /visas/uae
- /visas/uk
- /visas/us
- /visas/canada
- /visas/australia
- /visas/india
- /visas/germany
- /visas/france
- /visas/netherlands
- /visas/spain
- /visas/italy
- /visas/austria

**Category Pages (2):**
- /visa/travel
- /visa/schengen

**Total: 18 Pages**

## 🛡️ Security

**Blocked from indexing:**
- `/admin/*` - Admin dashboard (not public content)
- `/api/*` - API routes (not for users)

**Allowed for indexing:**
- All public pages
- All visa detail pages
- Content pages

## 🔄 Auto-Updates

- Sitemap automatically updates with current date
- Change frequency hints:
  - Homepage: Daily (changes often)
  - Visa pages: Weekly (regular updates)
  - Static pages: Monthly (rarely change)
- No manual updates needed!

## 📱 SEO Best Practices

✅ Implemented:
- Dynamic sitemap generation
- Proper priority scores
- Change frequency hints
- Large page count optimization
- Mobile-friendly design
- HTTPS support

## 🧪 Testing

### Check Sitemap Validity
```
curl https://yourdomain.com/sitemap.xml
```

### Check Robots.txt
```
curl https://yourdomain.com/robots.txt
```

### Validate with Google
1. Go to Google Search Console
2. Use "URL Inspection" tool
3. Test any page to see if it's indexable

## ⚙️ Configuration

### Customize Update Frequency
Edit `/src/app/sitemap.ts`:
```typescript
changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
```

### Customize Priority
Edit `/src/app/sitemap.ts`:
```typescript
priority: 0.0 to 1.0  // 1.0 = highest priority
```

### Change Base URL
Set in `.env.local`:
```
SITE_URL=https://your-domain.com
```

## 📞 Support

If you have any issues:
1. Check sitemap is valid XML: `https://yourdomain.com/sitemap.xml`
2. Verify robots.txt is present: `https://yourdomain.com/robots.txt`
3. Submit in Google Search Console
4. Wait 24-48 hours for indexing

## 🎯 Next Steps

1. ✅ Deploy your website
2. ✅ Set `SITE_URL` in production `.env`
3. ✅ Add to Google Search Console
4. ✅ Monitor indexing progress
5. ✅ Check Core Web Vitals
6. ✅ Optimize based on reports

---

**Happy indexing! 🚀**
