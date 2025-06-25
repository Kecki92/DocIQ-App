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

  /* ---------- Treeview ---------- */
  const treeRoot = document.getElementById("treeRoot");
  const newFileBtn = document.querySelector(".new-file");
  const newFolderBtn = document.querySelector(".new-folder");
  let draggedItem = null;

  function createNode(name, type) {
    const li = document.createElement("li");
    li.draggable = true;
    const span = document.createElement("span");
    span.textContent = name;
    li.appendChild(span);
    li.dataset.type = type;
    return li;
  }

  function promptName(msg) {
    const n = prompt(msg);
    return n && n.trim() ? n.trim() : null;
  }

  function addChild(parent, type) {
    const name = promptName(type === "folder" ? "Ordnername" : "Dateiname");
    if (!name) return;
    let ul = parent.querySelector("ul");
    if (!ul) {
      ul = document.createElement("ul");
      parent.appendChild(ul);
    }
    ul.appendChild(createNode(name, type));
  }

  treeRoot.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    treeRoot.querySelectorAll("li").forEach((n) => n.classList.remove("selected"));
    li.classList.add("selected");
  });

  treeRoot.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const li = e.target.closest("li");
    if (!li) return;
    const action = prompt("Aktion: n=Datei, f=Ordner, r=Umbenennen, d=L\u00f6schen");
    if (action === "n") addChild(li, "file");
    else if (action === "f") addChild(li, "folder");
    else if (action === "r") {
      const newName = promptName("Neuer Name");
      if (newName) li.querySelector("span").textContent = newName;
    } else if (action === "d") {
      li.remove();
    }
  });

  treeRoot.addEventListener("dragstart", (e) => {
    draggedItem = e.target.closest("li");
  });

  treeRoot.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  treeRoot.addEventListener("drop", (e) => {
    e.preventDefault();
    const target = e.target.closest("li");
    if (!draggedItem || !target || draggedItem === target) return;
    let ul = target.querySelector("ul");
    if (!ul) {
      ul = document.createElement("ul");
      target.appendChild(ul);
    }
    ul.appendChild(draggedItem);
  });

  newFileBtn.addEventListener("click", () => addChild(treeRoot.querySelector("li"), "file"));
  newFolderBtn.addEventListener("click", () => addChild(treeRoot.querySelector("li"), "folder"));

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
