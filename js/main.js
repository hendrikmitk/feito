// select items
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
let todoCount = 0;
// const checkButton = document.querySelectorAll(".check-button");
// const deleteButton = document.querySelectorAll(".delete-button");
// let checkButton = document.getElementsByClassName(".check-button");
// let deleteButton = document.getElementsByClassName(".delete-button");

// event listener
todoButton.addEventListener("click", addTodo);
// checkButton.addEventListener("click", checkTodo);
// deleteButton.addEventListener("click", deleteTodo);

// create todo html string with template literals
const fetchedTodoString = (text) => `<div class="todo-list-item">
<li class="todo-list-item-name">${text}</li>
<div class="todo-list-buttons">
<button class="check-button" type="button">
<i class="fas fa-check-circle"></i>
</button>
<button class="delete-button" type="button">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`;

// get input, run fetchedTodoString funtion and append todo using throwaway <div>
function addTodo(event) {
	event.preventDefault(); // prevent page reload
	const fetchedTodo = document.getElementById("todo-input").value;
	if (fetchedTodo) {
		// input has value
		console.log("new todo", fetchedTodo, "added,", ++todoCount, "todos total"); // log number of todos
		const div = document.createElement("div");
		div.innerHTML = fetchedTodoString(fetchedTodo);
		todoList.append(div.firstChild);
		document.getElementById("todo-input").value = ""; // clear text input
	} else {
		// input has no value
		console.log("no input given");
		alert("Please enter a todo");
		document.getElementById("todo-input").focus(); // re-focus text input
	}
}

// function checkTodo(event) {
// 	event.preventDefault(); // prevent page reload
// 	console.log("todo is ticked off");
// }

// function deleteTodo(event) {
// 	event.preventDefault(); // prevent page reload
// 	console.log("todo deleted");
// }
