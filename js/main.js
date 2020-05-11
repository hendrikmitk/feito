// const todoInput = document.getElementById(".todo-input");
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");

todoButton.addEventListener("click", addTodo);

let todoCount = 0;

// Create todo html string with template literals
const fetchedTodoString = (text) => `<li id="todo-list-item">${text}</li>`;

function addTodo(event) {
	event.preventDefault();
	// console.log("Add todo", ++todoCount);
	const fetchedTodo = document.getElementById("todo-input").value;
	// console.log("todo fetched:", fetchedTodo);

	const div = document.createElement("div");
	div.innerHTML = fetchedTodoString(fetchedTodo);
	todoList.append(div.firstChild);
}
