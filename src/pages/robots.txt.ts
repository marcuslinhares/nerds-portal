import type { APIContext } from 'astro';
import { site } from '../data/site';

export function GET(context: APIContext) {
  const siteUrl = context.site?.toString() ?? site.url;
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}