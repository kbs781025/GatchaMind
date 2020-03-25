import express from "express";
import path from "path";

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
