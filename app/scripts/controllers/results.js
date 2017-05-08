'use strict';

angular.module('fineFoodFinderApp')
  .controller('resultsCtrl', function($scope, $routeParams, $location, $http){
  		$scope.query = $routeParams.query;
        $http.get('http://localhost:3000/restaurants').then(function(response) {
          	if (!console.log(!$scope.query)) {
          		$scope.restdata = response.data;
          	} else {
          		$scope.restdata = [];
	          	angular.forEach(response.data, function(value) {
	            	console.log(value.name + " has address " + value.address);
	            	console.log($scope.query.address);
	            	if (value.address.toLowerCase().includes($scope.query.address.toLowerCase())) {
	                	$scope.restdata.push(value);
	            	}
	          	});
		        var listLen = $scope.restdata.length;
		        // Please verify this
		        var i = listLen-1;
		        while (i > 0) {
		        var j  = 0;
		        	while (j < i) {
		                if ($scope.restdata[j].postcode > $scope.restdata[j+1].postcode) {
		                    var temp = $scope.restdata[j];
		                    $scope.restdata[j] = $scope.restdata[j+1];
		                    $scope.restdata[j+1] = temp;

		                }
		                j += 1;
		            }
		            i -= 1;

		        }
         	}
	    });
    });

