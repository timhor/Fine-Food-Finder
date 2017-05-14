'use strict';

angular.module('fineFoodFinderApp')
  .controller('RestCtrl', function($scope, $routeParams, $location, $http){
	    $scope.rest = $routeParams.restdata;
    });

