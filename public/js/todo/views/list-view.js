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

		id: "view-container",

		template: _.template(todoList),

		events: {
			// bind clicking the button to the addTodo method below
			"click #add-todo": "addTodo",
			// bind clicking the logout button to logout method below
			"click #logout": "logout"
		},

		initialize: function() {
			// bind the sync of session model data to rendering this entire list view
			this.model.getSessionModel().on( "sync", this.renderList, this );
			// bind the sync on todo collection to just rendering the todos
			this.model.getTodoCollection().on( "sync", this.renderTodos, this );
		},

		render: function() {
			// call render list which will also render the todos
			this.renderList();
			return this;
		},

		renderList: function() {
			// first rewrite the html to our list view (including the user data)
			this.$el.html( this.template( this.model.getSessionModel().toJSON() ) );
			// now that we've rendered the list, we must render the todos
			this.renderTodos();
		},

		renderTodos: function() {
			var todosSelector = $("#todos");

			// first clear the existing todos
			todosSelector.empty();
			// for each todo model, create a new todo view and render it,
			// appending it to the view
			this.model.getTodoCollection().each(function (todo){
				var todoItemView = new TodoItemView({ model: todo });
				todosSelector.append(todoItemView.render().el);
			});
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
			this.model.getTodoCollection().add(todoModel);

			// save the new todo to our backend
			// note: we do not need to save our entire collection here,
			// but just the single todo. This is because the backend
			// database links the user to the collection of todos, so it
			// will automatically handle adding it to the right collection
			todoModel.save();

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