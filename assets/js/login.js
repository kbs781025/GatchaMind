import { initiateSocket, emitLogin } from "./sockets";

const loginForm = document.getElementById("jsLoginForm");
const body = document.body;
const USER_NICKNAME = "nickname";
const LOGGED_IN = "logged_in";
const LOGGED_OUT = "logged_out";

const nickname = localStorage.getItem(USER_NICKNAME);

function handleFormSubmit(event) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const nickname = input.value;
  if (nickname) {
    localStorage.setItem(USER_NICKNAME, nickname);
    input.value = "";
    body.className = LOGGED_IN;

    initiateSocket();
    emitLogin(nickname);
  }
}

if (nickname) {
  body.className = LOGGED_IN;
  initiateSocket();
  emitLogin(nickname);
} else {
  body.className = LOGGED_OUT;
}

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
