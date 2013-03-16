/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"underscore",
	"jquery",
	"todo-item-view",
	"todo-model",
	"text!../../templates/todoList.html"
],
function (Backbone, _, $, TodoItemView, TodoModel, todoList) {
	"use strict";

	return Backbone.View.extend({

		el: "#main",

		template: _.template(todoList),

		events: {
			// bind clicking the button to the addTodo method below
			"click #add-todo": "addTodo"
		},

		initialize: function() {
			// bind the sync on the collection with rendering this view
			this.collection.on( "sync", this.render, this );
		},

		render: function() {
			// first render the page, then the todos
			this.$el.html(this.template());

			var todosSelector = $("#todos");

			// clear the existing todos
			todosSelector.empty();
			// for each todo model, create a new todo view and render it,
			// appending it to the view
			this.collection.each(function (todo){
				var todoItemView = new TodoItemView({ model: todo });
				todosSelector.append(todoItemView.render().el);
			});

			return this;
		},

		addTodo: function(event) {
			var todoContentInput, todoContent, todoModel;

			// make sure the form is not actually submitted
			event.preventDefault();

			// get the value specified for the todo content
			todoContentInput = this.$("input[name='todo-content']");
			todoContent = todoContentInput.val();
			// clear the existing content now that we have it
			todoContentInput.val("");

			// create a new todo model
			todoModel = new TodoModel({
				content: todoContent
			});

			// add it to our collection
			this.collection.add(todoModel);

			// save the new todo to our backend
			// note: we do not need to save our entire collection here,
			// but just the single todo. This is because the backend
			// database links the user to the collection of todos, so it
			// will automatically handle adding it to the right collection
			todoModel.save();

		}
	});
});