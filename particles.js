// 新建particles.js
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.particleColor = 'rgba(255, 99, 71, 0.8)'; // 修改颜色
    this.particleShape = 'star'; // 可选：circle, square, triangle
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

drawStar(p) {
    const spikes = 5;
    const outerRadius = p.size;
    const innerRadius = p.size / 2;
    let rotation = Math.PI / 2 * 3;
    let x = p.x;
    let y = p.y;
    let step = Math.PI / spikes;

    this.ctx.beginPath();
    this.ctx.moveTo(p.x, p.y - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = p.x + Math.cos(rotation) * outerRadius;
      y = p.y + Math.sin(rotation) * outerRadius;
      this.ctx.lineTo(x, y);
      rotation += step;

      x = p.x + Math.cos(rotation) * innerRadius;
      y = p.y + Math.sin(rotation) * innerRadius;
      this.ctx.lineTo(x, y);
      rotation += step;
    }
    this.ctx.lineTo(p.x, p.y - outerRadius);
    this.ctx.closePath();
    this.ctx.fillStyle = this.particleColor;
    this.ctx.fill();
  }
    drawParticle(p) {
    if (p.shape === 'star') {
      this.drawStar(p);
    } else {
      // 其他形状...
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x > this.canvas.width) p.x = 0;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.y > this.canvas.height) p.y = 0;
      if (p.y < 0) p.y = this.canvas.height;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(86,190,207,0.5)';
      this.ctx.fill();
    });
    requestAnimationFrame(() => this.animate());
  }


}

// 初始化
const canvas = document.getElementById('particle-canvas');
const particleSystem = new ParticleSystem(canvas);
particleSystem.createParticles();
particleSystem.animate();