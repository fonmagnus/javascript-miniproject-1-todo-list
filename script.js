// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  // prevent form for submitting
  event.preventDefault();

  // make sure user doesn't input empty string
  if (todoInput.value === "") {
    return;
  }

  // todoDiv creates a div that wraps up a single todo item
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li for single todo
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  newTodo.setAttribute("completed", false);
  todoDiv.appendChild(newTodo);

  // Completed / check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // attach todoDiv into the ul todo-list
  todoList.appendChild(todoDiv);

  // add todo to local stroage
  saveLocalTodos(todoInput.value);

  // clear todoInput value
  todoInput.value = "";
}

function deleteCheck(event) {
  // get the item which is clicked
  const item = event.target;

  // if the clicked target is a delete button
  if (item.classList[0] === "trash-btn") {
    // getting the single todo item
    const todo = item.parentElement;
    // animation for falling
    todo.classList.add("fall");
    removeLocalTodos(todo);

    // transitioned event : function runs after transition is finished
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // if the clicked item is check
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    todo.children[0].setAttribute("completed", true);
    completeTodo(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check if my todos already in localStorage
  let todoJson = { todo: todo, completed: false };

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todoJson);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li for single todo
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Completed / check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    if (todo.completed === true) {
      todoDiv.classList.add("completed");
    }

    // attach todoDiv into the ul todo-list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  let updatedTodos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoText = todo.children[0].innerText;
  todos.forEach(function (innerTodo) {
    if (innerTodo.todo !== todoText) {
      updatedTodos.push(innerTodo);
    }
  });

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function completeTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoText = todo.children[0].innerText;
  const hasCompletedClass = todo.classList.contains("completed");
  todos.forEach(function (innerTodo, index) {
    if (innerTodo.todo === todoText) {
      innerTodo.completed = hasCompletedClass;
      todos[index] = innerTodo;
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// localStorage.clear();
