const body = document.getElementById("body");
const products = document.querySelectorAll(".product");
const buttons = document.querySelectorAll(".infobox__more");
const overlay = document.querySelector(".product__overlay");
const close = document.querySelectorAll(".product__close");
let current_product = 0;

[...buttons].forEach(el => {
  el.addEventListener("click", e => {
    current_product = el.dataset.number;
    overlay.classList.add("visible");
    products[current_product].classList.add("visible");
    body.classList.add("noscroll");
  });
});

[...close].forEach(el => {
  el.addEventListener("click", el => {
    overlay.classList.remove("visible");
    products[current_product].classList.remove("visible");
    body.classList.remove("noscroll");
  });
});
