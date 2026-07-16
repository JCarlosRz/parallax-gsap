// Catálogo de productos (precios referenciales tipo G2A, en USD)
const products = [
  { cat:'google', tag:'Google Play', name:'Google Play $10', price:11.49, img:'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg' },
  { cat:'google', tag:'Google Play', name:'Google Play $25', price:27.99, img:'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg' },
  { cat:'google', tag:'Google Play', name:'Google Play $50', price:54.99, img:'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg' },
  { cat:'apple', tag:'iTunes / Apple', name:'iTunes $10', price:11.99, img:'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { cat:'apple', tag:'iTunes / Apple', name:'iTunes $25', price:28.49, img:'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { cat:'apple', tag:'iTunes / Apple', name:'iTunes $50', price:55.99, img:'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { cat:'psn', tag:'PlayStation', name:'PSN $10', price:11.79, img:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { cat:'psn', tag:'PlayStation', name:'PSN $25', price:27.49, img:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { cat:'psn', tag:'PlayStation', name:'PSN Plus 3 meses', price:29.99, img:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { cat:'psn', tag:'PlayStation', name:'PSN Plus 12 meses', price:69.99, img:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { cat:'xbox', tag:'Xbox', name:'Xbox $10', price:11.59, img:'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
  { cat:'xbox', tag:'Xbox', name:'Xbox $25', price:27.29, img:'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
  { cat:'xbox', tag:'Xbox', name:'Game Pass Ultimate 1 mes', price:16.99, img:'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
  { cat:'xbox', tag:'Xbox', name:'Game Pass Ultimate 3 meses', price:44.99, img:'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
  { cat:'steam', tag:'Steam', name:'Steam $10', price:11.29, img:'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
  { cat:'steam', tag:'Steam', name:'Steam $20', price:21.99, img:'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
  { cat:'steam', tag:'Steam', name:'Steam $50', price:53.99, img:'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
  { cat:'otros', tag:'Amazon', name:'Amazon Gift Card $25', price:26.99, img:'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { cat:'otros', tag:'Netflix', name:'Netflix $30', price:32.99, img:'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { cat:'otros', tag:'Spotify', name:'Spotify Premium 3 meses', price:18.99, img:'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
  { cat:'otros', tag:'Free Fire', name:'Free Fire 1.000 Diamantes', price:9.99, img:'https://upload.wikimedia.org/wikipedia/en/9/9a/Garena_Free_Fire_logo.png' },
  { cat:'otros', tag:'Roblox', name:'Roblox 1.700 Robux', price:19.99, img:'https://upload.wikimedia.org/wikipedia/commons/6/6c/Roblox_Logo_2022.svg' },
];

const WA_NUMBER = '50370164013';
const grid = document.getElementById('productsGrid');

function waLink(p){
  const msg = `Hola, quiero comprar: ${p.name} (Precio ref: $${p.price.toFixed(2)}). ¿Está disponible?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function render(list){
  grid.innerHTML = list.map(p => `
    <article class="card" data-cat="${p.cat}">
      <div class="card__top">
        <img class="card__img" src="${p.img}" alt="${p.tag}" loading="lazy">
      </div>
      <div class="card__body">
        <span class="card__cat">${p.tag}</span>
        <h3 class="card__title">${p.name}</h3>
        <div class="card__price">$${p.price.toFixed(2)} <small>USD</small></div>
        <a class="btn btn--wa" href="${waLink(p)}" target="_blank" rel="noopener">Comprar</a>
      </div>
    </article>
  `).join('');
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
    // Fallback: si GSAP no carga, mostrar todo igual (nunca quedar invisible)
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
  const speed = opts.speed || 0.25; // lento

  function resize(){
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  function make(){
    const size = 14 + Math.random()*26;
    return {
      x: Math.random()*w,
      y: Math.random()*h,
      size,
      color: colors[(Math.random()*colors.length)|0],
      vy: -(speed + Math.random()*speed),
      vx: (Math.random()-.5)*speed,
      rot: Math.random()*Math.PI,
      vr: (Math.random()-.5)*0.01,
      alpha: 0.12 + Math.random()*0.22
    };
  }
  function init(){ resize(); blocks = Array.from({length:count}, make); }
  function draw(){
    ctx.clearRect(0,0,w,h);
    blocks.forEach(b => {
      b.x += b.vx; b.y += b.vy; b.rot += b.vr;
      if(b.y + b.size < 0){ b.y = h + b.size; b.x = Math.random()*w; }
      if(b.x < -b.size) b.x = w + b.size;
      if(b.x > w + b.size) b.x = -b.size;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.globalAlpha = b.alpha;
      ctx.fillStyle = b.color;
      ctx.fillRect(-b.size/2, -b.size/2, b.size, b.size);
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  init();
  draw();
}

// Menos bloques en móvil para rendimiento
const isMobile = window.matchMedia('(max-width:768px)').matches;
pixelBg('heroCanvas',   { count: isMobile ? 16 : 30, speed: 0.25 });
pixelBg('bannerCanvas', { count: isMobile ? 12 : 20, speed: 0.3 });
