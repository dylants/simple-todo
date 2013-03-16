/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"jquery",
	"session-model",
	"login-view",
	"list-view-model",
	"list-view"
],
function (Backbone, $, SessionModel, LoginView, ListViewModel, ListView) {
	"use strict";

	var appView = new (Backbone.View.extend({

		el: "#app-view",

		initialize: function() {
		},

		render: function() {
		},

		renderLogin: function() {
			var sessionModel, loginView;

			// set the page title
			document.title = "Simple Todo • Login";

			// build up the login view and render it
			sessionModel = new SessionModel();
			loginView = new LoginView({
				model: sessionModel
			});
			this.$el.html(loginView.render().el);
		},

		renderList: function() {
			var listViewModel, listView;

			// set the page title
			document.title = "Simple Todo • List";

			// build up the list view and render it
			listViewModel = new ListViewModel();
			listView = new ListView({
				model: listViewModel
			});
			this.$el.html(listView.render().el);
		}
	}))();

	// return this instance of our app view to use wherever required
	return appView;
});