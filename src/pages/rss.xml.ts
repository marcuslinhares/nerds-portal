import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export const GET: APIRoute = async () => {
  const [projetos, cursos, atividades] = await Promise.all([
    getCollection('projetos'),
    getCollection('cursos'),
    getCollection('atividades'),
  ]);

  const items = [
    ...projetos.map(p => ({
      title: p.data.titulo,
      pubDate: p.data.dataInicio,
      link: `/projetos/${p.id}`,
      description: p.data.resumo,
    })),
    ...cursos.map(c => ({
      title: c.data.titulo,
      pubDate: new Date().toISOString(),
      link: `/cursos/${c.id}`,
      description: `Carga horária: ${c.data.cargaHoraria} | Status: ${c.data.status}`,
    })),
    ...atividades.map(a => ({
      title: a.data.titulo,
      pubDate: a.data.data,
      link: `/atividades/${a.id}`,
      description: `${a.data.tipo} - ${a.data.local} - ${a.data.horario}`,
    })),
  ].sort((a, b) => (b.pubDate ?? '').localeCompare(a.pubDate ?? ''));

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.title}</title>
    <link>${site.url}</link>
    <description>${site.description}</description>
    <language>pt-BR</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items.map(item => `
    <item>
      <title>${item.title}</title>
      <link>${site.url}${item.link}</link>
      <description>${item.description}</description>
      <pubDate>${item.pubDate ? new Date(item.pubDate).toUTCString() : ''}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`,
    { headers: { 'Content-Type': 'application/rss+xml' } }
  );
};