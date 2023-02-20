const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Todo = require("./models/todo");
const todoRouter = require("./routes/todos");

//mongodb connection stablished comment
//one line comment added by me
mongoose.connect("mongodb://localhost:27017/TodoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/todos", todoRouter);

//server started
app.listen(port, () => {
  console.log("server started!");
});
//adding a comment line to commit and show merge conflict
