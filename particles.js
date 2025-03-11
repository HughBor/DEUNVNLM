class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.isDarkMode = document.body.classList.contains('dark-theme');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles();
    this.animate();
    this.initThemeObserver();
  }

  initThemeObserver() {
    const observer = new MutationObserver(() => {
      this.isDarkMode = document.body.classList.contains('dark-theme');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = window.innerWidth * 0.5;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 1.5 + 0.3,//粒子大小
        baseAlpha: Math.random() * 0.5 + 0.3, // 让粒子默认可见
        alpha: Math.random() * 0.5 + 0.3, // 修正初始透明度
        speedX: (Math.random() - 0.5) * 0.05,//横向运动速度
        speedY: (Math.random() - 0.5) * 0.05,//纵向运动速度
        twinkleSpeed: Math.random() * 0.005 + 0.002// 闪烁频率
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)';//背景颜色
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.y > this.canvas.height) p.y = 0;
      if (p.y < 0) p.y = this.canvas.height;
      
      p.alpha = p.baseAlpha * (Math.sin(Date.now() * p.twinkleSpeed) + 1.2);
      this.ctx.fillStyle = this.isDarkMode ? `rgba(110, 110, 110, ${p.alpha})` : `rgba(180, 180, 180, ${p.alpha})`;//粒子颜色
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    requestAnimationFrame(() => this.animate());
  }
}

const canvas = document.getElementById('particle-canvas');
new ParticleSystem(canvas);
