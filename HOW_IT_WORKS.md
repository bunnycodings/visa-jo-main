# How Arabic URLs and PWA Work

## 🌐 Arabic URL Routing System

### How It Works:

1. **User visits Arabic URL**: 
   - Example: `/ar/فيزا-السفر/فيزا-الإمارات`
   - Browser automatically URL-encodes it to: `/ar/%D9%81%D9%8A%D8%B2%D8%A7-%D8%A7%D9%84%D8%B3%D9%81%D8%B1/%D9%81%D9%8A%D8%B2%D8%A7-%D8%A7%D9%84%D8%A5%D9%85%D8%A7%D8%B1%D8%A7%D8%AA`

2. **Middleware Intercepts** (`src/middleware.ts`):
   - Matches pattern: `/ar/فيزا-السفر/{country-slug}` or `/ar/فيزا-شنغن/{country-slug}`
   - Decodes the URL-encoded pathname
   - Converts Arabic slug to English country code:
     - `فيزا-الإمارات` → `uae`
     - `فيزا-ألمانيا` → `germany`
   - **Rewrites** the URL internally to: `/ar/visa/uae`
   - User still sees the Arabic URL in browser, but server uses the English route

3. **Page Component** (`src/app/ar/visa/[country]/page.tsx`):
   - Receives the country code (already converted by middleware)
   - Fetches visa data using the English country code
   - Displays content in Arabic (using LanguageContext)

### URL Examples:

| Arabic URL (user sees) | Internal Route (server uses) | Country Code |
|------------------------|------------------------------|--------------|
| `/ar/فيزا-السفر/فيزا-الإمارات` | `/ar/visa/uae` | `uae` |
| `/ar/فيزا-شنغن/فيزا-ألمانيا` | `/ar/visa/germany` | `germany` |
| `/ar/فيزا-السفر/فيزا-بريطانيا` | `/ar/visa/uk` | `uk` |

### Flow Diagram:

```
User clicks link
    ↓
Arabic URL: /ar/فيزا-السفر/فيزا-الإمارات
    ↓
Middleware intercepts
    ↓
Converts: فيزا-الإمارات → uae
    ↓
Rewrites to: /ar/visa/uae (internally)
    ↓
Page component receives: country = "uae"
    ↓
Fetches visa data for UAE
    ↓
Displays Arabic content
```

---

## 📱 Progressive Web App (PWA)

### How It Works:

1. **Manifest File** (`public/manifest.json`):
   - Defines app name, icons, theme colors
   - Tells browser: "This website can be installed as an app"
   - Linked in `<head>` via: `<link rel="manifest" href="/manifest.json">`

2. **Service Worker** (`src/app/sw.js/route.ts`):
   - Serves JavaScript file that runs in background
   - Caches important files for offline access
   - Registered automatically when page loads

3. **Registration** (`src/components/PWARegistration.tsx`):
   - Component runs on page load
   - Checks if browser supports service workers
   - Registers service worker from `/sw.js`
   - Caches: `/`, `/ar`, `/manifest.json`, logo image

### How Users Install:

1. **Desktop (Chrome/Edge)**:
   - Visit website
   - Look for install icon in address bar
   - Click "Install" or "Add to Home Screen"

2. **Mobile (iOS Safari)**:
   - Tap Share button
   - Select "Add to Home Screen"

3. **Mobile (Android Chrome)**:
   - Browser shows install prompt
   - Tap "Install" or "Add to Home Screen"

### Features:

- ✅ Works offline (cached pages)
- ✅ App-like experience (standalone window)
- ✅ Fast loading (cached resources)
- ✅ Installable on devices

### Testing PWA:

1. **Check Service Worker**:
   - Open DevTools → Application → Service Workers
   - Should see "visa-jo-v1" registered

2. **Check Manifest**:
   - Open DevTools → Application → Manifest
   - Should see app details

3. **Test Offline**:
   - DevTools → Network → Check "Offline"
   - Refresh page - should still work (from cache)

---

## 🔧 Technical Details

### Files Involved:

**Arabic URLs:**
- `src/middleware.ts` - URL rewriting
- `src/lib/utils/arabic-slugs.ts` - Slug conversion utilities
- `src/app/ar/visa/[country]/page.tsx` - Visa page component
- `src/components/LanguageSwitcher.tsx` - Language switching with URL conversion

**PWA:**
- `public/manifest.json` - App manifest
- `src/app/sw.js/route.ts` - Service worker handler
- `src/components/PWARegistration.tsx` - Auto-registration
- `src/app/layout.tsx` - PWA meta tags

### Key Technologies:

- **Next.js Middleware**: Intercepts requests, rewrites URLs
- **Service Worker API**: Background scripts for caching
- **Web App Manifest**: JSON file defining PWA properties
- **URL Encoding**: Handles Arabic characters in URLs

---

## 🚀 Quick Start Guide

### For Arabic URLs:
1. Links in Navbar automatically use Arabic URLs when locale is Arabic
2. Language switcher converts URLs between English and Arabic
3. All Arabic visa pages use SEO-friendly Arabic slugs

### For PWA:
1. Service worker registers automatically on first visit
2. Users can install the app from browser
3. Works offline after first visit

---

## 📝 Notes

- Arabic URLs are SEO-friendly and readable
- Service worker caches only essential files (not all pages)
- Middleware runs before page rendering (edge function)
- All Arabic content comes from `messages/ar.json`

