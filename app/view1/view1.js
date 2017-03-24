'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

	$http.get("https://www.reddit.com/r/nottheonion/new.json?sort=new&limit=10")
    .success(function(response) {
        $scope.headlines = response.data.children;
        //get the Title with headline.data.title
        //get the URL with headline.data.url
    });
}]);