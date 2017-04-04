angular.module('myApp')
	.factory('RedditService', ['$http', function($http){
		var headlines = []; //try removing this line btw
		var getHeadlines = function(url){
			return $http.get(url)
			.then(function(response){
				//angular.forEach(response.data.children, function(c,i){
					//headlines.push(c);
				//});
				return response.data.data.children
			});
		}
		return{
			getHeadlines: getHeadlines
		}
	}]);