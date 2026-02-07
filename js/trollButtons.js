class TrollButtonManager {
    constructor(dayName) {
        this.dayName = dayName;
        this.dayId = dayName.replace(/\s+/g, '-').toLowerCase();
        this.noDodgeCount = 0;
        this.init();
    }
    init() {
        const container = document.getElementById(`buttons-${this.dayId}`);
        if (!container) return;
        this.yesBtn = container.querySelector('.btn-yes');
        this.noBtn = container.querySelector('.btn-no');
        this.responseDiv = document.getElementById(`response-${this.dayId}`);
        if (!this.yesBtn || !this.noBtn) return;
        this.yesBtn.addEventListener('click', () => this.handleYesClick());
        this.noBtn.addEventListener('mouseenter', () => this.dodgeNo());
        this.noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.dodgeNo(); });
        this.noBtn.addEventListener('click', () => this.handleNoClick());
    }
    handleYesClick() {
        if (window.statsTracker) {
            const timeSpent = window.countdownManager ? window.countdownManager.getTimeSpent() : 0;
            window.statsTracker.trackYesClick(this.dayName);
            window.statsTracker.trackHesitation(this.dayName, timeSpent);
        }
        if (window.musicManager) window.musicManager.playYesSound();
        if (this.responseDiv) {
            this.responseDiv.innerHTML = '✨ I knew you\'d say yes! You\'re amazing! 💖';
            this.responseDiv.style.animation = 'fadeIn 0.8s ease';
        }
        this.yesBtn.disabled = true;
        this.noBtn.style.display = 'none';
        this.celebrate();
    }
    handleNoClick() {
        if (window.statsTracker) window.statsTracker.trackNoAttempt(this.dayName);
        if (window.musicManager) window.musicManager.playNoSound();
        if (this.responseDiv) this.responseDiv.innerHTML = '😏 Nice try, but NO isn\'t an option!';
        this.dodgeNo();
    }
    dodgeNo() {
        if (window.statsTracker) window.statsTracker.trackNoAttempt(this.dayName);
        this.noDodgeCount++;
        const container = this.noBtn.parentElement;
        const maxX = container.getBoundingClientRect().width - this.noBtn.getBoundingClientRect().width - 20;
        const randomX = Math.random() * maxX - (maxX / 2);
        const randomY = Math.random() * 100 - 50;
        this.noBtn.classList.add('trolled');
        this.noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        setTimeout(() => this.noBtn.classList.remove('trolled'), 300);
        if (this.noDodgeCount >= 5) {
            const newSize = Math.max(0.5, 1 - (this.noDodgeCount - 4) * 0.1);
            this.noBtn.style.transform += ` scale(${newSize})`;
        }
        if (this.noDodgeCount === 10 && this.responseDiv) {
            this.responseDiv.innerHTML = '💡 Hint: Maybe just say YES? 😊';
        }
        if (this.noDodgeCount >= 15) {
            this.noBtn.style.opacity = Math.max(0.1, 1 - (this.noDodgeCount - 14) * 0.1);
        }
    }
    celebrate() {
        this.createConfetti();
        if (this.yesBtn) this.yesBtn.classList.add('animate-glow');
        if (window.particleSystem) window.particleSystem.createGlowParticles(40);
    }
    createConfetti() {
        if (!window.particleSystem) return;
        const rect = this.yesBtn.getBoundingClientRect();
        window.particleSystem.createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
    }
}
const buttonManagers = {};
function initTrollButtons(dayName) {
    if (!buttonManagers[dayName]) buttonManagers[dayName] = new TrollButtonManager(dayName);
}
window.initTrollButtons = initTrollButtons;
