const userName = document.querySelector("#user-name");
const userAccount = document.querySelector("#user-account");

activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

const showUserName = () => {
  userName.textContent = `${activeUser.name} ${activeUser.lastName}`;
  userAccount.textContent = `${activeUser.usuario}`;
};
const init = () => {
  showUserName();
};

init();
