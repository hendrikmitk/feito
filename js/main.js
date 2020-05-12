// select items
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
let todoCount = 0;

// event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkDeleteTodo);

// create todo html string with template literals
const fetchedTodoString = (text) => `<div class="todo-list-item">
<li class="todo-list-item-name">${text}</li>
<button class="check-button" type="button">
<i class="fas fa-check-circle"></i>
</button>
<button class="delete-button" type="button">
<i class="fas fa-trash"></i>
</button>
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

// check or delete todo depending on which element has been clicked
function checkDeleteTodo(event) {
	const element = event.target;
	if (element.classList[1] === "fa-trash") {
		console.log("trash button clicked");
		const deletedTodo = element.parentElement.parentElement; // grab todo to be deleted
		deletedTodo.classList.add("todo-fade-out"); // add fade out transition
		deletedTodo.addEventListener("transitionend", function () {
			deletedTodo.remove(); // remove todo on transition end
		});
	} else if (element.classList[1] === "fa-check-circle") {
		console.log("check button clicked");
		const checkedTodo = element.parentElement.parentElement; // grab todo to be checked
		if (checkedTodo.parentElement.classList[1]) {
			checkedTodo.classList.remove("todo-completed"); // if todo is already checked, only remove class
		} else {
			checkedTodo.classList.toggle("todo-completed"); // if todo is not checked toggle class
		}
	}
}
