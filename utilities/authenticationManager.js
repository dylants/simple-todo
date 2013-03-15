/**
 * This class provides methods useful in authentication, such as login and logout.
 * We're also able to retrieve the username of the currently logged in user.
 */
function AuthenticationManager() {
	// no instance variables as of yet...
};

// the name of the cookie which holds our authentication session
var AUTH_SESSION_COOKIE_NAME = "simple_todo_session";

/**
 * Returns true iff the user is currently logged in
 * 
 * @param  {object}  req The current request
 * @param  {object}  res The current response
 * @return {Boolean}     true iff the user is currently logged in
 */
AuthenticationManager.prototype.isLoggedIn = function(req, res) {
	// if the cookie exists and has a value, we're logged in
	if (req.cookies[AUTH_SESSION_COOKIE_NAME]) {
		return true;
	} else {
		return false;
	}
};

/**
 * Returns the username of the user if they are currently logged in
 * 
 * @param  {object}  req The current request
 * @param  {object}  res The current response
 * @return {string}      The name of the currently logged in user (if available)
 */
AuthenticationManager.prototype.getUsername = function(req, res) {
	// the username is stored as the cookie value
	return req.cookies[AUTH_SESSION_COOKIE_NAME];
};

/**
 * Logs in the user using the passed in username.
 * 
 * @param  {string} username The username of the user to login
 * @param  {object}  req The current request
 * @param  {object}  res The current response
 */
AuthenticationManager.prototype.login = function(username, req, res) {
	// To login the user, we set the username in the session
	// cookie. This is obviously not the highest security, but
	// works for our demo application.
	res.cookie(AUTH_SESSION_COOKIE_NAME, username);
};

/**
 * Logs out the currently logged in user.
 * 
 * @param  {object}  req The current request
 * @param  {object}  res The current response
 */
AuthenticationManager.prototype.logout = function(req, res) {
	// clearing the cookie logs the user out
	res.clearCookie(AUTH_SESSION_COOKIE_NAME);
};

// we're going to create one instance of this class and
// export it for others to pick up (singleton)
var authenticationManager = new AuthenticationManager();

module.exports = authenticationManager;