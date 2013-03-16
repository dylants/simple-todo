/* jshint browser:true */
/* global define:true */
define([
	"backbone"
],
function (Backbone) {
	"use strict";

	return Backbone.Model.extend({

		url: "/user",

		defaults: {
			firstName: ""
		}
	});
});