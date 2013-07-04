/* jshint expr: true */

var assert = require("chai").assert,
	Browser = require("zombie"),
	app = require("../../../app");

describe("The Todo App", function() {
	var server, browser, todoUrl;

	todoUrl = "http://localhost:3001/";

	before(function() {
		// before ALL the tests, start our node server (on a test port, 3001)
		server = app.listen(3001);
	});

	beforeEach(function() {
		// before EACH test, create a new zombie browser
		browser = new Browser({
			// useful to set debug when things go wrong...
			debug: false,
			// for some reason, these pages wait forever to load in zombie,
			// so we'll hack it here and set a max wait time to a low number.
			// this has the adverse affect of causing some tests to fail if
			// in fact we've guessed this number too low.
			// (in milliseconds)
			waitDuration: 500
		});
	});

	after(function() {
		// after ALL the tests, close the server
		server.close();
	});

	it("should show the login page to begin", function(done) {
		browser.visit(todoUrl, function() {
			assert(browser.text("#page-heading") === "Simple Todo",
				"page heading must match");
			assert(browser.text("#login-heading") === "Welcome to Simple Todo",
				"login heading must exist and match");

			// done with test
			done();
		});
	});

	describe("when logging in", function() {
		it("should show the list page", function(done) {
			browser.visit(todoUrl).then(function() {
				browser.fill("username", "Biff");
				return browser.pressButton("Login");
			}).then(function() {
				assert(browser.text("#list-heading") === "Things To Do",
					"list heading must exist and match");
			}).then(done, done);
		});
	});

	describe("after logging in", function() {
		beforeEach(function(done) {
			browser.visit(todoUrl).then(function() {
				browser.fill("username", "Biff");
				return browser.pressButton("Login");
			}).then(done, done);
		});

		describe("when visiting the todo app again", function() {
			it("should show the list page", function(done) {
				browser.visit(todoUrl).then(function() {
					assert(browser.text("#list-heading") === "Things To Do",
						"list heading must exist and match");
				}).then(done, done);
			});
		});

		describe("when adding a todo item", function() {
			var todoContent = "fly a kite";

			beforeEach(function(done) {
				browser.fill("todo-content", todoContent);
				browser.pressButton("Add Todo").then(done, done);
			});

			it("should show the added todo", function(done) {
				assert(browser.query(".todo-content").value === todoContent,
					"todo content must match");
				done();
			});

			it("should be able to delete the todo", function(done) {
				browser.pressButton(".delete-todo", function() {
					console.log(browser.html());
					assert(browser.query(".todo-content").value === todoContent,
						"todo content must match");
					done();
				});
			});

		});
	});

});