//TRAEMOS LOS ELEMENTOS
const loginForm = document.querySelector("#form-login");
const emailInput = document.querySelector("#user");
const passInput = document.querySelector("#password");
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
  const user = users.find((user) => user.email === emailInput.value.trim());
  return user.password === passInput.value.trim();
};

const isValidAccount = () => {
  let valid = false;
  // SI EMAIL ESTA VACIO, MUESTRO ERROR
  if (isEmpty(emailInput)) {
    showError("Ni pusiste un email hdp");
    return;
  }

  //SI PASSWORD ESTA VACIO
  if (isEmpty(passInput)) {
    showError("Pone la constraseña puee");
    return;
  }
  //CONTROLAMOS QUE EXISTA EL EMAIL
  if (!isExistingEmail(emailInput)) {
    showError(`Usuario no registrado`);
    return;
  }

  //SI COINCIDE EMAIL Y PASS
  if (!isMatchingPass()) {
    showError("La cuenta y la contraseña no coinciden mi bro");
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
    const user = users.find((user) => user.email === emailInput.value.trim());

    //GUARDAMOS EL USER EN SESION STORAGE
    saveToSesionStorage(user);

    //REDIRIGIMOS AL HOME
    window.location.href = "./home.html";
  }
};

const init = () => {
  loginForm.addEventListener("submit", login);
};

init();
