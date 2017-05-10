'use strict';

angular.module('fineFoodFinderApp')
  .controller('RestCtrl', function($scope, $routeParams, $location, $http){
        $http.get('http://localhost:3000/restaurants').then(function(response) {
          	angular.forEach(response.data, function(value) {
            	console.log($routeParams.key);
            	console.log(value.id);
            	if (value.id === $routeParams.key) {
            		console.log("found");
                	$scope.rest = value;
            	}
          	});
	    });
    });

