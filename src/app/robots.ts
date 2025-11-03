import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Get the base URL from environment variables
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://visa-jo.com';
  
  // Ensure the URL has a protocol (https://)
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  // Remove trailing slash if present
  baseUrl = baseUrl.replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
