// Catálogo de productos (precios referenciales tipo G2A, en USD)
const products = [
  // Google Play
  { cat:'google', tag:'Google Play', name:'Google Play $10', price:11.49, img:'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg' },
  { cat:'google', tag:'Google Play', name:'Google Play $25', price:27.99, img:'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg' },
  { cat:'google', tag:'Google Play', name:'Google Play $50', price:54.99, img:'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg' },
  // Apple / iTunes
  { cat:'apple', tag:'iTunes / Apple', name:'iTunes $10', price:11.99, img:'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { cat:'apple', tag:'iTunes / Apple', name:'iTunes $25', price:28.49, img:'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { cat:'apple', tag:'iTunes / Apple', name:'iTunes $50', price:55.99, img:'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  // PSN
  { cat:'psn', tag:'PlayStation', name:'PSN $10', price:11.79, img:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { cat:'psn', tag:'PlayStation', name:'PSN $25', price:27.49, img:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { cat:'psn', tag:'PlayStation', name:'PSN Plus 3 meses', price:29.99, img:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { cat:'psn', tag:'PlayStation', name:'PSN Plus 12 meses', price:69.99, img:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  // Xbox
  { cat:'xbox', tag:'Xbox', name:'Xbox $10', price:11.59, img:'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
  { cat:'xbox', tag:'Xbox', name:'Xbox $25', price:27.29, img:'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
  { cat:'xbox', tag:'Xbox', name:'Game Pass Ultimate 1 mes', price:16.99, img:'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
  { cat:'xbox', tag:'Xbox', name:'Game Pass Ultimate 3 meses', price:44.99, img:'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
  // Steam
  { cat:'steam', tag:'Steam', name:'Steam $10', price:11.29, img:'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
  { cat:'steam', tag:'Steam', name:'Steam $20', price:21.99, img:'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
  { cat:'steam', tag:'Steam', name:'Steam $50', price:53.99, img:'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
  // Otros
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
