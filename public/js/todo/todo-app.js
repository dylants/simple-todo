/*jshint browser:true */
/*global define:true */
define([
	"jquery",
	"backbone",
	"todo-router"
],
function($, Backbone, TodoRouter) {
	"use-strict";

	$(function() {
		// we must new up the TodoRouter before starting Backbone's history
		// because Backbone looks for any routers at start
		new TodoRouter();

		// load up Backbone's history, triggering the default route
		Backbone.history.start({
			silent: false
		});
	});
});