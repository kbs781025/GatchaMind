const loginForm = document.getElementById("jsLoginForm");
const body = document.body;
const USER_NICKNAME = "nickname";
const LOGGED_IN = "logged_in";
const LOGGED_OUT = "logged_out";

const nickName = localStorage.getItem(USER_NICKNAME);

function logIn(nickname) {
  window.socket = io("/");
  socket.emit(window.events.LoggedIn, nickName);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const nickName = input.value;
  if (nickName) {
    localStorage.setItem(USER_NICKNAME, nickName);
    input.value = "";
    body.className = LOGGED_IN;

    logIn(nickName);
  }
}

if (nickName) {
  body.className = LOGGED_IN;
  logIn(nickName);
} else {
  body.className = LOGGED_OUT;
}

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}