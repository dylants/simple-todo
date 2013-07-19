module.exports = function(app) {
	app.get("/simple-todo*", function(req, res) {
		res.render("simple-todo.html");
	});
};