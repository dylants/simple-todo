module.exports = function(app) {
    app.get("/", function(req, res) {
        res.redirect("/simple-todo");
    });
    app.get("/simple-todo*", function(req, res) {
        if (app.get("env") == "production") {
            res.render("simple-todo-production.html");
        } else {
            res.render("simple-todo-development.html");
        }
    });
};
