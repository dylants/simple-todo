var rewire = require("rewire");
var TodoDatabase = require("../utilities/todoDatabase");

describe("A TodoDatabase", function() {
	describe("that is newly constructed", function() {
		var todoDatabase;

		beforeEach(function() {
			todoDatabase = new TodoDatabase();
		});

		it("should be empty", function() {
			expect(todoDatabase.todoDB).toEqual({});
		});
	});
});