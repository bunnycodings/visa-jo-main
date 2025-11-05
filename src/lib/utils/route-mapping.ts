/**
 * Route mapping between English and Arabic pages
 * Each English page maps to its Arabic equivalent and vice versa
 */

export interface RouteMapping {
  en: string;
  ar: string;
}

/**
 * Complete route mapping for all pages
 * This ensures every English page has an Arabic equivalent
 */
export const routeMappings: Record<string, RouteMapping> = {
  // Homepage
  "/": { en: "/en", ar: "/ar" },
  "/en": { en: "/en", ar: "/ar" },
  "/ar": { en: "/en", ar: "/ar" },

  // About page
  "/about": { en: "/en/about", ar: "/ar/about" },
  "/en/about": { en: "/en/about", ar: "/ar/about" },
  "/ar/about": { en: "/en/about", ar: "/ar/about" },

  // Contact page
  "/contact": { en: "/en/contact", ar: "/ar/contact" },
  "/en/contact": { en: "/en/contact", ar: "/ar/contact" },
  "/ar/contact": { en: "/en/contact", ar: "/ar/contact" },

  // Services page
  "/services": { en: "/en/services", ar: "/ar/services" },
  "/en/services": { en: "/en/services", ar: "/ar/services" },
  "/ar/services": { en: "/en/services", ar: "/ar/services" },
};

/**
 * Get the corresponding route in the other language
 * @param currentPath - Current pathname
 * @param targetLocale - Target locale ('en' or 'ar')
 * @returns The corresponding route in the target language, or null if not found
 */
export function getAlternateLanguageRoute(
  currentPath: string,
  targetLocale: "en" | "ar",
): string | null {
  // Clean the path
  const cleanPath = currentPath.split("?")[0].split("#")[0];

  // Check exact match first
  if (routeMappings[cleanPath]) {
    return routeMappings[cleanPath][targetLocale];
  }

  // Handle visa routes separately
  if (cleanPath.startsWith("/visa/")) {
    // This will be handled by the language switcher with getArabicVisaUrl
    return null;
  }

  if (
    cleanPath.startsWith("/ar/visa/") ||
    cleanPath.includes("فيزا-السفر") ||
    cleanPath.includes("فيزا-شنغن")
  ) {
    // This will be handled by the language switcher with getCountryFromArabicSlug
    return null;
  }

  // For other routes, use prefix-based mapping
  if (targetLocale === "ar") {
    // English to Arabic: add /ar prefix
    if (cleanPath.startsWith("/ar")) {
      return cleanPath; // Already Arabic
    }

    // Remove /en prefix if present
    let pathWithoutLocale = cleanPath;
    if (cleanPath.startsWith("/en/")) {
      pathWithoutLocale = cleanPath.replace(/^\/en/, "");
    } else if (cleanPath === "/en") {
      pathWithoutLocale = "/";
    }

    return pathWithoutLocale === "/" ? "/ar" : `/ar${pathWithoutLocale}`;
  } else {
    // Arabic to English: remove /ar prefix and add /en
    if (cleanPath.startsWith("/en")) {
      return cleanPath; // Already English with /en prefix
    }

    if (!cleanPath.startsWith("/ar")) {
      // No locale prefix, add /en
      return cleanPath === "/" ? "/en" : `/en${cleanPath}`;
    }

    const pathWithoutLocale =
      cleanPath === "/ar" ? "/" : cleanPath.replace(/^\/ar/, "");
    return pathWithoutLocale === "/" ? "/en" : `/en${pathWithoutLocale}`;
  }
}

/**
 * Check if a route exists in both languages
 */
export function hasBothLanguageVersions(path: string): boolean {
  const cleanPath = path.split("?")[0].split("#")[0];
  return (
    routeMappings[cleanPath] !== undefined ||
    cleanPath.startsWith("/visa/") ||
    cleanPath.startsWith("/ar/visa/") ||
    cleanPath.includes("فيزا-السفر") ||
    cleanPath.includes("فيزا-شنغن")
  );
}
