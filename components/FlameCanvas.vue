<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps<{ active: boolean }>();

const canvasEl = ref<HTMLCanvasElement | null>(null);
const INSET = 80; // how far the canvas extends outside the card — must match CSS

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;     // base half-width of the flame tongue
  swayFreq: number;
  swayPhase: number;
}

let particles: Particle[] = [];
let animId: number | null = null;
let spawning = false;
let frame = 0;
let ro: ResizeObserver | null = null;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function spawnParticle(w: number, h: number): Particle {
  const side = Math.random();
  let x: number, y: number, vx: number, vy: number;

  if (side < 0.65) {
    // Bottom edge — primary fire source, full width
    x = rand(INSET * 0.1, w - INSET * 0.1);
    y = h - rand(0, INSET * 0.5);
    vx = rand(-0.12, 0.12);
    vy = rand(-1.4, -0.7);
  } else if (side < 0.825) {
    // Left edge
    x = rand(0, INSET * 0.75);
    y = rand(h * 0.35, h - INSET * 0.2);
    vx = rand(-0.15, 0.22);
    vy = rand(-1.2, -0.6);
  } else {
    // Right edge
    x = rand(w - INSET * 0.75, w);
    y = rand(h * 0.35, h - INSET * 0.2);
    vx = rand(-0.22, 0.15);
    vy = rand(-1.2, -0.6);
  }

  const maxLife = rand(110, 180);
  return {
    x, y, vx, vy,
    life: maxLife,
    maxLife,
    size: rand(55, 90),
    swayFreq: rand(0.015, 0.035),
    swayPhase: rand(0, Math.PI * 2),
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  const t = p.life / p.maxLife; // 1 = born, 0 = dead

  // Narrow as it ages
  const w = p.size * Math.max(0.12, t * 0.65 + 0.12);
  const h = w * 3.2; // elongated tongue

  // Alpha: quick fade in, hold, fade out
  let alpha: number;
  if (t > 0.88) alpha = (1 - t) / 0.12;
  else if (t > 0.1) alpha = 1;
  else alpha = t / 0.1;
  alpha *= 0.88;

  // Color: white-blue core (young/hot) → electric blue → deep cobalt (old/cool)
  let cR: number, cG: number, cB: number;
  if (t > 0.62) {
    cR = 215; cG = 238; cB = 255; // near-white, icy blue
  } else if (t > 0.35) {
    cR = 90;  cG = 160; cB = 255; // sky blue
  } else {
    cR = 35;  cG = 80;  cB = 230; // electric blue
  }

  const tipY   = p.y - h * 0.52;
  const baseY  = p.y + h * 0.38;

  // Outer glow pass (wider, softer)
  ctx.shadowColor = `rgba(80, 140, 255, ${alpha * 0.65})`;
  ctx.shadowBlur  = w * 4.5;

  // Gradient: bright white-blue at base → electric blue → deep blue → transparent tip
  const grd = ctx.createLinearGradient(p.x, baseY, p.x, tipY);
  grd.addColorStop(0,    `rgba(${cR}, ${cG}, ${cB}, ${alpha})`);
  grd.addColorStop(0.3,  `rgba(70, 130, 255, ${alpha * 0.8})`);
  grd.addColorStop(0.65, `rgba(25, 55, 210, ${alpha * 0.45})`);
  grd.addColorStop(1,    `rgba(8, 12, 120, 0)`);

  // Tear-drop / flame tongue shape via bezier curves
  ctx.beginPath();
  ctx.moveTo(p.x, baseY);
  ctx.bezierCurveTo(
    p.x - w * 0.9, p.y + h * 0.08,   // left control 1
    p.x - w * 0.55, p.y - h * 0.22,  // left control 2
    p.x, tipY                          // tip
  );
  ctx.bezierCurveTo(
    p.x + w * 0.55, p.y - h * 0.22,  // right control 1
    p.x + w * 0.9,  p.y + h * 0.08,  // right control 2
    p.x, baseY                         // back to base
  );
  ctx.closePath();

  ctx.fillStyle = grd;
  ctx.fill();

  ctx.shadowBlur  = 0;
  ctx.shadowColor = "transparent";
}

function loop() {
  const el = canvasEl.value;
  if (!el) return;
  const ctx = el.getContext("2d");
  if (!ctx) return;

  const w = el.width;
  const h = el.height;
  frame++;

  ctx.clearRect(0, 0, w, h);

  if (spawning && particles.length < 18) {
    if (Math.random() < 0.35) particles.push(spawnParticle(w, h));
  }

  particles = particles.filter((p) => p.life > 0);

  for (const p of particles) {
    // Candle sway: smooth sinusoidal drift, barely any horizontal movement
    const sway = Math.sin(frame * p.swayFreq + p.swayPhase) * 0.7;
    p.x  += p.vx + sway;
    p.y  += p.vy;
    p.vy *= 0.998; // very gentle decel — flame rises steadily
    p.vx *= 0.98;
    p.life -= 1;
    drawParticle(ctx, p);
  }

  if (particles.length > 0 || spawning) {
    animId = requestAnimationFrame(loop);
  } else {
    animId = null;
  }
}

function start() {
  spawning = true;
  if (animId === null) loop();
}

function stop() {
  spawning = false;
  // particles burn out naturally — no hard stop
}

function syncSize() {
  const el = canvasEl.value;
  if (!el) return;
  el.width  = el.offsetWidth;
  el.height = el.offsetHeight;
}

watch(() => props.active, (val) => (val ? start() : stop()));

onMounted(() => {
  syncSize();
  ro = new ResizeObserver(syncSize);
  ro.observe(canvasEl.value!);
});

onUnmounted(() => {
  spawning = false;
  if (animId !== null) { cancelAnimationFrame(animId); animId = null; }
  ro?.disconnect();
  particles = [];
});
</script>

<template>
  <canvas ref="canvasEl" class="flame-canvas" />
</template>

<style scoped>
.flame-canvas {
  position: absolute;
  inset: -80px;       /* extends 80px outside the card on all sides */
  pointer-events: none;
  z-index: -1;        /* behind the card's white bg — only the 40px perimeter is visible */
  border-radius: 1.5rem;
}
</style>
