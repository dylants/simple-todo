module.exports = function(app) {
	var LOGIN_SESSION_COOKIE_NAME = "simple_todo_session";

	app.get("/session", function(req, res) {
		// the username is stored in the session cookie
		var username = req.cookies[LOGIN_SESSION_COOKIE_NAME];

		if (username) {
			// if they have a username in the cookie, they
			// are "logged in", so return their username
			res.send({
				username: username
			});
		} else {
			// they are not logged in, return nothing
			res.send("");
		}
	});

	app.post("/session", function(req, res) {
		var username = req.body.username;

		// set the username in the session cookie
		// effectively "logging them in"
		// obviously this would be different in a "real"
		// application, but this is fine for our demo purposes
		res.cookie(LOGIN_SESSION_COOKIE_NAME, username);
		res.send("true");
	});

	app.delete("/session", function(req, res) {
		// clearing the cookie "logs them out"
		res.clearCookie(LOGIN_SESSION_COOKIE_NAME);
		res.send("true");
	});


	// TODO delete later, only for debugging
	app.get("/login", function(req, res) {
		res.cookie(LOGIN_SESSION_COOKIE_NAME, "Biff");
		res.send("true");
	});
	app.get("/logout", function(req, res) {
		res.clearCookie(LOGIN_SESSION_COOKIE_NAME);
		res.send("true");
	});
};