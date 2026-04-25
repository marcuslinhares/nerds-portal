class NeuralGrid {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  points: { x: number; y: number }[] = [];
  mouse = { x: -1000, y: -1000 };
  spacing = 40; // Espaçamento levemente maior para melhor performance
  radius = 200; // Raio de influência maior
  animationId: number | null = null;

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
    console.log(`[NeuralGrid] Initialized with ${this.points.length} points.`);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Fundo sólido dentro do canvas para garantir que ele seja a base
    this.ctx.fillStyle = '#10131a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Desenhar linhas da grade
    this.ctx.strokeStyle = 'rgba(0, 219, 233, 0.12)'; // Cyan bem sutil
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
        
        // Brilho do nó
        this.ctx.fillStyle = `rgba(0, 219, 233, ${opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Efeito de aura
        this.ctx.fillStyle = `rgba(0, 219, 233, ${opacity * 0.15})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }

  animate() {
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Inicialização compatível com Astro View Transitions
let currentGrid: NeuralGrid | null = null;

function initGrid() {
  const canvas = document.getElementById('neural-grid') as HTMLCanvasElement;
  if (canvas) {
    if (currentGrid) {
      currentGrid.destroy();
    }
    currentGrid = new NeuralGrid(canvas);
  }
}

document.addEventListener('astro:page-load', initGrid);
// Fallback para carregamento inicial sem transição
if (document.readyState === 'complete') {
  initGrid();
} else {
  window.addEventListener('load', initGrid);
}
