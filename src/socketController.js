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

  socket.on(Events.mouseMoving, function({ x, y, color, width }) {
    socket.broadcast.emit(Events.mouseMoving, { x, y, color, width });
  });

  socket.on(Events.stroking, function({ x, y, color, width }) {
    socket.broadcast.emit(Events.stroking, { x, y, color, width });
  });

  socket.on("disconnect", function() {
    socket.broadcast.emit(Events.userLeft, socket.nickname);
  });
}
