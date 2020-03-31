import Events from "./event";

export function controlSocket(socket) {
  socket.on(Events.loggedIn, function(nickname) {
    console.log(nickname);
    socket.nickname = nickname;
    socket.broadcast.emit(Events.newUser, nickname);
  });

  socket.on("disconnect", function() {
    socket.broadcast.emit(Events.userLeft, socket.nickname);
  });
}
