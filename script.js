gsap.registerPlugin(ScrollTrigger);

// Expansión suave de cada imagen al hacer scroll
document.querySelectorAll(".panel").forEach((panel) => {
  const wrapper = panel.querySelector(".image-wrapper");
  const img = panel.querySelector("img");
  const title = panel.querySelector("h2");

  // El contenedor se expande de 60% a 100% del ancho
  gsap.fromTo(wrapper,
    { width: "60%", borderRadius: "16px" },
    {
      width: "100%",
      borderRadius: "0px",
      ease: "none",
      scrollTrigger: {
        trigger: panel,
        start: "top bottom",   // cuando el panel entra por abajo
        end: "center center",  // hasta que llega al centro
        scrub: 1,              // suavizado ligado al scroll
      },
    }
  );

  // Parallax interno: la imagen se mueve más lento que el scroll
  gsap.fromTo(img,
    { yPercent: -10, scale: 1.15 },
    {
      yPercent: 10,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: panel,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );

  // El título aparece con fade
  gsap.from(title, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
});
