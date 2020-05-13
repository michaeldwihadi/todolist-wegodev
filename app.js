//all UI element
const todoForm = document.querySelector("#todo-form");
const todoInput =  document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

//all EventListener
immediateLoadEventListener();

function immediateLoadEventListener() {

  //EventListener to get todos from localStorage then render in browser
  document.addEventListener("DOMContentLoaded", getTodos); //means this function will be run
                                                          //when all the loading is done at first time

  //EventListener to add todo
  todoForm.addEventListener("submit", addTodo);

  //EventListener to delete 1 todos
  todoList.addEventListener("click", deleteTodo);

  //EventListener to delete all todos
  clearButton.addEventListener("click", clearTodos);

  //EventListener to filter todos
  filterInput.addEventListener("keyup", filterTodos);
}

//Reusable Code
function createTodoElement(value) {
  // create li element
  const li = document.createElement("li");

  // adding class to li
  li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";

  //adding children to li
  li.appendChild(document.createTextNode(value));

  //create delete button
  const a = document.createElement("a");

  //adding property to a
  a.href = "#";
  a.className = "badge badge-danger delete-todo";

  a.innerHTML = "Delete";

  //insert a into li children
  li.appendChild(a);

  //insert li element into todolist element
  todoList.appendChild(li);
}

function getItemFromLocalStorage(){
  let todos;

  if(localStorage.getItem("todos") == null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

// DOM functions
function getTodos(){
  const todos = getItemFromLocalStorage();

  todos.forEach((todo) => {
    createTodoElement(todo);
  });

}

function addTodo(e){
  e.preventDefault();

  if(todoInput.value){
    createTodoElement(todoInput.value);

    addTodoLocalStorage(todoInput.value);

    todoInput.value = "";
  }
  else {
    alert("Please Enter a Value !");
  }

}

function addTodoLocalStorage(todoInputValue){
  const todos = getItemFromLocalStorage();

  todos.push(todoInputValue);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e){
  e.preventDefault(); 

  if(e.target.classList.contains("delete-todo")){
    if(confirm("Are You Sure You Want To Delete?")){
      const parent = e.target.parentElement;

      parent.remove();

      deleteTodoLocalStorage(parent);
    }
  }
}

function deleteTodoLocalStorage(deletedElement){
  const todos = getItemFromLocalStorage();

  todos.forEach((todo, index) => {
    if(deletedElement.firstChild.textContent == todo){
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos(){
  todoList.innerHTML = "";

  clearTodosLocalStorage();
}

function clearTodosLocalStorage(){
  localStorage.clear();
}

function filterTodos(e) {
  const filterText = e.target.value.toLowerCase();
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((item) => {
     const itemText = item.firstChild.textContent.toLowerCase();

     if(itemText.indexOf(filterText) !== -1){
       item.setAttribute("style", "display: block;");
     } else
     {
       item.setAttribute("style", "display: none !important;");
     }
  });

}
