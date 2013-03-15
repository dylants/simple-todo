function TodoDatabase() {
	this.todoDB = {};
};

TodoDatabase.prototype.getTodos = function(userId) {
	return this.todoDB[userId];
};

TodoDatabase.prototype.addTodo = function(userId, content) {
	var todo;

	if (!this.todoDB[userId]) {
		// initialize the array of todos
		this.todoDB[userId] = [];
	}

	// create a todo using the incoming content
	todo = {
		id: (new Date()).getTime(),
		content: content
	};

	// add the todo
	this.todoDB[userId].push(todo);

	// return the todo
	return todo;
};

TodoDatabase.prototype.updateTodo = function(userId, todoId, todoContent) {
	var todo, todos, index;

	// use the incoming data to build a todo
	todo = {
		id: todoId,
		content: todoContent
	};

	todos = this.todoDB[userId];

	// loop over the array of todos to find the index of the matching todo
	for (index=0; index<todos.length; index++) {
		if (todos[index].id == todo.id) {
			break;
		}
	}

	if (index === todos.length) {
		// we never found it, return false
		return false;
	}

	// update the todo
	todos[index] = todo;

	// return the todo
	return todo;
};

TodoDatabase.prototype.deleteTodo = function(userId, todoId) {
	var todos, index;

	todos = this.todoDB[userId];

	// loop over the array of todos to find the index of the matching todo
	for (index=0; index<todos.length; index++) {
		if (todos[index].id == todoId) {
			break;
		}
	}

	if (index === todos.length) {
		// we never found it, return false
		return false;
	}

	// remove the one found element
	todos.splice(index, 1);

	// return true
	return true;
};

module.exports = TodoDatabase;