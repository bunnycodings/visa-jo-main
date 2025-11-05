import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Since we're using custom /ar routing instead of [locale] folder,
  // we'll default to 'en' and let the IntlProvider handle locale switching
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Using next-intl's built-in message handling
  // Messages are loaded through next-intl's standard configuration
  return {
    locale,
    messages: {}, // Messages will be loaded through next-intl's standard mechanism
    timeZone: 'Asia/Amman' // Jordan timezone
  };
});

