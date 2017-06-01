/**
 * AngularJS module to process a form.
 */
angular.module('myApp', ['ajoslin.promise-tracker'])
  .controller('postController', function ($scope, $http, $log, promiseTracker, $timeout,$location) {
    
    
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
      var postData = {'subject' : $scope.subject,
          'description' : $scope.description,
          'contactno' : $scope.contactno};
      // Default values for the request.
      var config = {
        params : {
          'callback' : 'JSON_CALLBACK',
          'subject' : $scope.subject,
          'description' : $scope.description,
          'contactno' : $scope.contactno,
        },
      };

      // Perform JSONP request.
      var $promise = $http({url:'/dashboard/createPost',method:'POST',headers: {'Content-Type': 'application/json'},data:postData})
        .success(function(data, status, headers, config) {
        	//console.log(data);console.log(status);console.log(config);
        	//console.log(data.rurl);
        	//$window.location.href = data.rurl;
          if (data.status == 'OK') {
          	console.log(data);
          	$scope.subject = null;
          	$scope.description = null;
          	$scope.contactno = null;
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
          }, 5000);
        });

      // Track the request and show its progress to the user.
      $scope.progress.addPromise($promise);
    };
    
  });
