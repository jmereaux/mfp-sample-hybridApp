
/* JavaScript content from assets/views/login/login.controller.js in folder common */
'use strict';

angular.module('helloworld')
    .controller('LoginCtrl', function($scope, $window) {
        console.log('Displaying Login form');
        $scope.username = 'user';
        $scope.password = 'password';

        $scope.login = function() {
            var reqURL = '/my_custom_auth_request_url';
            var options = {};
            options.parameters = {
                username: $scope.username,
                password: $scope.password
            };
            options.headers = {};
            $window.challengeHandler.submitLoginForm(reqURL, options, challengeHandler.submitLoginFormCallback);
        }
    });