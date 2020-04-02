const userBoard = document.getElementById("jsUserBoard");

export function handleUserUpdate(userSockets) {
  userBoard.innerHTML = "";
  userSockets.forEach(element => {
    const span = document.createElement("span");
    span.innerText = `${element.nickname} : ${element.score}`;
    userBoard.appendChild(span);
  });
}