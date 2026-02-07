class UnlockManager {
    constructor() { this.init(); }
    init() {
        this.checkUnlocks();
        const countdownSection = document.getElementById('countdownSection');
        if (countdownSection) countdownSection.classList.add('active');
    }
    checkUnlocks() {
        if (localStorage.getItem('statsUnlocked') === 'true') this.enableStatsAccess();
    }
    enableStatsAccess() {
        console.log('Stats page unlocked! Access at /pages/stats.html');
    }
}
function initUnlock() { new UnlockManager(); }
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUnlock);
} else {
    initUnlock();
}
