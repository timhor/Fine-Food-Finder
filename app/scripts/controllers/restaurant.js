'use strict';

/**
 * @ngdoc function
 * @name fineFoodFinderApp.controller:restCtrl
 * @description
 * # restCtrl
 * Controller of the fineFoodFinderApp
 */
angular.module('fineFoodFinderApp')
  .controller('restCtrl', function ($scope, $http){
        $http.get('/backend/restdata.json').then(function(response) {
          $scope.restdata = response.data;
	    });
    });
