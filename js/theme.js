// Set the theme before first paint to avoid a flash
(function () {
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { }
  var dark = saved
    ? saved === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
})();

const root = document.documentElement;
const toggle = document.getElementById("themeSwitch");

function sync() {
  toggle.setAttribute("aria-checked", root.dataset.theme === "dark");
}
sync();

toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) { }
  sync();
});