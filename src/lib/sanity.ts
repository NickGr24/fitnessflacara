import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
}

export const sanityClient = createClient(sanityConfig)

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source: any) => builder.image(source)

// Helper function to get image URL with specific dimensions
export const getImageUrl = (source: any, width?: number, height?: number) => {
  let imageBuilder = urlFor(source)
  
  if (width) {
    imageBuilder = imageBuilder.width(width)
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height)
  }
  
  return imageBuilder.url()
}

// GROQ queries for common content
export const queries = {
  // Get homepage content
  getHomePage: `*[_type == "page" && slug.current == "home"][0] {
    _id,
    title,
    slug,
    sections[] {
      _type,
      _key,
      headline_ro,
      headline_ru,
      bullets_ro,
      bullets_ru,
      backgroundVideo,
      posterImage,
      ctaLabel_ro,
      ctaLabel_ru,
      body_ro,
      body_ru,
      images
    }
  }`,

  // Get all galleries
  getGalleries: `*[_type == "gallery"] | order(_createdAt desc) {
    _id,
    title_ro,
    title_ru,
    items[] {
      image,
      caption_ro,
      caption_ru
    }
  }`,

  // Get blog posts
  getBlogPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    author-> {
      name,
      image
    }
  }`,

  // Get single blog post
  getBlogPost: (slug: string) => `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    body,
    publishedAt,
    mainImage,
    author-> {
      name,
      image,
      bio
    }
  }`,

  // Get page by slug
  getPage: (slug: string) => `*[_type == "page" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    sections
  }`
}