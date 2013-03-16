var authenticationManager = require("../utilities/authenticationManager");

module.exports = function(app) {

	app.get("/session", function(req, res) {
		// so for "get session" we'll return true if the session exists,
		// else false if the session does not exist (the user is not logged in)
		if (authenticationManager.isLoggedIn(req, res)) {
			res.send("true");
		} else {
			res.send("false");
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