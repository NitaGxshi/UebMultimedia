const popup = (element) => {
    let div = document.getElementById(element);
    let btn = document.getElementById("btn" + element);
    div.classList = "popup";
    let slider = document.querySelector(".popup .slider-img");
    let img = document.querySelector(".popup .container-item-img-imgs img").src;
    changeBg(slider, img);
    document.querySelector("body").style = "overflow: hidden;";
  
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      div.classList = "container-item";
      document.querySelector("body").style = "overflow: auto;";
    });
  };
  const popupSlider = (id) => {
    let slider = document.querySelector(".popup .slider-img");
    let img = document.getElementById(id);
  
    let active = document.querySelector(".active");
    if (active != null) {
      active.classList.remove("active");
    }
    img.classList.add("active");
  
    let e = img.parentElement.parentElement.parentElement.id;
    let parent = document.getElementById(e);
    parent.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      changeBg(slider, img.src);
    });
  };
  const changeBg = (slider, bg) => {
    slider.style = `background-image: url(${bg});`;
  };
  