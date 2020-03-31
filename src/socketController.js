import Events from "./event";

export function controlSocket(socket) {
  socket.on(Events.LoggedIn, function(nickname) {
    console.log(nickname);
  });
}
