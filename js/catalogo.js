(function () {
  if (!window.PRODUCTS) return;

  const container = document.getElementById("catalogProducts");
  const searchInput = document.getElementById("searchInput");
  const categoryFilters = document.getElementById("categoryFilters");

  if (!container || !searchInput || !categoryFilters) return;

  const categories = ["Todas"].concat(window.PRODUCTS.map(function (group) { return group.category; }));
  let selectedCategory = "Todas";

  function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }

  function paymentText() {
    return window.STORE_CONFIG.paymentMethods.join(" y ");
  }

  function createCard(group, item) {
    const link = window.createWhatsAppLink(group.category, item.amount);
    return `
      <article class="card">
        <div class="icon"><i class="${group.icon}"></i></div>
        <h3>${group.category} ${item.amount}</h3>
        <p>Precio: <span class="price">${formatPrice(item.price)}</span></p>
        <p>Pago: ${paymentText()}</p>
        <a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="${link}">Comprar por WhatsApp</a>
      </article>
    `;
  }

  function matchesQuery(group, item, query) {
    const text = `${group.category} ${item.amount}`.toLowerCase();
    return text.includes(query);
  }

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = window.PRODUCTS.filter(function (group) {
      return selectedCategory === "Todas" || group.category === selectedCategory;
    }).flatMap(function (group) {
      return group.items.filter(function (item) {
        return !query || matchesQuery(group, item, query);
      }).map(function (item) {
        return createCard(group, item);
      });
    });

    container.innerHTML = cards.length
      ? cards.join("")
      : '<p class="empty">No encontramos productos con ese filtro. Intenta con otra búsqueda.</p>';
  }

  function renderFilters() {
    categoryFilters.innerHTML = categories.map(function (category) {
      return `<button class="chip ${category === selectedCategory ? "active" : ""}" data-category="${category}">${category}</button>`;
    }).join("");

    categoryFilters.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        selectedCategory = chip.dataset.category;
        renderFilters();
        render();
      });
    });
  }

  searchInput.addEventListener("input", render);
  renderFilters();
  render();
})();
