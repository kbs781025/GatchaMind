import { handleNotification } from "./notifications";

let socket = null;

export function initiateSocket() {
  if (socket === null) {
    socket = io("/");
    socket.on(window.events.newUser, handleNotification);
  }
}

export function emitLogin(nickname) {
  socket.emit(window.events.loggedIn, nickname);
}
