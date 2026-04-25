import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
          url: 'https://tadiyos-dejene.vercel.app/',
          lastModified: new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 1,
        },
      ];
}