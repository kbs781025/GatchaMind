import { handleNewUser, handleUserLeft } from "./notifications";
import { handleNewMessage } from "./chat";

let socket = null;

export function getSocket() {
  return socket;
}

export function initiateSocket() {
  if (socket === null) {
    socket = io("/");
    socket.on(window.events.newUser, handleNewUser);
    socket.on(window.events.userLeft, handleUserLeft);
    socket.on(window.events.newMessage, handleNewMessage);
  }
}

export function emitLogin(nickname) {
  socket.emit(window.events.loggedIn, nickname);
}

export function emitSendMessage(message) {
  socket.emit(window.events.sendMessage, message);
}
