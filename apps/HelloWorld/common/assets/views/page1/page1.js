'use strict';

angular.module('helloworld')
	.config(function($routeProvider) {
		$routeProvider
			.when('/page1', {
				templateUrl: 'assets/views/page1/page1.html',
        		controller: 'Page1Ctrl'
			});
	});