import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Arabic slug to country code mapping (inline to avoid import issues in middleware)
const arabicSlugToCountry: Record<string, string> = {
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

function getCountryFromArabicSlug(slug: string): string {
  // Try direct match
  if (arabicSlugToCountry[slug]) {
    return arabicSlugToCountry[slug];
  }
  
  // Try URL-decoded
  try {
    const decoded = decodeURIComponent(slug);
    if (arabicSlugToCountry[decoded]) {
      return arabicSlugToCountry[decoded];
    }
  } catch {
    // Continue
  }
  
  // Check if already English country code
  const lowerSlug = slug.toLowerCase();
  const englishCountries = ['uae', 'uk', 'us', 'canada', 'australia', 'india', 'germany', 'france', 'netherlands', 'spain', 'italy', 'austria'];
  if (englishCountries.includes(lowerSlug)) {
    return lowerSlug;
  }
  
  return slug;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for admin routes - let Next.js handle them normally
  if (pathname.startsWith('/admin/') || pathname.startsWith('/ar/admin/')) {
    return NextResponse.next();
  }
  
  // Skip middleware for API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Redirect old /visas/ routes to /visa/ (both English and Arabic)
  if (pathname.startsWith('/visas/')) {
    const country = pathname.replace('/visas/', '').replace(/\/$/, '');
    const redirectUrl = new URL(`/visa/${country}`, request.url);
    return NextResponse.redirect(redirectUrl, 301);
  }
  
  if (pathname.startsWith('/ar/visas/')) {
    const country = pathname.replace('/ar/visas/', '').replace(/\/$/, '');
    const redirectUrl = new URL(`/ar/visa/${country}`, request.url);
    return NextResponse.redirect(redirectUrl, 301);
  }
  
  // Handle Arabic visa URLs with category structure
  // Pattern: /ar/فيزا-السفر/{country-slug} or /ar/فيزا-شنغن/{country-slug}
  try {
    // Decode the pathname to handle Arabic characters
    let decodedPath: string;
    try {
      decodedPath = decodeURIComponent(pathname);
    } catch {
      decodedPath = pathname;
    }
    
    // Match Arabic visa category patterns (both URL-encoded and decoded)
    const arabicVisaPattern = /^\/ar\/(?:فيزا-السفر|فيزا-شنغن)\/([^\/]+)/;
    const match = decodedPath.match(arabicVisaPattern);
    
    if (match) {
      const countrySlug = match[1];
      const countryCode = getCountryFromArabicSlug(countrySlug);
      
      // Rewrite to the internal route structure
      const rewriteUrl = new URL(`/ar/visa/${countryCode}`, request.url);
      return NextResponse.rewrite(rewriteUrl);
    }
    
    // Also handle direct Arabic visa routes without category: /ar/visa/{country}
    const directVisaPattern = /^\/ar\/visa\/([^\/]+)/;
    const directMatch = decodedPath.match(directVisaPattern);
    
    if (directMatch) {
      const countrySlug = directMatch[1];
      const countryCode = getCountryFromArabicSlug(countrySlug);
      
      // Already in correct format, just ensure country code is correct
      const rewriteUrl = new URL(`/ar/visa/${countryCode}`, request.url);
      return NextResponse.rewrite(rewriteUrl);
    }
  } catch (error) {
    // If decoding fails, continue with normal routing
    console.error('Middleware error:', error);
  }
  
  // For all other routes, just pass through - let Next.js handle routing
  // next-intl will provide locale context via IntlProvider
  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

