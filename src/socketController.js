import Events from "./event";

export function controlSocket(socket) {
  socket.on(Events.loggedIn, function(nickname) {
    console.log(nickname);
    socket.nickname = nickname;
    socket.broadcast.emit(Events.newUser, nickname);
  });

  socket.on(Events.sendMessage, function(message) {
    console.log("New message received.");
    console.log(socket.nickname);
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

  socket.on(Events.setColor, function({ color }) {
    socket.broadcast.emit(Events.setColor, { color });
  });

  socket.on(Events.setWidth, function({ width }) {
    socket.broadcast.emit(Events.setWidth, { width });
  });

  socket.on(Events.fillCanvas, function() {
    socket.broadcast.emit(Events.fillCanvas);
  });

  socket.on("disconnect", function() {
    socket.broadcast.emit(Events.userLeft, socket.nickname);
  });
}
