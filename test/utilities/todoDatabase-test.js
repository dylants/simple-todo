/* jshint expr: true */

var TodoDatabase = require("../../utilities/todoDatabase"),
	expect = require("chai").expect;

describe("A TodoDatabase", function() {
	var userId = "Biff",
		myTodo = "Mow the lawn";


	describe("that is newly constructed", function() {
		var todoDatabase;

		beforeEach(function() {
			todoDatabase = new TodoDatabase();
		});

		it("should exist", function() {
			expect(todoDatabase.todoDB).to.exist;
		});
		it("should be empty", function() {
			expect(todoDatabase.todoDB).to.be.empty;
		});
		it("should return undefined on a get for our user", function() {
			expect(todoDatabase.getTodos(userId)).to.be.undefined;
		});
	});

	describe("that contains a single todo for our userId", function() {
		var todoDatabase;

		beforeEach(function() {
			todoDatabase = new TodoDatabase();
			todoDatabase.addTodo(userId, myTodo);
		});

		it("should have one todo in the database", function() {
			expect(todoDatabase.todoDB).to.exist;
			expect(todoDatabase.todoDB[userId]).to.have.length(1);
		});

		describe("when we getTodos for our userId", function() {
			var returnedTodos;

			beforeEach(function() {
				returnedTodos = todoDatabase.getTodos(userId);
			});

			it("should exist and have length 1", function() {
				expect(returnedTodos).to.exist;
				expect(returnedTodos).to.have.length(1);
			});

			describe("the first todo in the list", function() {
				var returnedTodo;

				beforeEach(function() {
					returnedTodo = returnedTodos[0];
				});

				it("should have an id", function() {
					expect(returnedTodo.id).to.exist;
				});
				it("the content should match the content we supplied", function() {
					expect(returnedTodo.content).to.equal(myTodo);
				});
			});
		});

		describe("when we add a todo for our userId", function() {
			var anotherTodo = "take out the garbage";

			beforeEach(function() {
				todoDatabase.addTodo(userId, anotherTodo);
			});

			it("should have two todos in the database", function() {
				expect(todoDatabase.todoDB).to.exist;
				expect(todoDatabase.todoDB[userId]).to.have.length(2);
			});

			describe("when we getTodos for our userId", function() {
				var returnedTodos;

				beforeEach(function() {
					returnedTodos = todoDatabase.getTodos(userId);
				});

				it("should exist and have length of 2", function() {
					expect(returnedTodos).to.exist;
					expect(returnedTodos).to.have.length(2);
				});

				describe("the first todo", function() {
					var firstTodo;

					beforeEach(function() {
						firstTodo = returnedTodos[0];
					});

					it("should match the content of our first todo", function() {
						expect(firstTodo.content).to.equal(myTodo);
					});
				});

				describe("the second todo", function() {
					var secondTodo;

					beforeEach(function() {
						secondTodo = returnedTodos[1];
					});

					it("should match the content of our second todo", function() {
						expect(secondTodo.content).to.equal(anotherTodo);
					});
				});
			});
		});
	});
});