import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://visa-jo.com';

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

  // Travel visa pages
  const travelVisas = [
    { name: 'uae', title: 'UAE' },
    { name: 'uk', title: 'UK' },
    { name: 'us', title: 'US' },
    { name: 'canada', title: 'Canada' },
    { name: 'australia', title: 'Australia' },
    { name: 'india', title: 'India' },
  ];

  // Schengen visa pages
  const schengenVisas = [
    { name: 'germany', title: 'Germany' },
    { name: 'france', title: 'France' },
    { name: 'netherlands', title: 'Netherlands' },
    { name: 'spain', title: 'Spain' },
    { name: 'italy', title: 'Italy' },
    { name: 'austria', title: 'Austria' },
  ];

  // Combine all visas
  const allVisas = [...travelVisas, ...schengenVisas];

  // Generate visa pages
  const visaPages: MetadataRoute.Sitemap = allVisas.map((visa) => ({
    url: `${baseUrl}/visas/${visa.name}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Visa category pages
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

  return [...staticPages, ...visaPages, ...categoryPages];
}
