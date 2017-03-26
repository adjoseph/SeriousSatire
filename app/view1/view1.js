'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', 'RedditService', function($scope, $http, RedditService) {
	$scope.headlines = [];

	getHeadlines()

	function getHeadlines (){
		RedditService.getHeadlines()
		.then(function(data){
			$scope.headlines = data;
		});
		//"https://www.reddit.com/r/theonion/new.json?sort=new&limit=10"
	}
	
}]);