// @ts-nocheck
// ============================================================================
// Background Varieties Inline Script for Quartz
// ============================================================================

// Classical 2D Perlin Noise implementation for flow field
class PerlinNoise {
  p: number[] = [];
  constructor() {
    const permutation = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }
    this.p = [...permutation, ...permutation];
  }
  fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(t: number, a: number, b: number) { return a + t * (b - a); }
  grad(hash: number, x: number, y: number) {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -2.0 * v : 2.0 * v);
  }
  noise2D(x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = this.fade(x);
    const v = this.fade(y);
    const A = this.p[X] + Y;
    const B = this.p[X + 1] + Y;
    return this.lerp(v,
      this.lerp(u, this.grad(this.p[A], x, y), this.grad(this.p[B], x - 1, y)),
      this.lerp(u, this.grad(this.p[A + 1], x, y - 1), this.grad(this.p[B + 1], x - 1, y - 1))
    );
  }
}

// Global cleanup references
let currentAnimationId: number | null = null;
let currentObserver: MutationObserver | null = null;
let resizeHandler: (() => void) | null = null;
let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
let mouseLeaveHandler: (() => void) | null = null;

// Helper: Parse string-based RGB or HEX into component numbers
function parseColor(color: string): { r: number, g: number, b: number } {
  const fallback = { r: 128, g: 128, b: 128 };
  if (!color) return fallback;
  
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16)
      };
    } else if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
      };
    }
  } else if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (match && match.length >= 3) {
      return {
        r: parseInt(match[0]),
        g: parseInt(match[1]),
        b: parseInt(match[2])
      };
    }
  }
  return fallback;
}

// Convert a hex/rgb string to rgba with given alpha
function toRGBA(color: string, alpha: number): string {
  const { r, g, b } = parseColor(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Palette presets
const PALETTES = {
  cosmic: ["#8a2be2", "#ff1493", "#ee82ee", "#4b0082", "#00bfff"],
  aurora: ["#00ff7f", "#008080", "#98fb98", "#191970", "#32cd32"],
  nebula: ["#ff69b4", "#00ffff", "#9370db", "#090979", "#4a0e4e"],
  sunset: ["#ffa500", "#ffbf00", "#ff7f50", "#483d8b", "#ffc0cb"],
  minimalist: [] // dynamically computed
};

function init() {
  // Clean up any existing instances first
  cleanup();

  const container = document.querySelector(".bg-varieties-container");
  if (!container) return;

  const canvas = container.querySelector(".bg-varieties-canvas") as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Retrieve configuration options
  let opts: any = {};
  try {
    opts = JSON.parse(container.getAttribute("data-options") || "{}");
  } catch (e) {
    console.error("[BgVarieties] Failed to parse options:", e);
  }

  // Set default values
  const type = opts.type || "vector";
  const opacity = opts.opacity !== undefined ? opts.opacity : 0.4;
  const speed = opts.speedMultiplier !== undefined ? opts.speedMultiplier : 1.0;
  const density = opts.density !== undefined ? opts.density : 50;
  const interactive = opts.interactive !== undefined ? opts.interactive : true;
  const themeOpt = opts.theme || "auto";
  const paletteName = opts.palette || "cosmic";

  canvas.style.opacity = opacity.toString();

  // Screen/Resize setup
  let width = 0;
  let height = 0;
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();

  resizeHandler = () => {
    resize();
    initScene();
  };
  window.addEventListener("resize", resizeHandler);

  // Mouse Tracking
  const mouse = { x: -9999, y: -9999, active: false };
  if (interactive) {
    mouseMoveHandler = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    mouseLeaveHandler = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    };
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseleave", mouseLeaveHandler);
  }

  // Dynamic Theme Management
  let isDarkMode = false;
  let bgThemeColor = "#faf8f8";
  let primaryThemeColor = "#000000";
  let resolvedPalette: string[] = [];

  function checkTheme() {
    isDarkMode = document.documentElement.classList.contains("dark") || 
                 document.documentElement.getAttribute("data-theme") === "dark" ||
                 (themeOpt === "dark");
    if (themeOpt === "light") isDarkMode = false;

    const bodyStyle = window.getComputedStyle(document.body);
    bgThemeColor = bodyStyle.backgroundColor || (isDarkMode ? "#161618" : "#faf8f8");
    if (bgThemeColor === "rgba(0, 0, 0, 0)" || bgThemeColor === "transparent") {
      bgThemeColor = isDarkMode ? "#161618" : "#faf8f8";
    }

    primaryThemeColor = bodyStyle.color || (isDarkMode ? "#ffffff" : "#000000");
    if (primaryThemeColor === "rgba(0, 0, 0, 0)" || primaryThemeColor === "transparent") {
      primaryThemeColor = isDarkMode ? "#ffffff" : "#000000";
    }

    // Resolve color palette
    if (Array.isArray(paletteName)) {
      resolvedPalette = paletteName;
    } else {
      const preset = PALETTES[paletteName as keyof typeof PALETTES] || PALETTES.cosmic;
      if (paletteName === "minimalist") {
        const borderStyle = window.getComputedStyle(document.documentElement);
        const grayColor = borderStyle.getPropertyValue("--lightgray").trim() || 
                          (isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)");
        resolvedPalette = [primaryThemeColor, grayColor, toRGBA(primaryThemeColor, 0.5)];
      } else {
        resolvedPalette = preset;
      }
    }
  }
  checkTheme();

  currentObserver = new MutationObserver(() => {
    checkTheme();
  });
  currentObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

  function getRandomColor() {
    if (resolvedPalette.length === 0) return primaryThemeColor;
    return resolvedPalette[Math.floor(Math.random() * resolvedPalette.length)];
  }

  // --- SCENE INITIALIZATION ---
  const particles: any[] = [];
  const perlin = new PerlinNoise();
  let fractalTime = 0;

  function initScene() {
    particles.length = 0;

    if (type === "vector") {
      const count = Math.floor(80 * (density / 50));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8 * speed,
          vy: (Math.random() - 0.5) * 0.8 * speed,
          r: Math.random() * 2 + 1,
          color: getRandomColor()
        });
      }
    } else if (type === "perlin-noise") {
      const count = Math.floor(100 * (density / 50));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          color: getRandomColor(),
          alpha: Math.random() * 0.5 + 0.3,
          life: Math.random() * 200 + 100,
          maxLife: 300
        });
      }
    } else if (type === "dots") {
      const count = Math.floor(50 * (density / 50));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3 * speed,
          vy: -(Math.random() * 0.4 + 0.1) * speed,
          r: Math.random() * 25 + 5,
          color: getRandomColor(),
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.005 + Math.random() * 0.01
        });
      }
    }
  }
  initScene();

  // --- ANIMATION LOOP ---
  let lastTime = 0;

  function loop(time: number) {
    lastTime = time;

    if (type === "perlin-noise") {
      ctx.fillStyle = toRGBA(bgThemeColor, 0.06);
      ctx.fillRect(0, 0, width, height);

      const noiseScale = 0.003;
      const forceFactor = 0.08 * speed;
      const maxSpeed = 1.5 * speed;

      for (const p of particles) {
        const noiseVal = perlin.noise2D(p.x * noiseScale, p.y * noiseScale);
        const angle = noiseVal * Math.PI * 4;

        p.vx += Math.cos(angle) * forceFactor;
        p.vy += Math.sin(angle) * forceFactor;

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > maxSpeed) {
          p.vx = (p.vx / spd) * maxSpeed;
          p.vy = (p.vy / spd) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        ctx.beginPath();
        ctx.moveTo(p.x - p.vx * 2, p.y - p.vy * 2);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = toRGBA(p.color, p.alpha * (p.life / p.maxLife));
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height || p.life <= 0) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.vx = 0;
          p.vy = 0;
          p.life = Math.random() * p.maxLife * 0.5 + p.maxLife * 0.5;
          p.color = getRandomColor();
        }
      }
    } else if (type === "vector") {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.x += (dx / dist) * force * 2 * speed;
            p.y += (dy / dist) * force * 2 * speed;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = toRGBA(p.color, 0.6);
        ctx.fill();
      }

      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = toRGBA(p1.color, alpha);
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = toRGBA(p1.color, alpha);
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }
    } else if (type === "dots") {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        const pSize = p.r + Math.sin(time * p.pulseSpeed + p.pulsePhase) * 4;

        p.x += p.vx;
        p.y += p.vy;

        if (p.y + pSize < 0) {
          p.y = height + pSize;
          p.x = Math.random() * width;
        }

        if (p.x + pSize < 0) p.x = width + pSize;
        if (p.x - pSize > width) p.x = -pSize;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            p.x += (dx / dist) * force * 1.5 * speed;
            p.y += (dy / dist) * force * 1.5 * speed;
          }
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pSize);
        grad.addColorStop(0, toRGBA(p.color, 0.3));
        grad.addColorStop(0.5, toRGBA(p.color, 0.1));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, pSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    } else if (type === "fractals") {
      ctx.clearRect(0, 0, width, height);
      fractalTime += 0.005 * speed;

      const rotation = fractalTime * 0.2;
      const cx = width / 2;
      const cy = height / 2;
      
      const baseLength = Math.min(width, height) * 0.12 * (density / 50 + 0.5);
      const branches = density > 65 ? 8 : (density > 35 ? 6 : 5);
      const maxDepth = density > 75 ? 7 : (density > 35 ? 6 : 5);
      
      for (let i = 0; i < branches; i++) {
        const startAngle = rotation + (i * Math.PI * 2 / branches);
        drawMandala(cx, cy, baseLength, startAngle, maxDepth, fractalTime);
      }
    }

    currentAnimationId = requestAnimationFrame(loop);
  }

  function drawMandala(x: number, y: number, length: number, angle: number, depth: number, time: number) {
    if (depth === 0) return;

    const x2 = x + Math.cos(angle) * length;
    const y2 = y + Math.sin(angle) * length;

    ctx.lineWidth = depth * 0.5;
    ctx.lineCap = "round";

    let color = resolvedPalette[0] || primaryThemeColor;
    if (resolvedPalette.length > 1) {
      const paletteIndex = Math.min(
        resolvedPalette.length - 1,
        Math.floor((1 - depth / 7) * resolvedPalette.length)
      );
      color = resolvedPalette[paletteIndex];
    }
    
    ctx.strokeStyle = toRGBA(color, 0.08 + (depth * 0.03));

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const nextLength = length * 0.68;
    const sway = Math.sin(time * 2 + depth) * 0.05;
    
    let mouseAngleOffset = 0;
    if (mouse.active) {
      const dx = mouse.x - x2;
      const dy = mouse.y - y2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 250) {
        const angleToMouse = Math.atan2(dy, dx);
        mouseAngleOffset = (angleToMouse - angle) * 0.06 * (1 - dist / 250);
      }
    }

    const angleSpread = 0.45 + Math.sin(time * 0.5) * 0.05;

    drawMandala(x2, y2, nextLength, angle - angleSpread + sway + mouseAngleOffset, depth - 1, time);
    drawMandala(x2, y2, nextLength, angle + angleSpread + sway + mouseAngleOffset, depth - 1, time);

    if (depth === 1) {
      ctx.beginPath();
      ctx.arc(x2, y2, 2, 0, Math.PI * 2);
      ctx.fillStyle = toRGBA(resolvedPalette[0] || primaryThemeColor, 0.3);
      ctx.fill();
    }
  }

  currentAnimationId = requestAnimationFrame(loop);
}

function cleanup() {
  if (currentAnimationId) {
    cancelAnimationFrame(currentAnimationId);
    currentAnimationId = null;
  }
  if (currentObserver) {
    currentObserver.disconnect();
    currentObserver = null;
  }
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
  }
  if (mouseMoveHandler) {
    window.removeEventListener("mousemove", mouseMoveHandler);
    mouseMoveHandler = null;
  }
  if (mouseLeaveHandler) {
    window.removeEventListener("mouseleave", mouseLeaveHandler);
    mouseLeaveHandler = null;
  }
}

// Register with Quartz navigation events
document.addEventListener("nav", () => {
  init();
});

document.addEventListener("render", () => {
  init();
});

// Register cleanup with Quartz's cleanup system
if (typeof window !== "undefined" && window.addCleanup) {
  window.addCleanup(() => {
    cleanup();
  });
}
