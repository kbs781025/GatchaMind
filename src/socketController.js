import Events from "./event";

let userSockets = [];

function notifyUserUpdate(io) {
  io.emit(Events.userUpdate, userSockets);
}

export function controlSocket(io, socket) {
  socket.on(Events.loggedIn, function(nickname) {
    socket.nickName = nickname;
    userSockets.push({
      id: socket.id,
      nickName: socket.nickName,
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

  socket.on("disconnect", function() {
    socket.broadcast.emit(Events.userLeft, socket.nickname);
    userSockets = userSockets.filter(userSocket => userSocket.id !== socket.id);
    notifyUserUpdate(io);
  });
}
