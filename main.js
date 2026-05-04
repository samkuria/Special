const envelope = document.querySelector('.walking-envelope');
const overlay = document.getElementById('reveal-overlay');
const countdownEl = document.getElementById('countdown');
const textEl = document.getElementById('birthday-text');
const finalBtn = document.getElementById('final-button');
const letterBox = document.getElementById('birthday-letter');
const lastBtn = document.getElementById('last-surprise-btn');
const finalGallery = document.getElementById('final-gallery');
const music = document.getElementById('bg-music'); // Added this!

const words = ["HAPPY", "BIRTHDAY", "TO", "YOU", "MARYANN"];

// --- Music Logic ---
function fadeInMusic(audioElement) {
    audioElement.volume = 0;
    audioElement.play().catch(error => {
        console.log("Autoplay prevented: ", error);
    });
    
    let vol = 0;
    const interval = setInterval(() => {
        if (vol < 1) {
            vol += 0.05;
            audioElement.volume = Math.min(vol, 1).toFixed(2);
        } else {
            clearInterval(interval);
        }
    }, 200);
}

// --- Birthday Rain Logic ---
function startBirthdayRain() {
    const canvas = document.getElementById('birthday-canvas');
    const ctx = canvas.getContext('2d');

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles = [];
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#fb607f']; 
    const strings = ['HAPPY BIRTHDAY', '🎂', '💖', 'MARYANN', '✨', '🎈'];

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.text = strings[Math.floor(Math.random() * strings.length)];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.fontSize = Math.random() * 15 + 12;
            this.speed = Math.random() * 2 + 1.5; 
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.font = `${this.fontSize}px 'Indie Flower'`;
            ctx.fillText(this.text, this.x, this.y);
        }

        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.init(); 
            }
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// --- 1. Envelope Click ---
envelope.addEventListener('click', async () => {
    // Call the fade function which handles the play() call
    fadeInMusic(music);

    overlay.style.display = 'flex';
    startBirthdayRain();

    for (let i = 3; i > 0; i--) {
        countdownEl.innerText = i;
        await new Promise(r => setTimeout(r, 1000));
    }
    countdownEl.innerText = "";

    for (let word of words) {
        textEl.innerText = word;
        await new Promise(r => setTimeout(r, 900)); 
    }

    textEl.style.marginBottom = "20px";
    finalBtn.style.display = "block";
});

// --- 2. "Click Me" Button ---
finalBtn.addEventListener('click', () => {
    textEl.style.display = 'none';
    finalBtn.style.display = 'none';
    letterBox.style.display = 'block';
    letterBox.style.animation = 'fadeIn 1s ease-in';
});

// --- 3. Last "Click Me" Button ---
lastBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
    overlay.style.display = 'none';
    finalGallery.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

