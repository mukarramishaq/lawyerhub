/**
 * AngularJS module to process a form.
 */
angular.module('profileApp', [])
  .controller('profileController', function ($scope, $http, $log, $timeout) {
	var profileData;
	var getData = function(){
		$http({url:'/profile/get/view',method:'GET',headers: {'Content-Type': 'application/json'},data:profileData})
        .success(function(data, status, headers, config) {
        	//console.log(data);console.log(status);console.log(config);
        	//console.log(data.rurl);
        	//$window.location.href = data.rurl;
        	console.log("This is the data:"+data);
          if (data.status == 'OK') {
          	console.log("This is the data:"+data);
          	$scope.firstname = data.profile.firstname;
          	$scope.lastname = data.profile.lastname;
          	$scope.emailid = data.profile.emailid;
            //$scope.messages = 'Your form has been sent!';
            $scope.messages = data.msg;
            $scope.submitted = false;
          } 
          else {
            //$scope.messages = 'Oops, we received your request, but there was an error processing it.';
            $scope.messages = data.msg;
            $log.error(data);
          }
        })
        .error(function(data, status, headers, config) {
        console.log("This is the data:"+data);console.log(status);console.log(config);
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
        })
	}
      $timeout(getData,
        100);
    
  });
