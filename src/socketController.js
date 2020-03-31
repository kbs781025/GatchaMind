import Events from "./event";

export function controlSocket(socket) {
  socket.on(Events.loggedIn, function(nickname) {
    console.log(nickname);
    socket.broadcast.emit(Events.newUser, nickname);
  });
}
