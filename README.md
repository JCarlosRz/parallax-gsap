# CodeMarket SV - Tienda de gift cards

Sitio estático en **HTML/CSS/JS puro** para venta de códigos digitales, listo para GitHub Pages:

- Home: `/parallax-gsap/index.html`
- Catálogo: `/parallax-gsap/catalogo.html`
- Contacto: `/parallax-gsap/contacto.html`

## Estructura

- `/home/runner/work/parallax-gsap/parallax-gsap/index.html`
- `/home/runner/work/parallax-gsap/parallax-gsap/catalogo.html`
- `/home/runner/work/parallax-gsap/parallax-gsap/contacto.html`
- `/home/runner/work/parallax-gsap/parallax-gsap/css/styles.css`
- `/home/runner/work/parallax-gsap/parallax-gsap/js/products.js`
- `/home/runner/work/parallax-gsap/parallax-gsap/js/main.js`
- `/home/runner/work/parallax-gsap/parallax-gsap/js/catalogo.js`

## Editar productos y precios

Edita el archivo:

- `/home/runner/work/parallax-gsap/parallax-gsap/js/products.js`

Ahí encontrarás:

- `STORE_CONFIG.whatsappNumber` (número de WhatsApp)
- `STORE_CONFIG.paymentMethods` (métodos de pago)
- `PRODUCTS` (categorías, denominaciones y precios)

Ejemplo de item:

```js
{ amount: "$10", price: 10.99 }
```

> El botón **Comprar por WhatsApp** se genera automáticamente con el texto del producto y monto.

## Publicar en GitHub Pages

1. Ir a **Settings > Pages** en el repositorio.
2. En **Build and deployment**, seleccionar **Deploy from a branch**.
3. Elegir rama `main` y carpeta `/ (root)`.
4. Guardar.

URL final:

- `https://jcarlosrz.github.io/parallax-gsap/`

## Tecnologías

- HTML5
- CSS3
- JavaScript (Vanilla)
- GSAP 3.12.5 + ScrollTrigger
