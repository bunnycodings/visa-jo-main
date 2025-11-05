# Files to Delete After Migrating to next-intl

## ✅ Ready to Delete (After Component Migration)

### 1. Language Context (No longer needed)
```
src/context/LanguageContext.tsx
```
**Reason**: Replaced by next-intl's `useTranslations` hook

### 2. Old Language Switcher (Optional - after updating imports)
```
src/components/LanguageSwitcher.tsx
```
**Reason**: New version created: `src/components/LanguageSwitcherNextIntl.tsx`

**Action**: 
- Update all imports to use `LanguageSwitcherNextIntl`
- Then delete the old file

## 📝 Files That Need Updates First

Before deleting, update these files to use `useTranslations` instead of `useLanguage`:

### Components:
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/VisaDetails.tsx`
- `src/components/FloatingCallButton.tsx`

### Pages:
- `src/app/contact/page.tsx`
- `src/app/ar/contact/page.tsx`
- `src/app/services/page.tsx`
- `src/app/ar/services/page.tsx`
- `src/app/about/page.tsx`
- `src/app/ar/about/page.tsx`
- `src/app/not-found.tsx`
- `src/app/ar/not-found.tsx`

### Admin Components:
- `src/components/admin/DashboardLayout.tsx`
- `src/components/admin/ArabicAdminDashboardLayout.tsx`
- `src/components/admin/Sidebar.tsx`
- `src/components/admin/TabNavigation.tsx`
- `src/components/admin/AdminLanguageSwitcher.tsx`

### Admin Pages:
- All files in `src/app/admin/dashboard/`
- All files in `src/app/ar/admin/dashboard/`

## 🔄 Migration Pattern

### Replace this:
```tsx
import { useLanguage } from '@/context/LanguageContext';

function MyComponent() {
  const { t, locale } = useLanguage();
  return <div>{t('common.home')}</div>;
}
```

### With this:
```tsx
import { useTranslations, useLocale } from 'next-intl';

function MyComponent() {
  const t = useTranslations();
  const locale = useLocale();
  return <div>{t('common.home')}</div>;
}
```

## 📋 Migration Checklist

- [ ] Update all components to use `useTranslations`
- [ ] Update all components to use `useLocale` instead of `locale` from context
- [ ] Update LanguageSwitcher imports to use `LanguageSwitcherNextIntl`
- [ ] Test English and Arabic pages
- [ ] Delete `src/context/LanguageContext.tsx`
- [ ] Delete `src/components/LanguageSwitcher.tsx` (if replaced everywhere)
- [ ] Remove `LanguageProvider` from root layout (already done ✅)

## ⚠️ Keep These Files

These are still needed:
- `src/lib/utils/route-mapping.ts` - Used for route translation
- `src/lib/utils/arabic-slugs.ts` - Used for Arabic URL handling
- `messages/en.json` - Translation files (keep)
- `messages/ar.json` - Translation files (keep)

