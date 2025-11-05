import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCountryFromArabicSlug } from './lib/utils/arabic-slugs';
import { getArabicVisaUrl } from './lib/utils/arabic-slugs';

const intlMiddleware = createMiddleware(routing);

// Arabic slug to country code mapping
const arabicSlugs: Record<string, string> = {
  'فيزا-الإمارات': 'uae',
  'فيزا-بريطانيا': 'uk',
  'فيزا-أمريكا': 'us',
  'فيزا-كندا': 'canada',
  'فيزا-أستراليا': 'australia',
  'فيزا-الهند': 'india',
  'فيزا-ألمانيا': 'germany',
  'فيزا-فرنسا': 'france',
  'فيزا-هولندا': 'netherlands',
  'فيزا-إسبانيا': 'spain',
  'فيزا-إيطاليا': 'italy',
  'فيزا-النمسا': 'austria',
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for admin routes, API routes, and static files
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Handle Arabic visa URLs - convert Arabic slugs to country codes
  if (pathname.startsWith('/ar/visa/')) {
    const countrySlug = pathname.replace('/ar/visa/', '').replace(/\/$/, '');
    
    // Check if it's an Arabic slug
    if (arabicSlugs[countrySlug] || arabicSlugs[decodeURIComponent(countrySlug)]) {
      const decoded = decodeURIComponent(countrySlug);
      const countryCode = arabicSlugs[decoded] || arabicSlugs[countrySlug] || countrySlug;
      
      // Rewrite to use country code
      const rewriteUrl = new URL(`/ar/visa/${countryCode}`, request.url);
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  // Let next-intl handle the rest
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};
