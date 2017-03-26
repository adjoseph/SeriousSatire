angular.module('myApp')
	.factory('RedditService', ['$http', function($http){
		var headlines = [];
		var getHeadlines = function(){
			return $http.get("https://www.reddit.com/r/nottheonion/new.json?sort=new&limit=10")
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