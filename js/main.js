// const todoInput = document.getElementById(".todo-input");
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");

todoButton.addEventListener("click", addTodo);

let todoCount = 0;

// create todo html string with template literals
const fetchedTodoString = (text) => `<li id="todo-list-item">${text}</li>`;

// get input, run fetchedTodoString funtion and append todo using throwaway <div>
function addTodo(event) {
	event.preventDefault(); // prevent page reload
	const fetchedTodo = document.getElementById("todo-input").value;
	console.log("new todo", fetchedTodo, "added,", ++todoCount, "todos total"); // log number of todos
	const div = document.createElement("div");
	div.innerHTML = fetchedTodoString(fetchedTodo);
	todoList.append(div.firstChild);
	document.getElementById("todo-input").value = ""; // clear text input
}
