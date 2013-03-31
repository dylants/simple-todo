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
		var todoDatabase, myTodoId;

		beforeEach(function() {
			todoDatabase = new TodoDatabase();
			// add the todo, and get the ID of this newly added todo
			// from the returned todo's ID
			myTodoId = todoDatabase.addTodo(userId, myTodo).id;
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

		describe("when we update a todo for our userId", function() {
			var updatedTodo = "fly a kite";

			beforeEach(function() {
				todoDatabase.updateTodo(userId, myTodoId, updatedTodo);
			});

			it("should still have one todo in the database", function() {
				expect(todoDatabase.todoDB).to.exist;
				expect(todoDatabase.todoDB[userId]).to.have.length(1);
			});
			it("should contain our updated todo", function() {
				var returnedTodos, returnedTodo;

				returnedTodos = todoDatabase.getTodos(userId);
				expect(returnedTodos).to.exist;
				expect(returnedTodos).to.have.length(1);

				returnedTodo = returnedTodos[0];
				expect(returnedTodo).to.exist;
				expect(returnedTodo.id).to.exist;
				expect(returnedTodo.id).to.equal(myTodoId);
				expect(returnedTodo.content).to.exist;
				expect(returnedTodo.content).to.equal(updatedTodo);
			});
		});

		describe("when we update a todo with an ID that does not exist", function() {
			it("should not allow, returning false", function() {
				var result = todoDatabase.updateTodo(userId, 987, "more work");
				expect(result).to.be.false;
			});
		});

		describe("when we update a todo to no content", function() {
			it("should not allow, returning false", function() {
				var updatedTodo, returnedTodos, returnedTodo;
				var updatedTodo = todoDatabase.updateTodo(userId, myTodoId, "");
				expect(updatedTodo).to.be.false;

				// verify the old todo still exists
				returnedTodos = todoDatabase.getTodos(userId);
				expect(returnedTodos).to.exist;
				expect(returnedTodos).to.have.length(1);

				returnedTodo = returnedTodos[0];
				expect(returnedTodo).to.exist;
				expect(returnedTodo.id).to.exist;
				expect(returnedTodo.id).to.equal(myTodoId);
				expect(returnedTodo.content).to.exist;
				expect(returnedTodo.content).to.equal(myTodo);
			});
		});

		describe("when we delete my todo for our userId", function() {
			beforeEach(function() {
				todoDatabase.deleteTodo(userId, myTodoId);
			});

			it("should not have any todos remaining in the database", function() {
				expect(todoDatabase.todoDB).to.exist;
				expect(todoDatabase.todoDB[userId]).to.be.empty;
			});
			it("a getTodos should return no todos for our userId", function() {
				var returnedTodos = todoDatabase.getTodos(userId);
				expect(returnedTodos).to.exist;
				expect(returnedTodos).to.be.empty;
			});
		});

		describe("when we delete a todo with an ID that does not exist", function() {
			it("should not allow, returning false", function() {
				var result = todoDatabase.deleteTodo(userId, 987);
				expect(result).to.be.false;
			});
		});
	});

	describe("when adding a todo with no content", function() {
		var todoDatabase;

		beforeEach(function() {
			todoDatabase = new TodoDatabase();
		});

		it("should return false", function() {
			var returnedTodo = todoDatabase.addTodo(userId, "");
			expect(returnedTodo).to.be.false;
		});
	});
});