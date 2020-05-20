var _todoInput = document.getElementById('todo-input'),
    _todoList = document.getElementById('todo-list'),
    _todos = [];

_todoInput.focus();

function addTodo() {
    var todo = _todoInput.value;
    if (!todo) return alert('Please enter a todo.');
    _todoInput.value = '';
    _todos.unshift(todo);
    render();
}


// ============================================================================


function render() {
    _todoList.innerHTML = '';
    _todos.forEach(function (t, index) {
        _todoList.append(createLi(t, ++index));
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