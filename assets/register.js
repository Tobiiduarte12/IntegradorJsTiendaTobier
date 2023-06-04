//  TRAER LOS ELEMENTOS
const registerForm = document.querySelector("#register-form");
const inputName = document.querySelector("#name");
const inputLastName = document.querySelector("#last-name");
const inputUser = document.querySelector("#user");
const inputEmail = document.querySelector("#email");
const inputPass = document.querySelector("#password");
const inputPhone = document.querySelector("#phone");
const btnRegister = document.querySelector("#btn-register");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("users", JSON.stringify(users));
};

//  FUNCIONES AUXILIARES
const isEmpty = (input) => {
  return !input.value.trim().length;
};

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

const isSecurityPass = (input) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(input.value.trim());
};

const isValidatePhone = (input) => {
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return re.test(input.value.trim());
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

const isExistingUser = (input) => {
  return users.some((user) => user.usuario === input.value.trim());
};

const isExistingEmail = (input) => {
  return users.some((user) => user.email === input.value.trim());
};

// FUNCIONES DE VALIDACION DE INPUTS
const checkTextInput = (input) => {
  let valid = false;
  const minCharacters = 3;
  const maxCharacters = 16;

  // SI EL INPUT ESTA VACIO, MUESTRO ERROR
  if (isEmpty(input)) {
    // "muestro error"
    showError(input, "Este campo es obligatorio ⚠️");
    // "retorno"
    return;
  }
  // SI EL INPUT TIENE MAL LA CANTIDAD DE CARACTERES, MUESTRO ERROR
  if (!isBetween(input, minCharacters, maxCharacters)) {
    //MUESTRO ERROR
    showError(
      input,
      `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres. 🚫`
    );
    // RETORNAMOS
    return;
  }
  // BORRAMOS ERROR
  showSuccess(input);
  valid = true;
  return valid;
};

const checkUser = (input) => {
  let valid = true;
  const minCharacters = 3;
  const maxCharacters = 14;

  //SI EL CAMPO ESTA VACIO, MUESTRO ERROR
  if (isEmpty(input)) {
    showError(input, "El usuario es obligatorio ⚠️");
    return;
  }

  // SI LA CANTIDAD DE CARACTERES ESTA MAL, MUESTRO ERROR
  if (!isBetween(input, minCharacters, maxCharacters)) {
    showError(
      input,
      `Tu usuario debe tener entre ${minCharacters} y ${maxCharacters} caracteres. 🚫`
    );
    return;
  }
  //REVISAR QUE EL USUARIO NO EXISTA
  if (isExistingUser(input)) {
    showError(input, `${input.value} ya esta en uso 😬`);
    return;
  }

  //BORRAMOS ERROR
  showSuccess(input);
  valid = true;
  return valid;
};

const checkEmail = (input) => {
  let valid = false;

  // SI NO ESTA VACIO
  if (isEmpty(input)) {
    showError(input, "El email es obligatorio ⚠️");
    return;
  }
  // SI ES UN EMAIL
  if (!isValidateEmail(input)) {
    showError(input, "El email no es valido 🚫");
    return;
  }

  // REVISAR QUE NO EXISTA EL EMAIL
  if (isExistingEmail(input)) {
    showError(input, `${input.value} ya esta en uso 😬`);
    return;
  }

  //BORRAMOS ERROR
  showSuccess(input);
  valid = true;
  return valid;
};

const checkPassword = (input) => {
  let valid = false;

  //SI EL INPUT ESTA VACIO, MOSTAMOS ERROR
  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio ⚠️");
    return;
  }

  //REVISAMOS QUE LA CONTRASEÑA SEA SEGURA
  if (!isSecurityPass(input)) {
    showError(
      input,
      "Ingresa al menos 1 caracter especial, 1 numero, 1 mayuscula y minimo 8 caracteres ⚠️"
    );
    return;
  }
  //BORRAMOS ERROR
  showSuccess(input);
  valid = true;
  return valid;
};

const checkPhone = (input) => {
  let valid = false;

  //SI EL INPUT ESTA VACIO, MOSTRAMOS ERROR
  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio ⚠️");
    return;
  }

  //REVISAMOS QUE EL TELEFONO SEA VALIDO
  if (!isValidatePhone(input)) {
    showError(input, "Tu numero de celular no es valido 🚫");
    return;
  }

  //BORRAMOS ERROR
  showSuccess(input);
  valid = true;
  return valid;
};

const jsConfetti = new JSConfetti();

//  VALIDACION GENERAL Y ALMACENAMIENTO DE DATOS

const submitHandler = (e) => {
  // 1: PREVENIR EL COMPORTAMIENTO POR DEFECTO
  e.preventDefault();
  //2: REVISAR SI TODOS LOS INPUTS SEAN VALIDOS
  let isNameValid = checkTextInput(inputName);
  let isLastNameValid = checkTextInput(inputLastName);
  let isEmailValid = checkEmail(inputEmail);
  let isUserValid = checkUser(inputUser);
  let isPassValid = checkPassword(inputPass);
  let isPhoneValid = checkPhone(inputPhone);

  let isValidForm =
    isNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isEmailValid &&
    isUserValid &&
    isPassValid &&
    isPhoneValid;

  if (isValidForm) {
    users.push({
      name: inputName.value,
      lastName: inputLastName.value,
      usuario: inputUser.value,
      email: inputEmail.value,
      password: inputPass.value,
      phone: inputPhone.value,
    });

    //3: SI EL INPUT ES VALIDO, GUARDO LA DATA EN LOCALSTORAGE
    saveToLocalStorage();

    //4: DAR FEEDBACK AL USUARIO
    alert("Registrado con exito!");
    jsConfetti.addConfetti();

    //6: REDIRECCIONAR AL USUARIO AL LOGIN
    setInterval(() => {
      window.location.href = "login.html";
    }, 1500);
  }
};

function selectFocus() {
  this.classList.toggle("select-Focus");
}

//  AGREGAR EVENTOS Y EJECUTAR FUNCIONES

const init = () => {
  registerForm.addEventListener("submit", submitHandler);
  inputName.addEventListener("input", () => checkTextInput(inputName));
  inputLastName.addEventListener("input", () => checkTextInput(inputLastName));
  inputUser.addEventListener("input", () => checkUser(inputUser));
  inputEmail.addEventListener("input", () => checkEmail(inputEmail));
  inputPass.addEventListener("input", () => checkPassword(inputPass));
  inputPhone.addEventListener("input", () => checkPhone(inputPhone));
  inputName.addEventListener("focus", selectFocus);
  inputName.addEventListener("blur", selectFocus);
  inputLastName.addEventListener("focus", selectFocus);
  inputLastName.addEventListener("blur", selectFocus);
  inputUser.addEventListener("focus", selectFocus);
  inputUser.addEventListener("blur", selectFocus);
  inputEmail.addEventListener("focus", selectFocus);
  inputEmail.addEventListener("blur", selectFocus);
  inputPass.addEventListener("focus", selectFocus);
  inputPass.addEventListener("blur", selectFocus);
  inputPhone.addEventListener("focus", selectFocus);
  inputPhone.addEventListener("blur", selectFocus);
};

init();
