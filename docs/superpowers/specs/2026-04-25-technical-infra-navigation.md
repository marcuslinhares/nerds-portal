# Spec: Technical Infrastructure & Navigation

**Status:** IMPLEMENTADO
**Data:** 2026-04-25
**Contexto:** Modernização da arquitetura de dados e experiência mobile.

## 1. Astro Content Collections (v6)
- **Objetivo:** Tipagem forte e validação de dados em tempo real.
- **Configuração:** `src/content.config.ts` utilizando o novo sistema de `loaders` do Astro 6.
- **Validação:** Schemas Zod para Projetos, Cursos e Atividades.

## 2. Mobile Drawer Navigation
- **Objetivo:** Substituir o menu que sumia por uma gaveta lateral funcional.
- **Design:** Fundo `glass` com 25px de desfoque, borda neon e fechamento automático.
- **Responsividade:** Breakpoint de ativação em 900px.

## 3. SEO & System Immersion
- **Open Graph:** Tags meta completas para compartilhamento em redes sociais.
- **System Status:** Widget dinâmico que simula carga e uptime do sistema.
- **Back to Top:** Botão flutuante para facilitar a navegação em conteúdos longos.
