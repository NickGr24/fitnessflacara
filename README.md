# Fitness Flacăra - Modern Bilingual Fitness Website

A modern, fast, bilingual (Romanian/Russian) website for Fitness Flacăra built with Next.js 14 and the latest web technologies.

## 🚀 Tech Stack

- **Next.js 14** with App Router and React Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** + **Radix UI** for components
- **Framer Motion** for animations
- **next-intl** for internationalization (RO/RU)
- **Sanity** for content management
- **Supabase** for database and real-time features
- **Vercel** for deployment

## 🌐 Features

- **Bilingual Support**: Full Romanian/Russian localization with route prefixes (`/ro`, `/ru`)
- **Modern Design**: Premium visuals with background video hero section
- **Performance Optimized**: Target LCP < 2.0s, CLS < 0.05, INP < 200ms
- **Mobile-First**: Responsive design optimized for all devices
- **SEO Ready**: Structured data, meta tags, sitemaps
- **Accessibility**: WCAG AA compliant with proper focus management

## 📋 Pages Structure

- **Home** (`/`) - Hero section with video background + key features
- **About** (`/despre`) - Company story and team information
- **Facilities** (`/facilitati`) - Overview of all facilities
  - Pool (`/facilitati/bazin`) - Olympic pool details
  - SPA (`/facilitati/spa`) - Sauna, hammam, infrared
  - Strength (`/facilitati/forta`) - Weight training area
  - Cardio (`/facilitati/cardio`) - Cardio equipment zone
  - Group Classes (`/facilitati/group`) - Group fitness studios
- **Memberships** (`/abonamente`) - Pricing plans with calculator
- **Schedule** (`/orar`) - Class timetables with filters
- **Trainers** (`/antrenori`) - Trainer profiles and specialties
- **Galleries** (`/galerii`) - Photo and video galleries
- **Blog** (`/blog`) - Fitness tips and news
- **Contact** (`/contact`) - Contact information and lead form

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables (see Environment Variables section)

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 🌍 Internationalization

The site supports Romanian (default) and Russian languages:

- Routes: `/ro/*` and `/ru/*`
- Messages: Located in `src/messages/ro.json` and `src/messages/ru.json`
- Automatic locale detection and routing
- Fallback to Romanian for unsupported locales

## 📝 Environment Variables

Copy `.env.example` to `.env.local` and configure:

### Required Variables

```env
NEXT_PUBLIC_SITE_URL=https://fitnessflacara.md
SANITY_PROJECT_ID=your-sanity-project-id
SANITY_DATASET=production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Optional Variables

```env
RESEND_API_KEY=re_your-resend-api-key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
CLOUDFLARE_STREAM_TOKEN=your-cloudflare-token
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your-hcaptcha-site-key
```

## 🗄️ Database Schema (Supabase)

### Tables

- **trainers** - Trainer profiles and specialties
- **classes** - Fitness class definitions
- **schedule** - Class timetables and availability
- **memberships** - Membership plans and pricing
- **leads** - Contact form submissions
- **facilities** - Facility information and galleries

## 📊 Content Management (Sanity)

### Schemas

- **page** - Static page content
- **section.hero** - Hero section configuration
- **section.richText** - Rich text content blocks
- **gallery** - Image galleries with captions
- **post** - Blog posts

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# The output will be in the `.next` folder
```

## 📈 Performance Targets

- **LCP (Largest Contentful Paint)**: < 2.0s
- **CLS (Cumulative Layout Shift)**: < 0.05
- **INP (Interaction to Next Paint)**: < 200ms
- **FCP (First Contentful Paint)**: < 1.5s

## 🎨 Design System

Built with:
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for consistent component library
- **Radix UI** for accessible primitives
- **Custom color palette** focused on red/orange brand colors

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is proprietary software for Fitness Flacăra. All rights reserved.

## 📞 Support

For technical support or questions:
- Email: contact@fitnessflacara.md
- Phone: +373 22 123 456

---

Built with ❤️ for Fitness Flacăra
