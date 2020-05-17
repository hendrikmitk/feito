// select items
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkDeleteTodo);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);

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

// save todos to local storage
function saveLocalTodos(todo) {
	// check if there already is a localTodos item in local storage
	let localTodos;
	if (localStorage.getItem("localTodos") === null) {
		localTodos = []; // no localTodos item in local storage, assign empty array to variable
	} else {
		localTodos = JSON.parse(localStorage.getItem("localTodos")); // parse array from local storage to variable
	}
	localTodos.push(todo);
	localStorage.setItem("localTodos", JSON.stringify(localTodos));
	console.log(todo.todoName, "added, total todos in localStorage:", localTodos.length);
	console.table(localTodos);
}

// get todos from local storage
function getLocalTodos() {
	// check if there are open or completed todo items in local storage
	let localTodos;
	if (localStorage.getItem("localTodos") === null) {
		localTodos = []; // no localTodos item in local storage, assign empty array to variable
	} else {
		localTodos = JSON.parse(localStorage.getItem("localTodos")); // parse array from local storage to variable
	}
	console.log("total todos in localStorage:", localTodos.length);
	localTodos.forEach(function (localTodo) {
		// append local todo items using throwaway <div>
		const div = document.createElement("div");
		div.innerHTML = fetchedTodoString(localTodo.todoName);
		// if-statement to check if todo is completed
		if (localTodo.completed === true) {
			div.firstChild.classList.add("todo-completed"); // add css class to html element
		}
		todoList.append(div.firstChild);
	});
	console.table(localTodos);
}

// remove todo from local storage
function removeLocalTodos(todo) {
	// check if there are open or completed todo items in local storage
	let localTodos;
	if (localStorage.getItem("localTodos") === null) {
		localTodos = []; // no localTodos item in local storage, assign empty array to variable
	} else {
		localTodos = JSON.parse(localStorage.getItem("localTodos")); // parse array from local storage to variable
	}
	console.log(todo.children[0].innerText, "deleted and removed from local storage");

	// remove todo from todos array in local storage
	let localTodoIndex = todo.children[0].innerText; // get text element index
	// TODO check why always the last array item is deleted
	localTodos.splice(localTodos.indexOf(localTodoIndex), 1); // remove element from local storage array by its index
	localStorage.setItem("localTodos", JSON.stringify(localTodos));
	console.log("total todos in localStorage:", localTodos.length);
	console.table(localTodos);
}

// update completed todo in local storage
function updateLocalToDo(todo) {
	// check if there already is a localTodos item in local storage
	let localTodos;
	if (localStorage.getItem("localTodos") === null) {
		localTodos = []; // no localTodos item in local storage, assign empty array to variable
	} else {
		localTodos = JSON.parse(localStorage.getItem("localTodos")); // parse array from local storage to variable
	}
	const updatedTodo = todo.children[0].innerText;

	// update completed object property in local strorage
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
