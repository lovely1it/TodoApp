const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Todo = require("./models/todo");
const todoRouter = require("./routes/todos");

//mongodb connection stablished comment
//one line comment added by me which is lovely
mongoose.connect("mongodb://localhost:27017/TodoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //DB connection established

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//comment 1 for merge conflict
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index"); // index file will render
});
app.use("/todos", todoRouter);

//server started
app.listen(port, () => {
  console.log("server started!"); // server will be start
});
