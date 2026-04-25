# Neural Grid Background Implementation Plan

> **Status:** DEPRECIADO

**Goal:** Implementar um background de grade técnica interativa usando Canvas para elevar a estética do portal NERDS.

**Architecture:** Utilização de HTML5 Canvas posicionado em background (`z-index: -1`) com lógica de renderização reativa à posição do mouse baseada em proximidade (Euclidean distance).

**Tech Stack:** Astro, TypeScript, HTML5 Canvas API.

---

### Task 1: Preparação do Layout e Estilo Base

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`

- [ ] **Passo 1: Adicionar o elemento canvas no BaseLayout**

```astro
<!-- src/layouts/BaseLayout.astro -->
    <main class="container">
      <slot />
    </main>
    <Footer />
    <canvas id="neural-grid"></canvas>
    <script src="../scripts/neural-grid.ts"></script>
  </body>
</html>
```

- [ ] **Passo 2: Definir estilos globais para o canvas**

```css
/* src/styles/global.css */
#neural-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  background-color: var(--color-bg);
  opacity: 0.6;
}
```

- [ ] **Passo 3: Commit**

```bash
git add src/layouts/BaseLayout.astro src/styles/global.css
git commit -m "style: add background canvas element and base styles"
```

---

### Task 2: Implementação da Lógica de Renderização (Neural Grid)

**Files:**
- Create: `src/scripts/neural-grid.ts`

- [ ] **Passo 1: Criar a classe de animação da grade**

```typescript
// src/scripts/neural-grid.ts
class NeuralGrid {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  points: { x: number; y: number }[] = [];
  mouse = { x: -1000, y: -1000 };
  spacing = 30;
  radius = 150;

  constructor(el: HTMLCanvasElement) {
    this.canvas = el;
    this.ctx = el.getContext('2d')!;
    this.init();
    this.animate();
    window.addEventListener('resize', () => this.init());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.points = [];
    for (let x = 0; x < this.canvas.width + this.spacing; x += this.spacing) {
      for (let y = 0; y < this.canvas.height + this.spacing; y += this.spacing) {
        this.points.push({ x, y });
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Desenhar linhas da grade (estáticas/leves)
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();
    for (let x = 0; x < this.canvas.width + this.spacing; x += this.spacing) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
    }
    for (let y = 0; y < this.canvas.height + this.spacing; y += this.spacing) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
    }
    this.ctx.stroke();

    // Desenhar nós reativos
    this.points.forEach(p => {
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.radius) {
        const opacity = 1 - dist / this.radius;
        this.ctx.shadowBlur = 8 * opacity;
        this.ctx.shadowColor = '#00dbe9';
        this.ctx.fillStyle = `rgba(0, 219, 233, ${opacity * 0.8})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 0.6, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Inicialização segura para Astro/SSR
if (typeof window !== 'undefined') {
  const canvas = document.getElementById('neural-grid') as HTMLCanvasElement;
  if (canvas) new NeuralGrid(canvas);
}
```

- [ ] **Passo 2: Commit**

```bash
git add src/scripts/neural-grid.ts
git commit -m "feat: implement interactive neural grid with proximity glow"
```

---

### Task 3: Validação Final e Deployment

- [ ] **Passo 1: Testar comportamento visual**
  - Rodar `npm run dev` se o servidor estiver parado.
  - Verificar se o canvas cobre toda a área útil.
  - Confirmar se o efeito de brilho não causa lag (60fps esperado).

- [ ] **Passo 2: Push para o repositório master**

```bash
git push origin feat/fase1-base:master
```
