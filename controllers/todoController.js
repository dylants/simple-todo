module.exports = function(app) {
	app.get("/todo", function(req, res) {
		res.send([
			{
				id: "1",
				content: "ride a bike"
			},
			{
				id: "2",
				content: "eat a snack"
			}
		]);
	});
};