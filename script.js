// ===== Catálogo de productos (con selector de monto $5–$100) =====
const AMOUNTS = [5, 10, 15, 25, 50, 75, 100];
const FEE = 1.10; // margen tipo G2A (10%)

const products = [
  { cat:'google', tag:'Google Play', name:'Google Play',  img:'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg' },
  { cat:'apple',  tag:'iTunes / Apple', name:'iTunes / Apple', img:'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { cat:'psn',    tag:'PlayStation', name:'PlayStation Network', img:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { cat:'xbox',   tag:'Xbox', name:'Xbox', img:'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
  { cat:'steam',  tag:'Steam', name:'Steam', img:'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
  { cat:'otros',  tag:'Amazon', name:'Amazon Gift Card', img:'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { cat:'otros',  tag:'Netflix', name:'Netflix', img:'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { cat:'otros',  tag:'Spotify', name:'Spotify Premium', img:'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
  { cat:'otros',  tag:'Free Fire', name:'Free Fire Diamantes', img:'https://upload.wikimedia.org/wikipedia/en/9/9a/Garena_Free_Fire_logo.png' },
  { cat:'otros',  tag:'Roblox', name:'Roblox Robux', img:'https://upload.wikimedia.org/wikipedia/commons/6/6c/Roblox_Logo_2022.svg' },
];

const WA_NUMBER = '50370164013';
const grid = document.getElementById('productsGrid');

function priceFor(amount){ return (amount * FEE).toFixed(2); }

function waLink(name, amount){
  const total = priceFor(amount);
  const msg = `Hola, quiero comprar: ${name} $${amount} (Total: $${total}). ¿Está disponible?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function render(list){
  grid.innerHTML = list.map((p, i) => `
    <article class="card" data-cat="${p.cat}">
      <div class="card__top">
        <img class="card__img" src="${p.img}" alt="${p.tag}" loading="lazy">
      </div>
      <div class="card__body">
        <span class="card__cat">${p.tag}</span>
        <h3 class="card__title">${p.name}</h3>
        <label class="card__label">Elige el monto:</label>
        <select class="card__select" data-idx="${i}">
          ${AMOUNTS.map(a => `<option value="${a}">$${a} USD</option>`).join('')}
        </select>
        <div class="card__price" id="price-${i}">$${priceFor(AMOUNTS[0])} <small>USD</small></div>
        <a class="btn btn--wa" id="buy-${i}" href="${waLink(p.name, AMOUNTS[0])}" target="_blank" rel="noopener">Comprar</a>
      </div>
    </article>
  `).join('');

  // Actualizar precio y link al cambiar el monto
  grid.querySelectorAll('.card__select').forEach(sel => {
    sel.addEventListener('change', () => {
      const idx = sel.dataset.idx;
      const amount = +sel.value;
      const p = list[idx];
      document.getElementById('price-' + idx).innerHTML = `$${priceFor(amount)} <small>USD</small>`;
      document.getElementById('buy-' + idx).href = waLink(p.name, amount);
    });
  });
}

render(products);

// Filtros
document.getElementById('filters').addEventListener('click', e => {
  const btn = e.target.closest('.chip');
  if(!btn) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  render(f === 'all' ? products : products.filter(p => p.cat === f));
});

// Menú móvil
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Contador de códigos vendidos: base 5000 + 331 + ventas registradas en el panel
(function(){
  const el = document.getElementById('soldCount');
  if(!el) return;
  const base = 5331;
  const extra = parseInt(localStorage.getItem('dc_sold') || '0', 10);
  el.textContent = '+' + (base + extra).toLocaleString('es-ES');
})();

/* ============ Reveal de secciones (GSAP si está disponible) ============ */
function initReveals(){
  const els = document.querySelectorAll('[data-reveal]');
  if (window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    els.forEach(el => {
      gsap.fromTo(el, { opacity:0, y:50 },
        { opacity:1, y:0, duration:.9, ease:'power3.out',
          scrollTrigger:{ trigger:el, start:'top 88%', toggleActions:'play none none none' } });
    });
  } else {
    els.forEach(el => { el.style.opacity = 1; });
  }
}
initReveals();

/* ============ Animación de bloques estilo gaming (Canvas) ============ */
function pixelBg(canvasId, opts){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const colors = ['#6c5ce7','#a29bfe','#25d366','#00b894','#0984e3','#e17055','#fdcb6e'];
  let w, h, blocks = [];
  const count = opts.count || 26;
  const speed = opts.speed || 0.25;

  function resize(){ w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }
  function make(){
    const size = 14 + Math.random()*26;
    return { x:Math.random()*w, y:Math.random()*h, size,
      color:colors[(Math.random()*colors.length)|0],
      vy:-(speed + Math.random()*speed), vx:(Math.random()-.5)*speed,
      rot:Math.random()*Math.PI, vr:(Math.random()-.5)*0.01,
      alpha:0.12 + Math.random()*0.22 };
  }
  function init(){ resize(); blocks = Array.from({length:count}, make); }
  function draw(){
    ctx.clearRect(0,0,w,h);
    blocks.forEach(b => {
      b.x += b.vx; b.y += b.vy; b.rot += b.vr;
      if(b.y + b.size < 0){ b.y = h + b.size; b.x = Math.random()*w; }
      if(b.x < -b.size) b.x = w + b.size;
      if(b.x > w + b.size) b.x = -b.size;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.rot);
      ctx.globalAlpha = b.alpha; ctx.fillStyle = b.color;
      ctx.fillRect(-b.size/2, -b.size/2, b.size, b.size); ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize); init(); draw();
}

const isMobile = window.matchMedia('(max-width:768px)').matches;
pixelBg('heroCanvas',   { count: isMobile ? 16 : 30, speed: 0.25 });
pixelBg('bannerCanvas', { count: isMobile ? 12 : 20, speed: 0.3 });
