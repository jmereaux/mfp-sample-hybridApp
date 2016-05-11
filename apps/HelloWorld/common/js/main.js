function wlCommonInit() {

	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */

	WL.Logger.debug("About to connect to MobileFirst Server.");
	WL.Client.connect({
		onSuccess: function() {
			WL.Logger.debug("Successfully connected to MobileFirst Server.");
			if (WL.Client.isUserAuthenticated('PushAppRealm'))
				console.log('UserId: ' + WL.Client.getUserInfo('PushAppRealm', 'userId'));
		},
		onFailure: function() {
			WL.Logger.debug("Failed connecting to MobileFirst Server.");
			WL.SimpleDialog.show("HelloWorld App", "Failed connecting to MobileFirst Server. Try again later.", [{
				text: 'Reload',
				handler: WL.Client.reloadapp
			}, {
				text: 'Close',
				handler: function() {}
			}]);
		}
	});
}

if (WL.Client.Push) {
	WL.Client.Push.onReadyToSubscribe = function() {
		WL.Logger.debug("onReadyToSubscribe");
		WL.Client.Push.registerEventSourceCallback(
			"myPush",
			"PushAdapter",
			"PushEventSource",
			function(props, payload) {
				WL.SimpleDialog.show("HelloWorld App", "Provider notification data: " + JSON.stringify(props), [{
					text: 'Close',
					handler: function() {
						WL.SimpleDialog.show("HelloWorld App", "Application notification data: " + JSON.stringify(payload), [{
							text: 'Close',
							handler: function() {}
						}]);
					}
				}]);
			});;
	}
}

var helloWorldApp = angular.module('helloworld', ['ngRoute', 'angularSpinner'])