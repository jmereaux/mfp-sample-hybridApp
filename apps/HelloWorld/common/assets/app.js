/**
 * --------------------------------------------------------------------------------------------------------------------
 * Angular configuration
 * --------------------------------------------------------------------------------------------------------------------
 */
helloWorldApp.config(function($routeProvider, $locationProvider) {
		console.log('inside module.config');
		$routeProvider.otherwise({
			redirectTo: '/login'
		});
	})
	.run(function(authenticationService) {
		console.log('inside module.run');
	});