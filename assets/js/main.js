const loginForm = document.getElementById("jsLoginForm");
const body = document.body;
const USER_NICKNAME = "nickname";
const LOGGED_IN = "logged_in";
const LOGGED_OUT = "logged_out";

const nickName = localStorage.getItem(USER_NICKNAME);

function handleFormSubmit(event) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const inputValue = input.value;
  if (inputValue) {
    localStorage.setItem(USER_NICKNAME, inputValue);
    input.value = "";
  }
}

if (nickName) {
  body.className = LOGGED_IN;
} else {
  body.className = LOGGED_OUT;
}

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
