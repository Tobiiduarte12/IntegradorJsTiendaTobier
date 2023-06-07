//TRAEMOS LOS ELEMENTOS
const loginForm = document.querySelector("#form-login");
const inputEmail = document.querySelector("#user");
const inputPass = document.querySelector("#password");
const errorField = document.querySelector("#form__error");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToSesionStorage = (user) => {
  return sessionStorage.setItem("activeUser", JSON.stringify(user));
};

//FUNCIONES AUXILIARES
const showError = (message) => {
  return (errorField.textContent = message);
};

const isEmpty = (input) => {
  return !input.value.trim().length;
};

const isExistingEmail = (input) => {
  return users.some((user) => user.email === input.value.trim());
};

const isMatchingPass = (input) => {
  const user = users.find((user) => user.email === inputEmail.value.trim());
  return user.password === inputPass.value.trim();
};

const isValidAccount = () => {
  let valid = false;
  // SI EMAIL ESTA VACIO, MUESTRO ERROR
  if (isEmpty(inputEmail)) {
    showError("No ingresaste el email ❌");
    return;
  }

  //SI PASSWORD ESTA VACIO
  if (isEmpty(inputPass)) {
    showError("No ingresaste la contraseña ❌");
    return;
  }
  //CONTROLAMOS QUE EXISTA EL EMAIL
  if (!isExistingEmail(inputEmail)) {
    showError(
      `¡ups! Tus credenciales no coinciden con un usuario registrado en nuestro sistema 😞`
    );
    return;
  }

  //SI COINCIDE EMAIL Y PASS
  if (!isMatchingPass()) {
    showError("El email y/o la contraseña no coinciden 🚫");
    return;
  }

  //BORRAMOS ERROR
  valid = true;
  errorField.textContent = "";
  return valid;
};

//FUNCIONES DE VALIDACION

const login = (e) => {
  //PREVENIMOS EVENTO POR DEFECTO
  e.preventDefault();

  //CONTROLAMOS QUE LA CUENTA SEA VALIDA
  if (isValidAccount()) {
    //SI ES VALIDO, TRAIGO EL USER
    const user = users.find((user) => user.email === inputEmail.value.trim());

    //GUARDAMOS EL USER EN SESION STORAGE
    saveToSesionStorage(user);

    //REDIRIGIMOS AL HOME
    window.location.href = "./home.html";
  }
};

function selectFocus() {
  this.classList.toggle("select-Focus");
}

const init = () => {
  loginForm.addEventListener("submit", login);
  inputEmail.addEventListener("focus", selectFocus);
  inputEmail.addEventListener("blur", selectFocus);
  inputPass.addEventListener("focus", selectFocus);
  inputPass.addEventListener("blur", selectFocus);
};

init();
