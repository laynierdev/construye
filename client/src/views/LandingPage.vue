<template>
  <div class="landing">

    <!-- ── NAV ────────────────────────────────────────────── -->
    <nav class="nav" :class="{ scrolled: isScrolled }">
      <div class="nav-inner">
        <div class="nav-brand">
          <span class="nav-icon">🏗️</span>
          <span class="nav-logo">Construye</span>
        </div>
        <div class="nav-actions">
          <div class="client-dropdown">
            <button class="btn-nav btn-outline" @click="clientMenuOpen = !clientMenuOpen">
              Para Clientes ▾
            </button>
            <div class="client-menu" v-show="clientMenuOpen">
              <RouterLink to="/client" class="client-menu-item" @click="clientMenuOpen = false">
                ✨ Calcular materiales
              </RouterLink>
              <RouterLink to="/buscar" class="client-menu-item" @click="clientMenuOpen = false">
                🔍 Buscar piezas
              </RouterLink>
              <button class="client-menu-item client-menu-btn" @click="clientMenuOpen = false; openModal()">
                📨 Solicitar materiales
              </button>
            </div>
          </div>
          <RouterLink to="/vendedor" class="btn-nav btn-solid">Entrar como Vendedor</RouterLink>
          <ThemeToggle />
        </div>
        <!-- Mobile toggle -->
        <button class="nav-hamburger" @click="mobileOpen = !mobileOpen" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
      <!-- Mobile menu -->
      <div class="mobile-menu" :class="{ open: mobileOpen }">
        <div class="mobile-theme"><ThemeToggle /></div>
        <RouterLink to="/client" class="mobile-link" @click="mobileOpen = false">✨ Calcular materiales</RouterLink>
        <RouterLink to="/buscar" class="mobile-link" @click="mobileOpen = false">🔍 Buscar piezas</RouterLink>
        <button class="mobile-link mobile-link-btn" @click="mobileOpen = false; openModal()">📨 Solicitar materiales</button>
        <RouterLink to="/vendedor" class="mobile-link mobile-link--solid" @click="mobileOpen = false">Entrar como Vendedor</RouterLink>
      </div>
    </nav>

    <!-- ── HERO ───────────────────────────────────────────── -->
    <section class="hero">
      <!-- Decorative background blobs -->
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <!-- Grid overlay -->
      <div class="hero-grid"></div>

      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            Asistencia técnica con Inteligencia Artificial
          </div>
          <h1 class="hero-title">
            Tu hogar,
            <span class="hero-accent">renovado</span>
            <br/>sin complicaciones
          </h1>
          <p class="hero-desc">
            Describe tu proyecto de reparación o construcción y nuestra IA genera al instante la lista exacta de materiales, instrucciones paso a paso y consejos de profesionales.
          </p>
          <div class="hero-cta">
            <RouterLink to="/client" class="cta-primary">
              Comenzar ahora
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </RouterLink>
            <RouterLink to="/vendedor" class="cta-secondary">Para vendedores →</RouterLink>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">3</span>
              <span class="stat-label">Especialidades</span>
            </div>
            <div class="stat-div"></div>
            <div class="stat">
              <span class="stat-number">IA</span>
              <span class="stat-label">Gemini 2.0</span>
            </div>
            <div class="stat-div"></div>
            <div class="stat">
              <span class="stat-number">0</span>
              <span class="stat-label">Costo de uso</span>
            </div>
          </div>
        </div>

        <!-- Hero illustration -->
        <div class="hero-visual">
          <div class="hero-card-stack">
            <div class="hcard hcard-back">
              <div class="hcard-label">Albañilería</div>
              <div class="hcard-items">
                <div class="hcard-item"><span>🧱</span> Bloques huecos 15×20×40</div>
                <div class="hcard-item"><span>🪣</span> Cemento Portland 50 kg</div>
                <div class="hcard-item"><span>🏔️</span> Arena de río lavada</div>
              </div>
            </div>
            <div class="hcard hcard-mid">
              <div class="hcard-label">Plomería</div>
              <div class="hcard-items">
                <div class="hcard-item"><span>🔧</span> Tubo PVC 1/2" × 6 m</div>
                <div class="hcard-item"><span>🔩</span> Codo 90° 1/2" × 4 u</div>
                <div class="hcard-item"><span>💧</span> Teflón 19 mm × 10 m</div>
              </div>
            </div>
            <div class="hcard hcard-front">
              <div class="hcard-top">
                <span class="hcard-badge">✨ IA activa</span>
              </div>
              <div class="hcard-label">Electricidad</div>
              <div class="hcard-items">
                <div class="hcard-item"><span>⚡</span> Cable 12 AWG THHN × 15 m</div>
                <div class="hcard-item"><span>🔌</span> Toma duplex 15 A × 3 u</div>
                <div class="hcard-item"><span>🔲</span> Breaker 20 A × 1 u</div>
              </div>
              <div class="hcard-footer">
                <div class="hcard-dot green"></div>
                <span>Listo para comprar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── HOW IT WORKS ───────────────────────────────────── -->
    <section class="section-how">
      <div class="section-inner">
        <div class="section-label">Cómo funciona</div>
        <h2 class="section-title">De la idea al material<br/>en segundos</h2>
        <div class="steps">
          <div class="step">
            <div class="step-num">01</div>
            <div class="step-icon">🎯</div>
            <h3 class="step-title">Elige tu especialidad</h3>
            <p class="step-desc">Plomería, albañilería o electricidad. Selecciona el área de tu proyecto.</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-num">02</div>
            <div class="step-icon">💬</div>
            <h3 class="step-title">Describe el trabajo</h3>
            <p class="step-desc">Cuéntanos qué quieres hacer con tus propias palabras. Sin tecnicismos.</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-num">03</div>
            <div class="step-icon">⚡</div>
            <h3 class="step-title">Obtén tu lista</h3>
            <p class="step-desc">La IA genera materiales exactos, cantidades, instrucciones y consejos.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FEATURES ───────────────────────────────────────── -->
    <section class="section-features">
      <div class="section-inner">
        <div class="section-label">Características</div>
        <h2 class="section-title">Todo lo que necesitas<br/>para construir mejor</h2>
        <div class="features-grid">
          <div class="feat-card feat-card--large">
            <div class="feat-glow"></div>
            <span class="feat-emoji">🤖</span>
            <h3 class="feat-title">Inteligencia Artificial avanzada</h3>
            <p class="feat-desc">Powered por Google Gemini 2.0. Analiza tu proyecto y genera listas de materiales precisas, adaptadas exactamente a tus medidas y condiciones.</p>
          </div>
          <div class="feat-card">
            <span class="feat-emoji">📋</span>
            <h3 class="feat-title">Instrucciones paso a paso</h3>
            <p class="feat-desc">No solo materiales. Recibe un procedimiento claro de cómo ejecutar el trabajo correctamente.</p>
          </div>
          <div class="feat-card">
            <span class="feat-emoji">🔧</span>
            <h3 class="feat-title">3 especialidades cubiertas</h3>
            <p class="feat-desc">Plomería, albañilería y electricidad. Las áreas más comunes de reparaciones del hogar.</p>
          </div>
          <div class="feat-card">
            <span class="feat-emoji">💡</span>
            <h3 class="feat-title">Consejos de expertos</h3>
            <p class="feat-desc">Trucos y advertencias de profesionales incluidos en cada respuesta para que no cometas errores costosos.</p>
          </div>
          <div class="feat-card">
            <span class="feat-emoji">📐</span>
            <h3 class="feat-title">Cantidades exactas</h3>
            <p class="feat-desc">Ingresa las medidas de tu espacio y obten cantidades calculadas al detalle, sin desperdiciar material.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── REVIEWS ────────────────────────────────────────── -->
    <section class="section-reviews">
      <div class="section-inner">
        <div class="section-label">Testimonios</div>
        <h2 class="section-title">Lo que dicen nuestros<br/>usuarios</h2>
        <div class="reviews-grid">
          <div v-for="review in reviews" :key="review.name" class="review-card">
            <div class="review-stars">
              <span v-for="i in 5" :key="i" class="star">★</span>
            </div>
            <p class="review-text">"{{ review.text }}"</p>
            <div class="review-author">
              <div class="review-avatar" :style="{ background: review.color }">
                {{ review.initials }}
              </div>
              <div class="review-info">
                <span class="review-name">{{ review.name }}</span>
                <span class="review-role">{{ review.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA FINAL ──────────────────────────────────────── -->
    <section class="section-cta">
      <div class="cta-blob"></div>
      <div class="section-inner cta-inner">
        <h2 class="cta-title">¿Listo para empezar<br/>tu proyecto?</h2>
        <p class="cta-desc">Únete a cientos de personas que ya reparan su hogar con confianza.</p>
        <div class="cta-buttons">
          <RouterLink to="/client" class="cta-primary cta-primary--large">
            Entrar como Cliente
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </RouterLink>
          <RouterLink to="/vendedor" class="cta-vendor">
            Soy Vendedor / Proveedor →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── FOOTER ─────────────────────────────────────────── -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="nav-icon">🏗️</span>
          <span class="nav-logo">Construye</span>
        </div>
        <p class="footer-copy">© 2025 Laynierpd@gmail.com — Construye</p>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import ThemeToggle from '../components/ThemeToggle.vue';
import { openSolicitudModal } from '../composables/useSolicitudModal';

function openModal() { openSolicitudModal(); }

const isScrolled = ref(false);
const mobileOpen = ref(false);
const clientMenuOpen = ref(false);

function onScroll() {
  isScrolled.value = window.scrollY > 20;
}

function onDocClick(e: MouseEvent) {
  if (!(e.target as Element).closest('.client-dropdown')) {
    clientMenuOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('click', onDocClick);
});
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  document.removeEventListener('click', onDocClick);
});

const reviews = [
  {
    name: 'Carlos Mendez',
    initials: 'CM',
    color: 'linear-gradient(135deg, #667eea, #764ba2)',
    role: 'Propietario, La Habana',
    text: 'Increíble. Describí que quería instalar una llave nueva y me dio exactamente los materiales que necesitaba. Fui a la tienda con la lista y no me faltó nada.',
  },
  {
    name: 'Laura Pérez',
    initials: 'LP',
    color: 'linear-gradient(135deg, #f093fb, #f5576c)',
    role: 'Arquitecta independiente',
    text: 'Lo uso para dar presupuestos rápidos a clientes. La precisión de las cantidades es asombrosa y me ahorra mucho tiempo de cálculo.',
  },
  {
    name: 'Roberto Silva',
    initials: 'RS',
    color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    role: 'Constructor, Santiago de Cuba',
    text: 'Mis clientes me piden la app ahora. Las instrucciones paso a paso son claras incluso para alguien que nunca ha hecho plomería.',
  },
  {
    name: 'Ana González',
    initials: 'AG',
    color: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    role: 'Técnica eléctrica',
    text: 'La lista de materiales eléctricos es muy acertada. Especifica calibres, breakers y hasta el tipo de conector. Muy profesional.',
  },
  {
    name: 'Miguel Torres',
    initials: 'MT',
    color: 'linear-gradient(135deg, #fa709a, #fee140)',
    role: 'Dueño de ferretería',
    text: 'Mis clientes llegan con listas generadas por Construye y son las más completas y exactas que he visto. Saben exactamente qué pedir.',
  },
  {
    name: 'Yenisel Díaz',
    initials: 'YD',
    color: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    role: 'Ama de casa, Holguín',
    text: 'Nunca había podido hacer una reparación sola. Con las instrucciones de Construye instalé yo misma la conexión de mi lavadora. ¡Funciona perfectamente!',
  },
];
</script>

<style scoped>
/* ─── Base ──────────────────────────────────────────────── */
.landing {
  background-color: var(--bg-base);
  color: var(--text);
  font-family: inherit;
  overflow-x: hidden;
}

/* ─── NAV ───────────────────────────────────────────────── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 1.25rem 0;
  transition: background 0.3s, backdrop-filter 0.3s, box-shadow 0.3s;
}

.nav.scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  box-shadow: 0 1px 0 var(--nav-border);
}

.nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand { display: flex; align-items: center; gap: 0.6rem; }
.nav-icon  { font-size: 1.5rem; }

.nav-logo {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--text);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

@media (max-width: 640px) { .nav-actions { display: none; } }

.btn-nav {
  padding: 0.55rem 1.25rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
  background: none;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
}

.btn-outline {
  border: 1.5px solid var(--border-strong);
  color: var(--text-muted);
}
.btn-outline:hover {
  border-color: var(--text);
  color: var(--text);
  background: var(--bg-card-hover);
}

.btn-solid {
  background: var(--accent-btn);
  color: var(--text-on-accent);
  border: 1.5px solid transparent;
}
.btn-solid:hover { background: var(--accent-hover); }

/* Client dropdown */
.client-dropdown { position: relative; }

.client-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
}

.client-menu-item {
  display: block;
  width: 100%;
  padding: 0.65rem 1rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.15s, color 0.15s;
  text-align: left;
}

.client-menu-item:hover {
  background: var(--bg-card-hover);
  color: var(--text);
}

.client-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  border-top: 1px solid var(--border-subtle);
}

/* Hamburger */
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}
@media (max-width: 640px) { .nav-hamburger { display: flex; } }

.nav-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
}

/* Mobile menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 2rem 1.25rem;
  border-top: 1px solid var(--border-subtle);
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
}
.mobile-menu.open { display: flex; }

.mobile-theme {
  display: flex;
  justify-content: center;
  padding-bottom: 0.5rem;
}

.mobile-link {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-muted);
  border: 1px solid var(--border);
  text-align: center;
  transition: background 0.2s, color 0.2s;
}
.mobile-link:hover { background: var(--bg-card-hover); color: var(--text); }

.mobile-link--solid {
  background: var(--accent-btn);
  border-color: transparent;
  color: var(--text-on-accent);
}
.mobile-link--solid:hover { background: var(--accent-hover); }

.mobile-link-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
  text-align: left;
}

/* ─── HERO ──────────────────────────────────────────────── */
.hero {
  position: relative;
  padding: 9rem 2rem 6rem;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.blob-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  top: -200px; left: -150px;
}
.blob-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(52,152,219,0.10) 0%, transparent 70%);
  top: 100px; right: -100px;
}
.blob-3 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(155,89,182,0.08) 0%, transparent 70%);
  bottom: -100px; left: 30%;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}

.hero-inner {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 5rem;
}
@media (max-width: 900px) {
  .hero-inner { flex-direction: column; gap: 3rem; text-align: center; }
  .hero-cta, .hero-stats { justify-content: center; }
}

.hero-text { flex: 1; }

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--badge-bg);
  border: 1px solid var(--badge-border);
  color: var(--badge-text);
  border-radius: 100px;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.85); }
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.05;
  margin-bottom: 1.25rem;
  color: var(--hero-title-start);
}

.hero-accent {
  background: linear-gradient(90deg, #E67E22, #F39C12, #E67E22);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}
@keyframes shimmer {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.hero-desc {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.75;
  max-width: 480px;
  margin-bottom: 2rem;
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  background: var(--accent-btn);
  color: var(--text-on-accent);
  border-radius: 100px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s ease;
}
.cta-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 8px 30px var(--accent-glow);
}

.cta-primary--large {
  padding: 1rem 2.25rem;
  font-size: 1.05rem;
}

.cta-secondary {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: color 0.2s;
}
.cta-secondary:hover { color: var(--text); }

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.stat { text-align: left; }

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--stat-num);
}

.stat-label {
  font-size: 0.78rem;
  color: var(--stat-label);
  font-weight: 500;
}

.stat-div {
  width: 1px;
  height: 32px;
  background: var(--stat-div);
}

/* ─── Hero cards ────────────────────────────────────────── */
.hero-visual {
  flex-shrink: 0;
  width: 320px;
  display: flex;
  justify-content: center;
}
@media (max-width: 900px) { .hero-visual { width: 100%; max-width: 360px; } }

.hero-card-stack {
  position: relative;
  width: 280px;
  height: 300px;
}

.hcard {
  position: absolute;
  width: 260px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.25rem;
  backdrop-filter: blur(12px);
  transition: transform 0.4s ease;
  box-shadow: var(--shadow-md);
}

.hcard-back  { top: 30px; left: 30px; transform: rotate(6deg);  opacity: 0.5; z-index: 1; }
.hcard-mid   { top: 16px; left: 15px; transform: rotate(3deg);  opacity: 0.75; z-index: 2; }
.hcard-front {
  top: 0; left: 0;
  transform: rotate(-1deg);
  z-index: 3;
  border-color: var(--accent-border);
  background: var(--accent-subtle);
  animation: cardFloat 5s ease-in-out infinite;
}
@keyframes cardFloat {
  0%, 100% { transform: rotate(-1deg) translateY(0); }
  50%       { transform: rotate(-1deg) translateY(-8px); }
}

.hcard-top { display: flex; justify-content: flex-end; margin-bottom: 0.5rem; }

.hcard-badge {
  background: var(--accent-subtle);
  color: var(--accent-text);
  border-radius: 100px;
  padding: 0.2rem 0.65rem;
  font-size: 0.7rem;
  font-weight: 700;
  border: 1px solid var(--accent-border);
}

.hcard-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.hcard-items { display: flex; flex-direction: column; gap: 0.5rem; }

.hcard-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--text);
}

.hcard-item span { font-size: 0.9rem; width: 20px; flex-shrink: 0; }

.hcard-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-subtle);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.hcard-dot { width: 7px; height: 7px; border-radius: 50%; }
.hcard-dot.green { background: #2ecc71; }

/* ─── SECTION COMMONS ───────────────────────────────────── */
.section-inner { max-width: 1120px; margin: 0 auto; padding: 0 2rem; }

.section-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.15;
  color: var(--text);
  margin-bottom: 3rem;
}

/* ─── HOW IT WORKS ──────────────────────────────────────── */
.section-how {
  padding: 6rem 2rem;
  border-top: 1px solid var(--border-subtle);
}

.steps { display: flex; align-items: flex-start; gap: 1.5rem; flex-wrap: wrap; }

@media (max-width: 700px) {
  .step-arrow { display: none; }
  .steps { gap: 1.75rem; }
}

.step {
  flex: 1;
  min-width: 200px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
.step:hover {
  border-color: var(--accent-border);
  background: var(--bg-card-hover);
  transform: translateY(-2px);
}

.step-num {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--accent);
  margin-bottom: 1rem;
}

.step-icon { font-size: 2rem; margin-bottom: 0.75rem; line-height: 1; }

.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.4rem;
}

.step-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--text-faint);
  align-self: center;
  padding-top: 1.5rem;
  flex-shrink: 0;
}

/* ─── FEATURES ──────────────────────────────────────────── */
.section-features {
  padding: 6rem 2rem;
  border-top: 1px solid var(--border-subtle);
}

.features-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.25rem;
}
@media (max-width: 860px) {
  .features-grid { grid-template-columns: 1fr 1fr; }
  .feat-card--large { grid-column: 1 / -1; }
}
@media (max-width: 540px) {
  .features-grid { grid-template-columns: 1fr; }
  .feat-card--large { grid-column: auto; }
}

.feat-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.75rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.25s, transform 0.25s;
}
.feat-card:hover {
  border-color: var(--accent-border);
  transform: translateY(-2px);
}

.feat-card--large { grid-row: 1 / 3; padding: 2.25rem; }
@media (max-width: 860px) { .feat-card--large { grid-row: auto; } }

.feat-glow {
  position: absolute;
  width: 200px; height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  top: -50px; right: -50px;
  pointer-events: none;
}

.feat-emoji { font-size: 2rem; display: block; margin-bottom: 1rem; line-height: 1; }
.feat-card--large .feat-emoji { font-size: 2.5rem; }

.feat-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  letter-spacing: -0.3px;
}
.feat-card--large .feat-title { font-size: 1.3rem; margin-bottom: 0.75rem; }

.feat-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.65;
}
.feat-card--large .feat-desc { font-size: 0.95rem; }

/* ─── REVIEWS ───────────────────────────────────────────── */
.section-reviews {
  padding: 6rem 2rem;
  border-top: 1px solid var(--border-subtle);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
@media (max-width: 860px) { .reviews-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 540px)  { .reviews-grid { grid-template-columns: 1fr; } }

.review-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.25s, transform 0.25s;
}
.review-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

.review-stars { display: flex; gap: 2px; margin-bottom: 0.85rem; }
.star { color: #F39C12; font-size: 0.9rem; }

.review-text {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1.25rem;
  font-style: italic;
}

.review-author { display: flex; align-items: center; gap: 0.75rem; }

.review-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
}

.review-info { display: flex; flex-direction: column; gap: 2px; }

.review-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text);
}

.review-role {
  font-size: 0.75rem;
  color: var(--text-faint);
}

/* ─── CTA SECTION ───────────────────────────────────────── */
.section-cta {
  position: relative;
  padding: 7rem 2rem;
  border-top: 1px solid var(--border-subtle);
  text-align: center;
  overflow: hidden;
}

.cta-blob {
  position: absolute;
  width: 700px; height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 65%);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.cta-inner { position: relative; }

.cta-title {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 900;
  letter-spacing: -1.5px;
  line-height: 1.1;
  color: var(--text);
  margin-bottom: 1rem;
}

.cta-desc {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
}

.cta-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.cta-vendor {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: color 0.2s;
  padding: 1rem 0;
}
.cta-vendor:hover { color: var(--text); }

/* ─── FOOTER ────────────────────────────────────────────── */
.footer {
  border-top: 1px solid var(--border-subtle);
  padding: 2rem;
  background: var(--bg-elevated);
}

.footer-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-brand { display: flex; align-items: center; gap: 0.5rem; }

.footer-copy {
  font-size: 0.8rem;
  color: var(--text-faint);
}
</style>
