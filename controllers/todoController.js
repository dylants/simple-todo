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

		// add todo using the incoming content to the current user
		todo = todoDB.addTodo("1", req.body.content);

		// return back the object
		res.send(todo);
	});

	app.put("/todo/:id", function(req, res) {
		var todo;

		// update the existing todo with the incoming data
		todo = todoDB.updateTodo("1", req.params.id, req.body.content);

		if (todo) {
			// return back the object
			res.send(todo);
		} else {
			// return back false
			res.send("false");
		}
	});

	app.delete("/todo/:id", function(req, res) {
		var deleteSuccessful;

		// delete the todo using the incoming ID
		deleteSuccessful = todoDB.deleteTodo("1", req.params.id);

		if (deleteSuccessful) {
			// return back true
			res.send(true);
		} else {
			// return back false
			res.send(false);
		}
	});
};