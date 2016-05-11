
/* JavaScript content from assets/services/authentication/authentication.service.js in folder common */
angular.module('helloworld')
	.service('authenticationService', function($location, $window, $rootScope, $q) {

		console.log('Registering challenge handler');
		$window.challengeHandler = WL.Client.createChallengeHandler("PushAppRealm");

		$window.challengeHandler.isCustomResponse = function(response) {
			if (!response || !response.responseJSON) return false;
			if (response.responseJSON.authStatus) return true;
			return false;
		};

		$window.challengeHandler.handleChallenge = function(response) {
			console.log('handleChallenge');
			if ($location.path() !== '/login') {
				console.log('Not already on login --> Redirecting');
				$rootScope.$apply(function() {
					$location.path('/login');
				});
			} else {
				console.log('Already on login --> No need to redirect');
			}
		};

		$window.challengeHandler.submitLoginFormCallback = function(response) {
			console.log('submitLoginFormCallback');
			if ($window.challengeHandler.isCustomResponse(response)) {
				var authStatus = response.responseJSON.authStatus;
				if (authStatus === 'required') {
					if (response.responseJSON.errorMessage)
						$rootScope.$apply(function() {
							$rootScope.authenticationError = response.responseJSON.errorMessage
						});

					$window.challengeHandler.handleChallenge(response);
				} else if (authStatus == "complete") {
					$window.challengeHandler.submitSuccess();
					$rootScope.$apply(function() {
						$location.path('/page1');
					});
				}
			} else {
				console.log('Not a custom response');
			}
		};

		this.logout = function() {
			return $q(function(resolve, reject) {
				console.log('Logging out');
				WL.Client.logout('PushAppRealm', {
					onSuccess: resolve
				});
			});
		};
	});