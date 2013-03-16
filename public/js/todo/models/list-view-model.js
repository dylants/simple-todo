/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"user-model",
	"todo-collection"
],
function (Backbone, UserModel, TodoCollection) {
	"use strict";

	return Backbone.Model.extend({

		initialize: function() {
			// initialize the user model
			this.userModel = new UserModel();
			// load the data on this user
			this.userModel.fetch();
			// initialize the todo collection of models
			this.todoCollection = new TodoCollection();
		},

		getUserModel: function() {
			return this.userModel;
		},

		getTodoCollection: function() {
			return this.todoCollection;
		}

	});
});