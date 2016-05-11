WL.Server.createEventSource({
	name: 'PushEventSource',
	onDeviceSubscribe: 'deviceSubscribeFunc',
	onDeviceUnsubscribe: 'deviceUnsubscribeFunc',
	securityTest: 'PushSecurityTest'
});

function deviceSubscribeFunc(userSubscription, deviceSubscription) {
	WL.Logger.info("A device has subscribed to push notifications");
	WL.Logger.info(userSubscription);
	WL.Logger.info(deviceSubscription);
}

function deviceUnsubscribeFunc(userSubscription, deviceSubscription) {
	WL.Logger.info("A device has unsubscribed from push notifications");
	WL.Logger.info(userSubscription);
	WL.Logger.info(deviceSubscription);
}

/**
 * Adapter procedure used to trigger a push notification
 * @param  {[type]} userId           the user id 
 * @param  {[type]} notificationText the notification text to be sent
 * @return {[type]}                  [description]
 */
function submitNotification(userId, notificationText) {
	var userSubscription = WL.Server.getUserNotificationSubscription('PushAdapter.PushEventSource', userId);
	if (userSubscription === null) {
		return {
			result: "No subscription found for user: " + userId
		};
	}
	var notification = {};
	notification.MPNS = {};
	var badgeDigit = 1;
	notification = WL.Server.createDefaultNotification(notificationText, badgeDigit, {
		custom: "data"
	});
	//Set Toast notification for MPNS
	notification.MPNS.toast = {};
	notification.MPNS.toast.text1 = "Toast title";
	notification.MPNS.toast.text2 = "Toast content";
	WL.Server.notifyAllDevices(userSubscription, notification);
	return {
		result: "Notification sent to user :: " + userId
	};
}