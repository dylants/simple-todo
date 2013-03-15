/**
 * An in memory database that holds Todos. Todos contain both an ID and a piece
 * of content, and are tied to a userId. Each todo belongs to only one user, and
 * a user may have as many todos as they wish. This class provides methods to
 * get all the todos for a user, as well as add, update, or delete a todo for a user.
 */
function TodoDatabase() {
	this.todoDB = {};
};

/**
 * Returns all the todos for this userId
 * 
 * @param  {string} userId The ID of the user
 * @return {array}         The list of todos for this user
 */
TodoDatabase.prototype.getTodos = function(userId) {
	return this.todoDB[userId];
};

/**
 * Adds a todo for a given userId
 * 
 * @param {string} userId  The ID of the user
 * @param {string} content The content of the new Todo
 */
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

/**
 * Updates a Todo specified by the todoId for this userId
 * 
 * @param  {string} userId      The ID of the user
 * @param  {object} todoId      The ID of the todo to update
 * @param  {string} todoContent The content to update for this todo
 * @return {object}             The updated todo
 */
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

/**
 * Deletes a Todo specified by the todoId for this userId
 * 
 * @param  {string} userId The ID of the user
 * @param  {object} todoId The ID of the todo
 * @return {boolean}       True iff the delete was successful
 */
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