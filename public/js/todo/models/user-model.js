/* jshint browser:true */
/* global define:true */
define([
	"backbone"
],
function (Backbone) {
	"use strict";

	return Backbone.Model.extend({

		urlRoot: "/user",

		defaults: {
			firstName: ""
		},

		initialize: function() {
			// load the list data for this user
			this.fetch();
		}
	});
});