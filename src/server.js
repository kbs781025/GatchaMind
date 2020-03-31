import express from "express";
import path from "path";
import socketio from "socket.io";
import http from "http";
import morgan from "morgan";

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "static")));
app.use(morgan("dev"));
app.get("/", (req, res) => res.render("home"));

const server = http.createServer(app);

const io = socketio.listen(server);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

io.on("connection", socket => {
  socket.broadcast.emit("Hello");
  socket.on("Bye", () => console.log("Someone said bye."));
});

