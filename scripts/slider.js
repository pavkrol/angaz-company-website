const slider = document.getElementById("slider");
let current_slide = 0,
  swipe_start,
  swipe_end;

slider.addEventListener("mousedown", e => {
  e.preventDefault;
  swipe_start = e.pageX;
});

slider.addEventListener("mouseup", e => {
  e.preventDefault;
  swipe_end = e.pageX;
  swipe = swipe_end - swipe_start;
  if (swipe > 20) {
    current_slide++;
  } else if (swipe < -20) {
    current_slide--;
  }
  console.log(current_slide);
});
