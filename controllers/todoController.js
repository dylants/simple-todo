var TodoDatabase = require("../utilities/todoDatabase");
var todoDB = new TodoDatabase();

module.exports = function(app) {

	app.get("/todo", function(req, res) {
		var todos;

		// get the list of todos for this user, and return them
		todos = todoDB.getTodos("1");
		res.send(todos);
	});

	app.post("/todo", function(req, res) {
		var todo;

		// create a todo using the incoming content
		todo = {
			id: (new Date()).getTime(),
			content: req.body.content
		};

		// add it to the existing list of todos for this user
		todoDB.addTodo("1", todo);

		// return back the object
		res.send(todo);
	});

	app.put("/todo/:id", function(req, res) {
		var todo, updateSuccessful;

		// use the incoming data to build a todo
		todo = {
			id: req.params.id,
			content: req.body.content
		};

		// update the existing todo with this one
		updateSuccessful = todoDB.updateTodo("1", todo);

		if (updateSuccessful) {
			// return back the object
			res.send(todo);
		} else {
			// return back false
			res.send("false");
		}
	});

	app.delete("/todo/:id", function(req, res) {
		var id, deleteSuccessful;

		// the ID of the todo to delete
		id = req.params.id;

		// delete the todo
		deleteSuccessful = todoDB.deleteTodo("1", id);

		if (deleteSuccessful) {
			// return back true
			res.send(true);
		} else {
			// return back false
			res.send(false);
		}
	});
};