/* jshint expr: true */

var assert = require("chai").assert,
	Browser = require("zombie"),
	app = require("../../../app");

describe("The Todo App", function() {
	var server, browser, todoUrl;

	todoUrl = "http://localhost:3001/simple-todo";

	before(function() {
		// before ALL the tests, start our node server (on a test port, 3001)
		server = app.listen(3001);
	});

	beforeEach(function() {
		// before EACH test, create a new zombie browser
		// 
		// some useful options when things go wrong:
		// debug: true  =  outputs debug information for zombie
		// waitDuration: 500  =  will only wait 500 milliseconds
		//   for the page to load before moving on
		browser = new Browser();
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

			before(function(done) {
				browser.fill("todo-content", todoContent);
				browser.pressButton("Add Todo").then(done, done);
			});

			it("should show the added todo", function(done) {
				assert(browser.query(".todo-content").value === todoContent,
					"todo content must match");
				// done with test
				done();
			});

			it("should be able to delete the todo", function(done) {
				browser.pressButton(".delete-todo", function() {
					assert.isNull(browser.query(".todo-content"),
						"todo should be deleted");
					// done with test
					done();
				});
			});

		});
	});

});