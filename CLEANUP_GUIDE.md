# Cleanup Guide: Migrating from Custom LanguageContext to next-intl

## Files to Remove (After Migration)

### 1. Context Files (No longer needed with next-intl)
- `src/context/LanguageContext.tsx` - **DELETE** (replaced by next-intl's useTranslations)

### 2. Old Language Switcher (if you want to use the new one)
- `src/components/LanguageSwitcher.tsx` - **OPTIONAL DELETE** (new version: `LanguageSwitcherNextIntl.tsx`)
  - Keep the old one if you want to gradually migrate
  - Or delete it after updating all imports

### 3. Utility Files (Review if still needed)
- `src/lib/utils/route-mapping.ts` - **KEEP** (still used for route mapping)
- `src/lib/utils/arabic-slugs.ts` - **KEEP** (still needed for Arabic URL handling)

## Migration Steps

### Step 1: Update Components to use `useTranslations`

Replace:
```tsx
import { useLanguage } from '@/context/LanguageContext';
const { t } = useLanguage();
```

With:
```tsx
import { useTranslations } from 'next-intl';
const t = useTranslations();
```

### Step 2: Update Language Switcher

Replace imports of `LanguageSwitcher` with `LanguageSwitcherNextIntl`:
```tsx
// Old
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// New
import { LanguageSwitcherNextIntl as LanguageSwitcher } from '@/components/LanguageSwitcherNextIntl';
```

### Step 3: Update Layout Files

The root layout and Arabic layout have been updated to use `NextIntlClientProvider`.

### Step 4: Remove Old Context Provider

Once all components are migrated:
1. Remove `LanguageProvider` import from `src/app/layout.tsx`
2. Delete `src/context/LanguageContext.tsx`
3. Update any remaining `useLanguage()` calls to `useTranslations()`

## Files That Need Updates

### Components that use `useLanguage`:
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/VisaDetails.tsx`
- `src/app/contact/page.tsx`
- `src/app/ar/contact/page.tsx`
- `src/app/services/page.tsx`
- `src/app/ar/services/page.tsx`
- `src/app/about/page.tsx`
- `src/app/ar/about/page.tsx`
- All admin components in `src/components/admin/`
- All admin pages in `src/app/admin/` and `src/app/ar/admin/`

## Next Steps

1. ✅ Created next-intl configuration (`src/i18n.ts`, `src/i18n/routing.ts`)
2. ✅ Updated middleware to use next-intl
3. ✅ Created new LanguageSwitcher component
4. ⏳ **TODO**: Update all components to use `useTranslations` instead of `useLanguage`
5. ⏳ **TODO**: Remove `LanguageContext.tsx` after migration
6. ⏳ **TODO**: Remove old `LanguageSwitcher.tsx` after migration

## Benefits of next-intl

1. **Better Type Safety**: Type-safe translations
2. **Server Components Support**: Works with RSC out of the box
3. **Better Performance**: Built-in optimizations
4. **Standard Library**: Widely used and maintained
5. **Locale Detection**: Automatic locale detection
6. **SEO Friendly**: Better handling of locale-specific URLs

