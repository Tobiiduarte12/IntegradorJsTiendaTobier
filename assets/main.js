const slider = document.querySelector(".slider");
const sliderArrowLeft = document.querySelector(".slider-arrow-left");
const sliderArrowRight = document.querySelector(".slider-arrow-right");
const productsContainer = document.querySelector(".products-container");
const showMoreBtn = document.querySelector(".btn-load");
const categoriesContainer = document.querySelector(".filters-container");
const categoriesList = document.querySelectorAll(".category");
const toggle = document.getElementById("toggle");
const cartButton = document.querySelector("#cart-btn");
const cart = document.querySelector(".cart");
const menuToggle = document.querySelector(".navbar");
const overlay = document.querySelector(".overlay");
const navbarList = document.querySelector(".navbar-list");

const openMenu = () => {
  toggle.classList.toggle("active");
  menuToggle.classList.toggle("open-menu");
  overlay.classList.toggle("show-overlay");
  if (menuToggle.classList.contains("open-menu")) {
    cart.classList.remove("open-cart");
    overlay.classList.add("show-overlay");
    return;
  }
};

const openCart = () => {
  cart.classList.toggle("open-cart");
  overlay.classList.toggle("show-overlay");

  if (cart.classList.contains("open-cart")) {
    menuToggle.classList.remove("open-menu");
    overlay.classList.add("show-overlay");
    return;
  }
};

const closeOnScroll = () => {
  if (
    !menuToggle.classList.contains("open-menu") &&
    !cart.classList.contains("open-cart")
  ) {
    return;
  }
  menuToggle.classList.remove("open-menu");
  cart.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar-link")) {
    return;
  }
  menuToggle.classList.remove("open-menu");
  overlay.classList.remove("show-overlay");
};

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

const renderProductsTemplate = (product) => {
  const { id, name, description, price, image } = product;

  return `
  <div class="card-product">
    <figure class="card-img-container">
        <img src= ${image} alt=${name} />
    </figure>
    <div class="card-product-info">
      <h3>${name}</h3>
        <p>${description}</p>
        <span>$ ${price}</span>
        <button class="btn-add-product" data-id = "${id}" data-name="${name}" data-img="${image}" data-price="${price}">Agregar al carrito</button>
    </div>
   </div>
  `;
};

const renderProducts = (productstList) => {
  productsContainer.innerHTML += productstList
    .map(renderProductsTemplate)
    .join("");
};

const isLastIndexOf = () => {
  return appState.currentProductsIndex === appState.currentLimitProducts - 1;
};

const showMoreProducts = () => {
  appState.currentProductsIndex += 1;
  let { products, currentProductsIndex } = appState;
  renderProducts(products[currentProductsIndex]);
  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};

const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryButton) => {
    if (categoryButton.dataset.category !== selectedCategory) {
      categoryButton.classList.remove("active");
      return;
    }
    categoryButton.classList.add("active");
  });
};

const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
    return;
  }
  showMoreBtn.classList.add("hidden");
};

const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility();
};

const renderFiltersProducts = () => {
  const filterProducts = productsData.filter((product) => {
    return product.category === appState.activeFilter;
  });
  renderProducts(filterProducts);
};

const applyFilter = ({ target }) => {
  if (!isInactiveFilterBtn(target)) {
    return;
  }

  changeFilterState(target);

  productsContainer.innerHTML = "";
  if (appState.activeFilter) {
    renderFiltersProducts();
    appState.currentProductsIndex = 0;
    return;
  }

  renderProducts(appState.products[0]);
};

const init = () => {
  renderProducts(appState.products[appState.currentProductsIndex]);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  toggle.addEventListener("click", openMenu);
  cartButton.addEventListener("click", openCart);
  window.addEventListener("scroll", closeOnScroll);
  navbarList.addEventListener("click", closeOnClick);
};

init();
