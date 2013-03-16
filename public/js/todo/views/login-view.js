/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"underscore",
	"jquery",
	"text!../../templates/todoLogin.html"
],
function (Backbone, _, $, todoLogin) {
	"use strict";

	return Backbone.View.extend({

		el: "#main",

		template: _.template(todoLogin),

		events: {
			"click #login": "login"
		},

		initialize: function() {
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		},

		login: function(event) {
			// prevent the form submit
			event.preventDefault();

			var username = this.$("input[name='username']").val();
			this.loginSubmit(username);
		},

		loginSubmit: function(username) {
			// sanity check
			if (!username) {
				// send them back to the login page
				Backbone.history.navigate("login", { trigger: true });
				return;
			}

			// perform the login
			this.model.save({
				"username": username
			},
			{
				success: function(model, response) {
					// navigate to the list view
					Backbone.history.navigate("list", { trigger: true });
				},
				error: function(model, response) {
					// navigate backk to the login view
					Backbone.history.navigate("login", { trigger: true });
				}
			});

		}

	});
});