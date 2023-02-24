//function to get all todos
$(document).ready(async function () {
  const todos = await $.getJSON("/todos/api");
  console.log(todos);
  showTodos(todos);

  $("#inputField").focus();

  $("#inputForm").on("submit", function (e) {
    e.preventDefault();
    createTodo();
  });

  $("#todo-list").on("click", ".text", function () {
    updateTodo($(this));
  });

  $("#todo-list").on("click", ".delete", function () {
    removeTodo($(this).parent());
  });
});

function showTodos(todos) {
  for (let item of todos) {
    showTodo(item);
  }
}

function showTodo(todo) {
  let elem = $(
    `<li><span class="text ${todo.isCompleted ? "completed" : ""} ">${
      todo.text
    }</span> <span class="delete">x</span></li>`
  );
  $("#todo-list").prepend(elem);
  elem.data("id", todo._id);
  elem.data("isCompleted", todo.isCompleted);
}

//function to delete a todo todo will get deleted
async function updateTodo(elem) {
  const updatedTodo = await $.ajax({
    type: "PUT",
    url: `/todos/api/${elem.parent().data("id")}`,
    data: { isCompleted: !elem.parent().data("isCompleted") },
  });
  elem.toggleClass("completed");
}

//function to delete a todo
async function removeTodo(elem) {
  const deletedTodo = await $.ajax({
    type: "DELETE",
    url: `/todos/api/${elem.data("id")}`,
  });
  elem.remove();
}

// function to create a Todo todo will get created
async function createTodo() {
  const userInput = $("#inputField").val();
  const createdTodo = await $.post("/todos/api", { text: userInput });
  $("#inputField").val("");
  $("#inputField").focus();
  showTodo(createdTodo);
}
