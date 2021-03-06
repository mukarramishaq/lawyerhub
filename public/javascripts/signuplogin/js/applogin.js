/**
 * AngularJS module to process a form.
 */
angular.module('myApp', ['ajoslin.promise-tracker'])
  .controller('login', function ($scope, $http, $log, promiseTracker, $timeout,$location,$window) {

    // Inititate the promise tracker to track form submissions.
    $scope.progress = promiseTracker();

    // Form submit handler.
    $scope.submit = function(form) {
      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        return;
      }
		//set type of user
      var path = $location.absUrl();
      if(path.indexOf('lawyer')!= -1){
      	$scope.type = 'lawyer';
      }
      if(path.indexOf('client')!= -1){
      	$scope.type = 'client';
      }
      // Default values for the request.
      var config = {
        params : {
          'callback' : 'JSON_CALLBACK',
          'email' : $scope.email,
          'password': $scope.password,
          'type': $scope.type
        },
      };
		
      // Perform JSONP request.
      var $promise = $http.get('/loginAttempt', config)
        .success(function(data, status, headers, config) {
        	console.log(data);console.log(status);console.log(config);console.log($scope.type);
          if (data.status == 'OK') {
            $scope.email = null;
            $scope.password = null;
            $scope.userType = null;
            $scope.messages = data.msg;
            $scope.submitted = false;
            $window.location.href = data.rurl;
          } else {
            $scope.messages = data.msg;
            $log.error(data);
          }
        })
        .error(function(data, status, headers, config) {
        	console.log(data);console.log(status);console.log(config);
          $scope.progress = data;
          $scope.messages = data.msg;
          $log.error(data);
        })
        .finally(function() {
          // Hide status messages after five seconds.
          $timeout(function() {
            $scope.messages = null;
          }, 5000);
        });

      // Track the request and show its progress to the user.
      $scope.progress.addPromise($promise);
    };
  });
