module.exports = function(app) {

	app.get("/todo", function(req, res) {
		res.send(req.session.todos);
	});

	app.post("/todo", function(req, res) {
		var content, todos, todo;

		content = req.body.content;
		todo = {
			id: (new Date()).getTime(),
			content: content
		};

		// need to add it to the existing list of todos
		todos = req.session.todos;
		// if the todos don't yet exist...
		if (todos === undefined) {
			// create the todos
			todos = [];
		}
		// add it to the list
		todos.push(todo);

		// store it back in the session
		req.session.todos = todos;

		// return back the object
		res.send(todo);
	});

	app.put("/todo/:id", function(req, res) {
		var id, content, todos, index, todo;

		todos = req.session.todos;
		id = req.params.id;
		content = req.body.content;
		todo = {
			id: id,
			content: content
		};

		// loop over the array of todos to find the index of the matching todo
		for (index=0; index<todos.length; index++) {
			if (todos[index].id == id) {
				break;
			}
		}

		if (index === todos.length) {
			// we never found it, return here
			res.send(false);
			return;
		}

		// update the todo
		todos[index] = todo;

		// store it back in the session
		req.session.todos = todos;

		// return back the object
		res.send(todo);
	});

	app.delete("/todo/:id", function(req, res) {
		var id, todos, index;

		todos = req.session.todos;
		id = req.params.id;

		// loop over the array of todos to find the index of the matching todo
		for (index=0; index<todos.length; index++) {
			if (todos[index].id == id) {
				break;
			}
		}

		if (index === todos.length) {
			// we never found it, return here
			res.send(false);
			return;
		}

		// remove the one found element
		todos.splice(index, 1);

		// store it back in the session
		req.session.todos = todos;

		// return back true
		res.send(true);
	});
};