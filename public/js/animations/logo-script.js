const canvas = document.getElementById("logoCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 100;

const text = "</> Davisino";
const fontSize = 60;
ctx.font = `${fontSize}px Arial`;
const textWidth = ctx.measureText(text).width;
const particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 0.2 + 1;
    this.baseX = x;
    this.baseY = y;
    this.density = Math.random() * 40 + 5;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(mouse) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / dist;
    const forceDirectionY = dy / dist;

    const maxDistance = this.size * 20;
    let force = (maxDistance - dist) / maxDistance;
    if (force < 0) force = 0;

    const directionX = forceDirectionX * force * this.density;
    const directionY = forceDirectionY * force * this.density;

    if (dist < maxDistance) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 20;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 20;
      }
    }
  }
}

function init() {
  particles.length = 0;
  ctx.fillStyle = "white";
  ctx.fillText(text, 0, canvas.height / 2 + fontSize / 3);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const alpha = imageData.data[(y * imageData.width + x) * 4 + 3];
      if (alpha > 64) {
        particles.push(new Particle(x, y));
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update(mouse);
  }
  requestAnimationFrame(animate);
}

const mouse = {
  x: null,
  y: null,
};

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

canvas.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
