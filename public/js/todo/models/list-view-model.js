/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"session-model",
	"todo-collection"
],
function (Backbone, SessionModel, TodoCollection) {
	"use strict";

	return Backbone.Model.extend({

		initialize: function() {
			// initialize the session model
			this.sessionModel = new SessionModel();
			// load the data on this user
			this.sessionModel.fetch();
			// initialize the todo collection of models
			this.todoCollection = new TodoCollection();
		},

		getSessionModel: function() {
			return this.sessionModel;
		},

		getTodoCollection: function() {
			return this.todoCollection;
		}

	});
});