import Events from "./event";
import { chooseWord } from "./words";

let userSockets = [];

function selectRandomPainter() {
  return userSockets[Math.floor(Math.random() * userSockets.length)];
}

export function controlSocket(io, socket) {
  function notifyUserUpdate() {
    io.emit(Events.userUpdate, userSockets);
  }

  socket.on(Events.loggedIn, function(nickname) {
    socket.nickname = nickname;
    userSockets.push({
      id: socket.id,
      nickname: socket.nickname,
      score: 0
    });
    notifyUserUpdate(io);
    socket.broadcast.emit(Events.newUser, nickname);
  });

  socket.on(Events.sendMessage, function(message) {
    console.log("New message received.");
    socket.broadcast.emit(Events.newMessage, {
      message,
      nickname: socket.nickname
    });
  });

  socket.on(Events.mouseMoving, function({ x, y }) {
    socket.broadcast.emit(Events.mouseMoving, { x, y });
  });

  socket.on(Events.stroking, function({ x, y }) {
    socket.broadcast.emit(Events.stroking, { x, y });
  });

  socket.on(Events.setColor, function(color) {
    socket.broadcast.emit(Events.setColor, color);
  });

  socket.on(Events.setWidth, function(width) {
    socket.broadcast.emit(Events.setWidth, width);
  });

  socket.on(Events.fillCanvas, function() {
    socket.broadcast.emit(Events.fillCanvas);
  });

  socket.on(Events.gameStart, function() {
    const painter = selectRandomPainter();
    const word = chooseWord;
    io.emit(Events.gameStart, { painter, word });
  });

  socket.on("disconnect", function() {
    socket.broadcast.emit(Events.userLeft, socket.nickname);
    userSockets = userSockets.filter(userSocket => userSocket.id !== socket.id);
    notifyUserUpdate(io);
  });
}
