const menu = document.getElementById("header__menu");
const nav = document.getElementById("header__navigation");

menu.addEventListener("click", e => {
  nav.classList.toggle("navigation--active");
});
