var authenticationManager = require("../utilities/authenticationManager");

module.exports = function(app) {

	app.get("/session", function(req, res) {
		var username;

		if (authenticationManager.isLoggedIn(req, res)) {
			// if they are logged in, return their username
			res.send({
				username: authenticationManager.getUsername(req, res)
			});
		} else {
			// they are not logged in, return nothing
			res.send("");
		}
	});

	app.post("/session", function(req, res) {
		var username = req.body.username;

		// use the authentication manager to log the user in
		authenticationManager.login(username, req, res);

		// return true -- login worked
		res.send("true");
	});

	app.delete("/session", function(req, res) {
		// use the authentication manager to log the user out
		authenticationManager.logout(req, res);

		// return true -- logout worked
		res.send("true");
	});
};