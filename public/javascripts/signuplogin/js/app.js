/**
 * AngularJS module to process a form.
 */
angular.module('myApp', ['ajoslin.promise-tracker'])
  .controller('signup', function ($scope, $http, $log, promiseTracker, $timeout,$location) {
    

    // Inititate the promise tracker to track form submissions.
    $scope.progress = promiseTracker();
	
    // Form submit handler.
    
    
    $scope.submit = function(form) {
      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid || ($scope.password != $scope.password2)) {
      	if($scope.password != $scope.password2){
      		$scope.messages = 'Password does not match';
      		$timeout(function() {
            $scope.messages = null;
          }, 3000);
      	}
        return;
      }
      
      //set type of user
      var path = $location.absUrl();
      if(path.indexOf('lawyer')!= -1){
      	$scope.type = 'lawyer';
      }
      if(path.indexOf('client')!=-1){
      	$scope.type = 'client';
      }
      // Default values for the request.
      var config = {
        params : {
          'callback' : 'JSON_CALLBACK',
          'firstname' : $scope.firstname,
          'lastname' : $scope.lastname,
          'email' : $scope.email,
          'password': $scope.password,
          'userType': $scope.type,
        },
      };

      // Perform JSONP request.
      var $promise = $http.get('/createAccount', config)
        .success(function(data, status, headers, config) {
        	//console.log(data);console.log(status);console.log(config);
        	//console.log(data.rurl);
        	//$window.location.href = data.rurl;
        	 if(data.alertTime){
            	$scope.alertTime = data.alertTime;
            }
            else{
            	$scope.alertTime = 5000;
            }
          if (data.status == 'OK') {
          	console.log(data);
            $scope.firstname = null;
            $scope.lastname = null;
            $scope.email = null;
            $scope.password = null;
            $scope.password2 = null;
            $scope.userType = null;
            //$scope.messages = 'Your form has been sent!';
            $scope.messages = data.msg;
            $scope.submitted = false;
          } 
          //if(data.rurl){
          	//console.log(data);
          	//$window.location.href = data.rurl;
          //}
          else {
            //$scope.messages = 'Oops, we received your request, but there was an error processing it.';
            $scope.messages = data.msg;
            $log.error(data);
          }
        })
        .error(function(data, status, headers, config) {
        	console.log(data);console.log(status);console.log(config);
          $scope.progress = data;
          
          //$scope.messages = 'There was a network error. Try again later.';
          $scope.messages = data.msg;
          $log.error(data);
        })
        .finally(function() {
          // Hide status messages after five seconds.
          $timeout(function() {
            $scope.messages = null;
          }, $scope.alertTime);
        });

      // Track the request and show its progress to the user.
      $scope.progress.addPromise($promise);
    };
    
  });
