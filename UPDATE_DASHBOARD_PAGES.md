# Dashboard Pages Update Guide

All dashboard content pages need to be updated to use the new tab navigation system.

## Pages to Update:
1. ✅ `/admin/dashboard/page.tsx` - Main dashboard
2. ✅ `/admin/dashboard/visas/page.tsx` - Visas list
3. ✅ `/admin/dashboard/content/hero/page.tsx` - Hero content
4. ⏳ `/admin/dashboard/content/popular/page.tsx`
5. ⏳ `/admin/dashboard/content/how/page.tsx`
6. ⏳ `/admin/dashboard/content/services/page.tsx`
7. ⏳ `/admin/dashboard/content/about/page.tsx`
8. ⏳ `/admin/dashboard/content/contact/page.tsx`
9. ⏳ `/admin/dashboard/content/metadata/page.tsx`
10. ⏳ `/admin/dashboard/account/page.tsx`
11. ⏳ `/admin/dashboard/visas/new/page.tsx`
12. ⏳ `/admin/dashboard/visas/edit/[name]/page.tsx`

## Update Pattern:

1. **Add imports:**
```tsx
import DashboardLayout from '@/components/admin/DashboardLayout';
import TabNavigation from '@/components/admin/TabNavigation';
import { adminTabs } from '@/lib/admin-tabs';
```

2. **Wrap return with DashboardLayout and add TabNavigation:**
```tsx
return (
  <DashboardLayout>
    <TabNavigation tabs={adminTabs} />
    <div className="max-w-7xl mx-auto mt-6">
      {/* Existing content */}
    </div>
  </DashboardLayout>
);
```

3. **Remove old header/navigation code** - the sidebar and tabs handle navigation now.

