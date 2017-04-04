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
		RedditService.getHeadlines("https://www.reddit.com/r/theonion/new.json?sort=new&limit=25")
		.then(function(posts){
			for (var i = 0; i < posts.length; i++) {
				if(posts[i].data.domain == "theonion.com") //must filter out headlines not from the Onion
					$scope.headlines.push(posts[i].data)
			}
			console.log($scope.headlines); //use this to check how many total headlines before reducing
				//make sure to delete this when you're satisfied it looks about equal usually
			
			$scope.headlines = reduceToNumHeadlines($scope.numHeadlines);
			$scope.receivedHeadlines = true; //set to true to render the view
		});
	};

	function reduceToNumHeadlines(num){
		var tempHeadlines = []; //will return this list of headlines, which $scope.headlines will be set to
		var headlineIndices = []; //keep track of the indices of $scope.headlines items, to put into tempHeadlines


		for (var i = 0; i < num; i++){
			while(true){
				var currentIndex = Math.floor(Math.random() * ($scope.headlines.length));
				if(headlineIndices.indexOf(currentIndex) == -1){
					tempHeadlines.push($scope.headlines[currentIndex]);
					headlineIndices.push(currentIndex);
					break;
				}
			}
		}
		return tempHeadlines;
	}

	$scope.headlines = [];
	$scope.numHeadlines = 6; //6 headlines per game, use this number to reduce total pool of headlines
	$scope.receivedHeadlines = false; //view won't render until headlines received via http request

	getHeadlines();
}]);