class TextScramble {
  el: HTMLElement;
  chars: string;
  queue: any[] = [];
  frame: number = 0;
  resolve: any;
  updateId: number = 0;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText: string) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 25);
      const end = start + Math.floor(Math.random() * 25);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.updateId);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span style="color: var(--color-primary); opacity: 0.7;">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.updateId = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function initScramble() {
  const elements = document.querySelectorAll('[data-scramble]');
  elements.forEach((el) => {
    const scraper = new TextScramble(el as HTMLElement);
    const originalText = el.textContent || '';
    let isAnimating = false;

    el.addEventListener('mouseenter', () => {
      if (isAnimating) return;
      isAnimating = true;
      scraper.setText(originalText).then(() => {
        isAnimating = false;
      });
    });
  });
}

document.addEventListener('astro:page-load', initScramble);
if (document.readyState === 'complete') {
  initScramble();
} else {
  window.addEventListener('load', initScramble);
}
