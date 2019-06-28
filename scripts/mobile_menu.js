const menu = document.getElementById("header__menu");
const nav = document.getElementById("header__navigation");
const nav_links = document.querySelectorAll(".navigation__link");

menu.addEventListener("click", e => {
  nav.classList.toggle("navigation--active");
  menu.classList.toggle("menu--open");
});

[...nav_links].forEach(el => {
  el.addEventListener("click", e => {
    nav.classList.toggle("navigation--active");
    menu.classList.toggle("menu--open");
  });
});
