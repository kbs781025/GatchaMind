const chatForm = document.getElementById("jsSendMessage");
const messageList = document.getElementById("jsMessages");

function appendMessage(message, nickname) {
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
  appendMessage(input.value);
  input.value = "";
}

if (chatForm) {
  chatForm.addEventListener("submit", handleMessageSubmit);
}
