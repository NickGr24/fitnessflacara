import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fitnessflacara.md'
  
  const routes = [
    '',
    '/despre',
    '/contact', 
    '/antrenori'
  ]
  
  const locales = ['ro', 'ru']
  
  const urls: MetadataRoute.Sitemap = []
  
  // Add root page
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })
  
  // Add localized pages
  locales.forEach(locale => {
    routes.forEach(route => {
      urls.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 0.9 : 0.8,
      })
    })
  })
  
  return urls
}
