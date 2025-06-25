document.addEventListener("DOMContentLoaded", () => {
  const menuBar = document.querySelector(".menu-bar");
  const triggerArea = document.querySelector(".menu-trigger-area");

  let isHoveringMenu = false;

  menuBar.addEventListener("mouseenter", () => {
    isHoveringMenu = true;
    menuBar.classList.add("visible");
  });

  menuBar.addEventListener("mouseleave", () => {
    isHoveringMenu = false;
  });

  document.addEventListener("mousemove", (e) => {
    const isNearTop = e.clientY <= 20;

    if (isNearTop || isHoveringMenu) {
      menuBar.classList.add("visible");
    } else {
      menuBar.classList.remove("visible");
    }
  });
});
