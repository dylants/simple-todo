function AuthenticationManager() {
	// no instance variables as of yet...
};

// (private static)
var LOGIN_SESSION_COOKIE_NAME = "simple_todo_session";

AuthenticationManager.prototype.isLoggedIn = function(req, res) {
	// if the cookie exists and has a value, we're logged in
	if (req.cookies[LOGIN_SESSION_COOKIE_NAME]) {
		return true;
	} else {
		return false;
	}
};

AuthenticationManager.prototype.getUsername = function(req, res) {
	// the username is stored as the cookie value
	return req.cookies[LOGIN_SESSION_COOKIE_NAME];
};

AuthenticationManager.prototype.login = function(username, req, res) {
	// To login the user, we set the username in the session
	// cookie. This is obviously not the highest security, but
	// works for our demo application.
	res.cookie(LOGIN_SESSION_COOKIE_NAME, username);
};

AuthenticationManager.prototype.logout = function(req, res) {
	// clearing the cookie logs the user out
	res.clearCookie(LOGIN_SESSION_COOKIE_NAME);
};

// we're going to create one instance of this class and
// export it for others to pick up (singleton)
var authenticationManager = new AuthenticationManager();

module.exports = authenticationManager;