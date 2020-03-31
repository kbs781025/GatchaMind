import { handleNewUser, handleUserLeft } from "./notifications";

let socket = null;

export function initiateSocket() {
  if (socket === null) {
    socket = io("/");
    socket.on(window.events.newUser, handleNewUser);
    socket.on(window.events.userLeft, handleUserLeft);
  }
}

export function emitLogin(nickname) {
  socket.emit(window.events.loggedIn, nickname);
}
