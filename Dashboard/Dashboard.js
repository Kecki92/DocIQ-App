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

  const tabsContainer = document.querySelector(".tabs");
  const addButton = document.querySelector(".add-tab");
  const content = document.querySelector(".tab-content");

  function setActiveTab(tab) {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    content.textContent = tab.dataset.title;
  }

  function createTab(title) {
    const tab = document.createElement("div");
    tab.classList.add("tab");
    tab.dataset.title = title;
    tab.textContent = title;
    const close = document.createElement("span");
    close.classList.add("close-btn");
    close.textContent = "\u00d7";
    tab.appendChild(close);

    tab.addEventListener("click", () => setActiveTab(tab));

    close.addEventListener("click", (e) => {
      e.stopPropagation();
      const wasActive = tab.classList.contains("active");
      tab.remove();
      if (wasActive) {
        const next = tabsContainer.querySelector(".tab");
        if (next) setActiveTab(next);
        else content.textContent = "";
      }
    });

    tabsContainer.insertBefore(tab, addButton);
    return tab;
  }

  addButton.addEventListener("click", () => {
    const index = tabsContainer.querySelectorAll(".tab").length + 1;
    const tab = createTab("Tab " + index);
    setActiveTab(tab);
  });

  const first = createTab("Tab 1");
  setActiveTab(first);
});
