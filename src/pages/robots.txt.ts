import type { APIContext } from 'astro';

export function GET(context: APIContext) {
  const site = context.site?.toString() ?? 'https://extensao.universidade.edu.br';
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}