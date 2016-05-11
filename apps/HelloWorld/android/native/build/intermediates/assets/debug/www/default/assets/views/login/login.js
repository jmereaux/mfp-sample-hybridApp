
/* JavaScript content from assets/views/login/login.js in folder common */
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