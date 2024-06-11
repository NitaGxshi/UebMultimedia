var carCategoryBtn = document.querySelectorAll(
    ".category-select-marka input"
  );
  var container = document.getElementById("items-container");
  var pageNumbers = document.getElementById("page-numbers");
  var selectedItems = document.getElementById("category-selected");
  var city = document.getElementById("qytetet");
  var currentCity = "";
  var categoryList = [];
  function removeElement(arr) {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }
  const checkActive = (categoryName) => {
    const firstBtn = carCategoryBtn[0];
    if (categoryName === "tegjitha") {
      teGjithaBtn(firstBtn);
    } else {
      if (firstBtn.checked) {
        firstBtn.checked = false;
        categoryName = removeElement(categoryList, categoryName);
      } else {
        carCategoryBtn.forEach((element) => {
          if (element.value === categoryName && element.checked) {
            categoryList.push(element.value);
          } else if (element.value === categoryName && !element.checked) {
            categoryName = removeElement(categoryList, categoryName);
          }
        });
      }
    }
    ShowSelected();
  };
  const teGjithaBtn = (btnValue) => {
    if (btnValue.checked) {
      for (let i = 1; i < carCategoryBtn.length; i++) {
        carCategoryBtn[i].checked = true;
        if (!categoryList.includes(carCategoryBtn[i].value)) {
          categoryList.push(carCategoryBtn[i].value);
        }
      }
    } else {
      for (let i = 0; i < carCategoryBtn.length; i++) {
        carCategoryBtn[i].checked = false;
      }
      categoryList = [];
    }
  };
  const ShowSelected = () => {
    categoryList = categoryList.filter((s) => s.length);
    let list = categoryList
      .map((e) => {
        return `<p>${e}</p>`;
      })
      .join("");
    if (currentCity.length > 0) {
      list += `<p>${currentCity}</p>`;
    }
    selectedItems.innerHTML = list;
    ShowItems();
  };
  const citySelect = () => {
    currentCity = city.value;
  
    ShowSelected();
  };
  const ShowItems = () => {
    let id = 1;
    let sliderId = 1;
    let items = itemsData
      .map((e) => {
        let imgs = e.img
          .map((g) => {
            return `<img src="${g}" id="img${id++}" alt="" onclick="popupSlider(this.id)"/>`;
          })
          .join("");
        if (checkCategory(e.category)) {
          return `
          <section class="container-item" id="${id++}" onclick="popup(this.id)">
          <button id="btn${id - 1}"><span>+</span></button>
            <div class="container-item-img">
              <div class="container-item-img-imgs">${imgs}</div>
              <div class="slider-img" id="slider-img"></div>
            </div>
            <div class="container-item-text">
              <h2 class="container-item-text-title">${e.title}</h2>
              <p class="container-item-text-desc">
              ${e.desc}
              </p>
              <p class="container-item-text-location">
                <a href="${
                  e.href
                }" target="_blank"><i class="fas fa-map-marker-alt"></i>
                ${e.location}</a>
              </p>
            </div>
          </section>
          ---
        `;
        } else if (
          categoryList.length === 0 &&
          (currentCity === "" || currentCity === null)
        ) {
          return `
          <section class="container-item" id="${id++}" onclick="popup(this.id)">
          <button id="btn${id - 1}"><span>+</span></button>
            <div class="container-item-img">
              <div class="container-item-img-imgs">${imgs}</div>
              <div class="slider-img"></div>
            </div>
            <div class="container-item-text">
              <h2 class="container-item-text-title">${e.title}</h2>
              <p class="container-item-text-desc">
              ${e.desc}
              </p>
              <p class="container-item-text-location">
                <a href="${
                  e.href
                }" target="_blank"><i class="fas fa-map-marker-alt"></i>
                ${e.location}</a>
              </p>
            </div>
          </section>
          ---
        `;
        }
      })
      .join("");
    let itemsArr = items.split("---");
    pagination(itemsArr);
  };
  const checkCategory = (arr) => {
    if (currentCity === "" || currentCity === null) {
      for (let j = 0; j < categoryList.length; j++) {
        if (arr.includes(categoryList[j])) {
          return true;
        }
      }
    } else {
      if (arr.includes(currentCity)) {
        if (categoryList.length > 0) {
          for (let i = 0; i < categoryList.length; i++) {
            if (arr.includes(categoryList[i])) {
              return true;
            }
          }
        } else {
          return true;
        }
      }
    }
    return false;
  };
  var itemsPerPage = 10;
  const changeNumber = (nr) => {
    itemsPerPage = nr;
    console.log(itemsPerPage);
    ShowItems();
  };
  const pagination = (itemsArr) => {
    let pages = (itemsArr.length - 1) / itemsPerPage;
    let itemsOnPage = "";
  
    for (let i = 0; i < pages; i++) {
      let content = "";
      for (let j = 0; j < itemsPerPage; j++) {
        let idx = i * itemsPerPage + j;
        if (idx < itemsArr.length) {
          content += itemsArr[idx];
        } else {
          break;
        }
      }
      let btn = "";
      if (i == 0) {
        btn = `<input class="pageCheck" type="radio" name="pages" id="page${i}" checked />`;
      } else {
        btn = `<input class="pageCheck" type="radio" name="pages" id="page${i}"/>`;
      }
  
      itemsOnPage += `
      ${btn}
      <label class="page" for="page${i}">
        ${content}
      </label>`;
    }
  
    let numbers = "";
    for (let i = 0; i < pages; i++) {
      numbers += `
      <label for="pagesNumber${i}" id="${i}" class="pageNumbers" onclick="changePage(this.id)">
        ${i + 1}
      </label>`;
    }
    if (itemsOnPage.trim().length === 0) {
      itemsOnPage = `
          <section class="container-item-nothig">
            <h1>Per momentin nuk e kemi te regjistruar vendin e kerkuar!</h1>
            <p>Nese dini ndonje vend te bukur dhe deshironi ta shfaqni ketu</p>
            <a href="faq.html">Klikoni ketu</a>
          </section>
        `;
    }
    container.innerHTML = itemsOnPage;
    pageNumbers.innerHTML = numbers;
  };
  const changePage = (id) => {
    let radioBtn = document.getElementById("page" + id);
  
    let removeActive = document.querySelector(".btnActive");
    let addActive = document.getElementById(id);
    addActive.classList.add("btnActive");
    if (removeActive != null) {
      removeActive.classList.remove("btnActive");
    }
  
    radioBtn.checked = true;
    document.querySelector(".header").scrollIntoView();
  };
  