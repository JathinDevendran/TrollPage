// ===== PARTICLE SYSTEMS MANAGER =====

class ParticleSystem {
    constructor() {
        this.heartContainer = document.getElementById('heartsParticles');
        this.sparkleContainer = document.getElementById('sparklesParticles');
        this.roseContainer = document.getElementById('roseParticles');
        
        this.init();
    }
    
    init() {
        // Create different particle types
        this.createHeartParticles(15);
        this.createSparkleParticles(30);
        this.createRoseParticles(20);
        this.createStarfield(50);
        
        // Create magic trail on mouse move
        this.initMagicTrail();
    }
    
    // ===== HEART PARTICLES =====
    createHeartParticles(count) {
        if (!this.heartContainer) return;
        
        const heartEmojis = ['💖', '💕', '💗', '💓', '💝'];
        
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            const duration = 10 + Math.random() * 10; // 10-20 seconds
            const delay = Math.random() * 10; // 0-10 seconds
            const startX = Math.random() * 100 - 50; // -50 to 50px
            const endX = Math.random() * 100 - 50;
            const scale = 0.5 + Math.random() * 0.8; // 0.5 to 1.3
            
            heart.style.setProperty('--duration', `${duration}s`);
            heart.style.setProperty('--delay', `${delay}s`);
            heart.style.setProperty('--start-x', `${startX}px`);
            heart.style.setProperty('--end-x', `${endX}px`);
            heart.style.setProperty('--scale', scale);
            heart.style.left = Math.random() * 100 + '%';
            
            this.heartContainer.appendChild(heart);
        }
    }
    
    // ===== SPARKLE PARTICLES =====
    createSparkleParticles(count) {
        if (!this.sparkleContainer) return;
        
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-particle';
            
            const duration = 2 + Math.random() * 3; // 2-5 seconds
            const delay = Math.random() * 5;
            const x = Math.random() * 100; // 0-100vw
            const y = Math.random() * 100; // 0-100vh
            
            sparkle.style.setProperty('--duration', `${duration}s`);
            sparkle.style.setProperty('--delay', `${delay}s`);
            sparkle.style.setProperty('--x', `${x}vw`);
            sparkle.style.setProperty('--y', `${y}vh`);
            sparkle.style.left = x + 'vw';
            sparkle.style.top = y + 'vh';
            
            this.sparkleContainer.appendChild(sparkle);
        }
    }
    
    // ===== ROSE PETAL PARTICLES =====
    createRoseParticles(count) {
        if (!this.roseContainer) return;
        
        for (let i = 0; i < count; i++) {
            const petal = document.createElement('div');
            petal.className = 'rose-particle';
            
            const duration = 8 + Math.random() * 8; // 8-16 seconds
            const delay = Math.random() * 10;
            const drift = (Math.random() - 0.5) * 200; // -100 to 100px
            const rotation = Math.random() * 720; // 0-720 degrees
            
            petal.style.setProperty('--duration', `${duration}s`);
            petal.style.setProperty('--delay', `${delay}s`);
            petal.style.setProperty('--drift', `${drift}px`);
            petal.style.setProperty('--rotation', `${rotation}deg`);
            petal.style.left = Math.random() * 100 + '%';
            
            this.roseContainer.appendChild(petal);
        }
    }
    
    // ===== STARFIELD =====
    createStarfield(count) {
        const starContainer = document.createElement('div');
        starContainer.className = 'particles-container';
        document.body.appendChild(starContainer);
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star-particle';
            
            const duration = 1 + Math.random() * 3; // 1-4 seconds
            const delay = Math.random() * 5;
            
            star.style.setProperty('--duration', `${duration}s`);
            star.style.setProperty('--delay', `${delay}s`);
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            starContainer.appendChild(star);
        }
    }
    
    // ===== MAGIC TRAIL =====
    initMagicTrail() {
        let lastTrail = 0;
        const trailDelay = 50; // milliseconds between trails
        
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastTrail < trailDelay) return;
            lastTrail = now;
            
            // Only create trail sometimes (30% chance)
            if (Math.random() > 0.3) return;
            
            const trail = document.createElement('div');
            trail.className = 'magic-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.remove();
            }, 1000);
        });
    }
    
    // ===== BURST EFFECT (for celebrations) =====
    createBurst(x, y, count = 30) {
        const emojis = ['❤️', '💕', '💖', '💗', '💝', '✨', '⭐', '🌟'];
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            const duration = 1 + Math.random() * 2; // 1-3 seconds
            const delay = Math.random() * 0.3;
            const drift = (Math.random() - 0.5) * 400; // -200 to 200px
            const rotation = Math.random() * 1080; // 0-1080 degrees
            const size = 20 + Math.random() * 20; // 20-40px
            
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.setProperty('--delay', `${delay}s`);
            particle.style.setProperty('--drift', `${drift}px`);
            particle.style.setProperty('--rotation', `${rotation}deg`);
            particle.style.setProperty('--size', `${size}px`);
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, (duration + delay) * 1000);
        }
    }
    
    // ===== HEART RAIN (for Konami code) =====
    createHeartRain(duration = 5000) {
        const rainContainer = document.createElement('div');
        rainContainer.className = 'particles-container';
        rainContainer.style.zIndex = '9999';
        document.body.appendChild(rainContainer);
        
        const interval = setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'confetti-particle';
            heart.textContent = ['💖', '💕', '💗', '💝'][Math.floor(Math.random() * 4)];
            
            const dur = 2 + Math.random() * 2;
            const drift = (Math.random() - 0.5) * 200;
            const rotation = Math.random() * 720;
            
            heart.style.setProperty('--duration', `${dur}s`);
            heart.style.setProperty('--delay', '0s');
            heart.style.setProperty('--drift', `${drift}px`);
            heart.style.setProperty('--rotation', `${rotation}deg`);
            heart.style.setProperty('--size', '30px');
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            
            rainContainer.appendChild(heart);
            
            setTimeout(() => heart.remove(), dur * 1000);
        }, 100);
        
        setTimeout(() => {
            clearInterval(interval);
            setTimeout(() => rainContainer.remove(), 3000);
        }, duration);
    }
    
    // ===== GLOW PARTICLES (for special moments) =====
    createGlowParticles(count = 20) {
        const glowContainer = document.createElement('div');
        glowContainer.className = 'particles-container';
        glowContainer.style.zIndex = '10';
        document.body.appendChild(glowContainer);
        
        for (let i = 0; i < count; i++) {
            const glow = document.createElement('div');
            glow.className = 'glow-particle';
            
            const duration = 2 + Math.random() * 3;
            const delay = Math.random() * 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            glow.style.setProperty('--duration', `${duration}s`);
            glow.style.setProperty('--delay', `${delay}s`);
            glow.style.setProperty('--x', `${x}vw`);
            glow.style.setProperty('--y', `${y}vh`);
            glow.style.left = x + 'vw';
            glow.style.top = y + 'vh';
            
            glowContainer.appendChild(glow);
        }
        
        setTimeout(() => {
            glowContainer.remove();
        }, 8000);
    }
}

// Initialize particle system
let particleSystem;

function initParticles() {
    particleSystem = new ParticleSystem();
    window.particleSystem = particleSystem;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}
