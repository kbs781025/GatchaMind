import { handleNewUser, handleUserLeft } from "./notifications";
import { handleNewMessage } from "./chat";
import {
  handleStroking,
  handleMouseMoving,
  handleSetColor,
  handleSetWidth,
  handleFillCanvas
} from "./paint";

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
    socket.on(window.events.mouseMoving, handleMouseMoving);
    socket.on(window.events.stroking, handleStroking);
    socket.on(window.events.setColor, handleSetColor);
    socket.on(window.events.setColor, handleSetWidth);
    socket.on(window.events.fillCanvas, handleFillCanvas);
  }
}

export function emitLogin(nickname) {
  socket.emit(window.events.loggedIn, nickname);
}

export function emitSendMessage(message) {
  socket.emit(window.events.sendMessage, message);
}
