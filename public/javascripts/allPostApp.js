/**
 * AngularJS module to process a form.
 */
angular.module('allPostApp', [])
  .controller('allPostController', function ($scope, $http,$timeout) {
  
  $scope.newFeed = function(){
  	$scope.posts = $scope.allPosts;
  	$scope.messages = null;
  }
  
  //check continuously that there are new posts are not
  var diffFunc = function(){
  	var diff = $scope.allPosts.length - $scope.posts.length;
  	if(diff != 0){
  		$scope.messages = diff+' new posts. Click to reload!';
  	}
  	$timeout(diffFunc,2*60*1000);
  };
  $timeout(diffFunc,2000);
  
  $scope.getFeed = function(){$http({url:'/dashboard/recentPosts',method:'POST',headers: {'Content-Type': 'application/json'},data:{}})
        .success(function(data, status, headers, config) {
        	//console.log(data);console.log(status);console.log(config);
        	//console.log(data.rurl);
        	//$window.location.href = data.rurl;
          if (data.status == 'OK') {
          	console.log(data);
            //$scope.messages = 'Your form has been sent!';
            $scope.allPosts = data.posts;
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
          /*$timeout(function() {
            $scope.messages = null;
          }, 5000);*/
        });
        
        $timeout($scope.getFeed,5*60*100);

   };
   
   $scope.initFeed = function(){$http({url:'/dashboard/recentPosts',method:'POST',headers: {'Content-Type': 'application/json'},data:{}})
        .success(function(data, status, headers, config) {
        	//console.log(data);console.log(status);console.log(config);
        	//console.log(data.rurl);
        	//$window.location.href = data.rurl;
          if (data.status == 'OK') {
          	console.log(data);
            //$scope.messages = 'Your form has been sent!';
            $scope.posts = data.posts;
            $scope.allPosts = data.posts;
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
          /*$timeout(function() {
            $scope.messages = null;
          }, 5000);*/
        });
        
        $timeout($scope.getFeed,5*60*100);

   };
  
  $timeout($scope.initFeed
  	, 100
  
  );

      // Perform JSONP request.
      //var $promise = 
    
  });
