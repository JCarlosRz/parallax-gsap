(function () {
  const STORE_CONFIG = {
    whatsappNumber: "50370164013",
    paymentMethods: ["Efectivo", "Transferencia bancaria"],
  };

  const PRODUCTS = [
    { category: "Google Play", icon: "fa-brands fa-google-play", items: [{ amount: "$5", price: 5.69 }, { amount: "$10", price: 10.99 }, { amount: "$25", price: 26.99 }, { amount: "$50", price: 53.99 }, { amount: "$100", price: 106.99 }] },
    { category: "iTunes / Apple", icon: "fa-brands fa-apple", items: [{ amount: "$10", price: 11.19 }, { amount: "$25", price: 27.19 }, { amount: "$50", price: 54.49 }, { amount: "$100", price: 108.99 }] },
    { category: "PlayStation (PSN)", icon: "fa-brands fa-playstation", items: [{ amount: "$10", price: 11.25 }, { amount: "$20", price: 22.35 }, { amount: "$50", price: 55.35 }, { amount: "$100", price: 110.99 }] },
    { category: "Xbox", icon: "fa-brands fa-xbox", items: [{ amount: "$10", price: 11.29 }, { amount: "$25", price: 27.39 }, { amount: "$50", price: 55.99 }, { amount: "$100", price: 111.49 }] },
    { category: "Steam", icon: "fa-brands fa-steam", items: [{ amount: "$5", price: 5.79 }, { amount: "$10", price: 11.09 }, { amount: "$20", price: 22.29 }, { amount: "$50", price: 55.49 }, { amount: "$100", price: 109.99 }] },
    { category: "Nintendo eShop", icon: "fa-solid fa-gamepad", items: [{ amount: "$10", price: 11.25 }, { amount: "$20", price: 22.45 }, { amount: "$35", price: 38.49 }, { amount: "$50", price: 55.49 }] },
    { category: "Amazon", icon: "fa-brands fa-amazon", items: [{ amount: "$10", price: 11.39 }, { amount: "$25", price: 27.45 }, { amount: "$50", price: 55.79 }, { amount: "$100", price: 111.99 }] },
    { category: "Netflix", icon: "fa-solid fa-film", items: [{ amount: "$15", price: 16.79 }, { amount: "$25", price: 27.65 }, { amount: "$30", price: 33.25 }, { amount: "$50", price: 55.99 }] },
    { category: "Spotify", icon: "fa-brands fa-spotify", items: [{ amount: "$10", price: 11.35 }, { amount: "$30", price: 33.39 }, { amount: "$60", price: 66.49 }] },
    { category: "Free Fire / Juegos móviles", icon: "fa-solid fa-mobile-screen-button", items: [{ amount: "$5", price: 5.95 }, { amount: "$10", price: 11.45 }, { amount: "$20", price: 22.85 }, { amount: "$50", price: 56.99 }] },
  ];

  function createWhatsAppLink(productName, amount) {
    const message = `Hola, quiero comprar ${productName} de ${amount}`;
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  window.STORE_CONFIG = STORE_CONFIG;
  window.PRODUCTS = PRODUCTS;
  window.createWhatsAppLink = createWhatsAppLink;
})();
