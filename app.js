var express = require("express"),
    path    = require("path"),
    fs      = require("fs");

var app = express();

app.configure(function() {
  app.set("port", 3000);
  app.set("views", __dirname + "/views");
  app.engine('html', require('ejs').renderFile);
  app.use(express.static(path.join(__dirname, "public")));
});

app.configure("development", function() {
  app.use(express.errorHandler());
});

// pull in all the controllers
fs.readdirSync("controllers").forEach(function(controllerName) {
  require("./controllers/" + controllerName)(app);
});

app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
