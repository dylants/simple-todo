/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"todo-model"
],
function (Backbone, TodoModel) {
	"use strict";

	return Backbone.Collection.extend({

		url: "/todo",

		model: TodoModel,

		initialize: function() {
			// load the list data for this user
			this.fetch();
		}

	});
});