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

		el: "#todo-app",

		events: {
			"click #logout": "logout"
		},

		initialize: function() {
		},

		render: function() {
		},

		renderLogin: function() {
			var loginModel, loginView;

			sessionModel = new SessionModel();
			loginView = new LoginView({
				model: sessionModel
			});
			$("#view").html(loginView.render().el);
		},

		renderList: function() {
			var listViewModel, listView;

			listViewModel = new ListViewModel();
			listView = new ListView({
				model: listViewModel
			});
			$("#view").html(listView.render().el);
		},

		logout: function() {
			// to logout we perform a delete on the session resource
			$.ajax({
				type: "DELETE",
				url: "/server/session"
			}).done(function() {
				Backbone.history.navigate("login", { trigger: true });
			});
		}

	}))();

	// return this instance of our app view to use wherever required
	return appView;
});