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
  
  // Subtle artistic glitch effects
  function createGlitchEffect() {
    // Trigger occasionally for subtlety, but more frequently
    if (Math.random() > 0.03) return; // 3% chance to trigger
    
    // Choose a random glitch effect type
    const effectType = Math.floor(Math.random() * 3);
    
    switch (effectType) {
      case 0: // Subtle horizontal slice
        const sliceY = Math.random() * canvas.height;
        const sliceHeight = Math.random() * 2 + 1; // Very thin slice
        const sliceOpacity = Math.random() * 0.25 + 0.1; // Increased opacity
        ctx.fillStyle = `rgba(255, 255, 255, ${sliceOpacity})`;
        ctx.fillRect(0, sliceY, canvas.width, sliceHeight);
        break;
        
      case 1: // Pixel displacement
        const displacementX = Math.random() * 100 + 50;
        const displacementY = Math.random() * canvas.height;
        const displacementWidth = Math.random() * 30 + 10;
        const displacementHeight = Math.random() * 5 + 2;
        
        // Capture a section of the canvas
        try {
          const imageData = ctx.getImageData(displacementX, displacementY, 
                                            displacementWidth, displacementHeight);
          // Draw it slightly offset
          const offsetX = (Math.random() - 0.5) * 15;
          ctx.putImageData(imageData, displacementX + offsetX, displacementY);
        } catch (e) {
          // Handle potential security errors with getImageData
          console.log('Glitch effect skipped due to security policy');
        }
        break;
        
      case 2: // Localized color distortion instead of full-screen effect
        const distortX = Math.random() * canvas.width * 0.7;
        const distortY = Math.random() * canvas.height * 0.7;
        const distortWidth = Math.random() * 100 + 50;
        const distortHeight = Math.random() * 50 + 30;
        
        if (Math.random() > 0.5) {
          // Apply a localized blue tint
          ctx.fillStyle = `rgba(100, 100, 255, 0.1)`;
          ctx.fillRect(distortX, distortY, distortWidth, distortHeight);
        } else {
          // Apply a localized red tint
          ctx.fillStyle = `rgba(255, 100, 100, 0.1)`;
          ctx.fillRect(distortX, distortY, distortWidth, distortHeight);
        }
        break;
    }
  }
  
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
    
    // Apply occasional artistic glitch effect
    createGlitchEffect();
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    // Occasional RGB split effect (happens ~0.5% of the time)
    if (Math.random() < 0.005) {
      // Create a RGB split effect with increased visibility
      ctx.globalCompositeOperation = 'lighter';
      
      // Draw a few particles with color offset
      for (let i = 0; i < 8; i++) { // More particles
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 4 + 2; // Larger size
        
        // Red channel offset
        ctx.fillStyle = 'rgba(255, 0, 0, 0.07)'; // Higher opacity
        ctx.fillRect(x - 3, y, size, size); // Larger offset
        
        // Green channel
        ctx.fillStyle = 'rgba(0, 255, 0, 0.07)'; // Higher opacity
        ctx.fillRect(x, y, size, size);
        
        // Blue channel offset
        ctx.fillStyle = 'rgba(0, 0, 255, 0.07)'; // Higher opacity
        ctx.fillRect(x + 3, y, size, size); // Larger offset
      }
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
    }
    
    requestAnimationFrame(animate);
  }
  
  // Start animation
  console.log('Starting glitch background animation');
  animate();
});
