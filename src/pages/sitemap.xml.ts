import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export const GET: APIRoute = async () => {
  const base = site.url.replace(/\/$/, '');

  const [projetos, cursos, atividades] = await Promise.all([
    getCollection('projetos'),
    getCollection('cursos'),
    getCollection('atividades'),
  ]);

  const staticPages = ['/', '/sobre', '/projetos', '/cursos', '/atividades', '/noticias-eventos', '/parceiros', '/equipe', '/contato'];

  const urls = [
    ...staticPages.map(path => ({
      url: `${base}${path}`,
      lastmod: site.buildDate,
      priority: path === '/' ? '1.0' : '0.8',
      changefreq: 'weekly',
    })),
    ...projetos.map(p => ({
      url: `${base}/projetos/${p.id}`,
      lastmod: site.buildDate,
      priority: '0.6',
      changefreq: 'monthly',
    })),
    ...cursos.map(c => ({
      url: `${base}/cursos/${c.id}`,
      lastmod: site.buildDate,
      priority: '0.6',
      changefreq: 'monthly',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};