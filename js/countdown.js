const VALENTINES_WEEK = {
    'Rose Day': new Date('2026-02-07T00:00:00'),
    'Propose Day': new Date('2026-02-08T00:00:00'),
    'Chocolate Day': new Date('2026-02-09T00:00:00'),
    'Teddy Day': new Date('2026-02-10T00:00:00'),
    'Promise Day': new Date('2026-02-11T00:00:00'),
    'Hug Day': new Date('2026-02-12T00:00:00'),
    'Kiss Day': new Date('2026-02-13T00:00:00'),
    'Valentine\'s Day': new Date('2026-02-14T00:00:00')
};

const DAY_MESSAGES = {
    'Rose Day': '🌹 Like a rose, you bring color to my world. Will you be mine?',
    'Propose Day': '💍 Every moment with you feels like a dream. Will you say yes?',
    'Chocolate Day': '🍫 You\'re sweeter than any chocolate. Will you be my sweetness?',
    'Teddy Day': '🧸 I want to hold you close, just like a teddy bear. Will you let me?',
    'Promise Day': '🤝 I promise to always choose you. Will you promise to choose me too?',
    'Hug Day': '🤗 Your hugs feel like home. Will you be my forever home?',
    'Kiss Day': '💋 Your smile makes my heart skip. Will you let me kiss it every day?',
    'Valentine\'s Day': '💖 You are my Valentine, today and always. Will you be mine forever?'
};

class CountdownManager {
    constructor() {
        this.pageLoadTime = Date.now();
        this.init();
    }
    init() {
        this.updateCountdown();
        this.checkUnlockedDays();
        setInterval(() => this.updateCountdown(), 1000);
    }
    updateCountdown() {
        const now = new Date();
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        let nextDay = null, minDiff = Infinity;
        for (const [dayName, dayDate] of Object.entries(VALENTINES_WEEK)) {
            const diff = dayDate - now;
            if (diff > 0 && diff < minDiff) {
                minDiff = diff;
                nextDay = { name: dayName, date: dayDate };
            }
        }
        
        if (nextDay) this.displayCountdown(nextDay.name, nextDay.date);
        else countdownElement.innerHTML = '<p style="font-size: 24px;">💖 Valentine\'s Week Complete! 💖</p>';
    }
    displayCountdown(dayName, targetDate) {
        const diff = targetDate - new Date();
        const days = Math.floor(diff / 864e5);
        const hours = Math.floor((diff % 864e5) / 36e5);
        const minutes = Math.floor((diff % 36e5) / 6e4);
        const seconds = Math.floor((diff % 6e4) / 1e3);
        
        document.getElementById('countdown').innerHTML = `
            <div class="countdown-item"><span class="countdown-number">${days}</span><span class="countdown-label">Days</span></div>
            <div class="countdown-item"><span class="countdown-number">${hours}</span><span class="countdown-label">Hours</span></div>
            <div class="countdown-item"><span class="countdown-number">${minutes}</span><span class="countdown-label">Minutes</span></div>
            <div class="countdown-item"><span class="countdown-number">${seconds}</span><span class="countdown-label">Seconds</span></div>
        `;
        const subtitle = document.querySelector('#countdownSection .subtitle');
        if (subtitle) subtitle.textContent = `Until ${dayName}...`;
    }
    checkUnlockedDays() {
        const now = new Date();
        const container = document.getElementById('daysContainer');
        if (!container) return;
        container.innerHTML = '';
        for (const [dayName, dayDate] of Object.entries(VALENTINES_WEEK)) {
            if (now >= dayDate) this.createDayPage(dayName);
        }
    }
    createDayPage(dayName) {
        const message = DAY_MESSAGES[dayName] || 'Will you be mine?';
        const dayId = dayName.replace(/\s+/g, '-').toLowerCase();
        const dayPage = document.createElement('div');
        dayPage.className = 'day-page';
        dayPage.id = `day-${dayId}`;
        dayPage.innerHTML = `
            <h2 class="day-title">${dayName}</h2>
            <p class="day-message">${message}</p>
            <div class="button-container" id="buttons-${dayId}">
                <button class="btn btn-yes" data-day="${dayName}">YES! 💕</button>
                <button class="btn btn-no" data-day="${dayName}">No</button>
            </div>
            <div id="response-${dayId}" style="margin-top: 30px; font-size: 18px; color: #ffc2e2;"></div>
        `;
        document.getElementById('daysContainer').appendChild(dayPage);
        if (window.initTrollButtons) window.initTrollButtons(dayName);
    }
    getTimeSpent() { return Math.floor((Date.now() - this.pageLoadTime) / 1000); }
}

let countdownManager;
function initCountdown() {
    countdownManager = new CountdownManager();
    window.countdownManager = countdownManager;
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
} else {
    initCountdown();
}
