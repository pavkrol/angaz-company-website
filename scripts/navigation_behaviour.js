const header = document.querySelector(".header");
const nav_items = document.querySelectorAll(".navigation__link");

window.addEventListener("scroll", e => {
  const scroll_position = window.scrollY;
  console.log(scroll_position);
  if (screen.width > 1200) {
    if (scroll_position > 200) {
      [...nav_items].forEach(el => {
        el.classList.add("navigation__link--scrolled");
      });
      header.classList.add("header--scrolled");
    } else {
      [...nav_items].forEach(el => {
        el.classList.remove("navigation__link--scrolled");
      });
      header.classList.remove("header--scrolled");
    }
  }
});
