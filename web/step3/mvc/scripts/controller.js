var controller = (function () {

    return {
        add: add,
        filter: filter,
        complete: complete,
        remove: remove,
        edit: edit,
        ok: ok,
        cancel: cancel
    };

    // ========================================================================

    function add(value) {
        if (!value) return alert('Please enter a todo.');
        model.todos.unshift({ title: value });
        render();
    }

    function filter(value) {
        model.filter = +value || 0;
        render();
    }

    function complete(todo) {
        todo.completed = !todo.completed;
        render();
    }

    function remove(todo) {
        todo.removed = true;
        render();
    }

    function edit(todo) {
        todo.editting = true;
        model.lastEditing = todo;
        render();
    }

    function ok(todo, value) {
        todo.title = value || todo.title;
        todo.editting = false;
        render();
    }

    function cancel(todo) {
        todo.editting = false;
        render();
    }

    // ========================================================================

    function render() {
        view.render(getFilteredTodos());
    }

    function getFilteredTodos() {
        return model.todos.filter(function (t) {
            return !t.removed &&
                (model.filter == 0
                    ? true
                    : (model.filter == 1
                        ? !t.completed
                        : t.completed)
                );
        });
    }
}())