/* jshint browser:true */
/* global define:true */
define([
	"user-model"
],
function (UserModel) {
	"use strict";

	function AppViewModel() {
		this.title = "";
		this.isLoggedIn = false;
		this.userModel = new UserModel();
	}

	AppViewModel.prototype.toJSON = function() {
		// first make sure the user model is up to date
		this.userModel.fetch();

		return {
			title: this.title,
			isLoggedIn: this.isLoggedIn,
			firstName: this.userModel.get("firstName")
		};
	};

	return AppViewModel;
});