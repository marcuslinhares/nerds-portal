# Spec: Premium Visual Components (NERDS Portal)

**Status:** IMPLEMENTADO
**Data:** 2026-04-25
**Contexto:** Evolução estética do portal para atingir o nível "Design Engineer".

## 1. Bento Grid Layout
- **Objetivo:** Organizar os destaques (Projetos, Cursos, Notícias) de forma assimétrica e densa.
- **Implementação:** CSS Grid com `minmax` dinâmico para garantir responsividade total.
- **Interação:** Efeito de hover com levitação e brilho (*Glassmorphism*).

## 2. Text Scramble Effect
- **Objetivo:** Animação de decodificação técnica ao passar o mouse em títulos.
- **Tecnologia:** TypeScript puro utilizando `requestAnimationFrame`.
- **Estética:** Caracteres ASCII aleatórios que se estabilizam no texto original.

## 3. Sparkles Component
- **Objetivo:** Rastro de partículas luminosas atrás dos títulos principais.
- **Tecnologia:** HTML5 Canvas para renderização leve de 150+ partículas em 60fps.
- **Cor:** `#00dbe9` (Electric Cyan).

## 4. Scroll Reveal
- **Objetivo:** Animar a entrada dos elementos conforme o scroll da página.
- **Tecnologia:** `IntersectionObserver` disparando classes CSS de fade-in e slide-up.
