
let r = document.querySelector(":root");
var rs = getComputedStyle(r);
let btn = document.getElementById("select-btn");
if (btn != null) {
  btn.addEventListener("mouseover", () => {
    r.style.setProperty("--before-background", "red");
  });
  btn.addEventListener("mouseleave", () => {
    r.style.setProperty("--before-background", "white");
  });
}
