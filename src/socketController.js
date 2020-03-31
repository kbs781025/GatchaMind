export function controlSocket(socket) {
  socket.on("loggedin", function(nickname) {
    console.log(nickname);
  });
}
