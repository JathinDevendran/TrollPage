// ===== ENHANCED EASTER EGGS =====

let heartClickCount = 0;
const HEART_CLICK_THRESHOLD = 10;
let longPressTimer = null;
const LONG_PRESS_DURATION = 5000;
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

// ===== MIDNIGHT MESSAGE =====
function checkMidnightMessage() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    if (hours === 0 && minutes >= 0 && minutes < 5) {
        const midnightMsg = document.getElementById('midnightMessage');
        if (midnightMsg) {
            midnightMsg.classList.add('show');
        }
    }
}

// ===== FLOATING HEARTS EASTER EGG =====
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const heartCount = 12;
    const heartEmojis = ['💖', '💕', '💗', '💝'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.setProperty('--drift', (Math.random() - 0.5) * 100 + 'px');
        heart.style.animationDelay = Math.random() * 12 + 's';
        heart.style.animationDuration = (10 + Math.random() * 8) + 's';
        
        heart.addEventListener('click', handleHeartClick);
        container.appendChild(heart);
    }
}

function handleHeartClick(e) {
    heartClickCount++;
    
    // Visual feedback
    e.target.classList.add('clicked');
    
    // Create burst at click position
    if (window.particleSystem) {
        const rect = e.target.getBoundingClientRect();
        window.particleSystem.createBurst(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            10
        );
    }
    
    // Recreate heart after animation
    setTimeout(() => {
        const newHeart = e.target.cloneNode(true);
        newHeart.classList.remove('clicked');
        newHeart.addEventListener('click', handleHeartClick);
        e.target.parentNode.replaceChild(newHeart, e.target);
    }, 600);
    
    if (heartClickCount >= HEART_CLICK_THRESHOLD) {
        showEasterEggPopup('Someone is a little too curious 😏❤️<br><br><small>You found the heart hunter secret!</small>', true);
        heartClickCount = 0;
        
        // Create special glow effect
        if (window.particleSystem) {
            window.particleSystem.createGlowParticles(30);
        }
    }
}

// ===== LONG PRESS EASTER EGG =====
function initLongPress() {
    const area = document.getElementById('longPressArea');
    if (!area) return;
    
    area.addEventListener('mousedown', startLongPress);
    area.addEventListener('mouseup', cancelLongPress);
    area.addEventListener('mouseleave', cancelLongPress);
    area.addEventListener('touchstart', startLongPress);
    area.addEventListener('touchend', cancelLongPress);
    area.addEventListener('touchcancel', cancelLongPress);
}

function startLongPress(e) {
    e.preventDefault();
    const area = document.getElementById('longPressArea');
    
    // Visual feedback - subtle glow
    area.style.background = 'radial-gradient(circle, rgba(255, 107, 157, 0.1), transparent)';
    
    longPressTimer = setTimeout(() => {
        showEasterEggPopup(
            'You weren\'t supposed to find this…<br><br>' +
            'But I love how curious you are 💕<br><br>' +
            '<small style="opacity: 0.7;">Secret corner discovered!</small>',
            true
        );
        
        // Create magical effect
        if (window.particleSystem) {
            window.particleSystem.createGlowParticles(25);
        }
        
        area.style.background = '';
    }, LONG_PRESS_DURATION);
}

function cancelLongPress() {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
        
        const area = document.getElementById('longPressArea');
        area.style.background = '';
    }
}

// ===== KONAMI CODE EASTER EGG =====
function initKonamiCode() {
    document.addEventListener('keydown', handleKonamiInput);
}

function handleKonamiInput(e) {
    if (e.key === KONAMI_CODE[konamiIndex]) {
        konamiIndex++;
        
        // Visual feedback for progress
        if (konamiIndex > 0 && konamiIndex < KONAMI_CODE.length) {
            createProgressIndicator(konamiIndex);
        }
        
        if (konamiIndex === KONAMI_CODE.length) {
            activateKonamiMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
}

function createProgressIndicator(progress) {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        background: rgba(255, 107, 157, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 107, 157, 0.4);
        border-radius: 20px;
        color: #ffc2e2;
        font-size: 14px;
        z-index: 9998;
        animation: fadeIn 0.3s ease;
    `;
    indicator.textContent = `🎮 Konami Progress: ${progress}/${KONAMI_CODE.length}`;
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => indicator.remove(), 300);
    }, 1500);
}

function activateKonamiMode() {
    // Flash pink screen
    document.body.style.animation = 'pinkFlash 2s ease';
    
    // Create heart rain
    if (window.particleSystem) {
        window.particleSystem.createHeartRain(5000);
    }
    
    // Show message
    setTimeout(() => {
        showEasterEggPopup(
            '🎮 Cheater 😌<br><br>' +
            'But I still choose you ❤️<br><br>' +
            '<small style="opacity: 0.7;">Konami Code activated!</small>',
            true
        );
        document.body.style.animation = '';
    }, 2000);
}

// Add pinkFlash animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pinkFlash {
        0%, 100% { background: #0f0c1a; }
        50% { background: linear-gradient(135deg, #ff6b9d, #c94b8b); }
    }
`;
document.head.appendChild(style);

// ===== EASTER EGG POPUP =====
function showEasterEggPopup(message, allowHTML = false) {
    let modal = document.querySelector('.easter-egg-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal easter-egg-modal';
        modal.innerHTML = `
            <div class="modal-content" style="animation: popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);">
                <div class="modal-text"></div>
                <button class="modal-close">Got it! 💕</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    const textContainer = modal.querySelector('.modal-text');
    if (allowHTML) {
        textContainer.innerHTML = message;
    } else {
        textContainer.textContent = message;
    }
    
    modal.classList.add('show');
    
    // Play sound if available
    if (window.musicManager) {
        window.musicManager.playYesSound();
    }
}

// ===== INITIALIZE ALL EASTER EGGS =====
function initEasterEggs() {
    createFloatingHearts();
    initLongPress();
    initKonamiCode();
    checkMidnightMessage();
    
    setInterval(checkMidnightMessage, 60000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEasterEggs);
} else {
    initEasterEggs();
}
