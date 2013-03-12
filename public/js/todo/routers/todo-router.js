/*jshint browser:true */
/*global define:true */
define([
	"backbone",
	"jquery",
	"app-view"
],
function (Backbone, $, appView) {
	"use strict";

	var TodoRouter = Backbone.Router.extend({
		routes: {
			"": "landing",
			"login": "login",
			"list": "list"
		},

		landing: function() {
			if (this.isLoggedIn()) {
				// if the user is logged in, send them to the list view
				this.navigate("list", { trigger: true });
			} else {
				// else send them to login
				this.navigate("login", { trigger: true });
			}
		},

		login: function() {
			// render the login view
			appView.renderLogin();
		},

		list: function() {
			// render the list view
			appView.renderList();
		},

		isLoggedIn: function() {
			// TODO implement me!
			return true;
		}
	});

	return TodoRouter;

});