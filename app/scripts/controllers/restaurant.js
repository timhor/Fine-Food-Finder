'use strict';

angular.module('fineFoodFinderApp')
  .controller('restCtrl', function ($scope, $http){
        $http.get('http://localhost:3000/restaurants').then(function(response) {
          $scope.restdata = response.data;
	    });
    });
