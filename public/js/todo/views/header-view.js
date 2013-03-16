/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"underscore",
	"jquery",
	"text!../../templates/todoHeader.html"
],
function (Backbone, _, $, todoHeader) {
	"use strict";

	return Backbone.View.extend({

		el: "header",

		template: _.template(todoHeader),

		events: {
			"click #login-header": "login",
			"click #logout-header": "logout"
		},

		initialize: function() {
			this.model.userModel.on( "sync", this.render, this );
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		},

		login: function(event) {
			Backbone.history.navigate("login", { trigger: true });
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

	});
});