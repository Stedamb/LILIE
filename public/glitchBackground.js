// Glitch Random Canvas Background
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('background-canvas');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  
  // Set canvas to full window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  // Fill the canvas with black initially
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Particle class for random elements
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1; // Smaller particles
      this.speedX = (Math.random() - 0.5) * 0.8; // Slower movement
      this.speedY = (Math.random() - 0.5) * 0.8; // Slower movement
      this.life = Math.random() * 300 + 200; // Longer life for smoother appearance
      this.opacity = Math.random() * 0.5 + 0.3; // Moderate opacity
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life--;
      
      if (this.life <= 0 || 
          this.x < 0 || 
          this.x > canvas.width || 
          this.y < 0 || 
          this.y > canvas.height) {
        this.reset();
      }
    }
    
    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.size, this.size);
      ctx.fill();
    }
  }
  
  // No glitch lines or static functions as they've been removed from the animation
  
  // Create particles
  const particles = [];
  const particleCount = 80; // Fewer particles
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Animation loop
  function animate() {
    // Clear canvas with semi-transparent black for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle static occasionally
    if (Math.random() < 0.1) {
      const staticDensity = 50; // Less static
      
      for (let i = 0; i < staticDensity; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5 + 0.5; // Smaller static
        const opacity = Math.random() * 0.15 + 0.05; // Lower opacity
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(x, y, size, size);
      }
    }
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  // Start animation
  console.log('Starting glitch background animation');
  animate();
});
