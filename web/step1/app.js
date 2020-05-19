var todoInput = document.getElementById('todo-input'),
    todoList = document.getElementById('todo-list');

var todos = [];

todoInput.focus();

function addTodo() {
    var todo = todoInput.value;
    if (!todo) return alert('Please enter a todo.');
    todoInput.value = '';
    todos.push(todo);
    render();
}


// ============================================================================


function render() {
    todoList.innerHTML = '';
    todos.reverse().forEach(function (t, index) {
        todoList.append(createLi(t, ++index));
    });
}

function createLi(todo, index) {
    var li = document.createElement('li'),
        span = document.createElement('span');

    span.textContent = index + '. ' + todo;
    li.className = 'todo-item';
    li.appendChild(span);

    return li;
}