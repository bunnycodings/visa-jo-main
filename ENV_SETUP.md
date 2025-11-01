# 🔧 Environment Variables Setup (.env.local)

## ⚠️ Important

The `.env.local` file is **NOT** included in the repository for security reasons. You need to create it manually.

---

## 📋 How to Create .env.local

1. **In your project root** (`C:\Users\Bunny\Desktop\visa-jo-main\`), create a new file named `.env.local`
2. **Copy the content below** into the file
3. **Update values** with your actual configuration
4. **Restart the app** - `npm run dev`

---

## 📝 Complete .env.local Template

Copy everything below into your `.env.local` file:

```env
# ================================================
# DATABASE CONFIGURATION
# ================================================
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=visa_consulting

# ================================================
# AUTHENTICATION
# ================================================
NEXTAUTH_SECRET=your-secret-key-change-this-in-production

# ================================================
# SITE INFORMATION
# ================================================
SITE_ADDRESS=Al Qaherah, Abdoun, Building Number 24, Amman-Jordan
SITE_EMAIL=info@visa-jo.com
SITE_PHONE=0796090319

# ================================================
# CONTACT INFORMATION
# ================================================
CONTACT_EMAIL=info@visa-jo.com
CONTACT_PHONE=0796090319
CONTACT_ADDRESS=Al Qaherah, Abdoun, Building Number 24, Amman-Jordan
BUSINESS_HOURS=Mon - Fri: 09:00 AM - 18:00 PM

# ================================================
# SOCIAL MEDIA LINKS
# ================================================
FACEBOOK_URL=https://facebook.com/your-page
INSTAGRAM_URL=https://instagram.com/your-profile
TWITTER_URL=https://twitter.com/your-handle

# ================================================
# GOOGLE PLACES API (Optional - for reviews)
# ================================================
GOOGLE_PLACES_API_KEY=your-google-places-api-key-here
NEXT_PUBLIC_GOOGLE_PLACE_ID=your-google-place-id-here

# ================================================
# ANALYTICS (Optional - Vercel Analytics)
# ================================================
# NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id-here
```

---

## 🔑 Required Variables Explanation

### Database Configuration
```env
DB_HOST=localhost                 # MySQL server address
DB_PORT=3306                      # MySQL port (default: 3306)
DB_USER=root                      # MySQL username
DB_PASSWORD=                      # MySQL password (empty if no password)
DB_NAME=visa_consulting           # Database name
```

**Example for local phpMyAdmin:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=visa_consulting
```

### Authentication
```env
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
```

**For Production:** Generate a strong random string:
```bash
openssl rand -base64 32
```

### Site Information
```env
SITE_ADDRESS=Your office address
SITE_EMAIL=contact@yourdomain.com
SITE_PHONE=+962796090319
```

These appear on:
- Contact page
- Footer
- Contact forms

### Contact Information
```env
CONTACT_EMAIL=info@visa-jo.com
CONTACT_PHONE=0796090319
CONTACT_ADDRESS=Your address
BUSINESS_HOURS=Mon - Fri: 09:00 AM - 18:00 PM
```

### Social Media Links
```env
FACEBOOK_URL=https://facebook.com/your-page
INSTAGRAM_URL=https://instagram.com/your-profile
TWITTER_URL=https://twitter.com/your-handle
```

Leave as `#` commented out if not using social media links.

### Google Places API (Optional)
```env
GOOGLE_PLACES_API_KEY=AIzaSy...
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJ...
```

**Get your API key:**
1. Go to: https://console.cloud.google.com/
2. Create a new project
3. Enable "Places API"
4. Create API key
5. Paste key value here

---

## ✅ Setup Verification

After creating `.env.local`, verify it works:

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Check console output** for database connection:
   ```
   ✅ Database connection successful
   ✓ Set (value: localhost)
   ```

3. **Visit homepage:** `http://localhost:3000`
   - Should load without database errors
   - Contact info should show your email/phone

4. **Test admin login:** `http://localhost:3000/admin/login`
   - Email: `admin@visaconsulting.com`
   - Password: `visajoadmin123`

---

## 🚨 Common Issues & Solutions

### Issue: "Database connection failed"

**Solution:** Check your .env.local:
```env
DB_HOST=localhost     # Must match your MySQL host
DB_USER=root          # Must match your MySQL user
DB_PASSWORD=          # Must match your MySQL password
DB_NAME=visa_consulting  # Database must exist
```

### Issue: "Environment variable not found"

**Solution:** 
1. Restart the app: `npm run dev`
2. Make sure `.env.local` is in project root (same folder as `package.json`)
3. No .gitignore blocking: `.env.local` should NOT be in .gitignore

### Issue: "Contact form shows wrong info"

**Solution:** Update SITE_* and CONTACT_* variables:
```env
SITE_EMAIL=your-actual-email@domain.com
SITE_PHONE=your-actual-phone
```

### Issue: "Google reviews not loading"

**Solution:** Add Google Places API key:
```env
GOOGLE_PLACES_API_KEY=your-api-key-here
NEXT_PUBLIC_GOOGLE_PLACE_ID=your-place-id-here
```

---

## 📁 File Location

```
C:\Users\Bunny\Desktop\visa-jo-main\
├── .env.local          ← CREATE THIS FILE
├── package.json
├── src/
└── ...
```

---

## 🔒 Security Notes

- **Never commit `.env.local`** to Git (it's in .gitignore)
- **Never share `.env.local`** with others
- **Change `NEXTAUTH_SECRET`** in production
- **Use strong passwords** for DB_PASSWORD
- **Rotate API keys** regularly

---

## 📝 For Local Development

You can use simple values:

```env
# Local Development Setup
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=visa_consulting
NEXTAUTH_SECRET=dev-secret-key-not-secure
SITE_EMAIL=your-email@example.com
SITE_PHONE=0796090319
```

---

## 🚀 For Production (Vercel)

Set environment variables in Vercel dashboard:

1. Go to: `vercel.com/account/settings/environment-variables`
2. Add each variable:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `NEXTAUTH_SECRET`
   - etc.

---

## ✨ Quick Copy-Paste (Local Development)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=visa_consulting
NEXTAUTH_SECRET=dev-secret-key-local
SITE_ADDRESS=Al Qaherah, Abdoun, Building Number 24, Amman-Jordan
SITE_EMAIL=info@visa-jo.com
SITE_PHONE=0796090319
CONTACT_EMAIL=info@visa-jo.com
CONTACT_PHONE=0796090319
CONTACT_ADDRESS=Al Qaherah, Abdoun, Building Number 24, Amman-Jordan
BUSINESS_HOURS=Mon - Fri: 09:00 AM - 18:00 PM
FACEBOOK_URL=#
INSTAGRAM_URL=#
TWITTER_URL=#
GOOGLE_PLACES_API_KEY=
NEXT_PUBLIC_GOOGLE_PLACE_ID=
```

---

## ✅ Status After Setup

After creating `.env.local`:

- ✅ Database can connect
- ✅ Admin login works
- ✅ Auto-initialization runs
- ✅ All visas load
- ✅ Contact info displays
- ✅ Social links work
- ✅ App fully functional

---

**Need help?** Check the console output - it will show which variables are missing or incorrect!
