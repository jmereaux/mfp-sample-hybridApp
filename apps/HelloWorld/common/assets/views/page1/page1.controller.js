'use strict';

angular.module('helloworld')
    .controller('Page1Ctrl', ['$scope', '$location', 'usSpinnerService', 'authenticationService', function($scope, $location, usSpinnerService, authenticationService) {

        console.log('Init Page1Ctrl');

        $scope.logout = function() {
            authenticationService.logout().then(function() {
                // $location.path('/login');
                WL.Client.reloadApp();
            });
        };

        $scope.callAdapter = function() {
            usSpinnerService.spin('adapterCallLoading');
            var resourceRequest = new WLResourceRequest("/adapters/SampleHTTPAdapter/sampleOperation", WLResourceRequest.GET);
            resourceRequest.send().then(
                function(result) {
                    usSpinnerService.stop('adapterCallLoading');
                    $scope.adapterResponse = result;
                    $scope.$apply();
                },
                function(error) {
                    console.error('An error occurred');
                    console.error(error);
                    usSpinnerService.stop('adapterCallLoading');
                    $scope.adapterResponse = error;
                    $scope.$apply();
                }
            );
        };

        $scope.callJavaAdapter = function() {
            usSpinnerService.spin('adapterCallLoading');
            var resourceRequest = new WLResourceRequest("/adapters/SampleJavaAdapter/users/johan", WLResourceRequest.GET);
            resourceRequest.send().then(
                function(result) {
                    usSpinnerService.stop('adapterCallLoading');
                    $scope.adapterResponse = result;
                    $scope.$apply();
                },
                function(error) {
                    console.error('An error occurred');
                    console.error(error);
                    usSpinnerService.stop('adapterCallLoading');
                    $scope.adapterResponse = error;
                    $scope.$apply();
                }
            );
        }
    }]);