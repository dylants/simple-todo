module.exports = function(app) {
	app.get("/session", function(req, res) {
		// for now, let's hard code that we're logged in
		res.send({
			username: "Biff"
		});
	});
};