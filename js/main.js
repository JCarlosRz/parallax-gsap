(function () {
  function toggleMobileMenu() {
    const button = document.getElementById("menuBtn");
    const nav = document.getElementById("mainNav");
    if (!button || !nav) return;

    button.addEventListener("click", function () {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }

  function paymentText() {
    if (!window.STORE_CONFIG) return "Efectivo y transferencia bancaria";
    return window.STORE_CONFIG.paymentMethods.join(" y ");
  }

  function createProductCard(category, icon, item) {
    const link = window.createWhatsAppLink(category, item.amount);
    return `
      <article class="card">
        <div class="icon"><i class="${icon}"></i></div>
        <h3>${category} ${item.amount}</h3>
        <p>Precio: <span class="price">${formatPrice(item.price)}</span></p>
        <p>Pago: ${paymentText()}</p>
        <a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="${link}">Comprar por WhatsApp</a>
      </article>
    `;
  }

  function renderHomeProducts() {
    if (!window.PRODUCTS) return;

    const categoryContainer = document.getElementById("featuredCategories");
    if (categoryContainer) {
      categoryContainer.innerHTML = window.PRODUCTS.slice(0, 8).map(function (group) {
        return `
          <article class="card">
            <div class="icon"><i class="${group.icon}"></i></div>
            <h3>${group.category}</h3>
            <p>Desde ${formatPrice(group.items[0].price)}</p>
          </article>
        `;
      }).join("");
    }

    const popularContainer = document.getElementById("popularProducts");
    if (popularContainer) {
      const cards = window.PRODUCTS.slice(0, 6).flatMap(function (group) {
        return group.items.slice(0, 1).map(function (item) {
          return createProductCard(group.category, group.icon, item);
        });
      });
      popularContainer.innerHTML = cards.join("");
    }
  }

  function attachCustomWhatsAppButtons() {
    if (typeof window.createWhatsAppLink !== "function") return;

    document.querySelectorAll(".whatsapp-link").forEach(function (button) {
      const product = button.getAttribute("data-product") || "gift card";
      const amount = button.getAttribute("data-amount") || "sin monto";
      button.href = window.createWhatsAppLink(product, amount);
      button.target = "_blank";
      button.rel = "noopener noreferrer";
    });
  }

  function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".parallax-panel").forEach(function (panel) {
      const media = panel.querySelector(".parallax-media");

      if (media) {
        gsap.fromTo(media,
          { scale: 1.18, yPercent: -10 },
          {
            scale: 1,
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      gsap.fromTo(panel,
        { borderRadius: "24px" },
        {
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    });

    gsap.utils.toArray(".section h2, .section h1, .card, .steps-grid article, .contact-card").forEach(function (element) {
      gsap.from(element, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }

  toggleMobileMenu();
  renderHomeProducts();
  attachCustomWhatsAppButtons();
  initAnimations();
})();
