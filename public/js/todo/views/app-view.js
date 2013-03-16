/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"jquery",
	"app-view-model",
	"session-model",
	"login-view",
	"todo-collection",
	"list-view",
	"text!../../templates/todoApp.html"
],
function (Backbone, $, AppViewModel, SessionModel, LoginView, TodoCollection,
	ListView, todoApp) {
	"use strict";

	var appView = new (Backbone.View.extend({

		el: "#app-view",

		template: _.template(todoApp),

		events: {
			// bind clicking the logout button to logout method below
			"click #logout": "logout"
		},

		initialize: function() {
			this.model = new AppViewModel();
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		},

		renderLogin: function() {
			var sessionModel, loginView;

			// first render this page
			this.model.title = "Todo Login";
			this.model.isLoggedIn = false;
			this.render();

			// set the page title
			document.title = "Simple Todo • Login";

			// build up the login view and render it
			sessionModel = new SessionModel();
			loginView = new LoginView({
				model: sessionModel
			});
			loginView.render();
		},

		renderList: function() {
			var todoCollection, listView;

			// first render this page
			this.model.title = "Todo List";
			this.model.isLoggedIn = true;
			this.render();

			// set the page title
			document.title = "Simple Todo • List";

			// build up the list view and render it
			todoCollection = new TodoCollection();
			listView = new ListView({
				collection: todoCollection
			});
			listView.render();
		},


		logout: function() {
			// to logout we perform a delete on the session resource
			$.ajax({
				type: "DELETE",
				url: "/session"
			}).done(function() {
				Backbone.history.navigate("login", { trigger: true });
			}).fail(function() {
				console.error("unable to delete session!");
			});
		}
	}))();

	// return this instance of our app view to use wherever required
	return appView;
});