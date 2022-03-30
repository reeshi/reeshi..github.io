// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");



// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);


// functions
function addTodo(event){
    // prevent deafult behaviour of submit button
    event.preventDefault();
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // add todo to the local storage
    saveLocalTodos(todoInput.value);

    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // trash button
    const trashdButton = document.createElement("button");
    trashdButton.innerHTML = "<i class='fas fa-trash'></i>"
    trashdButton.classList.add('trash-btn');
    todoDiv.appendChild(trashdButton);

    // append the newly created div to list
    todoList.appendChild(todoDiv);

    // clear todo input value
    todoInput.value = "";

}


function deleteCheck(event){
    // grab the item that is clicked
    const item = event.target;

    //Delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        removeTodoFromLocal(todo);
        todo.remove();
    }

    // check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


// save the todo item in local storage
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null ){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// get all todos from local storage
function getAllTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        // Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>"
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        // trash button
        const trashdButton = document.createElement("button");
        trashdButton.innerHTML = "<i class='fas fa-trash'></i>"
        trashdButton.classList.add('trash-btn');
        todoDiv.appendChild(trashdButton);

        // append the newly created div to list
        todoList.appendChild(todoDiv);
    });
}


function removeTodoFromLocal(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// fetch all todos from local storage
getAllTodos();

