// Re-export siteConfig from the constants directory
import { siteConfig } from './constants/site';
export { siteConfig };

export const VISA_TYPES = {
  TRAVEL: [
    { name: 'United States', code: 'us' },
    { name: 'United Kingdom', code: 'uk' },
    { name: 'Canada', code: 'ca' },
    { name: 'Australia', code: 'au' },
    { name: 'Japan', code: 'jp' },
    { name: 'South Korea', code: 'kr' },
    { name: 'China', code: 'cn' },
    { name: 'India', code: 'in' },
    { name: 'United Arab Emirates', code: 'ae' },
    { name: 'Saudi Arabia', code: 'sa' }
  ],
  SCHENGEN: [
    { name: 'Germany', code: 'de' },
    { name: 'France', code: 'fr' },
    { name: 'Italy', code: 'it' },
    { name: 'Spain', code: 'es' },
    { name: 'Netherlands', code: 'nl' },
    { name: 'Belgium', code: 'be' },
    { name: 'Austria', code: 'at' },
    { name: 'Switzerland', code: 'ch' },
    { name: 'Sweden', code: 'se' },
    { name: 'Portugal', code: 'pt' }
  ]
};