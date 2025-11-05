"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getArabicVisaUrl,
  getCountryFromArabicSlug,
} from "@/lib/utils/arabic-slugs";
import { getAlternateLanguageRoute } from "@/lib/utils/route-mapping";

export function LanguageSwitcherNextIntl() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Get the actual browser URL to handle cases where middleware rewrites internally
  const [browserPath, setBrowserPath] = useState("");

  useEffect(() => {
    // Get the actual URL from the browser
    setBrowserPath(window.location.pathname);
  }, [pathname]);

  // Helper function to get clean path without query params or hash
  const getCleanPath = (path: string): string => {
    return path.split("?")[0].split("#")[0];
  };

  const switchLanguage = (newLocale: "en" | "ar") => {
    setIsOpen(false);

    // Use browser path if available, fallback to pathname
    const currentPath = getCleanPath(browserPath || pathname || "/");

    // Skip admin routes - they are separate for each language
    if (
      currentPath.startsWith("/admin/") ||
      currentPath.startsWith("/ar/admin/")
    ) {
      return;
    }

    let targetPath: string | null = null;

    // Handle visa routes
    if (currentPath.match(/^\/(en\/)?visa\//)) {
      // English visa page (e.g., /visa/uae or /en/visa/uae)
      if (newLocale === "ar") {
        const country = currentPath.split("/visa/")[1]?.split("/")[0] || "";
        if (country) {
          targetPath = getArabicVisaUrl(country);
        }
      } else {
        // Already in English, just ensure proper format
        const country = currentPath.split("/visa/")[1]?.split("/")[0] || "";
        if (country) {
          targetPath = `/en/visa/${country}`;
        }
      }
    } else if (currentPath.startsWith("/ar/visa/")) {
      // Arabic visa page
      if (newLocale === "en") {
        const slugOrCode =
          currentPath.split("/ar/visa/")[1]?.split("/")[0] || "";
        // Could be either Arabic slug or country code (if middleware already converted)
        const countryCode = getCountryFromArabicSlug(slugOrCode);
        if (countryCode) {
          targetPath = `/en/visa/${countryCode}`;
        }
      } else {
        // Staying in Arabic, check if we need to convert back to slug
        const slugOrCode =
          currentPath.split("/ar/visa/")[1]?.split("/")[0] || "";
        // Check if it's already an Arabic slug by trying to decode
        const decoded = decodeURIComponent(slugOrCode);
        if (decoded !== slugOrCode && decoded.includes("فيزا")) {
          // It's already an Arabic slug
          targetPath = currentPath;
        } else {
          // It's a country code, convert to Arabic slug
          targetPath = getArabicVisaUrl(slugOrCode);
        }
      }
    } else {
      // For regular pages, use the route mapping
      targetPath = getAlternateLanguageRoute(currentPath, newLocale);
    }

    // If we found a target path, navigate to it
    if (targetPath) {
      document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLocale;
      router.push(targetPath);
    }
  };

  const isArabic = locale === "ar";

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        aria-label="Switch language"
      >
        <span className="text-sm font-medium">{isArabic ? "AR" : "EN"}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-24 bg-gray-900 rounded-lg shadow-lg z-50 border border-gray-700">
            <button
              onClick={() => switchLanguage("en")}
              className={`w-full text-left px-4 py-2 text-sm rounded-t-lg transition-colors ${
                !isArabic
                  ? "bg-[#145EFF] text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              English
            </button>
            <button
              onClick={() => switchLanguage("ar")}
              className={`w-full text-left px-4 py-2 text-sm rounded-b-lg transition-colors ${
                isArabic
                  ? "bg-[#145EFF] text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              العربية
            </button>
          </div>
        </>
      )}
    </div>
  );
}
