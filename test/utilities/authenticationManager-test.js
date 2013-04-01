/* jshint expr: true */

var rewire = require("rewire"),
	authenticationManager = rewire("../../utilities/authenticationManager"),
	expect = require("chai").expect;

describe("An AuthenticationManager", function() {
	var req, res, cookies, authSessionCookieName, username;

	beforeEach(function() {
		req = {};
		cookies = [];
		req.cookies = cookies;

		// setup a mock response object, with cookie methods
		res = (function() {
			var ret = {};
			var resUsername;

			ret.cookie = function(cookieName, username, options) {
				resUsername = username;
			};

			ret.getUsername = function() {
				return resUsername;
			};

			ret.clearCookie = function(cookieName) {
				resUsername = null;
			};

			return ret;
		})();

		// this is the name of the cookie used in testing
		authSessionCookieName =
			authenticationManager.__get__("AUTH_SESSION_COOKIE_NAME");
		username = "Biff";
	});

	describe("without a valid auth session cookie", function() {
		it("should show us as not logged in", function() {
			var result = authenticationManager.isLoggedIn(req, res);
			expect(result).to.exist;
			expect(result).to.be.false;
		});

		it("should not provide a username", function() {
			var result = authenticationManager.getUsername(req, res);
			expect(result).to.be.undefined;
		});
	});

	describe("with a valid auth session cookie", function() {
		beforeEach(function() {
			cookies[authSessionCookieName] = username;
		});

		it("should show us as logged in", function() {
			var result = authenticationManager.isLoggedIn(req, res);
			expect(result).to.exist;
			expect(result).to.be.true;
		});

		it("should return our username", function() {
			var result = authenticationManager.getUsername(req, res);
			expect(result).to.exist;
			expect(result).to.be.equal(username);
		});
	});

	describe("after logging in", function() {
		beforeEach(function() {
			authenticationManager.login(username, req, res);
		});

		it("should show a new cookie", function() {
			expect(res.getUsername()).to.exist;
			expect(res.getUsername()).to.equal(username);
		});

		describe("and then logging out", function() {
			beforeEach(function() {
				authenticationManager.logout(req, res);
			});

			it("should show an empty cookie", function() {
				expect(res.getUsername()).to.be.null;
			});
		});
	});
});