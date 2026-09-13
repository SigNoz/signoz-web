import siteMetadata from '@/data/siteMetadata'
import { servesMarkdownAlternate } from '@/utils/agentMarkdownRouting'

/**
 * Next applies the docs redirects in next.config.js before middleware runs, so
 * a markdown request never reaches them. The proxy rewrites `/docs/<slug>.md`
 * straight to the docs markdown API, and a legacy slug that resolves as HTML
 * returns 404 as markdown.
 *
 * This module asks the site where the HTML page went instead of copying several
 * hundred redirect rules. It runs only when the slug misses, so the happy path
 * costs nothing.
 */

// Trailing-slash normalization costs a hop, so allow room beyond the one or
// two real redirects in a chain.
const MAX_HOPS = 5

const REDIRECT_STATUSES = new Set([301, 302, 307, 308])

const isLocalHost = (host: string): boolean =>
  host === 'localhost' || host === '127.0.0.1' || host.startsWith('localhost:')

/** Deployment hosts whose redirect rules we trust as our own. */
const trustedHosts = (): Set<string> => {
  const canonical = new URL(siteMetadata.siteUrl).host
  return new Set([canonical, `www.${canonical}`, 'staging.signoz.io', 'signoz-web.vercel.app'])
}

/**
 * The origin to self-fetch from. Trust the incoming host only when it is one of
 * our deployments, so a spoofed Host header cannot point the lookup at another
 * server. Staging is in the list on purpose. Production would answer with
 * redirect rules that staging does not have.
 */
const resolveSelfOrigin = (request: Request): string => {
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    new URL(request.url).host

  if (isLocalHost(host)) {
    return `http://${host}`
  }

  const isPreviewHost = host.startsWith('signoz-web-') && host.endsWith('.vercel.app')

  if (trustedHosts().has(host) || isPreviewHost) {
    return `https://${host}`
  }

  return siteMetadata.siteUrl
}

const stripTrailingSlash = (pathname: string): string => pathname.replace(/\/+$/, '') || '/'

// The timeout applies to each hop, not to the whole walk. If the origin stalls,
// the lookup fails and the request returns 404.
const HOP_TIMEOUT_MS = 3000

const headOrNull = (url: string): Promise<Response | null> =>
  fetch(url, {
    method: 'HEAD',
    headers: { Accept: 'text/html' },
    redirect: 'manual',
    cache: 'no-store',
    signal: AbortSignal.timeout(HOP_TIMEOUT_MS),
  }).catch(() => null)

/**
 * The markdown URL for the path the redirect chain landed on. A docs path, or
 * any other page with a markdown twin, gets `.md`. Anything else resolves to
 * the page itself, because the site still serves that URL.
 */
const markdownPathFor = (pathname: string): string => {
  const normalized = stripTrailingSlash(pathname)

  if (normalized === '/docs' || normalized.startsWith('/docs/')) {
    return `${normalized}.md`
  }

  return servesMarkdownAlternate(normalized) ? `${normalized}.md` : normalized
}

/**
 * Follow the HTML redirect chain for a docs slug. Return the URL to send the
 * markdown request to, or null when nothing moves the slug. A redirect that
 * leaves the docs tree is kept.
 */
export async function resolveCanonicalDocsMarkdownPath(
  request: Request,
  slug: string
): Promise<string | null> {
  const origin = resolveSelfOrigin(request)
  const start = `/docs/${slug}`
  // Raw pathnames, so a trailing-slash hop counts as a hop and not as a cycle.
  // Only a real repeat stops the walk.
  const seen = new Set<string>([start])
  let current = start

  for (let hop = 0; hop < MAX_HOPS; hop += 1) {
    const response = await headOrNull(`${origin}${current}`)
    const location = response?.headers.get('location')

    if (!response || !REDIRECT_STATUSES.has(response.status) || !location) break

    let target: URL
    try {
      target = new URL(location, origin)
    } catch {
      break
    }

    // No /docs/ redirect leaves the origin today. If one does, send the client
    // off-site. Do not keep the path and serve it as ours.
    if (target.origin !== new URL(origin).origin) return target.toString()

    const next = target.pathname
    if (seen.has(next)) break
    seen.add(next)
    current = next
  }

  return stripTrailingSlash(current) === stripTrailingSlash(start) ? null : markdownPathFor(current)
}
