// ===== MUSIC MANAGER =====
class MusicManager {
    constructor() {
        this.bgMusic = document.getElementById('bgMusic');
        this.yesSound = document.getElementById('yesSound');
        this.noSound = document.getElementById('noSound');
        this.toggleBtn = document.getElementById('musicToggle');
        this.isPlaying = false;
        this.loadPreference();
        this.init();
    }
    
    init() {
        if (!this.toggleBtn || !this.bgMusic) return;
        this.bgMusic.volume = 0.3;
        if (this.yesSound) this.yesSound.volume = 0.5;
        if (this.noSound) this.noSound.volume = 0.5;
        this.toggleBtn.addEventListener('click', () => this.toggle());
        if (this.isPlaying) this.updateUI();
    }
    
    toggle() {
        this.isPlaying ? this.pause() : this.play();
    }
    
    play() {
        if (!this.bgMusic) return;
        this.bgMusic.play().then(() => {
            this.isPlaying = true;
            this.savePreference(true);
            this.updateUI();
        }).catch(err => console.log('Music blocked:', err));
    }
    
    pause() {
        if (!this.bgMusic) return;
        this.bgMusic.pause();
        this.isPlaying = false;
        this.savePreference(false);
        this.updateUI();
    }
    
    updateUI() {
        if (!this.toggleBtn) return;
        this.toggleBtn.classList.toggle('playing', this.isPlaying);
        this.toggleBtn.title = this.isPlaying ? 'Pause Music' : 'Play Music';
    }
    
    playYesSound() {
        if (this.yesSound) {
            this.yesSound.currentTime = 0;
            this.yesSound.play().catch(() => {});
        }
    }
    
    playNoSound() {
        if (this.noSound) {
            this.noSound.currentTime = 0;
            this.noSound.play().catch(() => {});
        }
    }
    
    savePreference(isPlaying) {
        localStorage.setItem('musicEnabled', isPlaying ? 'true' : 'false');
    }
    
    loadPreference() {
        this.isPlaying = localStorage.getItem('musicEnabled') === 'true';
    }
}

let musicManager;
function initMusic() {
    musicManager = new MusicManager();
    window.musicManager = musicManager;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusic);
} else {
    initMusic();
}
