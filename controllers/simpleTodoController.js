module.exports = function(app) {
    app.get("/simple-todo*", function(req, res) {
        if (app.get("env") == "production") {
            res.render("simple-todo-production.html");
        } else {
            res.render("simple-todo-development.html");
        }
    });
};