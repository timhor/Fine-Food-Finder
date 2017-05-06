'use strict';

angular.module('fineFoodFinderApp')
  .controller('resultsCtrl', function($scope, $routeParams, $location, $http){
  		$scope.query = $routeParams.query;
        $http.get('http://localhost:3000/restaurants').then(function(response) {
          $scope.restdata = response.data;
	    });
	    $scope.search = function() {
	    	$location.path('/results').search({query: $scope.query});
	    };
    });

