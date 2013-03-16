/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"jquery",
	"header-view-model",
	"header-view",
	"session-model",
	"login-view",
	"todo-collection",
	"list-view",
	"text!../../templates/todoApp.html"
],
function (Backbone, $, HeaderViewModel, HeaderView, SessionModel, LoginView,
	TodoCollection,	ListView, todoApp) {
	"use strict";

	var appView = new (Backbone.View.extend({

		el: "#app-view",

		template: _.template(todoApp),

		initialize: function() {
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		renderHeader: function(title, isLoggedIn) {
			var headerViewModel, headerView;

			headerViewModel = new HeaderViewModel();
			headerViewModel.title = title;
			headerViewModel.isLoggedIn = isLoggedIn;
			headerView = new HeaderView({
				model: headerViewModel
			});
			headerView.render();
		},

		renderLogin: function() {
			var sessionModel, loginView;

			// first render this page
			this.render();

			// set the page title
			document.title = "Simple Todo • Login";

			// render the header
			this.renderHeader("Todo Login", false);

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
			this.render();

			// set the page title
			document.title = "Simple Todo • List";

			// render the header
			this.renderHeader("Todo List", true);

			// build up the list view and render it
			todoCollection = new TodoCollection();
			listView = new ListView({
				collection: todoCollection
			});
			listView.render();
		}
	}))();

	// return this instance of our app view to use wherever required
	return appView;
});