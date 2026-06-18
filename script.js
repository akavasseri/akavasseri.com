const tabs = Array.from(document.querySelectorAll("[data-tab]"));
const panels = Array.from(document.querySelectorAll("[data-panel]"));
const year = document.querySelector("#year");

function activateTab(tabName, shouldFocus = false) {
  const selectedTab = tabs.find((tab) => tab.dataset.tab === tabName) || tabs[0];
  const selectedPanels = panels.filter((panel) => panel.dataset.panel === selectedTab.dataset.tab);
  const focusPanel = selectedPanels[0] || panels[0];

  tabs.forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.classList.toggle("is-active", isSelected);
    tab.setAttribute("aria-current", isSelected ? "page" : "false");
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", selectedPanels.includes(panel));
  });

  if (shouldFocus) {
    focusPanel.focus({ preventScroll: true });
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateTab(tab.dataset.tab, true);
  });
});

window.addEventListener("hashchange", () => {
  activateTab(window.location.hash.replace("#", ""), true);
});

activateTab(window.location.hash.replace("#", "") || "home");
year.textContent = new Date().getFullYear();
