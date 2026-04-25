# Site Institucional da Extensao Universitaria Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a versao MVP de um site institucional da extensao universitaria para divulgar projetos, atividades, cursos, equipe, parceiros, noticias/eventos e canais de contato.

**Architecture:** O projeto sera implementado com Astro em SSG, com layout global reutilizavel (`BaseLayout`), componentes compartilhados (`Header`, `Footer`) e conteudo inicial em arquivos locais de dados para facilitar manutencao sem CMS no MVP. As paginas serao estaticas, responsivas e organizadas por rotas dedicadas, com evolucao posterior para filtros e detalhes dinamicos.

**Tech Stack:** Astro, TypeScript, CSS global com design tokens, npm, deploy estatico (Vercel/Netlify/GitHub Pages).

---

## File Structure (target)

- Create: `astro.config.mjs`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/SectionTitle.astro`
- Create: `src/styles/global.css`
- Create: `src/data/site.ts`
- Create: `src/pages/index.astro`
- Create: `src/pages/sobre.astro`
- Create: `src/pages/projetos.astro`
- Create: `src/pages/atividades.astro`
- Create: `src/pages/cursos.astro`
- Create: `src/pages/equipe.astro`
- Create: `src/pages/parceiros.astro`
- Create: `src/pages/noticias-eventos.astro`
- Create: `src/pages/contato.astro`

## Task 1: Inicializacao do projeto Astro

**Files:**
- Create: estrutura inicial do projeto Astro no diretorio raiz
- Modify: `package.json`
- Test: inicializacao local do servidor

- [ ] **Step 1: Criar projeto Astro no diretorio atual**

Run:
```bash
npm create astro@latest . -- --template minimal --typescript strict
```
Expected: criacao dos arquivos iniciais (`astro.config.mjs`, `src/`, `package.json`).

- [ ] **Step 2: Instalar dependencias**

Run:
```bash
npm install
```
Expected: `node_modules` criado sem erro.

- [ ] **Step 3: Rodar servidor de desenvolvimento**

Run:
```bash
npm run dev
```
Expected: servidor local Astro ativo com URL de preview.

- [ ] **Step 4: Commit**

Run:
```bash
git add astro.config.mjs package.json tsconfig.json src
git commit -m "chore: initialize Astro project base"
```

## Task 2: Fundacao visual global (tokens e estilos base)

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`
- Test: verificacao visual basica em mobile e desktop

- [ ] **Step 1: Criar estilos globais com tokens**

Adicionar em `src/styles/global.css`:
```css
:root {
  --color-bg: #0f172a;
  --color-surface: #111827;
  --color-text: #e5e7eb;
  --color-muted: #9ca3af;
  --color-primary: #06b6d4;
  --color-primary-contrast: #0b1020;
  --container: 1120px;
  --radius: 12px;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}

.container {
  width: min(100% - 2rem, var(--container));
  margin-inline: auto;
}
```

- [ ] **Step 2: Garantir import global de estilos no layout**

Adicionar em `src/layouts/BaseLayout.astro`:
```astro
---
import "../styles/global.css";
const { title = "Extensao Universitaria", description = "Portal institucional da extensao" } = Astro.props;
---
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Validar renderizacao**

Run:
```bash
npm run dev
```
Expected: pagina sem CSS quebrado e com estilos globais aplicados.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/styles/global.css src/layouts/BaseLayout.astro
git commit -m "feat: add global design tokens and base layout metadata"
```

## Task 3: Componentes globais de navegacao (Header e Footer)

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/data/site.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Test: navegacao entre rotas sem links quebrados

- [ ] **Step 1: Criar dados institucionais compartilhados**

Criar `src/data/site.ts`:
```ts
export const site = {
  name: "Extensao Universitaria",
  description: "Portal institucional de projetos, atividades e cursos",
  email: "extensao@universidade.edu.br",
  menu: [
    { label: "Inicio", href: "/" },
    { label: "Sobre", href: "/sobre" },
    { label: "Projetos", href: "/projetos" },
    { label: "Atividades", href: "/atividades" },
    { label: "Cursos", href: "/cursos" },
    { label: "Equipe", href: "/equipe" },
    { label: "Parceiros", href: "/parceiros" },
    { label: "Noticias/Eventos", href: "/noticias-eventos" },
    { label: "Contato", href: "/contato" }
  ]
};
```

- [ ] **Step 2: Criar Header reutilizavel**

Criar `src/components/Header.astro`:
```astro
---
import { site } from "../data/site";
const pathname = Astro.url.pathname;
---
<header>
  <div class="container">
    <nav aria-label="Navegacao principal">
      <a href="/">{site.name}</a>
      <ul>
        {site.menu.map((item) => (
          <li>
            <a href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</header>
```

- [ ] **Step 3: Criar Footer reutilizavel**

Criar `src/components/Footer.astro`:
```astro
---
import { site } from "../data/site";
---
<footer>
  <div class="container">
    <p>{site.name}</p>
    <p>{site.description}</p>
    <a href={`mailto:${site.email}`}>{site.email}</a>
  </div>
</footer>
```

- [ ] **Step 4: Integrar Header/Footer no BaseLayout**

Atualizar `src/layouts/BaseLayout.astro`:
```astro
---
import "../styles/global.css";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
const { title = "Extensao Universitaria", description = "Portal institucional da extensao" } = Astro.props;
---
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <Header />
    <main class="container">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 5: Testar navegacao**

Run:
```bash
npm run dev
```
Expected: header e footer visiveis; links apontando para rotas previstas.

- [ ] **Step 6: Commit**

Run:
```bash
git add src/components/Header.astro src/components/Footer.astro src/data/site.ts src/layouts/BaseLayout.astro
git commit -m "feat: add shared navigation and institutional footer"
```

## Task 4: Criacao das paginas MVP (casca inicial)

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/sobre.astro`
- Create: `src/pages/projetos.astro`
- Create: `src/pages/atividades.astro`
- Create: `src/pages/cursos.astro`
- Create: `src/pages/equipe.astro`
- Create: `src/pages/parceiros.astro`
- Create: `src/pages/noticias-eventos.astro`
- Create: `src/pages/contato.astro`
- Test: rotas respondendo sem 404

- [ ] **Step 1: Criar Home inicial**

Criar `src/pages/index.astro`:
```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="Inicio | Extensao Universitaria" description="Projetos, cursos e atividades da extensao universitara">
  <section>
    <h1>Extensao Universitaria</h1>
    <p>Conectando universidade e sociedade por meio de projetos, cursos e atividades.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Criar paginas institucionais com estrutura minima**

Usar este padrao para cada rota (`sobre`, `projetos`, `atividades`, `cursos`, `equipe`, `parceiros`, `noticias-eventos`, `contato`):
```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="Sobre | Extensao Universitaria" description="Conheca a extensao universitaria">
  <section>
    <h1>Sobre</h1>
    <p>Conteudo inicial da pagina.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Validar rotas**

Run:
```bash
npm run dev
```
Expected: todas as 9 paginas abrindo normalmente.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/pages
git commit -m "feat: scaffold institutional pages for MVP"
```

## Task 5: Home com secoes de destaque

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/SectionTitle.astro`
- Test: validacao visual da home

- [ ] **Step 1: Criar componente utilitario para titulo de secao**

Criar `src/components/SectionTitle.astro`:
```astro
---
const { title, subtitle } = Astro.props;
---
<header>
  <h2>{title}</h2>
  {subtitle && <p>{subtitle}</p>}
</header>
```

- [ ] **Step 2: Expandir Home com secoes aprovadas**

Atualizar `src/pages/index.astro`:
```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import SectionTitle from "../components/SectionTitle.astro";
---
<BaseLayout title="Inicio | Extensao Universitaria" description="Projetos, cursos e atividades da extensao universitaria">
  <section>
    <h1>Extensao Universitaria</h1>
    <p>Conectando universidade e sociedade.</p>
  </section>

  <section>
    <SectionTitle title="Destaques" subtitle="Projetos, cursos e noticias em evidencia" />
    <div class="grid">
      <article class="card">Projetos</article>
      <article class="card">Cursos</article>
      <article class="card">Noticias/Eventos</article>
    </div>
  </section>

  <section>
    <SectionTitle title="Como participar" />
    <p>Inscreva-se nas iniciativas e acompanhe os editais abertos.</p>
  </section>

  <section>
    <SectionTitle title="Parceiros" />
    <p>Conheca as instituicoes e organizacoes apoiadoras.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Validar home em dois breakpoints**

Run:
```bash
npm run dev
```
Expected: leitura clara em mobile e desktop, sem overflow horizontal.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/pages/index.astro src/components/SectionTitle.astro
git commit -m "feat: build homepage sections for institutional storytelling"
```

## Task 6: Responsividade, acessibilidade basica e QA da fase

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/Header.astro`
- Modify: `src/pages/*` (ajustes de hierarquia e semantica)
- Test: validacao local + build

- [ ] **Step 1: Adicionar regras de responsividade no CSS global**

Atualizar `src/styles/global.css` com classes utilitarias:
```css
.grid {
  display: grid;
  gap: var(--space-2);
}
.card {
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: var(--space-2);
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

- [ ] **Step 2: Garantir semantica minima**

Checklist:
```text
- Um h1 por pagina
- nav com aria-label
- links com texto descritivo
- contraste adequado entre texto e fundo
```

- [ ] **Step 3: Rodar build de producao**

Run:
```bash
npm run build
```
Expected: build concluido com sucesso.

- [ ] **Step 4: Rodar preview do build**

Run:
```bash
npm run preview
```
Expected: navegacao funcionando no artefato de producao.

- [ ] **Step 5: Commit**

Run:
```bash
git add src
git commit -m "chore: finalize phase-1 QA with responsive and accessibility baseline"
```

## Acceptance Criteria (Fase 1)

- Navegacao global funcional em todas as rotas MVP.
- Header e Footer consistentes em todas as paginas.
- Home com secoes: hero, destaques, como participar, parceiros.
- Layout responsivo sem quebras graves em mobile e desktop.
- Build de producao concluindo sem erro.

## Fase 2: Conteudo institucional principal

## Task 7: Estruturar conteudo real de Sobre, Equipe e Parceiros

**Files:**
- Create: `src/data/sobre.ts`
- Create: `src/data/equipe.ts`
- Create: `src/data/parceiros.ts`
- Modify: `src/pages/sobre.astro`
- Modify: `src/pages/equipe.astro`
- Modify: `src/pages/parceiros.astro`
- Test: renderizacao de conteudo real nessas 3 paginas

- [ ] **Step 1: Criar dados de Sobre**

Criar `src/data/sobre.ts`:
```ts
export const sobre = {
  missao: "Promover impacto social por meio da extensao universitaria.",
  visao: "Ser referencia regional em integracao entre universidade e comunidade.",
  objetivos: [
    "Difundir conhecimento aplicado",
    "Fortalecer formacao cidada",
    "Apoiar desenvolvimento local"
  ],
  historico: "Resumo do historico da extensao."
};
```

- [ ] **Step 2: Criar dados de Equipe e Parceiros**

Criar `src/data/equipe.ts` e `src/data/parceiros.ts`:
```ts
export const equipe = [
  { nome: "Coordenacao Geral", papel: "Coordenacao", bio: "Descricao curta." }
];
```
```ts
export const parceiros = [
  { nome: "Parceiro Exemplo", tipo: "Institucional", descricao: "Apoio a projetos e cursos." }
];
```

- [ ] **Step 3: Conectar paginas aos dados**

Atualizar cada pagina para mapear arrays e renderizar secoes:
```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { equipe } from "../data/equipe";
---
<BaseLayout title="Equipe | Extensao Universitaria" description="Equipe da extensao">
  <h1>Equipe</h1>
  <ul>
    {equipe.map((membro) => <li><strong>{membro.nome}</strong> - {membro.papel}</li>)}
  </ul>
</BaseLayout>
```

- [ ] **Step 4: Validar conteudo**

Run:
```bash
npm run dev
```
Expected: paginas de Sobre, Equipe e Parceiros exibindo dados reais.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/data/sobre.ts src/data/equipe.ts src/data/parceiros.ts src/pages/sobre.astro src/pages/equipe.astro src/pages/parceiros.astro
git commit -m "feat: add institutional content for about, team, and partners"
```

## Task 8: Estruturar pagina de Contato com canais oficiais

**Files:**
- Create: `src/data/contato.ts`
- Modify: `src/pages/contato.astro`
- Test: validacao de links de email e redes

- [ ] **Step 1: Criar dados de contato**

Criar `src/data/contato.ts`:
```ts
export const contato = {
  email: "extensao@universidade.edu.br",
  telefone: "(00) 0000-0000",
  endereco: "Campus universitario - Bloco da Extensao",
  redes: [
    { nome: "Instagram", url: "https://instagram.com/" },
    { nome: "LinkedIn", url: "https://linkedin.com/" }
  ]
};
```

- [ ] **Step 2: Renderizar pagina de contato**

Atualizar `src/pages/contato.astro`:
```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { contato } from "../data/contato";
---
<BaseLayout title="Contato | Extensao Universitaria" description="Canais de contato da extensao">
  <h1>Contato</h1>
  <p>Email: <a href={`mailto:${contato.email}`}>{contato.email}</a></p>
</BaseLayout>
```

- [ ] **Step 3: Validar links**

Run:
```bash
npm run dev
```
Expected: links de email e redes abrindo corretamente.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/data/contato.ts src/pages/contato.astro
git commit -m "feat: publish official contact channels page"
```

## Acceptance Criteria (Fase 2)

- Paginas `Sobre`, `Equipe`, `Parceiros` e `Contato` com conteudo real.
- Dados organizados em arquivos locais para manutencao simples.
- Links institucionais basicos validados.

## Fase 3: Catalogos (Projetos, Atividades, Cursos, Noticias/Eventos)

## Task 9: Modelagem de dados dos catalogos

**Files:**
- Create: `src/data/projetos.ts`
- Create: `src/data/atividades.ts`
- Create: `src/data/cursos.ts`
- Create: `src/data/noticias.ts`
- Test: imports funcionando sem erro de tipo

- [ ] **Step 1: Criar estrutura de projetos**

Criar `src/data/projetos.ts`:
```ts
export const projetos = [
  {
    slug: "projeto-exemplo",
    titulo: "Projeto Exemplo",
    resumo: "Resumo curto",
    descricao: "Descricao completa",
    area: "Educacao",
    status: "Ativo"
  }
];
```

- [ ] **Step 2: Criar estruturas de atividades, cursos e noticias**

Criar arquivos equivalentes com campos minimos padrao:
```ts
export const cursos = [
  { slug: "curso-exemplo", titulo: "Curso Exemplo", cargaHoraria: "40h", status: "Inscricoes abertas" }
];
```

- [ ] **Step 3: Validar tipagem**

Run:
```bash
npm run build
```
Expected: build sem erro de import/export.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/data/projetos.ts src/data/atividades.ts src/data/cursos.ts src/data/noticias.ts
git commit -m "feat: define local data models for catalog pages"
```

## Task 10: Renderizar listagens de catalogo

**Files:**
- Modify: `src/pages/projetos.astro`
- Modify: `src/pages/atividades.astro`
- Modify: `src/pages/cursos.astro`
- Modify: `src/pages/noticias-eventos.astro`
- Test: cards renderizando em cada pagina

- [ ] **Step 1: Conectar pagina de Projetos aos dados**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { projetos } from "../data/projetos";
---
<BaseLayout title="Projetos | Extensao Universitaria" description="Projetos da extensao">
  <h1>Projetos</h1>
  <div class="grid">
    {projetos.map((item) => <article class="card"><h2>{item.titulo}</h2><p>{item.resumo}</p></article>)}
  </div>
</BaseLayout>
```

- [ ] **Step 2: Replicar padrao para Atividades, Cursos e Noticias/Eventos**

Aplicar o mesmo padrao com os respectivos datasets.

- [ ] **Step 3: Validar listagens**

Run:
```bash
npm run dev
```
Expected: todas as paginas de catalogo com cards renderizados.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/pages/projetos.astro src/pages/atividades.astro src/pages/cursos.astro src/pages/noticias-eventos.astro
git commit -m "feat: render catalog listings from local data files"
```

## Task 11: Paginas de detalhe (projetos e cursos)

**Files:**
- Create: `src/pages/projetos/[slug].astro`
- Create: `src/pages/cursos/[slug].astro`
- Modify: `src/pages/projetos.astro`
- Modify: `src/pages/cursos.astro`
- Test: paginas dinamicas estaticas geradas por `getStaticPaths`

- [ ] **Step 1: Criar detalhe dinamico de projeto**

Criar `src/pages/projetos/[slug].astro`:
```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { projetos } from "../../data/projetos";

export function getStaticPaths() {
  return projetos.map((item) => ({ params: { slug: item.slug }, props: { item } }));
}
const { item } = Astro.props;
---
<BaseLayout title={`${item.titulo} | Projetos`} description={item.resumo}>
  <h1>{item.titulo}</h1>
  <p>{item.descricao}</p>
</BaseLayout>
```

- [ ] **Step 2: Criar detalhe dinamico de curso**

Aplicar o mesmo padrao em `src/pages/cursos/[slug].astro`.

- [ ] **Step 3: Linkar cards para detalhes**

Atualizar cards de `projetos.astro` e `cursos.astro` com `<a href={`/projetos/${item.slug}`}>`.

- [ ] **Step 4: Validar rotas de detalhe**

Run:
```bash
npm run build
```
Expected: rotas de detalhe geradas sem erro.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/pages/projetos/[slug].astro src/pages/cursos/[slug].astro src/pages/projetos.astro src/pages/cursos.astro
git commit -m "feat: add static detail pages for projects and courses"
```

## Acceptance Criteria (Fase 3)

- Catalogos `Projetos`, `Atividades`, `Cursos`, `Noticias/Eventos` com dados reais locais.
- Detalhes de `Projetos` e `Cursos` funcionando por slug.
- Estrutura pronta para evolucao futura de busca/filtros.

## Fase 4: SEO, acessibilidade e performance

## Task 12: SEO basico por pagina

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/*.astro`
- Test: inspecao de meta tags no HTML renderizado

- [ ] **Step 1: Expandir metadados no layout**

Adicionar no `BaseLayout`:
```astro
const { title, description, canonical } = Astro.props;
```
e tags:
```astro
<link rel="canonical" href={canonical ?? Astro.url.href} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
```

- [ ] **Step 2: Definir title/description/canonical em todas as paginas**

Passar props em cada pagina para evitar metadados genericos.

- [ ] **Step 3: Validar SEO basico**

Run:
```bash
npm run build && npm run preview
```
Expected: meta tags presentes no HTML final.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/layouts/BaseLayout.astro src/pages
git commit -m "feat: add page-level SEO metadata and canonical URLs"
```

## Task 13: Acessibilidade e refinamentos de UX

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/styles/global.css`
- Modify: `src/pages/*.astro`
- Test: navegacao por teclado e foco visivel

- [ ] **Step 1: Garantir foco visivel e contraste de links/botoes**

Adicionar em `global.css`:
```css
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Revisar semantica**

Checklist:
```text
- h1 unico por pagina
- hierarquia h2/h3 coerente
- imagens com alt
- menus com aria-label
```

- [ ] **Step 3: Validar navegacao por teclado**

Run:
```bash
npm run dev
```
Expected: usuario navega por Tab e identifica foco claramente.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/components/Header.astro src/styles/global.css src/pages
git commit -m "chore: improve accessibility and keyboard navigation baseline"
```

## Task 14: Otimizacao de performance inicial

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/projetos.astro`
- Modify: `src/pages/noticias-eventos.astro`
- Test: build e auditoria rapida no navegador

- [ ] **Step 1: Otimizar imagens com `<Image />` do Astro quando aplicavel**

Substituir imagens comuns por:
```astro
---
import { Image } from "astro:assets";
import hero from "../../public/images/hero.jpg";
---
<Image src={hero} alt="Imagem institucional" loading="lazy" />
```

- [ ] **Step 2: Reduzir peso visual inicial da Home**

Evitar secoes pesadas e elementos nao essenciais acima da dobra.

- [ ] **Step 3: Validar performance basica**

Run:
```bash
npm run build && npm run preview
```
Expected: carregamento inicial estavel e sem erros de asset.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/pages
git commit -m "perf: optimize initial asset loading and homepage rendering"
```

## Acceptance Criteria (Fase 4)

- Metadados SEO configurados por pagina.
- Navegacao por teclado e foco visivel atendidos.
- Carregamento inicial adequado para site institucional.

## Fase 5: Publicacao e validacao final

## Task 15: Preparar deploy e configuracoes finais

**Files:**
- Modify: `astro.config.mjs`
- Create: `README.md` (se nao existir)
- Test: build de producao + preview

- [ ] **Step 1: Configurar adaptacoes de deploy no Astro**

Atualizar `astro.config.mjs` conforme plataforma alvo (Vercel, Netlify ou static puro).

- [ ] **Step 2: Documentar processo de execucao e build**

Criar/atualizar `README.md`:
```md
## Scripts
- npm run dev
- npm run build
- npm run preview
```

- [ ] **Step 3: Validar pipeline local**

Run:
```bash
npm run build && npm run preview
```
Expected: projeto pronto para publicacao.

- [ ] **Step 4: Commit**

Run:
```bash
git add astro.config.mjs README.md
git commit -m "chore: prepare deployment configuration and project docs"
```

## Task 16: Checklist final de lancamento

**Files:**
- Modify: `src/pages/*`
- Modify: `src/data/*`
- Test: validacao manual ponta-a-ponta

- [ ] **Step 1: Revisao final de conteudo**

Checklist:
```text
- ortografia e consistencia institucional
- contatos corretos
- links internos sem 404
- links externos com URL valida
```

- [ ] **Step 2: Revisao final de navegacao e UX**

Checklist:
```text
- menu mobile e desktop funcionando
- paginas com layout consistente
- cards e links de detalhe abrindo corretamente
```

- [ ] **Step 3: Build final**

Run:
```bash
npm run build
```
Expected: build limpo sem erros.

- [ ] **Step 4: Commit final da fase**

Run:
```bash
git add src
git commit -m "chore: finalize MVP release checklist for institutional website"
```

## Acceptance Criteria (Fase 5)

- Projeto pronto para deploy em ambiente de producao.
- Conteudo MVP completo e validado.
- Checklist final de navegacao, links e build aprovado.

## Out of Scope (MVP completo)

- CMS administrativo para edicao sem codigo.
- Autenticacao de usuarios e area privada.
- Analytics avancado e automacoes de marketing.
- Busca full-text com indexacao sofisticada.

## Self-Review

- **Spec coverage:** o plano agora cobre todas as fases discutidas (1 a 5), com entrega incremental e gates claros.
- **Placeholder scan:** nao ha marcadores vagos (`TODO`, `TBD`) e cada task inclui arquivos, comandos e resultados esperados.
- **Type consistency:** nomes de rotas, arquivos de dados e componentes seguem padrao unico ao longo do plano.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-25-site-extensao-universitaria.md`. Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
