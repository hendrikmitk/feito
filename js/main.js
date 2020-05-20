// select items
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkDeleteTodo);
filterOption.addEventListener("change", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);
document.addEventListener("DOMContentLoaded", styleFirstLastTodo);

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
		const div = document.createElement("div");
		div.innerHTML = fetchedTodoString(fetchedTodo);
		const newTodoObject = {
			todoName: fetchedTodo,
			completed: false,
		};
		saveLocalTodos(newTodoObject); // save todo to local storage
		todoList.append(div.firstChild);
		styleFirstLastTodo();
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
		const deletedTodo = element.parentElement.parentElement; // grab todo to be deleted
		deletedTodo.classList.add("todo-fade-out"); // add fade out transition
		removeLocalTodos(deletedTodo);
		deletedTodo.addEventListener("transitionend", function () {
			deletedTodo.remove(); // remove todo on transition end
			styleFirstLastTodo();
		});
	} else if (element.classList[1] === "fa-check-circle") {
		const checkedTodo = element.parentElement.parentElement; // grab todo to be checked
		updateLocalToDo(checkedTodo);
		if (checkedTodo.parentElement.classList[1]) {
			checkedTodo.classList.remove("todo-completed"); // if todo is already checked, only remove class
		} else {
			checkedTodo.classList.toggle("todo-completed"); // if todo is not checked toggle class
		}
	}
}

// filter todos for completed or not completed
function filterTodos(event) {
	const todos = todoList.childNodes;
	console.log("filter option:", event.target.value, ",", todoList.childNodes.length, "todos total");
	todos.forEach(function (todo) {
		switch (event.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("todo-completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "to-be-done":
				if (!todo.classList.contains("todo-completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

// style the first and the last todos HTML element
function styleFirstLastTodo() {
	const localTodos = checkLocalTodos();
	const todoList = document.getElementById("todo-list"); // get todo list main element from DOM
	for (let i = 0; i < localTodos.length; i++) {
		// check for class first-todo and last-todo and remove them
		if (todoList.children[i].classList.contains("first-todo")) {
			todoList.children[i].classList.remove("first-todo");
		} else if (todoList.children[i].classList.contains("last-todo")) {
			todoList.children[i].classList.remove("last-todo");
		}
		document.getElementById("todo-list").firstChild.classList.add("first-todo"); // add css class to first todo html element
		document.getElementById("todo-list").lastChild.classList.add("last-todo"); // add css class to last todo html element
	}
}

// check local storage for todos
function checkLocalTodos() {
	let localTodos;
	if (localStorage.getItem("localTodos") === null) {
		localTodos = []; // no localTodos item in local storage, assign empty array to variable
	} else {
		localTodos = JSON.parse(localStorage.getItem("localTodos")); // parse array from local storage to variable
	}
	return localTodos;
}

// save todos to local storage
function saveLocalTodos(todo) {
	const localTodos = checkLocalTodos();
	localTodos.push(todo);
	localStorage.setItem("localTodos", JSON.stringify(localTodos));
	console.log(todo.todoName, "added, total todos in localStorage:", localTodos.length);
	console.table(localTodos);
}

// get todos from local storage
function getLocalTodos() {
	const localTodos = checkLocalTodos();
	console.log("total todos in localStorage:", localTodos.length);
	localTodos.forEach(function (localTodo) {
		const div = document.createElement("div");
		div.innerHTML = fetchedTodoString(localTodo.todoName);
		if (localTodo.completed === true) {
			div.firstChild.classList.add("todo-completed"); // add css class to html element if todo is completed
		}
		todoList.append(div.firstChild);
	});
	console.table(localTodos);
}

// remove todo from local storage
function removeLocalTodos(todo) {
	const localTodos = checkLocalTodos();
	// remove JSON object item from array using splice and findIndex method
	localTodos.splice(
		localTodos.findIndex((v) => v.todoName === todo.children[0].innerText),
		1,
	);
	localStorage.setItem("localTodos", JSON.stringify(localTodos));
	console.log("total todos in localStorage:", localTodos.length);
	console.table(localTodos);
}

// update completed todo in local storage
function updateLocalToDo(todo) {
	const localTodos = checkLocalTodos();
	// update completed object property in local strorage
	const updatedTodo = todo.children[0].innerText;
	localTodos.forEach(function (localTodo) {
		if (localTodo.todoName === updatedTodo && localTodo.completed === false) {
			console.log("todo", updatedTodo, "completed");
			localTodo.completed = true;
			console.table(localTodos);
			return localTodo;
		} else if (localTodo.todoName === updatedTodo && localTodo.completed === true) {
			console.log("todo", updatedTodo, "uncompleted");
			localTodo.completed = false;
			console.table(localTodos);
			return localTodo;
		}
	});
	localStorage.setItem("localTodos", JSON.stringify(localTodos));
}
