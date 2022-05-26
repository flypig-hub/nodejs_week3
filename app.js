const express = require("express");
const connect = require("./schemas");

const app = express();
const port = 2000;

connect();

const post_rRouter = require("./routes/post_r");


const requestmiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestmiddleware);
app.use("/api", [post_rRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
