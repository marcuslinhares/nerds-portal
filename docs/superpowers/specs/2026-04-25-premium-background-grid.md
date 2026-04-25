# Spec: Neural Grid Background (Premium UI)

**Status:** DEPRECIADO (Removido a pedido do usuário em favor de fundo limpo + Sparkles)
**Data:** 2026-04-25
**Contexto:** Upgrade visual do portal NERDS para incluir uma camada de background interativa e técnica.

## 1. Visão Geral
Implementação de uma grade geométrica reativa (Neural Grid) que utiliza HTML5 Canvas para renderizar um sistema de linhas e nós que brilham conforme a proximidade do cursor do mouse.

## 2. Requisitos Visuais
- **Base:** Cor de fundo `#10131a`.
- **Grade:** Malha de intersecções de 30px x 30px.
- **Linhas:** Opacidade ultra-baixa (`rgba(255, 255, 255, 0.05)`).
- **Nós:** Pequenos círculos de 1px em cada intersecção.
- **Efeito Glow:** Brilho em `#00dbe9` (Electric Cyan) com raio de 150px em volta do cursor.

## 3. Comportamento e Interatividade
- **Rastro de Luz:** Apenas os nós dentro do raio de influência do mouse devem aumentar sua opacidade e brilho (box-shadow simulado no canvas).
- **Transições:** Fade-in/out suave (aprox. 300ms) ao entrar/sair do raio de ativação.
- **Parallax:** A grade deve se mover sutilmente (fator de 0.02) na direção oposta ao scroll da página para criar profundidade.

## 4. Arquitetura Técnica
- **Componente:** Script encapsulado em `src/scripts/neural-grid.ts` ou injetado via `<script>` no `BaseLayout.astro`.
- **Renderização:** HTML5 Canvas 2D Context.
- **Otimização:**
  - `requestAnimationFrame` para animações fluidas.
  - Throttle no evento `mousemove`.
  - Redimensionamento inteligente do canvas no evento `resize`.
  - Respeito à media query `prefers-reduced-motion`.

## 5. Integração no Astro
O canvas será inserido diretamente no `BaseLayout.astro`, posicionado como `fixed` e com `z-index: -1`, garantindo que fique atrás de todos os elementos e não interfira nos cliques (utilizando `pointer-events: none`).
