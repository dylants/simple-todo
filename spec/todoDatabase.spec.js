var TodoDatabase = require("../utilities/todoDatabase");

describe("A TodoDatabase", function() {
	var userId = "Biff";

	describe("that is newly constructed", function() {
		var todoDatabase;

		beforeEach(function() {
			todoDatabase = new TodoDatabase();
		});

		it("should be defined", function() {
			expect(todoDatabase.todoDB).toBeDefined();
		});
		it("should be empty", function() {
			expect(todoDatabase.todoDB).toEqual({});
		});
		it("should return undefined on a get for our user", function() {
			expect(todoDatabase.getTodos(userId)).toBeUndefined();
		});
	});
});