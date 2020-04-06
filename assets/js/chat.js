import { emitSendMessage } from "./sockets";

const chatForm = document.getElementById("jsSendMessage");
const messageList = document.getElementById("jsMessages");

export function appendMessage(message, nickname) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="message ${nickname ? "others" : "me"}"> ${
    nickname ? nickname : "You"
  }: </span> ${message}
  `;
  messageList.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  emitSendMessage(input.value);
  appendMessage(input.value);
  input.value = "";
}

export function handleNewMessage({ message, nickname }) {
  appendMessage(message, nickname);
}

export function disableChatting() {
  chatForm.style.display = "none";
}

export function enableChatting() {
  chatForm.style.display = "inline-block";
}

if (chatForm) {
  chatForm.addEventListener("submit", handleMessageSubmit);
}
