import { MetadataRoute } from 'next';
import { getAllVisas, getSiteContent } from '@/lib/utils/db-helpers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://visa-jo.com';

  try {
    // Fetch all visas from database dynamically
    let visas = [];
    try {
      visas = await getAllVisas();
    } catch (error) {
      console.warn('Failed to fetch visas for sitemap:', error);
      // Fallback to default visa list if database is unavailable
      visas = [];
    }

    // Fetch page metadata from database
    let pageMetadata = [];
    try {
      const metadata = await getSiteContent('page-metadata');
      if (metadata && metadata.content) {
        pageMetadata = Array.isArray(metadata.content) ? metadata.content : Object.values(metadata.content || {});
      }
    } catch (error) {
      console.warn('Failed to fetch page metadata for sitemap:', error);
    }

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];

    // Dynamic visa pages from database
    const visaPages: MetadataRoute.Sitemap = visas.map((visa: any) => ({
      url: `${baseUrl}/visas/${visa.country.toLowerCase()}`,
      lastModified: visa.updatedAt ? new Date(visa.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Category pages (static)
    const categoryPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/visa/travel`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/visa/schengen`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ];

    // Get last modified date from metadata
    const lastModifiedDate = pageMetadata.length > 0
      ? new Date(Math.max(...pageMetadata.map((p: any) => new Date(p.updatedAt || new Date()).getTime())))
      : new Date();

    return [...staticPages, ...visaPages, ...categoryPages].map(page => ({
      ...page,
      lastModified: page.url.includes('/visas/') 
        ? (visas.find((v: any) => v.country.toLowerCase() === page.url.split('/').pop())?.updatedAt || page.lastModified)
        : page.lastModified,
    }));
  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    // Fallback to basic sitemap
    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];
  }
}
