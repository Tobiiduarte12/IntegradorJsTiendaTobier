const slider = document.querySelector(".slider");
const sliderArrowLeft = document.querySelector(".slider-arrow-left");
const sliderArrowRight = document.querySelector(".slider-arrow-right");
const productsContainer = document.querySelector(".products-container");
const showMoreBtn = document.querySelector(".btn-load");
const categoriesContainer = document.querySelector(".filters-container");
const categoriesList = document.querySelectorAll(".category");
const menuButton = document.querySelector("#menu-toggle");
const cartButton = document.querySelector("#cart-btn");
const cartMenu = document.querySelector(".cart");
const menuToggle = document.querySelector(".nav__menu--mobile");
const overlay = document.querySelector(".overlay");
const navbarList = document.querySelector(".nav__menu__list");
const closeBtn = document.querySelector(".close__menu");
const expandNavLinks = document.querySelector(".card__links__menu");
const buttonUp = document.querySelector(".btn__up");
const cardProductsCart = document.querySelector(".cart__items--container");
const priceTotal = document.querySelector(".total__price");
const succesModal = document.querySelector(".add-modal");
const buyButton = document.querySelector(".button__buy");
const deleteButton = document.querySelector(".button__delete");
const cartBubble = document.querySelector(".cart-bubble");
const ofertFormEmail = document.querySelector(".form-ofert");
const inputEmail = document.querySelector(".input-email");
const headerIndicator = document.querySelector(".header-super-up");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const openMenu = () => {
  menuToggle.classList.toggle("open-menu");
  overlay.classList.toggle("show-overlay");
  if (menuToggle.classList.contains("open-menu")) {
    cartMenu.classList.remove("open-cart");
    overlay.classList.add("show-overlay");
    return;
  }
};

const openCart = () => {
  cartMenu.classList.toggle("open-cart");
  overlay.classList.toggle("show-overlay");

  if (cartMenu.classList.contains("open-cart")) {
    menuToggle.classList.remove("open-menu");
    overlay.classList.add("show-overlay");
    return;
  }
};

const closeOnScroll = () => {
  if (
    !menuToggle.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart")
  ) {
    return;
  }
  menuToggle.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar-link")) {
    return;
  }
  menuToggle.classList.remove("open-menu");
  overlay.classList.remove("show-overlay");
};

const onOverlayClose = () => {
  if (menuToggle.classList.contains("open-menu")) {
    menuToggle.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
    return;
  }

  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
    return;
  }
};

const closeOnMenu = () => {
  if (menuToggle.classList.contains("open-menu")) {
    menuToggle.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
    return;
  }
};

const showNavLinks = () => {
  expandNavLinks.classList.toggle("open__links");
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
      <div class="card-product-info">
          <h3>${name}</h3>
          <p>${description}</p>
          <span>$ ${price}</span>
      </div>
      <div class="cover">
        <img class="img__card__product" src= ${image} alt=${name} />
        </div>

              <button class="btn-add-product" data-id = "${id}" data-name="${name}" data-img="${image}" data-price="${price}"><i class="fa-solid fa-cart-arrow-down icono"></i><span>ADD</span></button>
   </div> `;
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

const showButtonUp = () => {
  buttonUp.classList.add("active");
};

const uploadButton = () => {
  window.scrollTo({ top: 0 });
};

// LOGICA DEL CARRITO

const createCartProductsTemplate = (cartProduct) => {
  const { id, name, price, img, quantity } = cartProduct;
  return `
    <div class="cart-card">
      <img src=${img} alt=${name}/>
      <div class="item-info">
        <h3 class="item-tittle">${name}</h3>
        <p class="item-ofert">$ ${price}</p>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id =${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id = ${id}>+</span>
      </div>
    </div>
  `;
};

const renderCart = () => {
  if (!cart.length) {
    cardProductsCart.innerHTML = `<p>No hay productos en Tuca Rito <i class="fa-solid fa-heart-crack icon-heart"></i></p>`;
    return;
  }
  cardProductsCart.innerHTML = cart.map(createCartProductsTemplate).join("");
};

const getCartTotal = () => {
  return cart.reduce((acc, curr) => {
    return acc + Number(curr.price) * Number(curr.quantity);
  }, 0);
};

const showCartTotal = () => {
  priceTotal.innerHTML = `$ ${getCartTotal().toFixed(2)}`;
};

const createProductData = (product) => {
  const { id, name, price, img } = product;
  return { id, name, price, img };
};

const isExistingCardProduct = (productId) => {
  return cart.find((item) => {
    return item.id === productId;
  });
};

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

const showSuccessModal = (message) => {
  succesModal.classList.add("active-modal");
  succesModal.textContent = message;
  setTimeout(() => {
    succesModal.classList.remove("active-modal");
  }, 1500);
};

const createCartProduct = (product) => {
  cart = [
    ...cart,
    {
      ...product,
      quantity: 1,
    },
  ];
};

const disableButton = (btn) => {
  if (!cart.length) {
    btn.classList.add("disable");
  } else {
    btn.classList.remove("disable");
  }
};

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);
};

const updateCartState = () => {
  // GUARDAR  CARRITO EN LC
  saveCart();
  // RENDERIZAR CARRITO
  renderCart();
  // MOSTRAR EL TOTAL DEL CARRITO
  showCartTotal();
  // CHECKEAR DISABLE DE BOTONES
  disableButton(buyButton);
  disableButton(deleteButton);
  // RENDERIZAR BUSBUJA DEL CART
  renderCartBubble();
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add-product")) {
    return;
  }
  const product = createProductData(e.target.dataset);

  //  SI EL PRODUCTO YA EXISTE, AGREGAMOS UNIDAD AL PRODUCTO Y DAMOS FEEDBACK
  if (isExistingCardProduct(product.id)) {
    addUnitToProduct(product);
    showSuccessModal(`Se agrego una unidad a Tuca Rito `);
  } else {
    // SI EL PRODUCTO NO EXISTE, CREAMOS EL NUEVO PRODUCTO Y DAMOS FEEDBACK
    createCartProduct(product);
    showSuccessModal(`Se agrego un nuevo producto a Tuca Rito `);
  }

  // ACTUALIZAMOS DATA DEL CART
  updateCartState();
};

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => {
    return product.id !== existingProduct.id;
  });
  updateCartState();
};

const substractProductUnity = (existingProduct) => {
  cart = cart.map((product) => {
    return product.id === existingProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.quantity === 1) {
    if (window.confirm("¿Desea eliminar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  substractProductUnity(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};

const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  updateCartState();
};

const resetCartItem = () => {
  cart = [];
  updateCartState();
};

const completeCartAction = (confirmMensagge, successMensagge) => {
  if (!cart.length) return;
  if (window.confirm(confirmMensagge)) {
    resetCartItem();
    alert(successMensagge);
  }
};

const jsConfetti = new JSConfetti();

const completeBuy = () => {
  completeCartAction(
    "¿Desea completar su compra?",
    "❤️ !Gracias por su compra y por confiar en nosotros! ❤️"
  );
  jsConfetti.addConfetti();
};

const deleteCart = () => {
  completeCartAction(
    "¿Desea vaciar todo Tuca Rito?",
    "Tuca Rito se ha vaciado"
  );
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.style.display = "none";
  error.textContent = "";
};

const isValidateEmail = (input) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(input.value.trim());
};

const isEmpty = (input) => {
  return !input.value.trim().length;
};

const checkEmail = (input) => {
  let valid = false;

  // SI NO ESTA VACIO
  if (isEmpty(input)) {
    showError(input, "El email es obligatorio");
    return;
  }
  // SI ES UN EMAIL
  if (!isValidateEmail(input)) {
    showError(input, "El email no es valido");
    return;
  }

  //BORRAMOS ERROR
  showSuccess(input);
  valid = true;
  return valid;
};

const submitHandler = (e) => {
  // 1: PREVENIR EL COMPORTAMIENTO POR DEFECTO
  e.preventDefault();
  let isEmailValid = checkEmail(inputEmail);

  let isValidForm = isEmailValid;
  if (!isValidForm) {
    return;
  }
  alert(
    "¡Gracias por subscribirte! Te estaremos mandando las ultimas novedades"
  );
  e.target.reset();
};

function selectFocus() {
  this.classList.toggle("select-Focus");
}

const init = () => {
  renderProducts(appState.products[appState.currentProductsIndex]);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  menuButton.addEventListener("click", openMenu);
  cartButton.addEventListener("click", openCart);
  window.addEventListener("scroll", closeOnScroll);
  navbarList.addEventListener("click", closeOnClick);
  overlay.addEventListener("click", onOverlayClose);
  closeBtn.addEventListener("click", closeOnMenu);
  buttonUp.addEventListener("click", uploadButton);
  window.addEventListener("scroll", showButtonUp);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsContainer.addEventListener("click", addProduct);
  cardProductsCart.addEventListener("click", handleQuantity);
  buyButton.addEventListener("click", completeBuy);
  deleteButton.addEventListener("click", deleteCart);
  disableButton(buyButton);
  disableButton(deleteButton);
  renderCartBubble();
  ofertFormEmail.addEventListener("submit", submitHandler);
  inputEmail.addEventListener("input", () => checkEmail(inputEmail));
  inputEmail.addEventListener("focus", selectFocus);
  inputEmail.addEventListener("blur", selectFocus);
};

init();
