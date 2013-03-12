module.exports = function(app) {
	app.get("/session", function(req, res) {
		res.send({
			username: "Biff"
		});
	});
};