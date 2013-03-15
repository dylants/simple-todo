/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"underscore",
	"text!../../templates/todoItem.html"
],
function (Backbone, _, todoItem) {
	"use strict";

	return Backbone.View.extend({

		className: "todo",

		template: _.template(todoItem),

		events: {
			"click .edit-todo": "editTodo",
			"click .delete-todo": "deleteTodo"
		},

		initialize: function() {
			this.model.on( "sync", this.render, this );
			this.model.on( "destroy", this.remove, this );
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		},

		editTodo: function() {
			// prevent the form submit
			event.preventDefault();

			var todoContent = this.$("input[id='todo-content']").val();
			this.model.set("content", todoContent);
			this.model.save();
		},

		deleteTodo: function() {
			// prevent the form submit
			event.preventDefault();

			// destroy calls delete on the backend, deleting it from the database
			this.model.destroy();
		}

	});
});