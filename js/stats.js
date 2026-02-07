class StatsTracker {
    constructor() { this.stats = this.loadStats(); }
    loadStats() {
        const saved = localStorage.getItem('valentineStats');
        return saved ? JSON.parse(saved) : {
            totalNoAttempts: 0, totalYesClicks: 0, noRunawayCount: 0,
            dayWithMostResistance: '', maxResistanceCount: 0,
            totalHesitationSeconds: 0, dailyStats: {},
            firstInteraction: null, lastYesClick: null
        };
    }
    saveStats() { localStorage.setItem('valentineStats', JSON.stringify(this.stats)); }
    trackNoAttempt(dayName) {
        this.stats.totalNoAttempts++;
        this.stats.noRunawayCount++;
        if (!this.stats.dailyStats[dayName]) {
            this.stats.dailyStats[dayName] = { noAttempts: 0, yesClicks: 0, hesitationTime: 0 };
        }
        this.stats.dailyStats[dayName].noAttempts++;
        if (this.stats.dailyStats[dayName].noAttempts > this.stats.maxResistanceCount) {
            this.stats.maxResistanceCount = this.stats.dailyStats[dayName].noAttempts;
            this.stats.dayWithMostResistance = dayName;
        }
        this.saveStats();
    }
    trackYesClick(dayName) {
        this.stats.totalYesClicks++;
        this.stats.lastYesClick = new Date().toISOString();
        if (!this.stats.firstInteraction) this.stats.firstInteraction = new Date().toISOString();
        if (!this.stats.dailyStats[dayName]) {
            this.stats.dailyStats[dayName] = { noAttempts: 0, yesClicks: 0, hesitationTime: 0 };
        }
        this.stats.dailyStats[dayName].yesClicks++;
        this.saveStats();
        this.checkStatsUnlock();
    }
    trackHesitation(dayName, seconds) {
        this.stats.totalHesitationSeconds += seconds;
        if (!this.stats.dailyStats[dayName]) {
            this.stats.dailyStats[dayName] = { noAttempts: 0, yesClicks: 0, hesitationTime: 0 };
        }
        this.stats.dailyStats[dayName].hesitationTime += seconds;
        this.saveStats();
    }
    checkStatsUnlock() {
        if (this.stats.totalYesClicks >= 5) localStorage.setItem('statsUnlocked', 'true');
    }
    getStats() { return this.stats; }
    resetStats() {
        this.stats = {
            totalNoAttempts: 0, totalYesClicks: 0, noRunawayCount: 0,
            dayWithMostResistance: '', maxResistanceCount: 0,
            totalHesitationSeconds: 0, dailyStats: {},
            firstInteraction: null, lastYesClick: null
        };
        this.saveStats();
        localStorage.removeItem('statsUnlocked');
    }
}
const statsTracker = new StatsTracker();
window.statsTracker = statsTracker;
