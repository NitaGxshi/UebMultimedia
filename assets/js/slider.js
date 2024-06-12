var img = document.querySelectorAll(".header-bg-img");
let idx = 0;
let idx2 = 1;

const changeBg = () => {
  img[idx++].style = "opacity:0";
  img[idx2++].style = "opacity:1";
  if (idx === img.length) {
    idx = 0;
  }
  if (idx2 === img.length) {
    idx2 = 0;
  }
};

setInterval(changeBg, 5000);
