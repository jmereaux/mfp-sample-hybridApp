angular.module('helloworld')
	.config(function($routeProvider) {
		$routeProvider
			.when('/page2', {
				templateUrl: 'assets/views/page2/page2.html',
        		controller: 'Page2Ctrl'
			});
	});