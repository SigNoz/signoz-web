import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

/**
 * AI user agents that read pages to answer and cite. Training-only crawlers
 * such as CCBot are not in this list. Most appear in our request logs, but
 * Google-Extended does not: Google reads it from robots.txt as a policy token
 * and sends no requests with it.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
]

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const currentUrl = isProduction ? siteMetadata.siteUrl : `https://staging.signoz.io`

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/resource-center',
      },
      {
        // The wildcard rule already allows these agents. This group states the
        // policy, so nobody has to infer it. If we block one, that assistant
        // cannot cite SigNoz at all.
        userAgent: AI_CRAWLERS,
        allow: '/',
        disallow: '/resource-center',
      },
    ],
    sitemap: `${currentUrl}/sitemap.xml`,
    host: currentUrl,
  }
}
