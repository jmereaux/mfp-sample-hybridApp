'use strict';

angular.module('helloworld')
	.controller('Page2Ctrl', function($scope, $location, authenticationService) {

		console.log('Init Page2Ctrl');

		$scope.logout = function() {
			authenticationService.logout().then(function() {
				// $location.path('/login');
				WL.Client.reloadApp();
			});
		};

		$scope.cleanNotificationBadge = function() {
			WL.Badge.setNumber(0);
			WL.SimpleDialog.show('Push Notifications', 'Badge cleaned', [{
				text: 'Close',
				handler: function() {}
			}]);
		};

		$scope.isPushSupported = function() {
			var isSupported = false;
			if (WL.Client.Push) {
				isSupported = WL.Client.Push.isPushSupported();
			}
			WL.SimpleDialog.show('Push Notifications', JSON.stringify(isSupported), [{
				text: 'Close',
				handler: function() {}
			}]);
		};

		$scope.isPushSubscribed = function() {
			var isSubscribed = false;
			if (WL.Client.Push) {
				isSubscribed = WL.Client.Push.isSubscribed('myPush');
			}
			WL.SimpleDialog.show('Push Notifications', JSON.stringify(isSubscribed), [{
				text: 'Close',
				handler: function() {}
			}]);
		};

		$scope.doSubscribe = function() {
			WL.Client.Push.subscribe('myPush', {
				onSuccess: function() {
					WL.SimpleDialog.show('Push Notifications', 'doSubscribeSuccess', [{
						text: 'Close',
						handler: function() {}
					}]);
				},
				onFailure: function() {
					WL.SimpleDialog.show('Push Notifications', 'doSubscribeFailure', [{
						text: 'Close',
						handler: function() {}
					}]);
				}
			});
		};

		$scope.doUnsubscribe = function() {
			WL.Client.Push.unsubscribe('myPush', {
				onSuccess: function() {
					WL.SimpleDialog.show('Push Notifications', 'doUnsubscribeSuccess', [{
						text: 'Close',
						handler: function() {}
					}]);
				},
				onFailure: function() {
					WL.SimpleDialog.show('Push Notifications', 'doUnsubscribeFailure', [{
						text: 'Close',
						handler: function() {}
					}]);
				}
			});
		};
	});