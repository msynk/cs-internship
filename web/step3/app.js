var _todoInput = document.getElementById('todo-input'),
    _todoList = document.getElementById('todo-list'),
    _todos = [],
    _filter = 0;

init();

// ============================================================================

function init() {
    _todoInput.focus();
}

function addTodo() {
    var title = _todoInput.value;
    if (!title) return alert('Please enter a todo.');
    _todoInput.value = '';
    _todos.unshift({ title: title });
    render();
}

function filterTodos(e) {
    var target = e.target,
        buttons = target.parentNode.children;
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    target.classList.add('active');
    _filter = +target.value;
    render();
}


// ============================================================================


function render() {
    _todoList.innerHTML = '';
    getFilteredTodos().forEach(function (t, index) {
        _todoList.append(createLi(t, ++index));
    });

    function getFilteredTodos() {
        return _todos.filter(function (t) {
            return !t.removed &&
                (_filter == 0
                ? true
                : (_filter == 1
                    ? !t.completed
                    : t.completed)
                );
        });
    }
}


function createLi(todo, index) {
    var li = document.createElement('li'),
        indexSpan = document.createElement('span'),
        titleSpan = document.createElement('span'),
        completeButton = document.createElement('button'),
        removeButton = document.createElement('button');

    indexSpan.textContent = index + '.';
    indexSpan.className = 'todo-index';

    titleSpan.textContent = todo.title;
    titleSpan.className = 'todo-title';

    // completeButton.textContent = 'V';
    completeButton.className = 'todo-complete';
    completeButton.onclick = function () {
        todo.completed = !todo.completed;
        render();
    };

    // removeButton.textContent = 'X';
    removeButton.className = 'todo-remove';
    removeButton.onclick = function () {
        todo.removed = true;
        render();
    }

    li.className = 'todo-item' + (todo.completed ? ' todo-item-completed' : '');
    li.appendChild(indexSpan);
    li.appendChild(titleSpan);
    li.appendChild(completeButton);
    li.appendChild(removeButton);

    return li;
}