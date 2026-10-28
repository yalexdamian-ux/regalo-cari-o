
const screens = document.querySelectorAll(".scene > section");

function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle("hidden", screen.id !== id);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector("#startBtn").addEventListener("click", () => {
  showScreen("birthday");
});

document.querySelector("#galleryBtn").addEventListener("click", () => {
  showScreen("memories");
});

document.querySelector("#backFromGallery").addEventListener("click", () => {
  showScreen("birthday");
});

document.querySelector("#letterBtn").addEventListener("click", () => {
  showScreen("letter");
});

document.querySelector("#finalBtn").addEventListener("click", () => {
  showScreen("finale");
});

document.querySelector("#replayBtn").addEventListener("click", () => {
  showScreen("intro");
});

// Música de fondo
const music = document.querySelector("#music");
const musicBtn = document.querySelector("#musicBtn");

music.src =
  "https://raw.githubusercontent.com/yalexdamian-ux/regalo-erica/main/WhatsApp-Video-2026-10-27-at-15.53.51.mp3";

musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.textContent = "♫ Pausar nuestra canción";
    } else {
      music.pause();
      musicBtn.textContent = "♫ Escuchar nuestra canción";
    }
  } catch (error) {
    console.error("No se pudo reproducir la canción:", error);
    musicBtn.textContent = "♫ Intenta escuchar nuestra canción";
  }
});

music.addEventListener("ended", () => {
  musicBtn.textContent = "♫ Escuchar nuestra canción";
});

// Galaxia de estrellas
const canvas = document.querySelector("#stars");
const ctx = canvas.getContext("2d");

let stars = [];
let width = 0;
let height = 0;
let animationFrame;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const amount = Math.min(
    220,
    Math.max(90, Math.floor((width * height) / 5500))
  );

  stars = Array.from({ length: amount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.25,
    alpha: Math.random() * 0.65 + 0.2,
    speed: Math.random() * 0.012 + 0.003,
    phase: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 0.12
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);

  const time = performance.now() * 0.001;

  for (const star of stars) {
    const pulse = (Math.sin(time * star.speed * 30 + star.phase) + 1) / 2;
    const opacity = star.alpha * (0.45 + pulse * 0.55);

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 239, 255, ${opacity})`;
    ctx.fill();

    if (star.radius > 1.25 && pulse > 0.85) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190, 150, 255, ${opacity * 0.12})`;
      ctx.fill();
    }

    star.x += star.drift;

    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
  }

  animationFrame = requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawStars();

// Si la pestaña queda oculta, ahorra recursos.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(animationFrame);
  } else {
    cancelAnimationFrame(animationFrame);
    drawStars();
  }
});
