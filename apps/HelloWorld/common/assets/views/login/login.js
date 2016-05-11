'use strict';

angular.module('helloworld')
	.config(function($routeProvider) {
		console.log('Login route config');
		$routeProvider
			.when('/login', {
				templateUrl: 'assets/views/login/login.html',
        		controller: 'LoginCtrl'
			});
	});