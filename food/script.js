class CountdownClock {
    constructor() {
        this.clock = document.getElementById('clock');
        this.greenSlice = document.getElementById('green-slice');
        this.pointer = document.getElementById('pointer');
        this.chewingEmoji = document.getElementById('chewing-emoji');
        this.foodEmoji = document.getElementById('food-emoji');
        this.timerDisplay = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.funMessages = document.getElementById('funMessages');
        
        this.timeLeft = 60;
        this.isRunning = false;
        this.intervalId = null;
        
        // Fun messages for different time ranges
        this.messages = {
            start: [
                "準備好了嗎？讓我們開始吧！",
                "倒數開始！準備吃飯囉！",
                "時間到就要吃飯了！",
                "讓我們一起倒數吧！"
            ],
            running: [
                "加油！快要可以吃飯了！",
                "時間過得真快！",
                "再等一下下就好！",
                "肚子餓了嗎？",
                "快到了快到了！"
            ],
            almost: [
                "哇！快要到了！",
                "最後幾秒了！",
                "準備好吃飯了嗎？",
                "太棒了！"
            ],
            finished: [
                "🎉 時間到！可以吃飯了！🎉",
                "🍽️ 吃飯時間到！🍽️",
                "太棒了！快去吃飯吧！",
                "恭喜！時間到了！"
            ]
        };
        
        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.startCountdown());
        this.updateDisplay();
        this.showRandomMessage('start');
        
        // Add click sound effect
        this.addClickSound();
    }
    
    addClickSound() {
        // Create audio context for sound effects
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    playSound(frequency = 800, duration = 200) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }
    
    showRandomMessage(type) {
        const messages = this.messages[type];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const messageElement = this.funMessages.querySelector('.message');
        messageElement.textContent = randomMessage;
        
        // Add animation class
        messageElement.style.animation = 'none';
        setTimeout(() => {
            messageElement.style.animation = 'messageSlide 0.5s ease-out';
        }, 10);
    }
    
    startCountdown() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.timeLeft = 60;
        this.startBtn.disabled = true;
        this.startBtn.querySelector('.button-text').textContent = '倒數中...';
        this.startBtn.querySelector('.button-emoji').textContent = '⏰';
        
        // Play start sound
        this.playSound(1000, 300);
        
        this.showRandomMessage('start');
        
        // Start the countdown
        this.intervalId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            // Play tick sound for last 10 seconds
            if (this.timeLeft <= 10 && this.timeLeft > 0) {
                this.playSound(600, 100);
            }
            
            if (this.timeLeft <= 0) {
                this.resetAndRestart();
            }
        }, 1000);
    }
    
    stopCountdown() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.startBtn.disabled = false;
        this.startBtn.querySelector('.button-text').textContent = '開始倒數！';
        this.startBtn.querySelector('.button-emoji').textContent = '🚀';
        this.timeLeft = 60;
        this.updateDisplay();
        this.showRandomMessage('start');
    }
    
    resetAndRestart() {
        this.timeLeft = 60;
        this.updateDisplay();
        
        // Play completion sound
        this.playSound(1200, 500);
        this.showRandomMessage('finished');
        
        // Add celebration animation
        this.addCelebrationEffect();
        
        // Automatically restart after a brief pause
        setTimeout(() => {
            this.startCountdown();
        }, 2000);
    }
    
    addCelebrationEffect() {
        // Create confetti effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 50);
        }
    }
    
    createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#FF6B6B', '#4ECDC4', '#45B7B8', '#FFD700', '#FF8E8E'][Math.floor(Math.random() * 5)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.animation = 'confettiFall 3s linear forwards';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
    
    updateDisplay() {
        this.timerDisplay.textContent = this.timeLeft;
        
        // Add bounce animation to timer
        this.timerDisplay.style.animation = 'none';
        setTimeout(() => {
            this.timerDisplay.style.animation = 'numberBounce 0.5s ease-in-out';
        }, 10);
        
        // Calculate pointer rotation (starts at 12 o'clock = 0deg, goes clockwise)
        // 60 seconds = 360 degrees, so each second = 6 degrees
        const rotation = ((60 - this.timeLeft) * 6);
        this.pointer.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
        
        // Keep green slice and emojis always visible
        this.greenSlice.style.opacity = '1';
        this.chewingEmoji.classList.add('active');
        this.foodEmoji.classList.add('active');
        
        // Show different messages based on time left
        if (this.timeLeft <= 10 && this.timeLeft > 5) {
            this.showRandomMessage('almost');
        } else if (this.timeLeft > 10) {
            // Show random running message occasionally
            if (Math.random() < 0.1) {
                this.showRandomMessage('running');
            }
        }
        
        // Add emoji animations
        this.animateEmojis();
    }
    
    animateEmojis() {
        // Add random wiggle to emojis
        if (Math.random() < 0.3) {
            this.chewingEmoji.style.animation = 'wiggle 0.5s ease-in-out';
            this.foodEmoji.style.animation = 'wiggle 0.5s ease-in-out';
        }
    }
}

// Initialize the countdown clock when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CountdownClock();
});
