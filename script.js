function celebrate() {
    const greeting = document.getElementById('greeting');
    const name = document.getElementById('name').textContent;
    const birthdaySong = document.getElementById('birthdaySong');

    greeting.textContent = `HAPPY BIRTHDAY, MOM ! 🎂 `;
    birthdaySong.play();
    startConfetti();
}

function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff0', '#f00', '#0f0', '#00f', '#ff00ff', '#00ffff'];
    const particles = [];

    function createParticle(x, y) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
            x: x,
            y: y,
            size: Math.random() * 5 + 5,
            speedX: Math.random() * 6 - 3,
            speedY: Math.random() * 6 - 3,
            color: color
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();

            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.size *= 0.98; // Shrink particle over time

            if (particle.size <= 0.5) {
                particles.splice(index, 1); // Remove particle if too small
            }
        });

        requestAnimationFrame(animateParticles);
    }

    function generateConfetti() {
        setInterval(() => {
            for (let i = 0; i < 10; i++) {
                createParticle(Math.random() * canvas.width, Math.random() * canvas.height);
            }
        }, 100); // Adjust the interval to control confetti density
    }

    generateConfetti();
    animateParticles();
}
