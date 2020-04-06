import Events from "./event";
import { chooseWord } from "./words";

let userSockets = [];
let quizWord = null;
let quizTimeout = null;
let gameStarted = false;

// setInterval(function() {
//   console.log(userSockets);
// }, 5000);

function selectRandomPainter() {
  return userSockets[Math.floor(Math.random() * userSockets.length)];
}

export function controlSocket(io, socket) {
  function notifyUserUpdate() {
    io.emit(Events.userUpdate, userSockets);
  }

  function notifyWinner(winner) {
    io.emit(Events.userWin, { winner, userSockets });
  }

  function endGame(winner) {
    if (winner) {
      notifyWinner(winner);
    } else {
      io.emit(Events.gameEnd, quizWord);
    }
    startGame();
  }

  function startGame() {
    gameStarted = true;
    const painter = selectRandomPainter();
    quizWord = chooseWord();

    console.log(quizWord);

    io.emit(Events.gameStart, painter);
    quizTimeout = setTimeout(endGame, 10000);
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

    if (userSockets.length >= 2 && !gameStarted) {
      startGame();
    }
  });

  socket.on(Events.sendMessage, function(message) {
    console.log("New message received.");
    socket.broadcast.emit(Events.newMessage, {
      message,
      nickname: socket.nickname
    });

    if (message === quizWord) {
      for (let user of userSockets) {
        if (user.id === socket.id) {
          user.score += 10;
          clearTimeout(quizTimeout);
          endGame(user);
          break;
        }
      }
    }
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
