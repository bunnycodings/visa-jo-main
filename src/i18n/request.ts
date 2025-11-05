import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig({
  // Use the routing configuration
  ...routing,

  // Load messages based on locale
  async getMessage(locale) {
    return (await import(`../../messages/${locale}.json`)).default;
  },
});

