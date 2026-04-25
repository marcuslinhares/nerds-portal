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
