var authenticationManager = require("../utilities/authenticationManager");

module.exports = function(app) {

	app.get("/user", function(req, res) {
		var firstName;

		// at this point in time, the only user data is the user's first
		// name, which is retrieved from the authentication manager as
		// their "username"
		firstName = authenticationManager.getUsername(req, res);

		if (firstName) {
			// if we have data, return it
			res.send({
				firstName: firstName
			});
		} else {
			// we have nothing, return nothing
			res.send("");
		}
	});
};