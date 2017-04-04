'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', 'RedditService', function($scope, $http, RedditService) {
	function getHeadlines (){
		//get nottheonion (serious) headlines
		RedditService.getHeadlines("https://www.reddit.com/r/nottheonion/new.json?sort=new&limit=10")
		.then(function(posts){
			for (var i = 0; i < posts.length; i++) {
				$scope.headlines.push(posts[i].data)
			}
		});

		//get onion (satire) headlines 
		RedditService.getHeadlines("https://www.reddit.com/r/theonion/new.json?sort=new&limit=20")
		.then(function(posts){
			for (var i = 0; i < posts.length; i++) {
				if(posts[i].data.domain == "theonion.com") //must filter out headlines not from the Onion
					$scope.headlines.push(posts[i].data)
			}
		});
	}

	$scope.headlines = [];

	getHeadlines();
	console.log($scope.headlines)

}]);