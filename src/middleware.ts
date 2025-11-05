import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCountryFromArabicSlug } from "@/lib/utils/arabic-slugs";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for admin routes, API routes, and static files
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Handle Arabic visa URLs - convert Arabic slugs to country codes BEFORE next-intl processes
  if (pathname.startsWith("/ar/visa/")) {
    const countrySlug = pathname.replace("/ar/visa/", "").replace(/\/$/, "");

    // Convert Arabic slug to country code using the utility function
    const countryCode = getCountryFromArabicSlug(countrySlug);

    // Only modify if the slug was actually converted (not returned as-is)
    if (countryCode !== countrySlug) {
      // Create a new URL with the country code instead of Arabic slug
      const url = request.nextUrl.clone();
      url.pathname = `/ar/visa/${countryCode}`;

      // Create a modified request to pass to next-intl
      const modifiedRequest = new NextRequest(url, {
        headers: request.headers,
      });

      // Let next-intl handle the modified request
      return intlMiddleware(modifiedRequest);
    }
  }

  // Let next-intl handle the rest
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|admin|.*\\..*).*)"],
};
