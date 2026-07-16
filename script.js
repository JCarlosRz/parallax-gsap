// Catálogo de productos (precios referenciales tipo G2A, en USD)
const products = [
  // Google Play
  { cat:'google', tag:'Google Play', name:'Google Play $10', price:11.49, icon:'▶️' },
  { cat:'google', tag:'Google Play', name:'Google Play $25', price:27.99, icon:'▶️' },
  { cat:'google', tag:'Google Play', name:'Google Play $50', price:54.99, icon:'▶️' },
  // Apple / iTunes
  { cat:'apple', tag:'iTunes / Apple', name:'iTunes $10', price:11.99, icon:'🍎' },
  { cat:'apple', tag:'iTunes / Apple', name:'iTunes $25', price:28.49, icon:'🍎' },
  { cat:'apple', tag:'iTunes / Apple', name:'iTunes $50', price:55.99, icon:'🍎' },
  // PSN
  { cat:'psn', tag:'PlayStation', name:'PSN $10', price:11.79, icon:'🎮' },
  { cat:'psn', tag:'PlayStation', name:'PSN $25', price:27.49, icon:'🎮' },
  { cat:'psn', tag:'PlayStation', name:'PSN Plus 3 meses', price:29.99, icon:'🎮' },
  { cat:'psn', tag:'PlayStation', name:'PSN Plus 12 meses', price:69.99, icon:'🎮' },
  // Xbox
  { cat:'xbox', tag:'Xbox', name:'Xbox $10', price:11.59, icon:'🟢' },
  { cat:'xbox', tag:'Xbox', name:'Xbox $25', price:27.29, icon:'🟢' },
  { cat:'xbox', tag:'Xbox', name:'Game Pass Ultimate 1 mes', price:16.99, icon:'🟢' },
  { cat:'xbox', tag:'Xbox', name:'Game Pass Ultimate 3 meses', price:44.99, icon:'🟢' },
  // Steam
  { cat:'steam', tag:'Steam', name:'Steam $10', price:11.29, icon:'💨' },
  { cat:'steam', tag:'Steam', name:'Steam $20', price:21.99, icon:'💨' },
  { cat:'steam', tag:'Steam', name:'Steam $50', price:53.99, icon:'💨' },
  // Otros
  { cat:'otros', tag:'Amazon', name:'Amazon Gift Card $25', price:26.99, icon:'📦' },
  { cat:'otros', tag:'Netflix', name:'Netflix $30', price:32.99, icon:'🎬' },
  { cat:'otros', tag:'Spotify', name:'Spotify Premium 3 meses', price:18.99, icon:'🎵' },
  { cat:'otros', tag:'Free Fire', name:'Free Fire 1.000 Diamantes', price:9.99, icon:'🔥' },
  { cat:'otros', tag:'Roblox', name:'Roblox 1.700 Robux', price:19.99, icon:'🟥' },
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
      <div class="card__top">${p.icon}</div>
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
