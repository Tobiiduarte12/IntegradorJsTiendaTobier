const slider = document.querySelector(".slider");
const sliderArrowLeft = document.querySelector(".slider-arrow-left");
const sliderArrowRight = document.querySelector(".slider-arrow-right");

const slideWidth = slider.offsetWidth;
let currentPosition = 0;

sliderArrowLeft.addEventListener("click", () => {
  if (currentPosition === 0) {
    currentPosition = -(slider.children.length - 1) * slideWidth;
  } else {
    currentPosition += slideWidth;
  }
  slider.style.transform = `translateX(${currentPosition}px)`;
});

sliderArrowRight.addEventListener("click", () => {
  if (currentPosition === -(slider.children.length - 1) * slideWidth) {
    currentPosition = 0;
  } else {
    currentPosition -= slideWidth;
  }
  slider.style.transform = `translateX(${currentPosition}px)`;
});
