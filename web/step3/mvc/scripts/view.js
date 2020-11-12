var view = (function (g) {

    g.addTodo = addTodo;
    g.filterTodos = filterTodos;

    var $ = document.querySelector.bind(document);
    $.ce = document.createElement.bind(document);

    var _todoInput = $('#todo-input'),
        _todoList = $('#todo-list');

    _todoInput.focus();
    document.body.onclick = _todoInput.focus.bind(_todoInput);


    return {
        render: render
    };

    // ========================================================================

    function addTodo() {
        controller.add(_todoInput.value);
        _todoInput.value = '';
        _todoInput.focus();
    }

    function filterTodos(e) {
        var target = e.target,
            buttons = target.parentNode.children;
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('active');
        }
        target.classList.add('active');
        controller.filter(target.value);
    }

    function render(todos) {
        _todoList.innerHTML = '';
        (todos || []).forEach(function (t, index) {
            _todoList.append(createTodo(t, ++index));
        });
    }

    function createTodo(todo, index) {
        return (todo.editting ? createEdittingTodo : createNormalTodo)(todo, index);
    }

    function createEdittingTodo(todo, index) {
        var li = $.ce('li'), indexSpan, titleInput, okButton, cancelButton;

        li.className = 'todo-item todo-item-editting';
        li.appendChild(indexSpan = $.ce('span'));
        li.appendChild(titleInput = $.ce('input'));
        li.appendChild(okButton = $.ce('button'));
        li.appendChild(cancelButton = $.ce('button'));

        indexSpan.textContent = index + '.';
        indexSpan.className = 'todo-index';

        titleInput.value = todo.title;
        titleInput.className = 'todo-title';

        okButton.className = 'todo-editting-ok';
        okButton.onclick = function() { controller.ok(todo, titleInput.value); };

        cancelButton.className = 'todo-editting-cancel';
        cancelButton.onclick = controller.cancel.bind(null, todo);

        model.lastEditing === todo && setTimeout(titleInput.focus.bind(titleInput));

        return li;
    }

    function createNormalTodo(todo, index) {
        var li = $.ce('li'), indexSpan, titleSpan, completeButton, removeButton, editButton;

        li.className = 'todo-item' + (todo.completed ? ' todo-item-completed' : '');
        li.appendChild(indexSpan = $.ce('span'));
        li.appendChild(titleSpan = $.ce('span'));
        li.appendChild(completeButton = $.ce('button'));
        !todo.completed && li.appendChild(removeButton = $.ce('button'));
        !todo.completed && li.appendChild(editButton = $.ce('button'));

        indexSpan.textContent = index + '.';
        indexSpan.className = 'todo-index';

        titleSpan.textContent = todo.title;
        titleSpan.className = 'todo-title';

        completeButton.className = 'todo-complete';
        completeButton.onclick = controller.complete.bind(null, todo);

        if (todo.completed) return li;

        removeButton.className = 'todo-remove';
        removeButton.onclick = controller.remove.bind(null, todo);

        editButton.className = 'todo-edit';
        editButton.onclick = controller.edit.bind(null, todo);

        return li;
    }

}(window));