require.config({
	paths: {
		"underscore": "../lib/underscore-1.4.4",
		"backbone": "../lib/backbone-0.9.10",
		"jquery": "../lib/jquery-1.9.1",
		"text": "../lib/text-2.0.5",
		"list-view-model": "models/list-view-model",
		"session-model": "models/session-model",
		"todo-collection": "models/todo-collection",
		"todo-model": "models/todo-model",
		"todo-router": "routers/todo-router",
		"app-view": "views/app-view",
		"list-view": "views/list-view",
		"login-view": "views/login-view",
		"todo-item-view": "views/todo-item-view",
		"todo-app": "todo-app"
	},
	shim: {
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

// require the app, which starts up our todo application
require(["todo-app"]);